import { Link, Section, Text } from "@react-email/components";
import { ContactEmailLayout, PALETTE } from "@/emails/ContactEmailLayout";
import type { ContactFormData } from "@/lib/contact/contact.types";

type ContactOwnerNotificationEmailProps = {
  submission: ContactFormData;
};

export function ContactOwnerNotificationEmail({
  submission,
}: ContactOwnerNotificationEmailProps) {
  return (
    <ContactEmailLayout
      eyebrow="New contact inquiry"
      preview={`New portfolio inquiry from ${submission.name}`}
      title={`${submission.name} sent a new message`}
    >
      <Text style={paragraph}>
        A new contact form submission just came in from your portfolio website.
      </Text>

      <Section style={infoCard}>
        <Text style={label}>Name</Text>
        <Text style={value}>{submission.name}</Text>

        <Text style={label}>Email</Text>
        <Text style={value}>
          <Link href={`mailto:${submission.email}`} style={link}>
            {submission.email}
          </Link>
        </Text>

        <Text style={label}>Message</Text>
        <Text style={messageText}>{submission.message}</Text>
      </Section>

      <Text style={replyHint}>
        Replying to this email goes straight back to {submission.name}.
      </Text>
    </ContactEmailLayout>
  );
}

const paragraph = {
  margin: "0 0 18px",
  color: PALETTE.inkSoft,
};

const infoCard = {
  border: `1px solid ${PALETTE.rule}`,
  borderRadius: "18px",
  backgroundColor: PALETTE.well,
  padding: "22px",
};

const label = {
  margin: "0 0 6px",
  color: PALETTE.inkFaint,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
};

const value = {
  margin: "0 0 18px",
  color: PALETTE.ink,
  fontSize: "15px",
  lineHeight: "25px",
  fontWeight: 600,
};

const messageText = {
  margin: 0,
  color: PALETTE.ink,
  fontSize: "15px",
  lineHeight: "25px",
  whiteSpace: "pre-wrap" as const,
};

/* Ink with a yellow underline. The accent is unreadable as link text on a
   light panel — it carries the emphasis underneath the word instead. */
const link = {
  color: PALETTE.ink,
  fontWeight: 700,
  textDecoration: "underline",
  textDecorationColor: PALETTE.yellow,
};

const replyHint = {
  margin: "18px 0 0",
  color: PALETTE.inkFaint,
  fontSize: "13px",
  lineHeight: "21px",
};
