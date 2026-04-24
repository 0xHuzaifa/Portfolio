import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services - SaaS, CRM and Internal Tools",
  description:
    "Explore the services offered by Huzaifa Ahmed, including SaaS platform development, CRM systems, internal tools, and custom business software.",
  openGraph: {
    title: "Services by Huzaifa Ahmed",
    description:
      "SaaS platforms, CRM systems, internal tools, and custom business software built with full-stack product thinking.",
    type: "website",
    url: "https://0xhuzaifa.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
