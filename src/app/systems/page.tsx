import type { Metadata } from "next";
import { SystemsPageContent } from "@/components/pages/SystemsPageContent";

export const metadata: Metadata = {
  title: "Project Gallery — Systems & Portfolio",
  description:
    "Browse my complete portfolio of full-stack projects and systems. Filter by category or type to explore CRM platforms, inventory systems, real-time communication tools, and content management platforms.",
  openGraph: {
    title: "Project Gallery — Systems & Portfolio",
    description:
      "Interactive gallery of full-stack projects with filtering by category and type. Explore production systems built with React, Node.js, and modern web technologies.",
    type: "website",
    url: "https://0xhuzaifa.com/systems",
  },
};

export default function SystemsPage() {
  return <SystemsPageContent />;
}
