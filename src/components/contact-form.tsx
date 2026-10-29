"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  enquiryReasons,
  limits,
  validateEnquiry,
  type EnquiryInput,
  type EnquiryResponse,
  type FieldErrors,
} from "@/lib/enquiry";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const fieldClass =
  "mt-2 block w-full rounded-md border-2 border-slate-400 bg-white px-3 py-2.5 text-base text-charcoal aria-[invalid=true]:border-red-700";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-red-800">
      <span aria-hidden="true">✕ </span>
      {message}
    </p>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [contactMethod, setContactMethod] = useState<"phone" | "email">("phone");
  const [messageLength, setMessageLength] = useState(0);
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Record when the form was shown; very fast submissions are likely spam.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status.state === "success" || status.state === "error") statusRef.current?.focus();
  }, [status]);

  function readForm(form: HTMLFormElement): EnquiryInput {
    const data = new FormData(form);
    return {
      name: String(data.get("name") ?? ""),
      contactMethod: String(data.get("contactMethod") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      reason: String(data.get("reason") ?? ""),
      message: String(data.get("message") ?? ""),
      privacyAck: data.get("privacyAck") === "yes",
    };
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = readForm(form);
    const result = validateEnquiry(input);

    if (!result.ok) {
      setErrors(result.errors);
      setStatus({ state: "error", message: "Please correct the highlighted fields and try again." });
      return;
    }

    setErrors({});
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          website: String(new FormData(form).get("website") ?? ""),
          startedAt: startedAt.current,
        }),
      });
      const body = (await response.json().catch(() => null)) as EnquiryResponse | null;

      // Only report success when the server explicitly confirms it.
      if (response.ok && body?.ok) {
        setStatus({ state: "success", message: body.message });
        formRef.current?.reset();
        setMessageLength(0);
        setContactMethod("phone");
        return;
      }
      if (body && !body.ok && body.errors) setErrors(body.errors);
      setStatus({
        state: "error",
        message: body?.message ?? "Sorry, your message could not be sent. Please try again or contact us by phone or email.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "Sorry, your message could not be sent because of a connection problem. Please try again or contact us by phone or email.",
      });
    }
  }

  const describedBy = (field: keyof EnquiryInput, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby="form-intro">
      <div id="form-intro" className="rounded-md border-l-8 border-l-red-800 bg-red-50 p-4 leading-relaxed">
        <p className="font-semibold text-navy">
          <span aria-hidden="true">⚠ </span>Please do not share confidential case details or documents
        </p>
        <p className="mt-1">
          Keep your message short and general. Do not include case histories, identity documents, ID numbers or other
          sensitive personal information. This form is not an emergency service.
        </p>
      </div>

      <p className="text-sm">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div>
        <label htmlFor="name" className="font-semibold text-navy">
          Your name <span className="font-normal">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={limits.name}
          className={fieldClass}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name")}
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <fieldset aria-describedby={describedBy("contactMethod")}>
        <legend className="font-semibold text-navy">
          How would you like us to contact you? <span aria-hidden="true">*</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-6">
          {(["phone", "email"] as const).map((method) => (
            <label key={method} className="inline-flex min-h-11 cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="contactMethod"
                value={method}
                checked={contactMethod === method}
                onChange={() => setContactMethod(method)}
                className="h-5 w-5 accent-teal"
                required
              />
              {method === "phone" ? "Phone" : "Email"}
            </label>
          ))}
        </div>
        <FieldError id="contactMethod-error" message={errors.contactMethod} />
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="font-semibold text-navy">
            Phone number {contactMethod === "phone" ? <span aria-hidden="true">*</span> : <span className="font-normal">(optional)</span>}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={limits.phone}
            required={contactMethod === "phone"}
            className={fieldClass}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <div>
          <label htmlFor="email" className="font-semibold text-navy">
            Email address {contactMethod === "email" ? <span aria-hidden="true">*</span> : <span className="font-normal">(optional)</span>}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={limits.email}
            required={contactMethod === "email"}
            className={fieldClass}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="reason" className="font-semibold text-navy">
          Reason for your enquiry <span aria-hidden="true">*</span>
        </label>
        <select
          id="reason"
          name="reason"
          required
          defaultValue=""
          className={fieldClass}
          aria-invalid={errors.reason ? true : undefined}
          aria-describedby={describedBy("reason")}
        >
          <option value="" disabled>
            Choose a reason
          </option>
          {enquiryReasons.map((reason) => (
            <option key={reason.value} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>
        <FieldError id="reason-error" message={errors.reason} />
      </div>

      <div>
        <label htmlFor="message" className="font-semibold text-navy">
          Short message <span aria-hidden="true">*</span>
        </label>
        <p id="message-hint" className="mt-1 text-sm">
          A brief, general description is enough. Please do not include confidential details.
        </p>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={limits.message}
          onChange={(e) => setMessageLength(e.target.value.length)}
          className={fieldClass}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", "message-hint message-count")}
        />
        <p id="message-count" className="mt-1 text-sm">
          {messageLength} of {limits.message} characters
        </p>
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Honeypot: hidden from people and assistive technology; bots often fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="privacyAck"
            value="yes"
            required
            className="mt-1 h-5 w-5 shrink-0 accent-teal"
            aria-invalid={errors.privacyAck ? true : undefined}
            aria-describedby={describedBy("privacyAck")}
          />
          <span>
            I have read the{" "}
            <Link href="/privacy-notice" target="_blank">
              privacy notice<span className="sr-only"> (opens in a new tab)</span>
            </Link>{" "}
            and understand how my information will be used. <span aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError id="privacyAck-error" message={errors.privacyAck} />
      </div>

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="inline-flex min-h-12 items-center justify-center rounded-md bg-teal px-6 py-3 font-semibold text-white hover:bg-teal-dark disabled:cursor-wait disabled:opacity-70"
      >
        {status.state === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      <div aria-live="polite" aria-atomic="true">
        {status.state === "sending" && <p className="font-semibold">Sending your message…</p>}
        {(status.state === "success" || status.state === "error") && (
          <div
            ref={statusRef}
            tabIndex={-1}
            role={status.state === "error" ? "alert" : "status"}
            className={`rounded-md border-l-8 p-4 font-semibold ${
              status.state === "success" ? "border-l-teal bg-white text-navy" : "border-l-red-800 bg-red-50 text-red-900"
            }`}
          >
            <span aria-hidden="true">{status.state === "success" ? "✓ " : "✕ "}</span>
            {status.message}
          </div>
        )}
      </div>
    </form>
  );
}
