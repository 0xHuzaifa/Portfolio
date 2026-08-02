import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Featured Projects staged reveal.
 *
 * The section pins and assembles itself instead of scrolling past: heading,
 * then the featured project with its device, then the three supporting cards
 * dealt in one at a time. The visitor meets one project properly before the
 * rest arrive, which is the whole point of leading with 01.
 *
 * The card entrance is a deal, not a fade. 02 arrives from off the left edge;
 * 03 starts stacked on 02's slot and slides out to its own; 04 does the same
 * from behind 03. Paint order runs 02 over 03 over 04 (set in the component as
 * descending z-index) so each genuinely emerges from behind its neighbour
 * rather than sliding over it.
 *
 * Once the board is complete it holds, then the whole stage leaves at once so
 * the next section builds on a cleared screen rather than over a half-emptied
 * one. Both sections sit on the same beige, so the seam does not show.
 *
 * Timeline is 100 units so the phase table reads as percentages. Call inside
 * `useGSAP(..., { scope })` and hand the returned cleanup back.
 */

/** Phase starts on the 100-unit timeline. Retune pacing here. */
const PHASE = {
  /** Heading block rises. */
  head: 0,
  /** Featured project: device, detail column, selector panel. */
  detail: 18,
  /** The laptop lid swings open. */
  lid: 38,
  /** 02 in from off-screen left. */
  card02: 56,
  /** 03 out from behind 02. */
  card03: 70,
  /** 04 out from behind 03. It lands at ~102, then everything holds. */
  card04: 85,
  /** The assembled stage leaves — as one object, all at once. */
  exit: 110,
  end: 120,
} as const;

/** How much scroll the pinned section consumes. */
const SCROLL_LENGTH = "+=420%";

/**
 * The laptop is a pre-rendered frame sequence drawn to a canvas, so the
 * timeline cannot simply tween a DOM property for it. Instead the player
 * registers a draw function here and the lid phase calls it with 0..1.
 *
 * A registry rather than a ref or a context: the timeline is a plain module
 * with no React knowledge, and this keeps it that way.
 */
export type LaptopDrawer = (progress: number) => void;

const laptopDrawers = new Set<LaptopDrawer>();

/**
 * Last progress a running sequence pushed, or null when no sequence is active
 * (mobile, reduced motion, or before/after this section mounts).
 *
 * This exists because of effect ordering. `featuredSequence` runs from
 * useGSAP, which is a LAYOUT effect on the parent; the laptop player registers
 * from a PASSIVE effect on a child. Layout effects run first, so the sequence
 * has already pushed its opening state before any drawer exists to receive it.
 * Without replaying it on registration the screen paints lit over a shut lid.
 */
let laptopProgress: number | null = null;

function pushLaptop(progress: number) {
  laptopProgress = progress;
  for (const draw of laptopDrawers) draw(progress);
}

export function registerLaptop(draw: LaptopDrawer) {
  laptopDrawers.add(draw);
  // Null means nothing is driving the laptop — leave the player at its own
  // defaults so the static open frame keeps a lit screen.
  if (laptopProgress !== null) draw(laptopProgress);
  return () => {
    laptopDrawers.delete(draw);
  };
}

const EASE = "power3.out";

export function featuredSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  // Below `lg` the shared canvas is abandoned and the section reflows into a
  // normal stack, so there is nothing to assemble.
  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      const heads = q(".fp-head");
      const device = q(".fp-device");
      const details = q(".fp-detail");
      const selector = q(".fp-selector");
      const cards = q(".fp-card");

      if (!cards.length) return;

      // Measured from layout, never assumed: the cards are flex-1 inside a
      // container whose width rides on `--s`. `offsetLeft` is used rather than
      // getBoundingClientRect because it reports the laid-out position without
      // the transform we are about to apply.
      const pitch = () =>
        cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0;

      // Far enough left to clear the stage entirely before it starts moving.
      const offLeft = () => -(cards[0].offsetLeft + cards[0].offsetWidth + 80);

      // Hidden up front, so nothing flashes before its phase. Only `autoAlpha`
      // is set here — the travel distances stay as function-based values on the
      // tweens below so `invalidateOnRefresh` can re-measure them on a resize.
      gsap.set([...heads, ...device, ...details, ...selector, ...cards], {
        autoAlpha: 0,
      });

      // Shut before the section ever plays.
      pushLaptop(0);

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

      // ── Heading ────────────────────────────────────────────────────────
      tl.fromTo(
        heads,
        { y: 34 },
        { y: 0, autoAlpha: 1, duration: 14, stagger: 2 },
        PHASE.head,
      );

      // ── The featured project ───────────────────────────────────────────
      //
      // Device first and slowest: it is the largest object on the canvas, and
      // having the writing land on top of an already-present screen reads far
      // better than both arriving together.
      tl.fromTo(
        device,
        { y: 40, scale: 0.96 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 18 },
        PHASE.detail,
      );

      tl.fromTo(
        details,
        { y: 26 },
        { y: 0, autoAlpha: 1, duration: 14, stagger: 1.6 },
        PHASE.detail + 3,
      );

      // The index panel comes in from its own edge so it reads as attached to
      // the right rail rather than as another element rising off the page.
      tl.fromTo(
        selector,
        { x: 44 },
        { x: 0, autoAlpha: 1, duration: 13 },
        PHASE.detail + 6,
      );

      // ── The lid opens ──────────────────────────────────────────────────
      //
      // A proxy drives the frame index; the sequence itself was baked linearly
      // in Blender precisely so the easing could live here. `power2.out`
      // because a real hinge carries momentum off the deck and settles into the
      // last few degrees — linear reads mechanical.
      const lidProgress = { value: 0 };
      tl.to(
        lidProgress,
        {
          value: 1,
          duration: 18,
          ease: "power2.out",
          onUpdate: () => {
            pushLaptop(lidProgress.value);
          },
        },
        PHASE.lid,
      );

      // ── Dealing the supporting cards ───────────────────────────────────
      tl.fromTo(
        cards[0],
        { x: offLeft },
        { x: 0, autoAlpha: 1, duration: 17, ease: "power2.out" },
        PHASE.card02,
      );

      // Each remaining card starts life sitting exactly on its predecessor's
      // slot, slightly small so it reads as further back, then slides out.
      const dealt = [
        { card: cards[1], at: PHASE.card03 },
        { card: cards[2], at: PHASE.card04 },
      ];

      for (const { card, at } of dealt) {
        if (!card) continue;

        tl.fromTo(
          card,
          { x: () => -pitch(), scale: 0.94 },
          { x: 0, scale: 1, autoAlpha: 1, duration: 17, ease: "power2.out" },
          at,
        );
      }

      // ── The whole stage leaves ─────────────────────────────────────────
      //
      // One tween on one element, deliberately. The section has to read as a
      // single object being taken off the table rather than as six pieces
      // packing themselves away, and targeting the stage wrapper is what
      // guarantees that — there is no stagger available to creep back in.
      //
      // The gap between 04 landing (~102) and this is the hold that makes the
      // exit land: the assembled board sits complete for a beat first.
      const stage = section.querySelector<HTMLElement>(".fp-stage");

      if (stage) {
        tl.to(
          stage,
          { autoAlpha: 0, filter: "blur(12px)", duration: 10 },
          PHASE.exit,
        );
      }

      return () => {
        // Back to "nothing is driving it", so a later mount without a sequence
        // (a resize down to mobile) gets the lit static frame again.
        laptopProgress = null;
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
  );

  return () => mm.revert();
}
