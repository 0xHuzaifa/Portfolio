import { Section, Text } from "@react-email/components";
import { ContactEmailLayout, PALETTE } from "@/emails/ContactEmailLayout";
import { CONTACT_OWNER_EMAIL } from "@/lib/contact/contact.constants";
import type { ContactFormData } from "@/lib/contact/contact.types";

type ContactUserConfirmationEmailProps = {
  submission: ContactFormData;
};

export function ContactUserConfirmationEmail({
  submission,
}: ContactUserConfirmationEmailProps) {
  return (
    <ContactEmailLayout
      eyebrow="Message received"
      preview="Your message has been received successfully."
      title={`Thanks for reaching out, ${submission.name}.`}
    >
      <Text style={paragraph}>
        Your message was delivered successfully. I appreciate you taking the
        time to share the context around your project.
      </Text>
      <Text style={paragraph}>
        I usually reply within 1 to 2 business days. If your request is
        time-sensitive, please contact me directly at {CONTACT_OWNER_EMAIL} and
        mention the timeline.
      </Text>

      <Section style={messageCard}>
        <Text style={label}>Your message</Text>
        <Text style={messageText}>{submission.message}</Text>
      </Section>

      <Text style={closing}>
        In the meantime, thank you again for considering me for your build.
      </Text>
    </ContactEmailLayout>
  );
}

const paragraph = {
  margin: "0 0 16px",
  color: PALETTE.inkSoft,
};

const messageCard = {
  marginTop: "8px",
  border: `1px solid ${PALETTE.rule}`,
  borderRadius: "18px",
  backgroundColor: PALETTE.well,
  padding: "22px",
};

const label = {
  margin: "0 0 10px",
  color: PALETTE.inkFaint,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
};

const messageText = {
  margin: 0,
  color: PALETTE.ink,
  fontSize: "15px",
  lineHeight: "25px",
  whiteSpace: "pre-wrap" as const,
};

const closing = {
  margin: "18px 0 0",
  color: PALETTE.inkSoft,
};
