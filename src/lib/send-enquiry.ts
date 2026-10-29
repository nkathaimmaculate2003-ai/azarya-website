import "server-only";

import { reasonLabel, type Enquiry } from "@/lib/enquiry";
import { site } from "@/content/site";

/**
 * Delivers an enquiry by email using the Resend HTTP API
 * (https://resend.com). Credentials come only from server-side environment
 * variables and are never sent to the browser.
 *
 * To use a different provider, replace the body of `sendEnquiry` and keep the
 * same return values.
 */

export type SendResult =
  | { ok: true; mode: "email" | "dev-log" }
  | { ok: false; reason: "not-configured" | "provider-error" };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatText(enquiry: Enquiry): string {
  return [
    `New website enquiry for ${site.name}`,
    "",
    `Name: ${enquiry.name || "(not given)"}`,
    `Preferred contact method: ${enquiry.contactMethod}`,
    `Phone: ${enquiry.phone || "(not given)"}`,
    `Email: ${enquiry.email || "(not given)"}`,
    `Reason: ${reasonLabel(enquiry.reason)}`,
    "",
    "Message:",
    enquiry.message,
  ].join("\n");
}

export async function sendEnquiry(enquiry: Enquiry): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Local development only: allow testing the form without an email
    // provider. The submission is printed to the terminal, and the user is
    // told it was logged rather than emailed. Never enabled in production.
    if (process.env.NODE_ENV !== "production" && process.env.CONTACT_DEV_LOG_ONLY === "true") {
      console.info("[contact form: dev log only]\n" + formatText(enquiry));
      return { ok: true, mode: "dev-log" };
    }
    console.error("Contact form is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
    return { ok: false, reason: "not-configured" };
  }

  const text = formatText(enquiry);
  const html = `<pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(text)}</pre>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((address) => address.trim()),
        subject: `Website enquiry: ${reasonLabel(enquiry.reason)}`,
        text,
        html,
        ...(enquiry.email ? { reply_to: enquiry.email } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      // Log status only; never log the API key or the full enquiry in production.
      console.error(`Email provider returned HTTP ${response.status}`);
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true, mode: "email" };
  } catch (error) {
    console.error("Email provider request failed:", error instanceof Error ? error.message : "unknown error");
    return { ok: false, reason: "provider-error" };
  }
}
