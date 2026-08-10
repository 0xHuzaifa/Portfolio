import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Quote — the statement is spoken.
 *
 * This section is the page's breath: one panel, one sentence. So the
 * choreography is built around the sentence's own rhetoric rather than around
 * an effect. "Good software isn't impressive." is a setup; "Good software is
 * invisible." is the turn. The gap between them is a real silence on the
 * timeline — nothing moves through it — because that pause is the line's whole
 * mechanism, and animating over it would flatten a rhetorical beat into a
 * uniform word stagger.
 *
 * `invisible` is the only word that does not rise. It resolves out of a blur,
 * last and slowest, because that is what the word means. Everything else is
 * deliberately plain: the design system reserves long, showy motion for
 * cinematic moments, and a quote earns its weight by staying still.
 *
 * Timeline units read as percentages. Call inside `useGSAP(..., { scope })` and
 * hand the returned cleanup back.
 */

/** Phase starts on the timeline. Retune pacing here. */
const PHASE = {
  /** The plate the statement sits on. */
  panel: 0,
  /** The handwritten mark — you open a quotation before you say it. */
  mark: 10,
  /** "Good software isn't impressive." */
  setup: 20,
  /** "Good software is…" — after the silence. */
  turn: 36,
  /** …"invisible", resolving. */
  punchline: 46,
  /** The full stop lands. */
  stop: 58,
  /** The supporting voice. */
  credit: 64,
  /** The statement sits. */
  hold: 82,
  end: 90,
} as const;

/** How much scroll the pinned section consumes. Shortest on the page — it has
 *  the fewest beats, and a pause should not cost the visitor a long scroll. */
const SCROLL_LENGTH = "+=400%";

/** Gap between one word and the next inside a clause. */
const WORD_STEP = 1.6;

const EASE = "power3.out";

export function quoteSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  // Below `lg` the shared canvas is abandoned and the panel reflows into a
  // plain stacked card, so there is nothing positioned to assemble.
  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      const panel = q(".qt-panel");
      const mark = q(".qt-mark");
      const clauses = q(".qt-clause");
      const words = q(".qt-word");
      const punchline = q(".qt-punchline");
      const stop = q(".qt-stop");
      const creditRule = q(".qt-credit-rule");
      const credit = q(".qt-credit");

      // Two clauses is what the phase table is written for: a setup and a turn.
      if (clauses.length !== 2) return;

      // Deterministic start states, set up front so a scrubbed timeline never
      // paints anything ahead of its phase. The panel gates everything inside
      // it — children inherit its `visibility` — so a word can never appear
      // before the plate it is written on.
      gsap.set(
        [...panel, ...mark, ...words, ...punchline, ...stop, ...credit],
        {
          autoAlpha: 0,
        },
      );

      gsap.set(creditRule, { scaleX: 0, transformOrigin: "left center" });

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
      // Barely anything: a short rise and a fade. The panel is not the subject
      // and should not behave like it.
      tl.fromTo(
        panel,
        { y: 22, scale: 0.985, transformOrigin: "50% 50%" },
        { y: 0, scale: 1, autoAlpha: 1, duration: 12 },
        PHASE.panel,
      );

      // ── The mark ───────────────────────────────────────────────────────
      //
      // A handwritten glyph, so it is placed rather than faded: it settles out
      // of a small counter-rotation, the way a pen lands. Kept to a few degrees
      // — any more and a quotation mark starts performing.
      tl.fromTo(
        mark,
        { scale: 0.78, rotation: -7, transformOrigin: "20% 80%" },
        { scale: 1, rotation: 0, autoAlpha: 1, duration: 10 },
        PHASE.mark,
      );

      // ── The setup, the silence, the turn ───────────────────────────────
      //
      // Each clause carries its own words, so the two can be placed at
      // independent points on the timeline. A single stagger across all seven
      // words could not hold the gap between them — and the gap is the line.
      clauses.forEach((clause, i) => {
        const clauseWords = clause.querySelectorAll<HTMLElement>(".qt-word");
        if (!clauseWords.length) return;

        tl.fromTo(
          clauseWords,
          { y: 20 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 7,
            stagger: WORD_STEP,
          },
          i === 0 ? PHASE.setup : PHASE.turn,
        );
      });

      // ── The punchline ──────────────────────────────────────────────────
      //
      // The one word that does not rise. It comes into focus instead, over
      // twice the duration of any word before it, because that is what the
      // sentence is claiming: you notice it last, and only once it resolves.
      // Appearing and resolving are two different things, so they are two
      // different tweens. It arrives quickly — as an unreadable smudge, which
      // at this type size a 16px blur genuinely is — and then takes four times
      // as long to sharpen. One tween doing both would collapse the idea into
      // an ordinary fade.
      tl.to(punchline, { autoAlpha: 1, duration: 4 }, PHASE.punchline);

      tl.fromTo(
        punchline,
        { filter: "blur(16px)", scale: 1.04, transformOrigin: "50% 50%" },
        {
          filter: "blur(0px)",
          scale: 1,
          duration: 16,
          ease: "power2.out",
        },
        PHASE.punchline,
      );

      // The one piece of punctuation the design picks out in yellow. It lands
      // after the word has resolved — the sentence is not finished until it does.
      tl.fromTo(
        stop,
        { scale: 0, transformOrigin: "50% 100%" },
        { scale: 1, autoAlpha: 1, duration: 5, ease: "back.out(2)" },
        PHASE.stop,
      );

      // ── The supporting voice ───────────────────────────────────────────
      tl.to(
        creditRule,
        { scaleX: 1, duration: 7, ease: "power2.inOut" },
        PHASE.credit,
      );

      tl.fromTo(
        credit,
        { y: 14 },
        { y: 0, autoAlpha: 1, duration: 10 },
        PHASE.credit + 3,
      );

      // ── Hold ───────────────────────────────────────────────────────────
      //
      // The longest still moment on the page, and the point of the section:
      // the statement is left alone to be read before the pin releases.
      tl.to({}, { duration: PHASE.end - PHASE.hold }, PHASE.hold);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
  );

  return () => mm.revert();
}
