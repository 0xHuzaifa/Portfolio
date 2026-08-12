import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * /about section 04 — The hardest things I've built. Pinned.
 *
 * The heading lands, the margin annotation arrives beside it, and then the two
 * case notes are laid down one after the other — not together. They are the
 * page's evidence, and two cards fading in simultaneously reads as decoration
 * where two cards placed in sequence reads as being shown something.
 *
 * The annotation deliberately arrives BEFORE the notes it comments on: it
 * frames how to read them, so it has to be there first.
 */

const PHASE = {
  /** Eyebrow and headline. */
  head: 0,
  /** The margin annotation that frames the two notes. */
  note: 26,
  /** The first note. The second is `CARD_STEP` later. */
  cards: 42,
  /** The evidence sits complete. */
  hold: 84,
  end: 92,
} as const;

const SCROLL_LENGTH = "+=420%";

/** Gap between the two notes being laid down. */
const CARD_STEP = 16;

const EASE = "power3.out";

export function aboutCasesSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      const heads = q(".ac-head");
      const note = q(".ac-note");
      const cards = q(".ac-card");

      if (cards.length !== 2) return;

      gsap.set([...heads, ...note, ...cards], { autoAlpha: 0 });

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

      // ── The head ───────────────────────────────────────────────────────
      tl.fromTo(
        heads,
        { y: 28 },
        { y: 0, autoAlpha: 1, duration: 12, stagger: 5 },
        PHASE.head,
      );

      // ── The annotation ─────────────────────────────────────────────────
      //
      // In from the right rail it is set against, so it reads as written in the
      // margin rather than as another block arriving on the page.
      tl.fromTo(
        note,
        { x: 26 },
        { x: 0, autoAlpha: 1, duration: 11 },
        PHASE.note,
      );

      // ── The two notes ──────────────────────────────────────────────────
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { y: 30, scale: 0.97, transformOrigin: "50% 50%" },
          { y: 0, scale: 1, autoAlpha: 1, duration: 14 },
          PHASE.cards + i * CARD_STEP,
        );
      });

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
