import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * /about section 09 — Close. Pinned.
 *
 * Deliberately the same choreography as the homepage's final CTA: the pitch
 * arrives plainly, and the button wipes open from its left edge with the arrow
 * disc landing after. Both pages end on the same gesture so the button reads as
 * one recognisable object rather than two different ones.
 *
 * `clip-path` clips an element's shadow along with its box, so the yellow glow
 * travels with the leading edge instead of sitting there waiting — which is what
 * makes it read as the button switching on rather than appearing.
 */

const PHASE = {
  /** The TALK watermark. */
  word: 0,
  /** Eyebrow, headline, paragraph. */
  head: 10,
  /** The button wipes open. */
  cta: 44,
  /** The arrow disc lands on the end of it. */
  orb: 60,
  /** The close is left standing. */
  hold: 74,
  end: 84,
} as const;

const SCROLL_LENGTH = "+=400%";

const EASE = "power3.out";
const DRAW_EASE = "power2.inOut";

export function aboutCtaSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      const word = q(".ax-word");
      const heads = q(".ax-head");
      const cta = q(".ax-cta");
      const orb = q(".ax-orb");

      if (!cta.length) return;

      // The button is NOT in the autoAlpha set. Its clip is its gate — an
      // element clipped to zero width paints nothing — and adding a fade on top
      // would turn a wipe into a wipe-and-dissolve.
      gsap.set([...word, ...heads], { autoAlpha: 0 });
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

      tl.fromTo(
        word,
        { scale: 1.05, transformOrigin: "100% 0%" },
        { scale: 1, autoAlpha: 1, duration: 14 },
        PHASE.word,
      );

      tl.fromTo(
        heads,
        { y: 28 },
        { y: 0, autoAlpha: 1, duration: 12, stagger: 6 },
        PHASE.head,
      );

      tl.to(
        cta,
        { clipPath: "inset(0% 0% 0% 0%)", duration: 16, ease: DRAW_EASE },
        PHASE.cta,
      );

      // Held at zero through the wipe, so the wipe passes over an empty disc
      // and there is nothing to reveal twice. It lands once the pill is whole.
      tl.to(orb, { scale: 1, duration: 7, ease: "back.out(1.7)" }, PHASE.orb);

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
