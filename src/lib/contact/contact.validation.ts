import { CONTACT_FIELD_LIMITS } from "@/lib/contact/contact.constants";
import type {
  ContactFieldErrors,
  ContactFormData,
} from "@/lib/contact/contact.types";

type ContactValidationResult =
  | {
      success: true;
      data: ContactFormData;
    }
  | {
      success: false;
      message: string;
      fieldErrors: ContactFieldErrors;
    };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactForm(payload: unknown): ContactValidationResult {
  if (!isRecord(payload)) {
    return {
      success: false,
      message: "Invalid form payload.",
      fieldErrors: {},
    };
  }

  const data: ContactFormData = {
    name: normalizeField(payload.name),
    email: normalizeField(payload.email).toLowerCase(),
    message: normalizeField(payload.message),
  };

  const fieldErrors: ContactFieldErrors = {};

  if (!data.name) {
    fieldErrors.name = "Please enter your name.";
  } else if (data.name.length > CONTACT_FIELD_LIMITS.name) {
    fieldErrors.name = `Name must be ${CONTACT_FIELD_LIMITS.name} characters or fewer.`;
  }

  if (!data.email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (data.email.length > CONTACT_FIELD_LIMITS.email) {
    fieldErrors.email = `Email must be ${CONTACT_FIELD_LIMITS.email} characters or fewer.`;
  } else if (!EMAIL_REGEX.test(data.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!data.message) {
    fieldErrors.message = "Please share a short project brief or question.";
  } else if (data.message.length > CONTACT_FIELD_LIMITS.message) {
    fieldErrors.message = `Message must be ${CONTACT_FIELD_LIMITS.message} characters or fewer.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: "Please review the highlighted fields and try again.",
      fieldErrors,
    };
  }

  return {
    success: true,
    data,
  };
}
