import type { Metadata } from "next";
import { ExperiencePageContent } from "@/components/pages/ExperiencePageContent";

export const metadata: Metadata = {
  title: "Experience — Full-Stack Developer",
  description:
    "Professional experience of Huzaifa Ahmed — full-stack developer at Solvevare, MERN stack developer at ICreativez Technologies, and blockchain research intern at HBL. Production SaaS and business systems.",
  openGraph: {
    title: "Experience — Huzaifa Ahmed",
    description:
      "Full-stack developer with hands-on experience shipping production CRMs, inventory systems, and SaaS platforms for real clients.",
    type: "profile",
    url: "https://0xhuzaifa.com/experience",
  },
};

export default function ExperiencePage() {
  return <ExperiencePageContent />;
}
