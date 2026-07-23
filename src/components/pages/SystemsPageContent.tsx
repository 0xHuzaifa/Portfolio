"use client";

import { ArrowRight, Filter, Package, Sparkles, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
// Import images
import articlePlatformMain from "@/assets/article-platform/main.png";
import chatSystemMain from "@/assets/chat-system/main.png";
import crmSystemMain from "@/assets/crm-system/main.png";
import inventorySystemMain from "@/assets/inventory-system/main.png";
import { RevealContainer } from "@/components/motion/RevealContainer";
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
  "article-platform": <Package className="h-5 w-5" />,
  "crm-system": <Package className="h-5 w-5" />,
  "inventory-system": <Package className="h-5 w-5" />,
  "realtime-communication": <Package className="h-5 w-5" />,
};

// Get unique categories and types for filtering
const categories = Array.from(new Set(systems.map((s) => s.category)));
const types = Array.from(new Set(systems.map((s) => s.type)));

export function SystemsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredSystems = systems.filter((system) => {
    if (selectedCategory && system.category !== selectedCategory) return false;
    if (selectedType && system.type !== selectedType) return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedType(null);
  };

  const hasActiveFilters = selectedCategory || selectedType;

  return (
    <RevealContainer className="mx-auto w-full max-w-6xl space-y-6 px-4 py-16 md:px-6">
      {/* Header */}
      <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--muted-foreground))]">
              Project Gallery
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[hsl(var(--foreground))]">
              Systems & Projects
            </h1>
            <p className="mt-2 text-sm leading-[1.75] text-[hsl(var(--muted-foreground))]">
              Explore my portfolio of full-stack systems and platforms
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <span>{filteredSystems.length}</span>
            <span>project{filteredSystems.length !== 1 ? "s" : ""}</span>
            {hasActiveFilters && (
              <span className="text-[hsl(var(--primary))]">• filtered</span>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
              Filters:
            </span>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category,
                  )
                }
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                    : "border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]/30 hover:text-[hsl(var(--foreground))]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                type="button"
                key={type}
                onClick={() =>
                  setSelectedType(selectedType === type ? null : type)
                }
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  selectedType === type
                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                    : "border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]/30 hover:text-[hsl(var(--foreground))]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 px-3 py-1 text-xs font-medium text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--accent-warm))]/30 hover:text-[hsl(var(--accent-warm))]"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Systems Grid */}
      {filteredSystems.length > 0 ? (
        <section className="grid gap-4 lg:grid-cols-2">
          {filteredSystems.map((system, index) => (
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
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-lg font-bold leading-snug text-[hsl(var(--foreground))]">
                      {system.title}
                    </h3>
                  </div>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 text-[hsl(var(--primary))]">
                    {systemIcons[system.slug] ?? (
                      <Package className="h-5 w-5" />
                    )}
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
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {system.technologies.slice(0, 4).map((tech) => (
                    <TechChip key={tech} name={tech} size="sm" />
                  ))}
                  {system.technologies.length > 4 && (
                    <span className="inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
                      +{system.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Footer CTA */}
                <div className="mt-auto flex items-center justify-between border-t border-[hsl(var(--border))]/60 pt-3 text-sm">
                  <span className="inline-flex items-center gap-2 text-[hsl(var(--primary))]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">View details</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[hsl(var(--foreground))]" />
                </div>
              </div>
            </AppLink>
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-12 text-center">
          <p className="text-[hsl(var(--muted-foreground))]">
            No projects found matching your filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-2xl border border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 px-4 py-2 text-sm font-medium text-[hsl(var(--primary))] transition-colors hover:bg-[hsl(var(--primary))]/20"
          >
            Clear filters
          </button>
        </section>
      )}
    </RevealContainer>
  );
}
