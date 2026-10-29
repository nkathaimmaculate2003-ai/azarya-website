/**
 * Enquiry form fields and validation, shared by the browser and the server so
 * both apply exactly the same rules. The server always re-validates; the
 * browser checks are only for convenience.
 */

export const enquiryReasons = [
  { value: "mediation", label: "Mediation information" },
  { value: "legal-awareness", label: "Legal awareness" },
  { value: "referral", label: "Referral information" },
  { value: "community-session", label: "Community awareness session" },
  { value: "partnership", label: "Partnership or collaboration" },
  { value: "other", label: "Other" },
] as const;

export type EnquiryReason = (typeof enquiryReasons)[number]["value"];
export type ContactMethod = "phone" | "email";

export type EnquiryInput = {
  name: string;
  contactMethod: string;
  phone: string;
  email: string;
  reason: string;
  message: string;
  privacyAck: boolean;
};

export type Enquiry = {
  name: string;
  contactMethod: ContactMethod;
  phone: string;
  email: string;
  reason: EnquiryReason;
  message: string;
};

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export const limits = {
  name: 100,
  phone: 20,
  email: 254,
  message: 1000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Allows Kenyan and international formats: digits, spaces, +, -, ( )
const phonePattern = /^\+?[0-9\s\-()]{7,20}$/;

export function validateEnquiry(
  input: EnquiryInput,
): { ok: true; data: Enquiry } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const phone = input.phone.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (name.length > limits.name) {
    errors.name = `Please keep your name under ${limits.name} characters.`;
  }

  if (input.contactMethod !== "phone" && input.contactMethod !== "email") {
    errors.contactMethod = "Please choose how you would like us to contact you.";
  }

  if (!phone && !email) {
    const msg = "Please give a phone number or an email address so we can reply.";
    if (input.contactMethod === "email") errors.email = msg;
    else errors.phone = msg;
  }
  if (phone && !phonePattern.test(phone)) {
    errors.phone = "Please enter a valid phone number, for example 0712 345 678.";
  }
  if (email && (email.length > limits.email || !emailPattern.test(email))) {
    errors.email = "Please enter a valid email address, for example name@example.com.";
  }
  if (input.contactMethod === "phone" && !phone && !errors.phone) {
    errors.phone = "Please enter a phone number, or choose email as your contact method.";
  }
  if (input.contactMethod === "email" && !email && !errors.email) {
    errors.email = "Please enter an email address, or choose phone as your contact method.";
  }

  if (!enquiryReasons.some((r) => r.value === input.reason)) {
    errors.reason = "Please choose a reason for your enquiry.";
  }

  if (!message) {
    errors.message = "Please write a short message.";
  } else if (message.length > limits.message) {
    errors.message = `Please keep your message under ${limits.message} characters.`;
  }

  if (!input.privacyAck) {
    errors.privacyAck = "Please confirm you have read the privacy notice.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      contactMethod: input.contactMethod as ContactMethod,
      phone,
      email,
      reason: input.reason as EnquiryReason,
      message,
    },
  };
}

export function reasonLabel(value: EnquiryReason): string {
  return enquiryReasons.find((r) => r.value === value)?.label ?? value;
}

/** Response shape returned by /api/contact. */
export type EnquiryResponse =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: FieldErrors };
