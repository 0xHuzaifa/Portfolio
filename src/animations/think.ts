import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * How I Think — the diagram draws itself.
 *
 * The section pins and assembles in the order someone would actually build this
 * on a whiteboard: the title, the qualities the work is judged by, then the
 * process — a card, the line that leaves it, the cards that line arrives at,
 * and on down to the feedback loops. A connector always finishes before the
 * card it points at appears, so the piece reads as being drawn rather than as
 * eight cards fading in.
 *
 * Connectors are drawn with `stroke-dashoffset` against their own measured
 * length, which is why each line travels along its real route: the trunk
 * genuinely descends, the arms genuinely sweep outwards, the loops genuinely
 * run back up the outside. A clip or a wipe would only uncover them.
 *
 * Timeline units read as percentages; the tail runs slightly past 100 because
 * the closing tweens overlap. Call inside `useGSAP(..., { scope })` and hand
 * the returned cleanup back.
 */

/** Phase starts on the timeline. Retune pacing here. */
const PHASE = {
  /** Eyebrow, heading, lead paragraph. */
  head: 0,
  /** The qualities panel on the right rail. */
  attrs: 11,
  /** The board the diagram is drawn on. */
  panel: 22,
  /** Card 01 — the only one that arrives without a line leading to it. */
  node01: 27,
  /** A stub drops out of the bottom of 01. */
  trunk: 33,
  /** It opens: two arms sweep out to the 02 and 04 slots. */
  branch: 36,
  /** Cards 02, 03, 04 fill the slots the arms reached. */
  row2: 45,
  /** The short links between the row-2 cards. */
  links: 55,
  /** Row 2 collects down into the bus. */
  bus: 60,
  /** The bus drops back out into the row-3 slots. */
  drop: 65,
  /** Cards 05, 06, 07. */
  row3: 69,
  /** The stem down to the 08 slot. */
  stem: 80,
  /** Card 08. */
  node08: 84,
  /** The dashed feedback loops run back up the outside to 02 and 04. */
  loops: 89,
  /** The quote card. */
  quote: 94,
  /** THINK. */
  think: 99,
  end: 106,
} as const;

/** How much scroll the pinned section consumes. */
const SCROLL_LENGTH = "+=560%";

const EASE = "power3.out";

/** Lines travel at a steady hand. They do not spring into place. */
const DRAW_EASE = "power1.inOut";

/**
 * Primes a connector for a stroke draw.
 *
 * The length is measured once and never again: these paths are authored in the
 * SVG's own 1620x1080 viewBox, so unlike the pixel distances in the other
 * sequences they do not move with the viewport and `invalidateOnRefresh` has
 * nothing here to recompute.
 *
 * A handful of segments were authored from the card back towards the bus,
 * which is the opposite of how they should read. Rewriting their `d` would mean
 * re-fitting coordinates that were hand-matched to the node grid, so those
 * carry `data-draw-from="end"` and get a NEGATIVE offset instead — same tween,
 * revealed from the far end.
 */
function primeDraw(path: SVGPathElement) {
  const length = path.getTotalLength();

  // Zero means the browser declined to measure it — the only realistic cause
  // being the two paths that live inside the loop mask. Leaving such a path
  // un-primed renders it whole rather than not at all, and the group fade in
  // the loop phase still keeps it off screen until its turn.
  if (!length) return;

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: path.dataset.drawFrom === "end" ? -length : length,
  });
}

export function thinkSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  // Below `lg` the shared canvas is abandoned and the diagram reflows into a
  // plain card grid with the connectors hidden entirely, so there is nothing
  // to assemble and nothing to draw.
  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      /** Connectors, typed for `getTotalLength`. Only paths carry `data-draw`. */
      const drawn = (selector: string) =>
        Array.from(section.querySelectorAll<SVGPathElement>(selector));

      const heads = q(".hit-head");
      const attrPanel = q(".hit-attrs");
      const attrRows = q(".hit-attr");
      const panel = q(".hit-panel");
      const loops = q(".hit-loops");
      const quote = q(".hit-quote");
      const think = q(".hit-think");
      const nodes = q(".hit-node");
      const markers = q("[data-pop]");

      // Eight is the whole diagram. Anything less means the markup moved out
      // from under this file and the phase table no longer describes it.
      if (nodes.length < 8) return;

      for (const path of drawn("[data-draw]")) primeDraw(path);

      // Hidden up front so nothing flashes ahead of its phase. Only `autoAlpha`
      // is set here; the travel distances stay on the tweens below.
      gsap.set(
        [
          ...heads,
          ...attrPanel,
          ...attrRows,
          ...panel,
          ...loops,
          ...nodes,
          ...quote,
          ...think,
        ],
        { autoAlpha: 0 },
      );

      gsap.set(markers, {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: "50% 50%",
      });

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

      /** A connector group travelling along its own route. */
      const draw = (
        stage: string,
        at: number,
        duration: number,
        stagger = 0,
      ) => {
        const targets = drawn(`[data-draw="${stage}"]`);
        if (!targets.length) return;

        tl.to(
          targets,
          { strokeDashoffset: 0, duration, stagger, ease: DRAW_EASE },
          at,
        );
      };

      /** A junction dot or the bus diamond landing on a line already drawn. */
      const pop = (stage: string, at: number) => {
        const targets = q(`[data-pop="${stage}"]`);
        if (!targets.length) return;

        tl.to(
          targets,
          {
            scale: 1,
            autoAlpha: 1,
            duration: 4,
            stagger: 1.2,
            ease: "back.out(2)",
          },
          at,
        );
      };

      /** Cards arriving in the slots their connectors have already reached. */
      const deal = (targets: Element[], at: number, stagger = 0) => {
        if (!targets.length) return;

        tl.fromTo(
          targets,
          { y: 18, scale: 0.94 },
          { y: 0, scale: 1, autoAlpha: 1, duration: 7, stagger },
          at,
        );
      };

      // ── Heading ────────────────────────────────────────────────────────
      tl.fromTo(
        heads,
        { y: 34 },
        { y: 0, autoAlpha: 1, duration: 10, stagger: 2 },
        PHASE.head,
      );

      // ── The qualities panel ────────────────────────────────────────────
      //
      // In from its own edge so it reads as attached to the right rail, then
      // the rows fill it. The rows inherit visibility from the panel, so they
      // cannot paint before it has arrived even though both start hidden.
      tl.fromTo(
        attrPanel,
        { x: 40 },
        { x: 0, autoAlpha: 1, duration: 9 },
        PHASE.attrs,
      );

      tl.fromTo(
        attrRows,
        { x: 16 },
        { x: 0, autoAlpha: 1, duration: 6, stagger: 1.1 },
        PHASE.attrs + 2,
      );

      // ── The board ──────────────────────────────────────────────────────
      tl.fromTo(
        panel,
        { y: 24, scale: 0.985 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 8 },
        PHASE.panel,
      );

      // ── 01, and the line that leaves it ────────────────────────────────
      //
      // Two separate draws rather than one: the stub and both arms all start
      // at the same point, so drawing them together would leave the short
      // vertical crawling while the long arms raced. Split, it descends first
      // and then opens — which is the whole gesture.
      deal(nodes.slice(0, 1), PHASE.node01);
      draw("trunk", PHASE.trunk, 4);
      draw("branch", PHASE.branch, 9);
      pop("branch", PHASE.branch + 6);

      // ── Row 2 fills the slots the arms reached ─────────────────────────
      deal(nodes.slice(1, 4), PHASE.row2, 3.5);
      draw("links", PHASE.links, 6, 1.5);
      pop("links", PHASE.links + 4);

      // ── Down to row 3 ──────────────────────────────────────────────────
      draw("bus", PHASE.bus, 6, 0.8);
      pop("bus", PHASE.bus + 4);
      draw("drop", PHASE.drop, 5, 0.8);
      deal(nodes.slice(4, 7), PHASE.row3, 3.5);

      // ── And down to 08 ─────────────────────────────────────────────────
      draw("stem", PHASE.stem, 5);
      deal(nodes.slice(7, 8), PHASE.node08);

      // ── The loop back ──────────────────────────────────────────────────
      //
      // The group fade is belt and braces around the mask: if a browser ever
      // refuses to measure the mask paths, the loops still wait for this phase
      // instead of sitting on the diagram from the first frame.
      tl.to(loops, { autoAlpha: 1, duration: 3 }, PHASE.loops);
      draw("loop", PHASE.loops, 9, 1.5);

      // ── Closing ────────────────────────────────────────────────────────
      tl.fromTo(
        quote,
        { y: 28 },
        { y: 0, autoAlpha: 1, duration: 8 },
        PHASE.quote,
      );

      tl.fromTo(
        think,
        { y: 40 },
        { y: 0, autoAlpha: 1, duration: 7 },
        PHASE.think,
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
  );

  return () => mm.revert();
}
