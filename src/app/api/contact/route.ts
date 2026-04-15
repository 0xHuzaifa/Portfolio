import { NextResponse } from "next/server";
import type { ContactApiResponse } from "@/lib/contact/contact.types";
import { validateContactForm } from "@/lib/contact/contact.validation";
import { sendContactEmails } from "@/lib/contact/contact-email.service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message: "Unable to read the submitted form data.",
      },
      { status: 400 },
    );
  }

  const validation = validateContactForm(payload);

  if (!validation.success) {
    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message: validation.message,
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    await sendContactEmails(validation.data);

    return NextResponse.json<ContactApiResponse>({
      success: true,
      message:
        "Your message has been sent successfully. I will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form submission failed", error);

    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message:
          "The message could not be sent right now. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
