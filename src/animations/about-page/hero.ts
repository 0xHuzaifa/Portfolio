import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * /about section 01 — Who I am. Pinned.
 *
 * The plate arrives first and alone, sliding in from off the canvas edge it is
 * cropped against, and the portrait rides up inside it. Nothing about the
 * person fades: on this page he arrives by moving, the same way he does in the
 * homepage About section, because a portrait that dissolves into view reads as
 * an effect rather than as someone entering.
 *
 * Then the writing lands on top of an already-present plate — heading, ruled
 * line, paragraph — and the three credentials tick in last.
 *
 * Not to be confused with `src/animations/about.ts`, which belongs to the
 * homepage's About section.
 */

/** Phase starts on the timeline. Retune pacing here. */
const PHASE = {
  /** The plate slides in from the edge. */
  plate: 0,
  /** He rides up inside it. */
  portrait: 10,
  /** Eyebrow and headline. */
  head: 26,
  /** The rule under the headline draws. */
  rule: 46,
  /** The origin paragraph. */
  lead: 52,
  /** The three credentials. */
  facts: 62,
  /** The composition sits complete. */
  hold: 82,
  end: 90,
} as const;

const SCROLL_LENGTH = "+=420%";

const EASE = "power3.out";
const RISE_EASE = "power4.out";
const DRAW_EASE = "power2.inOut";

export function aboutHeroSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      const ghost = q(".ah-ghost");
      const plate = q(".ah-plate");
      const portrait = q(".ah-portrait");
      const heads = q(".ah-head");
      const lead = q(".ah-lead");
      const rule = q(".ah-head-rule");
      const facts = q(".ah-fact");

      if (!plate.length) return;

      gsap.set([...ghost, ...plate, ...heads, ...lead, ...facts], {
        autoAlpha: 0,
      });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

      // The portrait is centred by a Tailwind `-translate-x-1/2` and GSAP writes
      // the whole transform matrix, so the horizontal half has to be handed over
      // explicitly or the first `yPercent` write would drop the centring. The
      // class stays on the element for the no-JS and reduced-motion paths.
      gsap.set(portrait, { xPercent: -50, x: 0 });

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

      // ── The plate ──────────────────────────────────────────────────────
      //
      // In from off its own left edge, measured rather than assumed: the plate
      // rides on `--s`, so a fixed pixel offset would under-travel on a small
      // viewport and overshoot on a large one.
      tl.fromTo(
        plate,
        { x: () => -(plate[0] as HTMLElement).offsetWidth - 40 },
        { x: 0, autoAlpha: 1, duration: 16, ease: "power2.out" },
        PHASE.plate,
      );

      // ── He rides up inside it ──────────────────────────────────────────
      //
      // No fade. `yPercent` because the portrait is taller than the plate, so
      // it has to clear its OWN height to start fully out of frame.
      tl.fromTo(
        portrait,
        { yPercent: 60 },
        { yPercent: 0, duration: 22, ease: RISE_EASE },
        PHASE.portrait,
      );

      // The watermark presses in behind everything, anchored at the corner it
      // is cropped against.
      tl.fromTo(
        ghost,
        { scale: 1.06, transformOrigin: "100% 100%" },
        { scale: 1, autoAlpha: 1, duration: 18 },
        PHASE.portrait,
      );

      // ── The writing ────────────────────────────────────────────────────
      tl.fromTo(
        heads,
        { y: 26 },
        { y: 0, autoAlpha: 1, duration: 11, stagger: 5 },
        PHASE.head,
      );

      tl.to(rule, { scaleX: 1, duration: 10, ease: DRAW_EASE }, PHASE.rule);

      // The paragraph waits for the rule it sits under to finish drawing.
      tl.fromTo(
        lead,
        { y: 18 },
        { y: 0, autoAlpha: 1, duration: 12 },
        PHASE.lead,
      );

      // ── The credentials ────────────────────────────────────────────────
      tl.fromTo(
        facts,
        { y: 14 },
        { y: 0, autoAlpha: 1, duration: 8, stagger: 3.5 },
        PHASE.facts,
      );

      // ── Hold ───────────────────────────────────────────────────────────
      tl.to({}, { duration: PHASE.end - PHASE.hold }, PHASE.hold);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
  );

  return () => mm.revert();
}
