"use client";

import { Brain, Cloud, Database, FileText, Users } from "lucide-react";
import {
  type CategoryMeta,
  categories,
  categoryCount,
  type ProjectCategory,
} from "@/data/projects";

/**
 * The five category cards: glass slabs stood upright on a glossy floor.
 *
 * The reference is a 3D scene, not a row of panels, and that is the whole
 * design. Each slab is tilted a little off-square under one shared perspective,
 * throws a pool of light onto the floor at its foot, and drops a contact shadow
 * where it meets it. The surface treatment lives in globals.css under
 * `.deck-slab` / `.deck-face`; the geometry lives here.
 *
 * Canvas geometry: the scene is anchored at 610,250 and runs 960x300. Slabs are
 * 180x300 before scale and step 190 apart — measured off the reference by
 * undoing the foreshortening (apparent width / cos 14°) and rescaling its crop
 * onto the 1620-unit canvas.
 *
 * Below `lg` the canvas is abandoned along with the scene: no floor, no pools,
 * no perspective — just five flat glass cards in a scroll-snap row.
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

/** Horizontal step between slabs, in canvas units. */
const SPACING = 190;

/** Scale lost per step into the deck, and what the lit slab gains back. */
const FALLOFF = 0.05;
const ACTIVE_LIFT = 0.09;

/**
 * Per-card drift, so five slabs never breathe in lockstep. Fixed values rather
 * than random ones, so the deck looks identical on every visit and survives a
 * resize unchanged — the same reasoning as the Capabilities pile's TILT.
 *
 * The negative delays start each card mid-cycle: without them all five would
 * begin at the bottom of the stroke together and the offsets would take a full
 * period to separate.
 */
const DRIFT = [
  { dur: "5s", delay: "0s", tilt: "1deg" },
  { dur: "5.6s", delay: "-1.2s", tilt: "-1deg" },
  { dur: "4.6s", delay: "-0.6s", tilt: "0.8deg" },
  { dur: "6s", delay: "-1.8s", tilt: "-0.9deg" },
  { dur: "5.2s", delay: "-0.3s", tilt: "1.1deg" },
] as const;

export function CategoryDeck({
  active,
  onSelect,
}: {
  active: ProjectCategory | null;
  onSelect: (category: ProjectCategory) => void;
}) {
  return (
    <>
      {/* The hairline the deck stands on. Behind the slabs and visibly THROUGH
          them — the glass is kept thin enough to read it, which is one of the
          cues that sells the material. */}
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

      {/* The floor. Wider than the deck so the plane runs past the outermost
          slabs rather than ending under them. */}
      <div
        aria-hidden="true"
        className="deck-floor ph-floor hidden lg:block lg:left-[calc(470*var(--s))] lg:top-[calc(470*var(--s))] lg:z-[1] lg:h-[calc(250*var(--s))] lg:w-[calc(1150*var(--s))]"
      />

      <div className="ph-deck -mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:-mx-8 md:px-8 lg:absolute lg:left-[calc(610*var(--s))] lg:top-[calc(250*var(--s))] lg:z-[2] lg:mx-0 lg:mt-0 lg:block lg:h-[calc(300*var(--s))] lg:w-[calc(960*var(--s))] lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 lg:[perspective-origin:50%_14%] lg:[perspective:calc(1400*var(--s))] lg:[transform-style:preserve-3d]">
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
  const drift = DRIFT[index];

  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-pressed={active}
      aria-label={`${category.label} — ${count} project${count === 1 ? "" : "s"}`}
      style={{
        // Per-card values only; every class below is a literal so Tailwind can
        // actually see it. These are inert on the mobile path, where the slab
        // is a flow item and `transform` is never applied.
        ["--card-x" as string]: `calc(${index * SPACING}*var(--s))`,
        ["--card-scale" as string]:
          1 - index * FALLOFF + (active ? ACTIVE_LIFT : 0),
        ["--in-delay" as string]: `${index * 0.1}s`,
        ["--float-dur" as string]: drift.dur,
        ["--float-delay" as string]: drift.delay,
        ["--float-tilt" as string]: drift.tilt,
        zIndex: active ? 20 : 10 - index,
      }}
      className={`ph-deck-card deck-slab w-[160px] flex-none snap-start rounded-[22px] text-center lg:absolute lg:left-[var(--card-x)] lg:top-0 lg:h-[calc(300*var(--s))] lg:w-[calc(180*var(--s))] lg:rounded-[calc(24*var(--s))] lg:[transform-origin:50%_50%] lg:[transform:translate(calc(var(--px,0)*3px),calc(var(--py,0)*3px))_rotateY(-14deg)_scale(var(--card-scale))] ${
        active ? "is-active" : ""
      }`}
    >
      {/* The glass face carries the surface; the inner class carries every
          transform that moves on its own — arrival, drift, hover lift —
          leaving the slab free for 3D placement and pointer parallax. */}
      <span className="deck-face glass-card-inner flex h-full w-full flex-col items-center justify-center px-4 py-10 lg:px-0 lg:py-0">
        <Icon
          className="h-[32px] w-[32px] text-[hsl(var(--ink-1))] lg:h-[calc(34*var(--s))] lg:w-[calc(34*var(--s))]"
          strokeWidth={1.7}
          aria-hidden="true"
        />
        <span className="mt-4 block text-[21px] font-extrabold tracking-[-0.02em] lg:mt-[calc(22*var(--s))] lg:text-[calc(23*var(--s))]">
          {category.label}
        </span>
        <span className="mt-1.5 block whitespace-nowrap text-[12px] text-[hsl(var(--ink-3))] lg:mt-[calc(9*var(--s))] lg:text-[calc(12*var(--s))]">
          {count} Project{count === 1 ? "" : "s"}
        </span>
      </span>
    </button>
  );
}
