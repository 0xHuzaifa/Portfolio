import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Footer — the line runs out from its origin.
 *
 * The design already puts a glowing dot at the left end of the divider. This
 * takes it literally: the dot lands first, and the rule is drawn out of it
 * across the full width. Everything else follows the line in the direction it
 * travelled. It is the smallest sequence on the page, which is correct — the
 * work is over by the time anyone gets here.
 *
 * THIS ONE IS NOT PINNED, and that is deliberate. `SiteFooter` renders null on
 * the homepage, so this section is genuinely the last element in the document.
 * A pin needs scroll room after the pinned element to play out, and there is
 * none — the page simply ends. Instead the scrub runs from the section entering
 * the viewport to its bottom edge meeting the viewport's, which is exactly the
 * state the page is in at maximum scroll. That guarantees the timeline reaches
 * 1 rather than stranding the footer half-drawn at the bottom of the page.
 *
 * Call inside `useGSAP(..., { scope })` and hand the returned cleanup back.
 */

/** Phase starts on the timeline. Retune pacing here. */
const PHASE = {
  /** The origin dot. */
  dot: 0,
  /** The rule, drawn out of it. */
  rule: 6,
  /** The copyright, under the line it followed. */
  copy: 26,
  /** The links, in the direction the line travelled. */
  social: 32,
  end: 50,
} as const;

const EASE = "power3.out";

/** The rule is ruled, at a steady hand. */
const DRAW_EASE = "power2.inOut";

export function footerSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  // Below `lg` the origin dot is `display: none` and the divider is ordinary
  // flow, so there is no line to draw and nothing to draw it from.
  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      const dot = q(".ft-dot");
      const rule = q(".ft-rule");
      const copy = q(".ft-copy");
      const social = q(".ft-social");

      if (!rule.length) return;

      // Deterministic start states, set up front so a scrubbed timeline never
      // paints anything ahead of its phase.
      gsap.set([...dot, ...copy, ...social], { autoAlpha: 0 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: EASE },
        scrollTrigger: {
          trigger: section,
          // From the moment the section appears to the moment its bottom edge
          // sits on the viewport's — the page's maximum-scroll state, so the
          // timeline is guaranteed to complete.
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── The origin ─────────────────────────────────────────────────────
      //
      // A point of light arriving before the line it throws. Scaled from
      // nothing rather than faded, so it reads as switching on.
      tl.fromTo(
        dot,
        { scale: 0, transformOrigin: "50% 50%" },
        { scale: 1, autoAlpha: 1, duration: 8, ease: "back.out(1.8)" },
        PHASE.dot,
      );

      // ── The line ───────────────────────────────────────────────────────
      //
      // Slow, and by far the longest single move in the sequence: 1480 design
      // pixels drawn in one unbroken travel. Nothing else happens while it runs.
      tl.to(rule, { scaleX: 1, duration: 22, ease: DRAW_EASE }, PHASE.rule);

      // ── What follows it ────────────────────────────────────────────────
      tl.fromTo(
        copy,
        { y: 12 },
        { y: 0, autoAlpha: 1, duration: 10 },
        PHASE.copy,
      );

      tl.fromTo(
        social,
        { y: 12 },
        { y: 0, autoAlpha: 1, duration: 7, stagger: 3 },
        PHASE.social,
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
  );

  return () => mm.revert();
}
