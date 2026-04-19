import type { Metadata } from "next";
import { HowIBuildSystemsPageContent } from "@/components/pages/HowIBuildSystemsPageContent";

export const metadata: Metadata = {
  title: "How I Build Systems — Process & Approach",
  description:
    "How Huzaifa Ahmed approaches system development — discovery and framing, architecture design, delivery rhythm, and iteration. Business-first thinking with production-ready engineering.",
  openGraph: {
    title: "How I Build Systems — Huzaifa Ahmed",
    description:
      "A structured approach to building systems that work for the business, the team, and the codebase.",
    type: "website",
    url: "https://0xhuzaifa.com/how-i-build-systems",
  },
};

export default function HowIBuildSystemsPage() {
  return <HowIBuildSystemsPageContent />;
}
