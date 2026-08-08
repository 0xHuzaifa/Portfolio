"use client";

import { Brain, Cloud, Database, FileText, Users } from "lucide-react";
import {
  type CategoryMeta,
  categories,
  categoryCount,
  type ProjectCategory,
} from "@/data/projects";

/**
 * The five category cards, stood up on one perspective scene and receding to
 * the right.
 *
 * Every card sits centred on the same horizontal line and differs only in
 * scale, which is what makes the recession read as depth rather than as five
 * cards of arbitrary sizes — the reference converges the same way. The tilt is
 * a single `rotateY` under a shared `perspective`, so the left faces catch the
 * light consistently across the deck.
 *
 * Geometry on the canvas: the scene is anchored at 610,400 — 400 being the
 * deck's centre line — and each card is pushed 190 further right and rendered a
 * little smaller. Cards are 186x330 before scale, which is the reference's
 * proportion: tall and narrow, not square. Measured back off the reference by
 * undoing the foreshortening (apparent width ÷ cos 24°).
 *
 * These are buttons, not decoration: each one filters the grid below.
 */

const icons: Record<ProjectCategory, typeof Cloud> = {
  SaaS: Cloud,
  CRM: Users,
  AI: Brain,
  CMS: FileText,
  IMS: Database,
};

/** Horizontal step between cards, in canvas units. */
const SPACING = 190;

/** Scale lost per step into the deck, and what the lit card gains back. */
const FALLOFF = 0.0425;
const ACTIVE_LIFT = 0.1;

export function CategoryDeck({
  active,
  onSelect,
}: {
  active: ProjectCategory | null;
  onSelect: (category: ProjectCategory) => void;
}) {
  return (
    <>
      {/* The hairline the deck stands on. Behind the cards, lit at both ends —
          it ties the headline column to the deck across the composition's gap. */}
      <div
        aria-hidden="true"
        className="ph-wire pointer-events-none absolute hidden lg:block lg:left-[calc(555*var(--s))] lg:top-[calc(471*var(--s))] lg:z-[1] lg:h-px lg:w-[calc(1027*var(--s))] lg:bg-[rgba(17,17,17,0.14)]"
      />
      <span
        aria-hidden="true"
        className="ph-wire pointer-events-none absolute hidden rounded-full bg-[hsl(var(--yellow))] shadow-[0_0_12px_3px_rgba(246,242,60,0.6)] lg:block lg:left-[calc(550.5*var(--s))] lg:top-[calc(466.5*var(--s))] lg:z-[1] lg:h-[calc(9*var(--s))] lg:w-[calc(9*var(--s))]"
      />
      <span
        aria-hidden="true"
        className="ph-wire pointer-events-none absolute hidden rounded-full bg-[hsl(var(--yellow))] shadow-[0_0_12px_3px_rgba(246,242,60,0.6)] lg:block lg:left-[calc(1577.5*var(--s))] lg:top-[calc(466.5*var(--s))] lg:z-[1] lg:h-[calc(9*var(--s))] lg:w-[calc(9*var(--s))]"
      />

      {/* Below lg the perspective scene is abandoned along with the canvas: the
          same cards become a scroll-snap row, upright and full size. */}
      <div className="ph-deck -mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:-mx-8 md:px-8 lg:absolute lg:left-[calc(610*var(--s))] lg:top-[calc(400*var(--s))] lg:z-[2] lg:mx-0 lg:mt-0 lg:block lg:h-0 lg:w-[calc(960*var(--s))] lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 lg:[perspective-origin:70%_50%] lg:[perspective:calc(1600*var(--s))]">
        {categories.map((category, i) => (
          <DeckCard
            key={category.id}
            category={category}
            index={i}
            active={active === category.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </>
  );
}

function DeckCard({
  category,
  index,
  active,
  onSelect,
}: {
  category: CategoryMeta;
  index: number;
  active: boolean;
  onSelect: (category: ProjectCategory) => void;
}) {
  const Icon = icons[category.id];
  const count = categoryCount(category);

  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-pressed={active}
      aria-label={`${category.label} — ${count} project${count === 1 ? "" : "s"}`}
      style={{
        // Per-card values only; every class below is a literal so Tailwind can
        // actually see it. These are inert on the mobile path, where the card
        // is a flow item and `transform` is never applied.
        ["--card-x" as string]: `calc(${index * SPACING}*var(--s))`,
        ["--card-scale" as string]:
          1 - index * FALLOFF + (active ? ACTIVE_LIFT : 0),
        zIndex: active ? 20 : 10 - index,
      }}
      className={`ph-deck-card relative flex w-[160px] flex-none snap-start flex-col items-center justify-center rounded-[22px] px-4 py-10 text-center backdrop-blur-[16px] transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease)] [transform:translateZ(0)] lg:absolute lg:left-[var(--card-x)] lg:top-0 lg:h-[calc(330*var(--s))] lg:w-[calc(186*var(--s))] lg:rounded-[calc(26*var(--s))] lg:px-0 lg:py-0 lg:[transform-origin:50%_50%] lg:[transform:translate(0,-50%)_rotateY(-24deg)_scale(var(--card-scale))] ${
        active
          ? "border border-[hsl(var(--yellow))] bg-[rgba(246,242,60,0.2)] shadow-[0_22px_60px_rgba(246,242,60,0.5)]"
          : "border border-[var(--glass-border)] bg-[var(--glass-fill-strong)] shadow-[var(--shadow)] hover:bg-[rgba(255,255,255,0.72)]"
      }`}
    >
      <Icon
        className="h-[32px] w-[32px] text-[hsl(var(--ink-1))] lg:h-[calc(38*var(--s))] lg:w-[calc(38*var(--s))]"
        strokeWidth={1.7}
        aria-hidden="true"
      />
      <span className="mt-4 block text-[21px] font-extrabold tracking-[-0.02em] lg:mt-[calc(26*var(--s))] lg:text-[calc(25*var(--s))]">
        {category.label}
      </span>
      <span className="mt-1.5 block whitespace-nowrap text-[12px] text-[hsl(var(--ink-3))] lg:mt-[calc(10*var(--s))] lg:text-[calc(13*var(--s))]">
        {count} Project{count === 1 ? "" : "s"}
      </span>
    </button>
  );
}
