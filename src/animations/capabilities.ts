import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Capabilities — the deck is dealt.
 *
 * The six capability cards arrive as one pile at the centre of the grid, blank
 * and stacked slightly off-square, and then deal themselves out to their own
 * slots one at a time. Each card fills in with its content as it travels, so it
 * arrives already saying something rather than landing empty and then loading.
 *
 * Paint order runs 01 over 02 over 03… (descending z-index, set in the
 * component) so the card that leaves is always the one on top of the stack, and
 * each departure genuinely uncovers its neighbour.
 *
 * The two beats that belong to this section alone: the stat values count up
 * against the scrub (scroll back and they count down), and every card's bullet
 * list ticks in dot-first — the marker lands, then the line slides off it, like
 * a specification being confirmed item by item.
 *
 * Timeline units read as percentages; the tail runs past 100 because the last
 * card's internals overlap the closing panels. Call inside
 * `useGSAP(..., { scope })` and hand the returned cleanup back.
 */

/** Phase starts on the timeline. Retune pacing here. */
const PHASE = {
  /** The CAPABILITIES watermark the board is drawn on. */
  board: 0,
  /** Eyebrow, heading, lead paragraph, and the rule under "performance". */
  head: 5,
  /** The deck lands: six blank cards in one pile at the centre of the grid. */
  pile: 20,
  /** The stat panel arrives, still reading zero. */
  stats: 29,
  /** The numbers run up to their real values. */
  count: 35,
  /** Cards leave the pile for their own slots, one after another. */
  deal: 45,
  /** The base locks in: strip from the left, value statement from the right. */
  base: 103,
  /** The assembled board sits complete. */
  hold: 117,
  end: 123,
} as const;

/** How much scroll the pinned section consumes. */
const SCROLL_LENGTH = "+=560%";

/**
 * Gap between one card leaving the pile and the next. A card's own internals
 * run about 20 units, so at 7 the next card is already travelling while the
 * previous fills itself in — enough overlap to keep the board moving, enough
 * separation that two cards are never doing the same thing at once.
 */
const DEAL_STEP = 7;

/** How long a card takes to cross the board to its slot. */
const TRAVEL = 13;

/**
 * The angle each card sits at while it is on the pile. A real stack is never
 * square, and without this the six panels read as one thick card rather than as
 * six. Fixed values, not random, so the pile looks identical on every visit and
 * survives a resize unchanged.
 */
const TILT = [-3.6, 2.4, -1.5, 3.2, -2.2, 1.1];

/**
 * Offsets inside a single card's own arrival, from the moment its panel lands.
 * Every card runs this same little score, which is what makes six arrivals read
 * as one repeated mechanism rather than six unrelated reveals.
 */
const CARD = {
  tile: 8,
  index: 9.5,
  title: 10,
  points: 11.5,
  link: 16,
} as const;

const EASE = "power3.out";

/** Splits "80+" into the number that counts and the suffix that does not. */
function counterParts(el: HTMLElement) {
  const match = (el.textContent ?? "").trim().match(/^([\d.]+)(.*)$/);

  return {
    to: match ? Number(match[1]) : 0,
    suffix: match ? match[2] : "",
  };
}

export function capabilitiesSequence(section: HTMLElement) {
  const mm = gsap.matchMedia();

  // Below `lg` the shared canvas is abandoned and the section reflows into a
  // plain stack — the slots are display:none there and the grid has no fixed
  // geometry to map out, so there is nothing to draft and nothing to populate.
  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const q = gsap.utils.selector(section);

      const wordmark = q(".cap-wordmark");
      const heads = q(".cap-head");
      const underline = q(".cap-underline");
      const statPanel = q(".cap-stats");
      const statRows = q(".cap-stat");
      const cards = q(".cap-card") as HTMLElement[];
      const strip = q(".cap-strip");
      const stripItems = q(".cap-strip-item");
      const value = q(".cap-value");
      const valueBadge = q(".cap-value-badge");

      // Six is the whole grid, and TILT is written for exactly that many.
      if (cards.length !== TILT.length) return;

      // Measured from layout, never assumed: the board rides on `--s`, so the
      // grid's centre moves with the viewport. `offsetLeft`/`offsetTop` report
      // the laid-out slot without the transform the deal is about to apply,
      // which is why the pile can be expressed as an offset from it.
      const gridCentre = () => {
        const first = cards[0];
        const last = cards[cards.length - 1];

        return {
          x: (first.offsetLeft + last.offsetLeft + last.offsetWidth) / 2,
          y: (first.offsetTop + last.offsetTop + last.offsetHeight) / 2,
        };
      };

      /**
       * How far a card must be pushed from its own slot to sit on the pile.
       * The extra few pixels per card let the lower edges of the stack show, so
       * you can see it is six cards deep before any of them move.
       */
      const toPile = (card: HTMLElement, i: number) => {
        const centre = gridCentre();

        return {
          x: centre.x - (card.offsetLeft + card.offsetWidth / 2),
          y: centre.y - (card.offsetTop + card.offsetHeight / 2) + i * 3,
        };
      };

      const parts = (card: Element) => ({
        tile: card.querySelector(".cap-card-tile"),
        index: card.querySelector(".cap-card-n"),
        title: card.querySelector(".cap-card-title"),
        points: Array.from(card.querySelectorAll<HTMLElement>(".cap-point")),
        dots: Array.from(card.querySelectorAll<HTMLElement>(".cap-dot")),
        link: card.querySelector(".cap-link"),
      });

      const cardParts = cards.map(parts);

      // The counters are driven by writing textContent, which is not a property
      // GSAP can revert. The server-rendered values are kept so the cleanup can
      // put them back exactly as they were.
      const counters = q(".cap-num").map((el) => ({
        el: el as HTMLElement,
        original: (el as HTMLElement).textContent ?? "",
        ...counterParts(el as HTMLElement),
      }));

      // Deterministic start states, set up front so a scrubbed timeline never
      // paints anything ahead of its phase. Children of a hidden panel inherit
      // its `visibility`, so the card internals below cannot appear before
      // their own card has landed even though both start hidden.
      gsap.set(
        [
          ...wordmark,
          ...heads,
          ...statPanel,
          ...statRows,
          ...cards,
          ...strip,
          ...stripItems,
          ...value,
          ...valueBadge,
        ],
        { autoAlpha: 0 },
      );

      gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });

      for (const { tile, index, title, points, dots, link } of cardParts) {
        gsap.set([tile, index, title, ...points, ...dots, link], {
          autoAlpha: 0,
        });
      }

      for (const counter of counters) {
        counter.el.textContent = `0${counter.suffix}`;
      }

      // Six translucent panels stacked on one spot means the compositor blurs
      // the same backdrop six times over, and re-rasterises the whole pile
      // every frame a card slides off it. The frost is dropped for a flat fill
      // while a card is still on the stack or in transit, and restored the
      // moment it seats — the same trade the Trust surface makes, and over this
      // near-uniform beige the swap is not something the eye can catch.
      const isFlat = cards.map(() => true);

      for (const card of cards) card.classList.add("is-flat");

      const setFlat = (i: number, next: boolean) => {
        if (isFlat[i] === next) return;
        isFlat[i] = next;
        cards[i].classList.toggle("is-flat", next);
      };

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
          onUpdate: (self) => {
            // The timeline is exactly `PHASE.end` long — the closing hold ends
            // on it — so progress maps straight onto the phase table.
            const at = self.progress * PHASE.end;

            cards.forEach((_, i) => {
              setFlat(i, at < PHASE.deal + i * DEAL_STEP + TRAVEL);
            });
          },
        },
      });

      // ── The board ──────────────────────────────────────────────────────
      //
      // The watermark arrives first and alone — no other section on the page
      // opens on its background. It presses in from slightly oversize, anchored
      // at the bottom edge where it is cropped, so it reads as being stamped
      // onto the canvas rather than scaled on screen.
      tl.fromTo(
        wordmark,
        { scale: 1.06, transformOrigin: "50% 100%" },
        { scale: 1, autoAlpha: 1, duration: 12 },
        PHASE.board,
      );

      // ── The brief ──────────────────────────────────────────────────────
      tl.fromTo(
        heads,
        { y: 30 },
        { y: 0, autoAlpha: 1, duration: 9, stagger: 2.2 },
        PHASE.head,
      );

      // Drawn left to right at a steady hand, after the sentence it marks has
      // settled — an underline being ruled, not a highlight fading up.
      tl.to(
        underline,
        { scaleX: 1, duration: 6, ease: "power2.inOut" },
        PHASE.head + 8,
      );

      // ── The numbers ────────────────────────────────────────────────────
      tl.fromTo(
        statPanel,
        { x: -30 },
        { x: 0, autoAlpha: 1, duration: 9 },
        PHASE.stats,
      );

      tl.fromTo(
        statRows,
        { y: 14 },
        { y: 0, autoAlpha: 1, duration: 5, stagger: 1.1 },
        PHASE.stats + 2,
      );

      // Each figure runs on its own proxy so they finish together but climb at
      // their own rate — 100 has further to travel than 7, and letting them
      // share one tween would make the small numbers sit still and wait.
      for (const { el, to, suffix } of counters) {
        const proxy = { value: 0 };

        tl.to(
          proxy,
          {
            value: to,
            duration: 12,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(proxy.value)}${suffix}`;
            },
          },
          PHASE.count,
        );
      }

      // ── The deck lands ─────────────────────────────────────────────────
      //
      // Built from the bottom of the stack upwards, so the pile visibly
      // assembles and 01 is the last to land — leaving it on top, which is
      // where it has to be, because it is the first card dealt back off.
      //
      // Only scale and visibility here. The pile's POSITION is the start state
      // of each card's deal tween below, which keeps every geometric value in
      // one place and lets `invalidateOnRefresh` re-measure all of it.
      tl.fromTo(
        cards,
        { scale: 0.9, transformOrigin: "50% 50%" },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 7,
          stagger: { each: 1.4, from: "end" },
        },
        PHASE.pile,
      );

      // ── The deck is dealt ──────────────────────────────────────────────
      cards.forEach((card, i) => {
        const at = PHASE.deal + i * DEAL_STEP;
        const { tile, index, title, points, dots, link } = cardParts[i];

        // `fromTo` renders its start state as soon as it is built, so the cards
        // sit on the pile from frame zero rather than snapping onto it when the
        // deal phase arrives. The offsets are function-based, so a resize
        // re-measures the pile instead of stranding it at the old centre.
        //
        // `power2.inOut` because this is an object being moved across a desk:
        // it has to come off the stack and settle into the slot, not fly.
        tl.fromTo(
          card,
          {
            x: () => toPile(card, i).x,
            y: () => toPile(card, i).y,
            rotation: TILT[i],
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: TRAVEL,
            ease: "power2.inOut",
          },
          at,
        );

        // The one accent on the card seats with a little weight behind it.
        // `back` is already the diagram's vocabulary for a part landing on
        // something finished, and at this size it reads as a stamp, not a bounce.
        tl.fromTo(
          tile,
          { scale: 0.55, transformOrigin: "50% 50%" },
          { scale: 1, autoAlpha: 1, duration: 6, ease: "back.out(1.6)" },
          at + CARD.tile,
        );

        tl.to(index, { autoAlpha: 1, duration: 4 }, at + CARD.index);

        tl.fromTo(
          title,
          { y: 10 },
          { y: 0, autoAlpha: 1, duration: 5 },
          at + CARD.title,
        );

        // Dot first, then the line slides off it. Two tweens on the same
        // stagger rather than one on the row, because the marker landing ahead
        // of its text is exactly what makes this read as a list being checked
        // off instead of four lines fading in.
        tl.fromTo(
          dots,
          { scale: 0, transformOrigin: "50% 50%" },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 3,
            stagger: 1.2,
            ease: "back.out(2)",
          },
          at + CARD.points,
        );

        tl.fromTo(
          points,
          { x: -8 },
          { x: 0, autoAlpha: 1, duration: 4, stagger: 1.2 },
          at + CARD.points + 0.8,
        );

        tl.to(link, { autoAlpha: 1, duration: 4 }, at + CARD.link);
      });

      // ── The base locks in ──────────────────────────────────────────────
      //
      // From opposite outer edges at the same moment, the way the hero's nav
      // and strip close its frame. The composition has a floor once these land.
      tl.fromTo(
        strip,
        { x: -40 },
        { x: 0, autoAlpha: 1, duration: 9 },
        PHASE.base,
      );

      tl.fromTo(
        value,
        { x: 40 },
        { x: 0, autoAlpha: 1, duration: 9 },
        PHASE.base,
      );

      tl.fromTo(
        stripItems,
        { y: 10 },
        { y: 0, autoAlpha: 1, duration: 4, stagger: 0.9 },
        PHASE.base + 4,
      );

      tl.fromTo(
        valueBadge,
        { scale: 0.6, transformOrigin: "50% 50%" },
        { scale: 1, autoAlpha: 1, duration: 5, ease: "back.out(1.6)" },
        PHASE.base + 5,
      );

      // ── Hold ───────────────────────────────────────────────────────────
      //
      // Nothing happens here, on purpose. Without it the final strip item
      // lands on the same frame the pin releases, and the completed board —
      // which is the whole payoff of drafting the grid first — is never
      // actually seen finished.
      tl.to({}, { duration: PHASE.end - PHASE.hold }, PHASE.hold);

      return () => {
        // textContent is outside GSAP's revert, so the real figures go back by
        // hand — otherwise a resize down to mobile would leave the panel at 0.
        for (const { el, original } of counters) {
          el.textContent = original;
        }
        for (const card of cards) card.classList.remove("is-flat");
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
  );

  return () => mm.revert();
}
