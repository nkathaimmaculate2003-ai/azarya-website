import type { NextRequest } from "next/server";
import { validateEnquiry, type EnquiryInput, type EnquiryResponse } from "@/lib/enquiry";
import { isRateLimited } from "@/lib/rate-limit";
import { sendEnquiry } from "@/lib/send-enquiry";

/** Submissions faster than this after the form loads are treated as automated. */
const MIN_FILL_TIME_MS = 3000;
const MAX_BODY_BYTES = 10_000;

function reply(body: EnquiryResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: NextRequest) {
  // Only accept JSON from this site's own pages.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return reply({ ok: false, message: "This request is not allowed." }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return reply({ ok: false, message: "Unsupported request format." }, 415);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return reply(
      { ok: false, message: "Too many messages have been sent from your connection. Please wait a few minutes and try again, or contact us by phone." },
      429,
    );
  }

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return reply({ ok: false, message: "Your message is too long." }, 413);
    }
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object") throw new Error("Invalid body");
    raw = parsed as Record<string, unknown>;
  } catch {
    return reply({ ok: false, message: "Your message could not be read. Please try again." }, 400);
  }

  // Spam checks: a hidden "website" field that people leave empty, and a
  // minimum time between loading and submitting the form. Bots get a generic
  // error and nothing is sent.
  const startedAt = typeof raw.startedAt === "number" ? raw.startedAt : 0;
  if (asString(raw.website) !== "" || !startedAt || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return reply(
      { ok: false, message: "Your message could not be sent. Please wait a moment and try again, or contact us by phone or email." },
      400,
    );
  }

  const input: EnquiryInput = {
    name: asString(raw.name),
    contactMethod: asString(raw.contactMethod),
    phone: asString(raw.phone),
    email: asString(raw.email),
    reason: asString(raw.reason),
    message: asString(raw.message),
    privacyAck: raw.privacyAck === true,
  };

  const result = validateEnquiry(input);
  if (!result.ok) {
    return reply({ ok: false, message: "Please correct the highlighted fields and try again.", errors: result.errors }, 422);
  }

  const sent = await sendEnquiry(result.data);
  if (!sent.ok) {
    return reply(
      {
        ok: false,
        message:
          "Sorry, we could not send your message right now. Please try again later, or contact us directly by phone or email.",
      },
      sent.reason === "not-configured" ? 503 : 502,
    );
  }

  return reply(
    {
      ok: true,
      message:
        sent.mode === "dev-log"
          ? "Development mode: your message was received by the server and printed to the terminal. It was not emailed."
          : "Thank you. Your message has been sent. We will reply using the contact details you gave us.",
    },
    200,
  );
}
