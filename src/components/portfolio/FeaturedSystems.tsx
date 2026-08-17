import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  MessageSquare,
  Package,
  Sparkles,
  Users,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
// Import images
import articlePlatformMain from "@/assets/article-platform/main.png";
import chatSystemMain from "@/assets/chat-system/main.png";
import crmSystemMain from "@/assets/crm-system/main.png";
import inventorySystemMain from "@/assets/inventory-system/main.png";
import { AppLink } from "@/components/navigation/AppLink";
import { systems } from "@/data/systems";
import { TechChip } from "@/lib/techIcons";

const typeStyles = {
  "Personal Project":
    "border-[hsl(var(--primary))]/35 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]",
  "Professional Experience":
    "border-[hsl(var(--state-success))]/35 bg-[hsl(var(--state-success))]/10 text-[hsl(var(--state-success))]",
} as const;

const imageMap: Record<string, StaticImageData> = {
  "article-platform": articlePlatformMain,
  "crm-system": crmSystemMain,
  "inventory-system": inventorySystemMain,
  "realtime-communication": chatSystemMain,
};

const spotlightGradient = {
  "Personal Project":
    "radial-gradient(circle at top right,hsla(227,68%,55%,0.13),transparent 40%)",
  "Professional Experience":
    "radial-gradient(circle at top right,hsla(152,51%,45%,0.11),transparent 40%)",
} as const;

const systemIcons: Record<string, React.ReactNode> = {
  "article-platform": <FileText className="h-5 w-5" />,
  "crm-system": <Users className="h-5 w-5" />,
  "inventory-system": <Package className="h-5 w-5" />,
  "realtime-communication": <MessageSquare className="h-5 w-5" />,
};

export default function FeaturedSystems() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {systems.map((system, index) => (
        <AppLink
          key={system.slug}
          href={`/systems/${system.slug}`}
          tabTitle={`${system.title.split(" ").slice(0, 4).join(" ")}...tsx`}
          className="group relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[hsl(var(--primary))]/20 hover:shadow-lg hover:shadow-black/20"
        >
          {/* Hover spotlight */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ backgroundImage: spotlightGradient[system.type] }}
          />

          <div className="relative flex h-full flex-col gap-4">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--muted-foreground))]">
                    System {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-1.5 text-lg font-bold leading-snug text-[hsl(var(--foreground))]">
                  {system.title}
                </h3>
              </div>

              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 text-[hsl(var(--primary))]">
                {systemIcons[system.slug] ?? <Package className="h-5 w-5" />}
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-3 py-0.5 text-xs font-medium ${typeStyles[system.type]}`}
              >
                {system.type}
              </span>
              <span className="rounded-full border border-[hsl(var(--border))] px-3 py-0.5 text-xs text-[hsl(var(--muted-foreground))]">
                {system.category}
              </span>
            </div>

            {/* Short description */}
            <p className="text-sm leading-[1.75] text-[hsl(var(--muted-foreground))]">
              {system.shortDescription}
            </p>

            {/* Main image */}
            {imageMap[system.slug] && (
              <div className="relative overflow-hidden rounded-lg bg-[hsl(var(--background))]/60 aspect-video border border-[hsl(var(--border))]">
                <Image
                  src={imageMap[system.slug]}
                  alt={system.title}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            {/* Highlights */}
            {system.highlights && system.highlights.length > 0 && (
              <ul className="space-y-1.5">
                {system.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-xs text-[hsl(var(--muted-foreground))]"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--state-success))]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech chips with icons */}
            <div className="flex flex-wrap gap-1.5">
              {system.technologies.slice(0, 5).map((tech) => (
                <TechChip key={tech} name={tech} size="sm" />
              ))}
              {system.technologies.length > 5 && (
                <span className="inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
                  +{system.technologies.length - 5} more
                </span>
              )}
            </div>

            {/* Footer CTA */}
            <div className="mt-auto flex items-center justify-between border-t border-[hsl(var(--border))]/60 pt-3 text-sm">
              <span className="inline-flex items-center gap-2 text-[hsl(var(--primary))]">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Open system</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[hsl(var(--foreground))]" />
            </div>
          </div>
        </AppLink>
      ))}
    </div>
  );
}
