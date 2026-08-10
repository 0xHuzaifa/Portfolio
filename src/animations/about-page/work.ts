import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * /about section 02 — How I work. Pinned.
 *
 * Three claims, three columns. Each column's rule draws BEFORE its own text
 * arrives, so the eye is led to an empty slot and then finds it filled — the
 * same logic the homepage diagram uses when a connector finishes before the
 * card it points at. Without that the section is just three paragraphs fading
 * in together.
 *
 * The columns overlap by design: the next rule starts drawing while the
 * previous column is still filling, which keeps the section moving without
 * two columns ever doing the same thing at the same moment.
 */

const PHASE = {
  /** Eyebrow, headline, and the line that frames them. */
  head: 0,
  /** The first column's rule. Each subsequent column is `COLUMN_STEP` later. */
  columns: 24,
  /** The board sits complete. */
  hold: 84,
  end: 92,
} as const;

const SCROLL_LENGTH = "+=440%";

/** Gap between one column starting and the next. */
const COLUMN_STEP = 17;

/** Offsets inside a single column, from the moment its rule starts. */
const COLUMN = {
  rule: 0,
  title: 6,
  body: 9,
} as const;

const EASE = "power3.out";
const DRAW_EASE = "power2.inOut";

export function aboutWorkSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      const heads = q(".aw-head");
      const columns = q(".aw-col");

      if (columns.length !== 3) return;

      // Explicit hooks, not positional selectors: a `:nth-of-type` here would
      // break silently the first time anything is inserted into a column.
      const parts = columns.map((col) => ({
        ghost: col.querySelector(".aw-col-ghost"),
        rule: col.querySelector(".aw-col-rule"),
        title: col.querySelector(".aw-col-title"),
        body: col.querySelector(".aw-col-body"),
      }));

      gsap.set(heads, { autoAlpha: 0 });

      for (const { ghost, rule, title, body } of parts) {
        gsap.set([ghost, title, body], { autoAlpha: 0 });
        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      }

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

      // ── The three columns ──────────────────────────────────────────────
      parts.forEach(({ ghost, rule, title, body }, i) => {
        const at = PHASE.columns + i * COLUMN_STEP;

        // The numeral is background, so it arrives with the rule rather than
        // competing with the title for attention.
        tl.to(ghost, { autoAlpha: 1, duration: 8 }, at + COLUMN.rule);

        tl.to(
          rule,
          { scaleX: 1, duration: 11, ease: DRAW_EASE },
          at + COLUMN.rule,
        );

        tl.fromTo(
          title,
          { y: 14 },
          { y: 0, autoAlpha: 1, duration: 9 },
          at + COLUMN.title,
        );

        tl.fromTo(
          body,
          { y: 12 },
          { y: 0, autoAlpha: 1, duration: 10 },
          at + COLUMN.body,
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
