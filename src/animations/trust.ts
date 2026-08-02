import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Trust scroll choreography — "a drop lands on the hero and becomes the stage".
 *
 * The hero stays pinned under the visitor while a single drop forms in the air,
 * spreads into a liquid panel, holds empty long enough to build anticipation,
 * lets the content rise through the surface, and then unwinds completely before
 * the next section takes over.
 *
 * The timeline is 100 units long so the phase table below maps 1:1 onto the
 * design's percentages, and it is scrubbed — which means P5 needs no reversing
 * logic of its own. Scrolling back up unwinds the whole thing for free.
 *
 * Call inside `useGSAP(..., { scope })` so GSAP reverts everything on unmount.
 */

/** Phase boundaries on the 100-unit timeline. Retune the whole piece here. */
const PHASE = {
  /** P1 — hero clears, drop forms in air. */
  drop: 0,
  /** P2 — drop spreads into the liquid surface. */
  spread: 15,
  /** P3 — deliberate empty water. Nothing moves. */
  hold: 40,
  /** P4 — content rises through the surface. */
  emerge: 65,
  /** P5 — everything dissolves back to nothing. */
  dissolve: 85,
  end: 100,
} as const;

/**
 * How much scroll the pinned sequence consumes, in viewport heights — and the
 * one knob for overall pace. The timeline is scrubbed, so nothing has a
 * duration of its own: stretching this distance slows every phase by the same
 * factor and leaves the ratios in `PHASE` untouched. Raise it to slow the whole
 * piece down, lower it to speed it up.
 */
const SCROLL_LENGTH = "+=450%";

/** Rest diameter of the drop, in CSS px. Mirrors `--trust-drop-size`. */
const DROP_SIZE = 132;

const EASE = "power3.out";

/**
 * The insets, as percentages of the surface box, that clip it down to a circle
 * of `DROP_SIZE` at its centre. The panel is far wider than it is tall, so the
 * two axes need very different percentages to describe the same circle.
 */
function circleInset(surface: HTMLElement) {
  const { width, height } = surface.getBoundingClientRect();

  return {
    h: width ? Math.max(0, ((width - DROP_SIZE) / 2 / width) * 100) : 50,
    v: height ? Math.max(0, ((height - DROP_SIZE) / 2 / height) * 100) : 50,
  };
}

export function trustSequence(stage: HTMLElement) {
  const mm = gsap.matchMedia();

  // Phones never pin: the Trust layout below `lg` is ordinary stacked flow, and
  // a scrubbed pin over a backdrop-filtered panel is exactly the combination
  // that stutters on mid-range mobile. Both fall through to the section's
  // normal `data-reveal` treatment.
  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const hero = stage.querySelector<HTMLElement>(".hero-stage");
      const drop = stage.querySelector<HTMLElement>(".trust-drop");
      const surface = stage.querySelector<HTMLElement>(".trust-surface");
      const content = stage.querySelector<HTMLElement>(".trust-content");
      const handle = stage.querySelector<HTMLElement>(".trust-handle");

      if (!hero || !drop || !surface || !content) return;

      const texts = gsap.utils.toArray<HTMLElement>(
        surface.querySelectorAll(".trust-text"),
      );
      const cards = gsap.utils.toArray<HTMLElement>(
        surface.querySelectorAll(".trust-card"),
      );
      const strip = surface.querySelector<HTMLElement>(".trust-strip");

      // Switches Trust from a section that follows the hero into a layer that
      // sits on top of it. Driven from JS, never from a static `lg:` class, so
      // a reduced-motion visitor is not left with an overlay nothing reveals.
      stage.dataset.sequence = "on";

      // The clip is written by hand from a proxy object rather than tweened as
      // a string: the horizontal and vertical openings run on their own
      // schedules (water spreads sideways before it spreads towards you), and
      // two tweens cannot share one clip-path property.
      const start = circleInset(surface);
      const shape = { h: start.h, v: start.v, r: DROP_SIZE / 2 };

      const drawSurface = () => {
        surface.style.clipPath = `inset(${shape.v}% ${shape.h}% ${shape.v}% ${shape.h}% round ${shape.r}px)`;
      };

      // Match the panel's own radius at rest so the clip lands exactly on the
      // border instead of shaving a hairline off it.
      const restRadius =
        Number.parseFloat(getComputedStyle(surface).borderTopLeftRadius) || 44;

      // Deterministic start states. A scrubbed timeline records `from()` values
      // lazily — the tween would not exist yet at progress 0, so the content
      // would be plainly visible until the playhead reached P4. Setting the
      // states up front and using only `to()` removes that whole class of bug.
      gsap.set(surface, { autoAlpha: 0, willChange: "clip-path" });
      gsap.set(drop, { scale: 0, autoAlpha: 0, filter: "blur(10px)" });
      // `visibility` is the hard gate, the clip is only the look. GSAP's
      // autoAlpha resolves to `visibility: inherit` rather than `visible`, so a
      // hidden wrapper keeps every child hidden no matter what their own tweens
      // are doing — the content cannot paint outside P4→P5 even if a clip-path
      // fails to apply or a tween is interrupted mid-scrub.
      gsap.set(content, {
        visibility: "hidden",
        clipPath: "inset(100% 0% 0% 0%)",
      });
      gsap.set(texts, { y: 40, autoAlpha: 0, filter: "blur(8px)" });
      gsap.set(cards, { y: 80, autoAlpha: 0, scale: 0.92 });
      if (strip) gsap.set(strip, { y: 60, autoAlpha: 0 });
      if (handle) gsap.set(handle, { autoAlpha: 0 });
      drawSurface();

      // `backdrop-filter` over a ~1664px panel repaints every frame the clip
      // moves. It is swapped for a flat translucent fill while the geometry is
      // travelling and restored the moment it comes to rest — the eye cannot
      // catch the difference mid-morph, and it keeps the scrub at 60fps.
      let isFlat: boolean | null = null;
      const setFlat = (flat: boolean) => {
        if (flat === isFlat) return;
        isFlat = flat;
        surface.classList.toggle("is-flat", flat);
      };

      const tl = gsap.timeline({
        defaults: { ease: EASE },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: SCROLL_LENGTH,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            // `--s` is container-query based, so the panel box changes with the
            // viewport. Recompute the circle and let the invalidated tweens
            // re-read their function-based endpoints.
            const next = circleInset(surface);
            start.h = next.h;
            start.v = next.v;
          },
          onUpdate: (self) => {
            const at = self.progress * PHASE.end;
            setFlat(at < PHASE.hold || at > PHASE.dissolve);
          },
        },
      });

      // ── P1 — the hero clears, a drop forms in the air ──────────────────
      //
      // Only the hero's single wrapper is touched. `heroIdle` holds infinite
      // tweens on `.hero-card` y and `.hero-accent` opacity, and writes x/y to
      // `.hero-portrait` on every pointermove; animating those elements here
      // would put two timelines in a fight over the same properties. One
      // target, and `autoAlpha` ends at `visibility: hidden` so the parallax
      // writes into an invisible subtree rather than a painted one.
      tl.to(
        hero,
        { autoAlpha: 0, filter: "blur(12px)", duration: 9 },
        PHASE.drop,
      );

      tl.to(
        drop,
        { scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 9 },
        PHASE.drop + 6,
      );

      // ── P2 — the drop becomes the surface ──────────────────────────────
      //
      // The blob hands off to the real panel: it keeps growing as it fades so
      // the two read as one body of water rather than a swap.
      tl.to(surface, { autoAlpha: 1, duration: 2 }, PHASE.spread);
      tl.to(
        drop,
        { autoAlpha: 0, scale: 1.15, duration: 5, ease: "power2.out" },
        PHASE.spread,
      );
      if (handle)
        tl.to(handle, { autoAlpha: 1, duration: 6 }, PHASE.spread + 8);

      // Sideways first, and only then towards the viewer. The vertical opening
      // starts before the horizontal one has finished so the corners round out
      // instead of stepping.
      tl.to(
        shape,
        { h: 0, duration: 15, ease: "power2.inOut", onUpdate: drawSurface },
        PHASE.spread,
      );
      tl.to(
        shape,
        { v: 0, duration: 12, ease: "power3.inOut", onUpdate: drawSurface },
        PHASE.spread + 13,
      );
      tl.to(
        shape,
        { r: restRadius, duration: 25, onUpdate: drawSurface },
        PHASE.spread,
      );

      // ── P3 — empty water ───────────────────────────────────────────────
      //
      // Nothing happens here, on purpose. The pause is what makes the content
      // arrival land; without it the section reads as one continuous shuffle.
      tl.to({}, { duration: PHASE.emerge - PHASE.hold }, PHASE.hold);

      // ── P4 — content rises through the surface ─────────────────────────
      //
      // The gate opens exactly at P4 and shuts again once the dissolve has
      // finished. `tl.set` is a zero-duration tween, so a scrub reverses it
      // like any other — scrolling back up re-hides the content at the same
      // point it appeared.
      tl.set(content, { visibility: "visible" }, PHASE.emerge);
      tl.to(
        content,
        { clipPath: "inset(0% 0% 0% 0%)", duration: 14 },
        PHASE.emerge,
      );
      tl.to(
        texts,
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 10,
          stagger: 0.8,
        },
        PHASE.emerge + 1,
      );
      tl.to(
        cards,
        { y: 0, autoAlpha: 1, scale: 1, duration: 10, stagger: 1.4 },
        PHASE.emerge + 3,
      );
      if (strip) {
        tl.to(strip, { y: 0, autoAlpha: 1, duration: 9 }, PHASE.emerge + 9);
      }

      // ── P5 — dissolve ──────────────────────────────────────────────────
      //
      // The background is already empty here: the hero left in P1 and never
      // came back, so the panel compresses against nothing.
      const risen: HTMLElement[] = [...texts, ...cards];
      if (strip) risen.push(strip);

      tl.to(risen, { y: 30, autoAlpha: 0, duration: 6 }, PHASE.dissolve);
      tl.to(
        content,
        { clipPath: "inset(100% 0% 0% 0%)", duration: 6 },
        PHASE.dissolve + 1,
      );
      // Both the fade (ends at 91) and the clip (ends at 92) are done here, so
      // the gate shuts on nothing still moving. Past this point the content is
      // `visibility: hidden` and cannot reappear over the shrinking panel.
      tl.set(content, { visibility: "hidden" }, PHASE.dissolve + 7);
      if (handle)
        tl.to(handle, { autoAlpha: 0, duration: 4 }, PHASE.dissolve + 1);

      // Closing mirrors opening: the near edge retreats first, then the sides.
      // Function-based endpoints so `invalidateOnRefresh` picks up a resize.
      tl.to(
        shape,
        {
          v: () => start.v,
          duration: 6,
          ease: "power3.inOut",
          onUpdate: drawSurface,
        },
        PHASE.dissolve + 3,
      );
      tl.to(
        shape,
        {
          h: () => start.h,
          r: DROP_SIZE / 2,
          duration: 8,
          ease: "power2.inOut",
          onUpdate: drawSurface,
        },
        PHASE.dissolve + 5,
      );

      // Hand back to the blob, then let it go.
      tl.to(drop, { autoAlpha: 1, scale: 1, duration: 2 }, PHASE.dissolve + 11);
      tl.to(surface, { autoAlpha: 0, duration: 2 }, PHASE.dissolve + 12);
      tl.to(
        drop,
        {
          scale: 0,
          autoAlpha: 0,
          filter: "blur(6px)",
          duration: 3,
          ease: "power2.in",
        },
        PHASE.dissolve + 12,
      );

      return () => {
        stage.removeAttribute("data-sequence");
        surface.classList.remove("is-flat");
        surface.style.clipPath = "";
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
  );

  return () => mm.revert();
}
