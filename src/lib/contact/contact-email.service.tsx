import { Resend } from "resend";
import { ContactOwnerNotificationEmail } from "@/emails/ContactOwnerNotificationEmail";
import { ContactUserConfirmationEmail } from "@/emails/ContactUserConfirmationEmail";
import {
  CONTACT_OWNER_EMAIL,
  DEFAULT_CONTACT_FROM_EMAIL,
} from "@/lib/contact/contact.constants";
import type { ContactFormData } from "@/lib/contact/contact.types";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  return new Resend(apiKey);
}

function getFromEmail() {
  return DEFAULT_CONTACT_FROM_EMAIL;
}

export async function sendContactEmails(submission: ContactFormData) {
  const resend = getResendClient();
  const from = getFromEmail();

  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to: CONTACT_OWNER_EMAIL,
      subject: `New portfolio inquiry from ${submission.name}`,
      replyTo: submission.email,
      react: ContactOwnerNotificationEmail({ submission }),
    }),
    resend.emails.send({
      from,
      to: submission.email,
      subject: "Your message was received",
      replyTo: CONTACT_OWNER_EMAIL,
      react: ContactUserConfirmationEmail({ submission }),
    }),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      throw result.reason;
    }

    if (result.value.error) {
      throw new Error(result.value.error.message);
    }
  }
}
