import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SystemPageContent } from "@/components/pages/SystemPageContent";
import { systems } from "@/data/systems";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const system = systems.find((item) => item.slug === slug);

  if (!system) {
    return {
      title: "System Not Found | Huzaifa Ahmed",
    };
  }

  return {
    title: `${system.title} | Huzaifa Ahmed`,
    description: system.shortDescription,
    openGraph: {
      title: `${system.title} | Huzaifa Ahmed`,
      description: system.shortDescription,
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return systems.map((system) => ({
    slug: system.slug,
  }));
}

export default async function SystemPage({ params }: Props) {
  const { slug } = await params;
  const system = systems.find((item) => item.slug === slug);

  if (!system) return notFound();

  return <SystemPageContent system={system} />;
}
