import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Final CTA — everything settles, then the button arms.
 *
 * This section has one job: answer "where do I go next?" So the choreography is
 * deliberately lopsided. The heading, the paragraph and the availability card
 * all arrive plainly — a rise and a fade, nothing more — because anything
 * showier up there would compete with the thing the visitor is supposed to
 * click. All of the section's motion budget is spent on the button.
 *
 * The button does not fade in. It wipes open from its left edge, and because
 * `clip-path` clips an element's shadow along with its box, the big yellow glow
 * arrives with it rather than sitting there waiting. The white arrow disc is
 * held at zero through the whole wipe and lands after it — the last thing to
 * appear on the page is the thing you press.
 *
 * Timeline units read as percentages. Call inside `useGSAP(..., { scope })` and
 * hand the returned cleanup back.
 */

/** Phase starts on the timeline. Retune pacing here. */
const PHASE = {
  /** The START watermark, pressed into the top-right corner. */
  word: 0,
  /** Rule and label. */
  eyebrow: 8,
  /** Have an idea? / Let's engineer / something exceptional. */
  head: 14,
  /** The paragraph under it. */
  lead: 34,
  /** The availability card, in from the right rail. */
  avail: 44,
  /** The button wipes open. */
  cta: 56,
  /** The arrow disc lands on the end of it. */
  orb: 70,
  /** The other way to get in touch. */
  email: 76,
  /** The reassurance strip. */
  assure: 84,
  /** The close sits complete. */
  hold: 104,
  end: 112,
} as const;

/** How much scroll the pinned section consumes. */
const SCROLL_LENGTH = "+=500%";

const EASE = "power3.out";

/** Rules and wipes travel at a steady hand. They do not spring. */
const DRAW_EASE = "power2.inOut";

export function finalCtaSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  // Below `lg` the shared canvas is abandoned and the section reflows into a
  // plain stack, so there is no composition to assemble.
  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      const word = q(".fc-word");
      const eyebrow = q(".fc-eyebrow");
      const eyebrowRule = q(".fc-eyebrow-rule");
      const lines = q(".fc-line");
      const lead = q(".fc-lead");
      const avail = q(".fc-avail");
      const availRows = q(".fc-avail-row");
      const cta = q(".fc-cta");
      const orb = q(".fc-cta-orb");
      const email = q(".fc-email");
      const mail = q(".fc-mail");
      const mailRule = q(".fc-mail-rule");
      const assure = q(".fc-assure");
      const assureItems = q(".fc-assure-item");

      // Three lines is what the phase table is written for.
      if (lines.length !== 3) return;

      // Deterministic start states, set up front so a scrubbed timeline never
      // paints anything ahead of its phase.
      //
      // The button is NOT in this list. Its clip is its gate — an element
      // clipped to zero width paints nothing — and adding a fade on top would
      // turn a wipe into a wipe-and-dissolve.
      gsap.set(
        [
          ...word,
          ...eyebrow,
          ...lines,
          ...lead,
          ...avail,
          ...availRows,
          ...email,
          ...mail,
          ...assure,
          ...assureItems,
        ],
        { autoAlpha: 0 },
      );

      gsap.set([...eyebrowRule, ...mailRule], {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(cta, { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(orb, { scale: 0, transformOrigin: "50% 50%" });

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

      // ── The watermark ──────────────────────────────────────────────────
      //
      // Anchored at the corner it is cropped against, so it reads as stamped
      // into the page rather than scaled on screen.
      tl.fromTo(
        word,
        { scale: 1.05, transformOrigin: "100% 0%" },
        { scale: 1, autoAlpha: 1, duration: 12 },
        PHASE.word,
      );

      // ── The pitch ──────────────────────────────────────────────────────
      //
      // Plain on purpose. Three lines, a rise, a fade. The section's one piece
      // of real choreography belongs to the button, not to the heading above it.
      tl.to(eyebrow, { autoAlpha: 1, duration: 6 }, PHASE.eyebrow);
      tl.to(
        eyebrowRule,
        { scaleX: 1, duration: 7, ease: DRAW_EASE },
        PHASE.eyebrow,
      );

      tl.fromTo(
        lines,
        { y: 30 },
        { y: 0, autoAlpha: 1, duration: 9, stagger: 6 },
        PHASE.head,
      );

      tl.fromTo(
        lead,
        { y: 18 },
        { y: 0, autoAlpha: 1, duration: 10 },
        PHASE.lead,
      );

      // ── The availability card ──────────────────────────────────────────
      //
      // In from its own edge so it reads as attached to the right rail, then
      // its contents fill it.
      tl.fromTo(
        avail,
        { x: 40 },
        { x: 0, autoAlpha: 1, duration: 10 },
        PHASE.avail,
      );

      tl.fromTo(
        availRows,
        { y: 12 },
        { y: 0, autoAlpha: 1, duration: 6, stagger: 1.8 },
        PHASE.avail + 3,
      );

      // ── The button arms ────────────────────────────────────────────────
      //
      // A wipe, not a fade. `clip-path` clips the shadow with the box, so the
      // glow travels with the leading edge instead of being there from the
      // start — which is what makes it read as the button switching on.
      tl.to(
        cta,
        { clipPath: "inset(0% 0% 0% 0%)", duration: 16, ease: DRAW_EASE },
        PHASE.cta,
      );

      // Held at zero through the wipe, so the wipe passes over an empty disc
      // and there is nothing to reveal twice. It lands once the pill is whole.
      tl.to(orb, { scale: 1, duration: 6, ease: "back.out(1.7)" }, PHASE.orb);

      // ── The other way in ───────────────────────────────────────────────
      tl.fromTo(
        email,
        { y: 12 },
        { y: 0, autoAlpha: 1, duration: 8 },
        PHASE.email,
      );

      tl.fromTo(
        mail,
        { y: 12 },
        { y: 0, autoAlpha: 1, duration: 8 },
        PHASE.email + 2,
      );

      tl.to(
        mailRule,
        { scaleX: 1, duration: 7, ease: DRAW_EASE },
        PHASE.email + 4,
      );

      // ── The reassurances ───────────────────────────────────────────────
      tl.fromTo(
        assure,
        { y: 22 },
        { y: 0, autoAlpha: 1, duration: 9 },
        PHASE.assure,
      );

      tl.fromTo(
        assureItems,
        { y: 12 },
        { y: 0, autoAlpha: 1, duration: 6, stagger: 2 },
        PHASE.assure + 3,
      );

      // ── Hold ───────────────────────────────────────────────────────────
      //
      // The close is left standing before the pin releases. This is the last
      // thing the visitor sees with the whole page behind it, and it should not
      // still be assembling when they arrive at it.
      tl.to({}, { duration: PHASE.end - PHASE.hold }, PHASE.hold);

      return () => {
        // clip-path is written directly rather than through a transform, so it
        // is cleared by hand alongside GSAP's own revert.
        for (const el of cta) (el as HTMLElement).style.clipPath = "";
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
  );

  return () => mm.revert();
}
