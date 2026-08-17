"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  type ProjectEntry,
  projects,
  projectsDelivered,
} from "@/data/projects";

/**
 * The hero's right side: the work as a deck of cards, fanned back over a ghost
 * grid, one of them face-on.
 *
 * Ported from the Figma showcase. The geometry is the design's: cards step 14px
 * right and 7px up as they recede, each turned another -3.5°, each a little
 * smaller, and the inactive faces drop to a quarter opacity so the front card
 * is the only one being read. Clicking a card behind brings it forward;
 * clicking the front one opens its case study.
 *
 * Depth is drawn back-to-front in the DOM so the paint order matches the stack
 * without a z-index fight, which is also why the list is reversed rather than
 * indexed backwards at render time.
 */

/** How many of the projects the deck carries. Three is the design's count, and
 *  past four the rotation runs the back card off the canvas. */
const DEPTH = 3;

/**
 * Step between cards as they recede, in canvas units.
 *
 * Mostly upward, and far further than the source design's 14px. At that step a
 * card behind showed a 14px sliver of frosted glass — no title, no category,
 * nothing to tell one from another or to suggest clicking it. Lifting each card
 * 62 units clears its own header band, so every card in the deck shows its
 * number, its category and its title, and the stack reads as three projects
 * rather than one project and two shadows.
 */
const STEP_X = 22;
const STEP_Y = 62;
const TURN = -2.4;

/** How long each card holds the front before the deck turns itself, in ms. */
const DWELL = 4200;

export function ProjectDeck() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  const deck = projects.slice(0, DEPTH);
  const count = deck.length;

  // The deck deals itself. It stops the moment a visitor takes hold of it —
  // pointer over the stack or keyboard focus inside it — because a card
  // rotating away from under the cursor is the surest way to make someone
  // click the wrong project.
  useEffect(() => {
    if (held || count < 2) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const turn = window.setInterval(
      () => setActive((current) => (current + 1) % count),
      DWELL,
    );

    return () => window.clearInterval(turn);
  }, [held, count]);

  if (count === 0) return null;

  return (
    <div
      className="pd-stage relative mt-12 flex w-full items-center justify-center lg:absolute lg:left-[calc(760*var(--s))] lg:top-[calc(150*var(--s))] lg:z-[2] lg:mt-0 lg:h-[calc(560*var(--s))] lg:w-[calc(816*var(--s))]"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      {/* Ghost grid. The only ruled surface on the page, and it reads as the
          board the cards are laid on rather than as decoration. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-[0.15] lg:block"
      >
        <title>Grid</title>
        <defs>
          <pattern
            id="pd-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="hsl(var(--ink-1))"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pd-grid)" />
      </svg>

      {/* The count, outlined rather than filled: a number this size in solid
          ink would outweigh the headline it sits across from. */}
      <span
        aria-hidden="true"
        className="pd-ghost-count pointer-events-none absolute bottom-[6%] right-[4%] hidden select-none text-[calc(150*var(--s))] font-extrabold leading-none tracking-[-0.05em] text-transparent lg:block"
      >
        {projectsDelivered.value}
      </span>

      {/* Card stack. Pushed down by half the fan's total lift so the group
          stays centred in the stage rather than riding up out of it. */}
      <div className="relative mt-[124px] h-[430px] w-[320px] lg:mt-[calc(124*var(--s))] lg:h-[calc(430*var(--s))] lg:w-[calc(360*var(--s))]">
        {deck.map((project, index) => {
          // Depth is distance from the selected card, wrapping round, so the
          // active one is always at the front of the fan and the rest queue
          // behind it in order. The source design derived depth from the array
          // position instead, which put the last project on top and left the
          // selected card buried at the back of its own stack.
          const depth = (index - active + deck.length) % deck.length;

          return (
            <DeckCard
              key={project.id}
              project={project}
              index={index}
              depth={depth}
              isActive={depth === 0}
              onSelect={() => setActive(index)}
            />
          );
        })}
      </div>

      {/* Dot pagination. The active dot stretches rather than just recolouring,
          so position is readable without relying on the accent alone. */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-[7px] lg:bottom-[6%]">
        {deck.map((project, i) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${project.title}`}
            aria-pressed={i === active}
            className={`h-[6px] rounded-full transition-[width,background-color] duration-[350ms] ease-[var(--ease)] ${
              i === active
                ? "w-[20px] bg-[hsl(var(--yellow))]"
                : "w-[6px] bg-[var(--ink-a20,rgba(17,17,17,0.18))]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DeckCard({
  project,
  index,
  depth,
  isActive,
  onSelect,
}: {
  project: ProjectEntry;
  index: number;
  depth: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const href = project.caseStudySlug
    ? `/systems/${project.caseStudySlug}`
    : project.liveUrl;

  const scale = isActive ? 1 : 0.97 - depth * 0.02;

  const face = (
    <>
      {/* Accent rail along the top edge. */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[3px] rounded-t-[20px] bg-[hsl(var(--yellow))] transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-50"
        }`}
      />

      {/* Cards behind the front one are dimmed, not erased. The old quarter
          opacity took the title with it, so the deck offered two blanks and no
          reason to click either. This holds every card readable and lets
          position, scale and surface carry the hierarchy instead. */}
      <span
        className={`flex h-full flex-col p-[28px] pb-[24px] transition-opacity duration-[400ms] ease-[var(--ease)] ${
          isActive ? "opacity-100" : depth === 1 ? "opacity-80" : "opacity-65"
        }`}
      >
        <span className="mb-[20px] flex items-center justify-between">
          <span className="font-data text-[11px] font-semibold tracking-[0.14em] text-[hsl(var(--ink-1))]/30">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-[var(--ink-a08)] bg-[var(--ink-a04)] px-[10px] py-[3px] font-data text-[10px] font-semibold uppercase tracking-[0.12em] text-[hsl(var(--ink-1))]/45">
            {project.categories[0]}
          </span>
        </span>

        <span className="mb-[12px] block text-[24px] font-extrabold leading-[1.1] tracking-[-0.025em] lg:text-[26px]">
          {project.title}
        </span>

        {/* What the thing actually is. The source card had a completion meter
            in this band and nothing else; with no honest figure to put there,
            the card was mostly empty space. The description is real copy the
            project already carries. */}
        <span className="line-clamp-3 block text-[13px] leading-[1.6] text-[hsl(var(--ink-2))]">
          {project.description}
        </span>

        {/* The design's completion meter. Rendered only for a project that
            actually carries a figure — a progress bar is a claim, and one
            invented to fill a slot is the kind that gets asked about in a
            call. Set `progress` in projects.ts to turn it on. */}
        {typeof project.progress === "number" && (
          <span className="block">
            <span className="mb-[6px] flex justify-between">
              <span className="font-data text-[10px] font-medium tracking-[0.1em] text-[hsl(var(--ink-1))]/40">
                COMPLETION
              </span>
              <span className="text-[10px] font-bold">{project.progress}%</span>
            </span>
            <span className="block h-[4px] overflow-hidden rounded-full bg-[hsl(var(--ink-1))]/[0.07]">
              <span
                className="block h-full rounded-full bg-[linear-gradient(90deg,hsl(var(--yellow)),hsl(var(--yellow-deep)))] transition-[width] duration-[800ms] ease-[var(--ease)]"
                style={{ width: `${project.progress}%` }}
              />
            </span>
          </span>
        )}

        <span className="mt-auto flex flex-wrap gap-[6px] pt-[20px]">
          {project.categories.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--ink-a08)] bg-[var(--ink-a04)] px-[9px] py-[3px] font-data text-[10px] font-medium tracking-[0.08em] text-[hsl(var(--ink-1))]/50"
            >
              {tag}
            </span>
          ))}
        </span>

        <span className="mt-[18px] flex items-center justify-between border-t border-[hsl(var(--ink-1))]/[0.07] pt-[16px]">
          <span className="text-[11px] font-medium tracking-[0.06em] text-[hsl(var(--ink-1))]/35">
            {project.year ?? (project.caseStudySlug ? "Case study" : "Live")}
          </span>
          <span
            className={`flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[hsl(var(--yellow))] transition-transform duration-300 ease-[var(--ease)] ${
              isActive ? "group-hover:translate-x-[3px]" : ""
            }`}
          >
            <ArrowRight
              className="h-[15px] w-[15px]"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </span>
        </span>
      </span>
    </>
  );

  const shell = `pd-card group absolute inset-0 overflow-hidden rounded-[20px] text-left ${
    isActive ? "is-active" : ""
  }`;

  // Canvas units, so the fan holds its proportions at any viewport — a fixed
  // pixel step would bury the back cards on a large screen and scatter them on
  // a small one.
  const style = {
    // `--s` only exists on the canvas; below `lg` the fallback makes the step
    // plain pixels, which is the right size there anyway.
    transform: `translate(calc(${depth * STEP_X} * var(--s, 1px)), calc(${
      depth * -STEP_Y
    } * var(--s, 1px))) rotate(${depth * TURN}deg) scale(${scale})`,
    // Nearest the reader wins, whatever its position in the list.
    zIndex: 10 - depth,
  } as const;

  // The front card is a destination; the ones behind it are a control that
  // brings the next one forward. Same box, two different jobs, so two different
  // elements — a link that does not navigate would be a lie to the keyboard.
  return isActive && href ? (
    <Link href={href} className={shell} style={style}>
      {face}
    </Link>
  ) : (
    <button type="button" onClick={onSelect} className={shell} style={style}>
      {face}
    </button>
  );
}
