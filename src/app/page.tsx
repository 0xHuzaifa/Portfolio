import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/HomePageContent";

export const metadata: Metadata = {
  title: "Full-Stack Developer — SaaS, CRMs & Internal Tools",
  description:
    "Huzaifa Ahmed — full-stack developer building business software that teams actually use. SaaS platforms, CRM systems, inventory tools, and internal dashboards. React, Next.js, Node.js.",
  openGraph: {
    title: "Huzaifa Ahmed — Full-Stack Developer",
    description:
      "Building business software that teams actually use. SaaS platforms, CRMs, and internal tools.",
    type: "website",
    url: "https://0xhuzaifa.com",
  },
};

export default function HomePage() {
  return <HomePageContent />;
}
