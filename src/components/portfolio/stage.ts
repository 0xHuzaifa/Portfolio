/**
 * Every homepage section renders on ONE shared canvas so they all occupy
 * exactly one screen at exactly the same width — which is what lets each
 * section own a scroll-triggered animation without overlapping its neighbours.
 *
 * 1620x875 is the hero's canvas. It has to be the shared one: a taller canvas
 * would give the hero a larger `--s` than everything else, so it would render
 * wider than the rest and break the "same width" rule.
 *
 * `--s` contain-fits, so the stage never exceeds the viewport on either axis.
 * On screens that aren't ~16:9 this leaves a beige band above and below.
 * Below `lg` the canvas is abandoned entirely and sections flow/scroll.
 */
export const STAGE_W = 1620;
export const STAGE_H = 875;

export const stageStyle = { containerType: "inline-size" } as const;

export const scale = {
  ["--s" as string]: "min(calc(100cqw/1620),calc(100svh/875))",
};

/** Full-bleed, one screen tall, stage centred. */
export const sectionClass =
  "relative w-full overflow-hidden bg-[hsl(var(--beige-1))] text-[hsl(var(--ink-1))] lg:grid lg:h-svh lg:place-items-center";

/** The canvas itself: fixed 1620x875 design units on lg, plain flow below it. */
export const stageClass =
  "relative w-full px-6 py-16 md:px-8 lg:h-[calc(875*var(--s))] lg:w-[calc(1620*var(--s))] lg:px-0 lg:py-0";

/**
 * Half-height variant, used by the footer strip. Same `--s` as everything else
 * so the width still matches, but the stage is 437 tall instead of 875 and the
 * section sizes to it rather than to the viewport.
 */
export const halfSectionClass =
  "relative w-full overflow-hidden bg-[hsl(var(--beige-1))] text-[hsl(var(--ink-1))] lg:grid lg:place-items-center";

export const halfStageClass =
  "relative w-full px-6 py-12 md:px-8 lg:h-[calc(437*var(--s))] lg:w-[calc(1620*var(--s))] lg:px-0 lg:py-0";
