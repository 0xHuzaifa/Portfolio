import { Link, Section, Text } from "@react-email/components";
import { ContactEmailLayout } from "@/emails/ContactEmailLayout";
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
    </ContactEmailLayout>
  );
}

const paragraph = {
  margin: "0 0 18px",
};

const infoCard = {
  border: "1px solid #263244",
  borderRadius: "18px",
  backgroundColor: "#121b27",
  padding: "20px",
};

const label = {
  margin: "0 0 6px",
  color: "#5fd4ff",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
};

const value = {
  margin: "0 0 18px",
  color: "#f7fafc",
  fontSize: "15px",
  lineHeight: "25px",
};

const messageText = {
  margin: 0,
  color: "#f7fafc",
  fontSize: "15px",
  lineHeight: "25px",
  whiteSpace: "pre-wrap" as const,
};

const link = {
  color: "#7ddfff",
  textDecoration: "none",
};
