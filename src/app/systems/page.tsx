import type { Metadata } from "next";
import { SystemsPageContent } from "@/components/pages/SystemsPageContent";

export const metadata: Metadata = {
  title: "Systems — Full-Stack Projects & Platform Work",
  description:
    "Explore my portfolio of full-stack systems: CRM platforms, inventory tools, real-time communication, and content management systems. Built with React, Node.js, and modern web technologies.",
  openGraph: {
    title: "Systems — Full-Stack Projects & Platform Work",
    description:
      "A collection of production systems including CRMs, inventory platforms, real-time chat, and content management tools.",
    type: "website",
    url: "https://0xhuzaifa.com/systems",
  },
};

export default function SystemsPage() {
  return <SystemsPageContent />;
}
