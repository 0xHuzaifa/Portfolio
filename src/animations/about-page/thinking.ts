import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * /about section 07 — How I think, where I'm going. Pinned.
 *
 * The statement is spoken a line at a time. Its four lines are a setup and a
 * turn — "most developers build for the ticket in front of them" / "I build for
 * the system that ticket belongs to" — so there is a real gap on the timeline
 * between the second line and the third. That silence is the rhetorical move;
 * a uniform stagger across all four would flatten it into a wipe.
 *
 * The two supporting columns arrive together afterwards, because neither is
 * more important than the other and sequencing them would imply otherwise.
 */

const PHASE = {
  /** The oversized opening mark. */
  mark: 0,
  /** "Most developers build for / the ticket in front of them." */
  setup: 12,
  /** The turn, after the silence. */
  turn: 40,
  /** Chess and the ownership goal, side by side. */
  columns: 66,
  /** The statement is left alone to be read. */
  hold: 86,
  end: 96,
} as const;

const SCROLL_LENGTH = "+=430%";

/** Gap between the two lines within a clause. */
const LINE_STEP = 9;

const EASE = "power3.out";
const RISE_EASE = "power4.out";
const DRAW_EASE = "power2.inOut";

export function aboutThinkingSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      const mark = q(".at-mark");
      const lines = q(".at-line");
      const columns = q(".at-col");
      const colRule = q(".at-col-rule");

      // Four lines is what the phase table is written for: two of setup, two of
      // turn, with a deliberate silence between them.
      if (lines.length !== 4) return;

      gsap.set([...mark, ...lines, ...columns], { autoAlpha: 0 });
      gsap.set(colRule, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: EASE },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: SCROLL_LENGTH,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── The mark ───────────────────────────────────────────────────────
      //
      // A handwritten glyph, so it settles out of a small counter-rotation the
      // way a pen lands rather than fading up.
      tl.fromTo(
        mark,
        { scale: 0.8, rotation: -6, transformOrigin: "20% 80%" },
        { scale: 1, rotation: 0, autoAlpha: 1, duration: 14 },
        PHASE.mark,
      );

      // ── The setup, the silence, the turn ───────────────────────────────
      //
      // Two separate tweens rather than one four-line stagger. A single stagger
      // cannot hold the gap between the clauses — and the gap is the line.
      tl.fromTo(
        lines.slice(0, 2),
        { y: 26 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 12,
          stagger: LINE_STEP,
          ease: RISE_EASE,
        },
        PHASE.setup,
      );

      tl.fromTo(
        lines.slice(2),
        { y: 26 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 12,
          stagger: LINE_STEP,
          ease: RISE_EASE,
        },
        PHASE.turn,
      );

      // ── The two columns ────────────────────────────────────────────────
      tl.fromTo(
        columns,
        { y: 18 },
        { y: 0, autoAlpha: 1, duration: 12 },
        PHASE.columns,
      );

      tl.to(
        colRule,
        { scaleX: 1, duration: 9, ease: DRAW_EASE },
        PHASE.columns + 3,
      );

      // ── Hold ───────────────────────────────────────────────────────────
      //
      // The longest still moment on the page, and the point of the section.
      tl.to({}, { duration: PHASE.end - PHASE.hold }, PHASE.hold);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
  );

  return () => mm.revert();
}
