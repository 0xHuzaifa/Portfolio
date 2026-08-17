import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type { CSSProperties, ReactNode } from "react";
import {
  CONTACT_FULL_LOGO_URL,
  CONTACT_LOGO_URL,
  CONTACT_OWNER_EMAIL,
} from "@/lib/contact/contact.constants";

/**
 * The shell both contact emails render inside.
 *
 * Carries the site's own palette — beige page, white panel, ink type, the one
 * yellow accent — rather than the dark navy and cyan it shipped with, so an
 * inbox and the site look like the same person sent them.
 *
 * Written as inline styles with literal hex on purpose. Mail clients strip
 * custom properties and most of `<style>`, so `hsl(var(--yellow))` would arrive
 * as no colour at all; PALETTE below is the hand-kept copy of the tokens in
 * globals.css and has to be updated with them.
 */

const PALETTE = {
  page: "#E3DCCE", // --beige-1
  panel: "#FFFFFF", // the frosted band, resolved for mail
  well: "#F4F0E7", // a panel inset, standing in for the glass fill
  ink: "#111111", // --ink-1
  inkSoft: "#555555", // --ink-2
  inkFaint: "#8A8378", // --ink-3
  yellow: "#F6F23C", // --yellow
  rule: "rgba(17,17,17,0.10)", // --ink-a12, near enough
} as const;

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
            {/* The accent rail the site puts along the top of its cards. A
                filled table cell rather than a border, because Outlook drops
                coloured top borders on rounded boxes. */}
            <Section style={accentRail}>
              <Text style={accentRailInner}> </Text>
            </Section>

            <Section style={cardInner}>
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

              {/* Row/Column, not flexbox: `display:flex` is ignored by Outlook
                  and Gmail's desktop client, which stacked the mark above the
                  address instead of setting them side by side. */}
              <Row>
                <Column style={footerLogoCell}>
                  <Img
                    alt="Huzaifa Ahmed logo"
                    height="28"
                    src={CONTACT_LOGO_URL}
                    style={footerLogo}
                    width="28"
                  />
                </Column>
                <Column>
                  <Text style={footerText}>
                    Huzaifa Ahmed
                    <br />
                    Full-stack developer building scalable product systems.
                    <br />
                    {CONTACT_OWNER_EMAIL}
                  </Text>
                </Column>
              </Row>
            </Section>
          </Section>

          <Text style={outsideNote}>
            Sent from the contact form at 0xhuzaifa.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body: CSSProperties = {
  margin: 0,
  backgroundColor: PALETTE.page,
  padding: "32px 16px",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  color: PALETTE.inkSoft,
};

const container: CSSProperties = {
  margin: "0 auto",
  maxWidth: "620px",
};

const card: CSSProperties = {
  border: `1px solid ${PALETTE.rule}`,
  borderRadius: "24px",
  backgroundColor: PALETTE.panel,
  overflow: "hidden",
};

const accentRail: CSSProperties = {
  backgroundColor: PALETTE.yellow,
  lineHeight: "4px",
};

const accentRailInner: CSSProperties = {
  margin: 0,
  fontSize: "1px",
  lineHeight: "4px",
  height: "4px",
};

const cardInner: CSSProperties = {
  padding: "32px",
};

const brandLogo: CSSProperties = {
  marginBottom: "22px",
};

const eyebrowText: CSSProperties = {
  margin: "0 0 10px",
  color: PALETTE.inkFaint,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

const titleText: CSSProperties = {
  margin: "0 0 24px",
  color: PALETTE.ink,
  fontSize: "28px",
  lineHeight: "34px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
};

const content: CSSProperties = {
  color: PALETTE.inkSoft,
  fontSize: "15px",
  lineHeight: "26px",
};

const divider: CSSProperties = {
  margin: "28px 0 24px",
  borderColor: PALETTE.rule,
};

const footerLogoCell: CSSProperties = {
  width: "42px",
  verticalAlign: "top",
};

const footerLogo: CSSProperties = {
  display: "block",
  borderRadius: "8px",
};

const footerText: CSSProperties = {
  margin: 0,
  color: PALETTE.inkFaint,
  fontSize: "13px",
  lineHeight: "21px",
};

const outsideNote: CSSProperties = {
  margin: "18px 0 0",
  textAlign: "center",
  color: PALETTE.inkFaint,
  fontSize: "12px",
  lineHeight: "18px",
};

export { PALETTE };
