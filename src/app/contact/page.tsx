import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description:
    "Get in touch with Huzaifa Ahmed to discuss your SaaS platform, CRM, internal tool, or custom business system. Describe what you're building and get a response within 24 hours.",
  openGraph: {
    title: "Contact Huzaifa Ahmed — Start a Project",
    description:
      "Describe your system — the workflow, the users, the problem. Get a clear response within 24 hours.",
    type: "website",
    url: "https://0xhuzaifa.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
