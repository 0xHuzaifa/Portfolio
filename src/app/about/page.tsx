import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About - Full-Stack Developer",
  description:
    "Learn more about Huzaifa Ahmed, a full-stack developer focused on SaaS platforms, CRMs, internal tools, and custom business systems.",
  openGraph: {
    title: "About Huzaifa Ahmed",
    description:
      "Full-stack developer building business software with product thinking, strong architecture, and thoughtful delivery.",
    type: "profile",
    url: "https://0xhuzaifa.com/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
