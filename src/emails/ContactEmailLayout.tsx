import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { CSSProperties, ReactNode } from "react";
import {
  CONTACT_FULL_LOGO_URL,
  CONTACT_LOGO_URL,
  CONTACT_OWNER_EMAIL,
} from "@/lib/contact/contact.constants";

type ContactEmailLayoutProps = {
  preview: string;
  title: string;
  eyebrow: string;
  children: ReactNode;
};

export function ContactEmailLayout({
  preview,
  title,
  eyebrow,
  children,
}: ContactEmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={card}>
            <Img
              alt="Huzaifa Ahmed"
              height="42"
              src={CONTACT_FULL_LOGO_URL}
              style={brandLogo}
            />
            <Text style={eyebrowText}>{eyebrow}</Text>
            <Text style={titleText}>{title}</Text>
            <Section style={content}>{children}</Section>
            <Hr style={divider} />
            <Section style={footer}>
              <Img
                alt="Huzaifa Ahmed logo"
                height="28"
                src={CONTACT_LOGO_URL}
                style={footerLogo}
                width="28"
              />
              <Text style={footerText}>
                Huzaifa Ahmed
                <br />
                Full-stack developer building scalable product systems.
                <br />
                {CONTACT_OWNER_EMAIL}
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body: CSSProperties = {
  margin: 0,
  backgroundColor: "#0f1720",
  padding: "32px 16px",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  color: "#e5edf5",
};

const container: CSSProperties = {
  margin: "0 auto",
  maxWidth: "620px",
};

const card: CSSProperties = {
  border: "1px solid #263244",
  borderRadius: "24px",
  background:
    "linear-gradient(180deg, rgba(20,28,40,1) 0%, rgba(15,23,32,1) 100%)",
  padding: "32px",
};

const brandLogo: CSSProperties = {
  marginBottom: "20px",
};

const eyebrowText: CSSProperties = {
  margin: "0 0 10px",
  color: "#5fd4ff",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

const titleText: CSSProperties = {
  margin: "0 0 24px",
  color: "#f7fafc",
  fontSize: "28px",
  lineHeight: "36px",
  fontWeight: 700,
};

const content: CSSProperties = {
  color: "#c2d3e5",
  fontSize: "15px",
  lineHeight: "26px",
};

const divider: CSSProperties = {
  margin: "28px 0 24px",
  borderColor: "#263244",
};

const footer: CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const footerLogo: CSSProperties = {
  display: "block",
  marginRight: "14px",
  borderRadius: "8px",
};

const footerText: CSSProperties = {
  margin: 0,
  color: "#8ea2b8",
  fontSize: "13px",
  lineHeight: "21px",
};
