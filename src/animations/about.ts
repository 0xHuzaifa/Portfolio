import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * About — stepping into frame.
 *
 * The portrait card arrives EMPTY, and the person rises up into it from below
 * its own bottom edge. The card already clips its contents, so nothing has to
 * be masked specially: he simply walks into shot. It is the only place on the
 * site where the subject arrives by moving rather than by resolving, which is
 * the point — this is the section where you meet him.
 *
 * The three claims then rise out of their own baselines, one at a time. That is
 * the hero wordmark's gesture reused deliberately: there it introduced a name,
 * here it makes three separate statements land as three separate statements.
 *
 * Finally a rule sweeps the full width and the four stat cards land in its
 * wake — the section turning from introduction to evidence. Their little
 * accent bars draw last, in the same direction, so the bottom of the section
 * echoes the line that opened it.
 *
 * Timeline units read as percentages. Call inside `useGSAP(..., { scope })` and
 * hand the returned cleanup back.
 */

/** Phase starts on the timeline. Retune pacing here. */
const PHASE = {
  /** The portrait frame, still empty. */
  frame: 0,
  /** He steps into it. */
  portrait: 12,
  /** Rule and label on the left rail. */
  eyebrow: 30,
  /** Engineer. Problem Solver. System Builder. */
  claims: 36,
  /** The line that explains them. */
  lead: 58,
  /** The way through to the full story. */
  cta: 66,
  /** The status chip lands on the frame's corner. */
  chip: 72,
  /** The divider sweeps the full width. */
  rule: 82,
  /** The stat cards land behind it. */
  stats: 86,
  /** The section sits complete. */
  hold: 106,
  end: 112,
} as const;

/** How much scroll the pinned section consumes. */
const SCROLL_LENGTH = "+=480%";

const EASE = "power3.out";

/** Lines rise the way the hero's wordmark does. Same gesture, same ease. */
const RISE_EASE = "power4.out";

/** Rules are ruled, at a steady hand. They do not spring. */
const DRAW_EASE = "power2.inOut";

export function aboutSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  // Below `lg` the shared canvas is abandoned and the section reflows into a
  // plain stack, so there is no composition to assemble.
  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      const frame = q(".ab-frame");
      const portrait = q(".ab-portrait");
      const eyebrow = q(".ab-eyebrow");
      const eyebrowRule = q(".ab-eyebrow-rule");
      const lines = q(".ab-line-text");
      const lead = q(".ab-lead");
      const cta = q(".ab-cta");
      const chip = q(".ab-chip");
      const rule = q(".ab-rule");
      const stats = q(".ab-stat");
      const bars = q(".ab-stat-bar");

      // Three claims is what the phase table is written for.
      if (lines.length !== 3) return;

      // Deterministic start states, set up front so a scrubbed timeline never
      // paints anything ahead of its phase.
      gsap.set(
        [...frame, ...eyebrow, ...lead, ...cta, ...chip, ...rule, ...stats],
        { autoAlpha: 0 },
      );

      // Every rule in the section is drawn, never faded, so they all start
      // collapsed against their own left edge.
      gsap.set([...eyebrowRule, ...rule, ...bars], {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // The portrait is centred by a Tailwind `-translate-x-1/2`, and GSAP
      // writes the whole transform matrix — so the horizontal half of it has to
      // be handed over explicitly here, or the first `yPercent` write would
      // drop the centring and shunt him to the right. The class stays on the
      // element for the no-JS and reduced-motion paths.
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

      // ── The empty frame ────────────────────────────────────────────────
      tl.fromTo(
        frame,
        { y: 24, scale: 0.97, transformOrigin: "50% 50%" },
        { y: 0, scale: 1, autoAlpha: 1, duration: 12 },
        PHASE.frame,
      );

      // ── He steps into it ───────────────────────────────────────────────
      //
      // No fade. A person entering a frame does not materialise, he walks in,
      // and fading the travel would turn a deliberate entrance into an effect.
      // `yPercent` because the image is taller than the card it sits in, so it
      // has to clear its OWN height to be fully out of shot, not the card's.
      tl.fromTo(
        portrait,
        { yPercent: 100 },
        { yPercent: 0, duration: 20, ease: RISE_EASE },
        PHASE.portrait,
      );

      // ── The left rail ──────────────────────────────────────────────────
      tl.to(eyebrow, { autoAlpha: 1, duration: 6 }, PHASE.eyebrow);
      tl.to(
        eyebrowRule,
        { scaleX: 1, duration: 7, ease: DRAW_EASE },
        PHASE.eyebrow,
      );

      // ── The claims ─────────────────────────────────────────────────────
      //
      // Each line is clipped to its own box, so the reveal edge is the line's
      // own baseline: it emerges from where it already sits rather than
      // travelling in from anywhere. Staggered wide enough that three
      // statements read as three, not as one block wiping on.
      tl.fromTo(
        lines,
        { yPercent: 110 },
        { yPercent: 0, duration: 9, stagger: 7, ease: RISE_EASE },
        PHASE.claims,
      );

      // ── The explanation ────────────────────────────────────────────────
      tl.fromTo(
        lead,
        { y: 18 },
        { y: 0, autoAlpha: 1, duration: 10 },
        PHASE.lead,
      );

      tl.fromTo(
        cta,
        { y: 14, scale: 0.97, transformOrigin: "50% 50%" },
        { y: 0, scale: 1, autoAlpha: 1, duration: 8 },
        PHASE.cta,
      );

      // ── The status chip ────────────────────────────────────────────────
      //
      // In from the frame it overhangs, so it reads as attached to the corner
      // rather than as another panel arriving on the page. Its indicator dot
      // has its own CSS pulse and is deliberately left alone here.
      tl.fromTo(
        chip,
        { x: 26, y: 10 },
        { x: 0, y: 0, autoAlpha: 1, duration: 9 },
        PHASE.chip,
      );

      // ── The rule, and what lands behind it ─────────────────────────────
      //
      // The sweep and the cards are one gesture: the stagger is timed so each
      // card arrives just after the line has passed over its slot, which is
      // what makes the rule read as leaving them behind rather than as a
      // separate flourish that happens to come first.
      tl.to(rule, { autoAlpha: 1, duration: 2 }, PHASE.rule);
      tl.to(rule, { scaleX: 1, duration: 16, ease: DRAW_EASE }, PHASE.rule);

      tl.fromTo(
        stats,
        { y: 26 },
        { y: 0, autoAlpha: 1, duration: 10, stagger: 2.5 },
        PHASE.stats,
      );

      tl.to(
        bars,
        { scaleX: 1, duration: 6, stagger: 2.5, ease: DRAW_EASE },
        PHASE.stats + 6,
      );

      // ── Hold ───────────────────────────────────────────────────────────
      //
      // The completed section sits for a beat before the pin releases, so the
      // last accent bar is not still drawing as the page moves on.
      tl.to({}, { duration: PHASE.end - PHASE.hold }, PHASE.hold);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
  );

  return () => mm.revert();
}
