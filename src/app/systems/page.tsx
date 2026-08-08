import type { Metadata } from "next";
import { SystemsPageContent } from "@/components/pages/SystemsPageContent";

export const metadata: Metadata = {
  title: "Projects — Systems That Create Impact",
  description:
    "A curated collection of digital products, platforms and systems built to solve real business problems. Filter by category to explore CRM platforms, inventory systems, real-time communication tools, and content management platforms.",
  openGraph: {
    title: "Projects — Systems That Create Impact",
    description:
      "Full-stack projects and platforms, filterable by category. Production systems built with React, Node.js, and modern web technologies.",
    type: "website",
    url: "https://0xhuzaifa.com/systems",
  },
};

export default function SystemsPage() {
  return <SystemsPageContent />;
}
