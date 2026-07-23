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

  // First project screenshot as social preview — shared links unfurl with the real system
  const ogImage = system.images?.[0];
  const images = ogImage
    ? [
        {
          url: typeof ogImage === "string" ? ogImage : ogImage.src,
          width: typeof ogImage === "string" ? 1200 : ogImage.width,
          height: typeof ogImage === "string" ? 630 : ogImage.height,
          alt: system.title,
        },
      ]
    : undefined;

  return {
    title: `${system.title} | Huzaifa Ahmed`,
    description: system.shortDescription,
    openGraph: {
      title: `${system.title} | Huzaifa Ahmed`,
      description: system.shortDescription,
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${system.title} | Huzaifa Ahmed`,
      description: system.shortDescription,
      images: images?.map((image) => image.url),
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
