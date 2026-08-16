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
 * Phase units read as percentages of the design's timing table; the tail runs
 * past 100 because the handback beat needs room the original table did not
 * leave it. `PHASE.end` is the timeline's real length and the two must stay in
 * step — `onUpdate` maps scroll progress onto the phase table through it.
 *
 * The timeline is scrubbed, which means P5 needs no reversing logic of its own.
 * Scrolling back up unwinds the whole thing for free.
 *
 * Call inside `useGSAP(..., { scope })` so GSAP reverts everything on unmount.
 */

/** Phase boundaries. Retune the whole piece here. */
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
  /**
   * P6 — the panel hands back to the blob.
   *
   * The close below is timed to land exactly here, so from this point the
   * surface is a 132px circle sitting precisely on top of the blob and the two
   * can trade places without anything appearing to move. Nothing may hand over
   * earlier: until the close finishes, the panel is still larger than the blob,
   * and fading a small circle in over it is what made the shape appear to flip.
   */
  handback: 98,
  /** …and then the blob lets go. */
  release: 103,
  end: 107,
} as const;

/**
 * How much scroll the pinned sequence consumes, in viewport heights — and the
 * one knob for overall pace. The timeline is scrubbed, so nothing has a
 * duration of its own: stretching this distance slows every phase by the same
 * factor and leaves the ratios in `PHASE` untouched. Raise it to slow the whole
 * piece down, lower it to speed it up.
 */
const SCROLL_LENGTH = "+=480%";

/** Rest diameter of the drop, in CSS px. Mirrors `--trust-drop-size`. */
const DROP_SIZE = 132;

const EASE = "power3.out";

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
      // a string: three numbers have to move together and a single `clip-path`
      // property cannot carry three tweens.
      const shape = { h: 50, v: 50, r: DROP_SIZE / 2 };

      const drawSurface = () => {
        surface.style.clipPath = `inset(${shape.v}% ${shape.h}% ${shape.v}% ${shape.h}% round ${shape.r}px)`;
      };

      // Match the panel's own radius at rest so the clip lands exactly on the
      // border instead of shaving a hairline off it.
      const restRadius =
        Number.parseFloat(getComputedStyle(surface).borderTopLeftRadius) || 44;

      /** The panel's laid-out box, in px. `onRefresh` keeps it current. */
      const box = (() => {
        const r = surface.getBoundingClientRect();
        return { w: r.width, h: r.height };
      })();

      /**
       * The panel's geometry, driven by ONE progress value: `t` 0 is the full
       * panel, `t` 1 is the resting drop. Both the opening and the close run on
       * it, in opposite directions, so the shape travels the *same path* either
       * way — which is the whole point. The opening used to run the two axes on
       * separate schedules (sideways first, "water finding its edges"), and
       * against a close that moved both together the two read as different
       * animations: on the way in the panel snapped open, on the way out it
       * shrank smoothly.
       *
       * One `t` also keeps the box proportional the whole way, and the radius
       * tracks the short side — `round` is capped by whichever side is shorter,
       * so a panel that passes through a 1157x132 bar physically cannot be
       * round however large the radius, which is what made the drop appear to
       * flip between a circle and a rectangle.
       */
      /** Last `t` written, so `onRefresh` can redraw the same frame. */
      let morphT = 1;

      const applyMorph = (t: number) => {
        morphT = t;
        const w = box.w + (DROP_SIZE - box.w) * t;
        const h = box.h + (DROP_SIZE - box.h) * t;

        shape.h = box.w ? ((box.w - w) / 2 / box.w) * 100 : 50;
        shape.v = box.h ? ((box.h - h) / 2 / box.h) * 100 : 50;
        // Never larger than the box can carry, or the corners square off.
        shape.r = Math.min(
          restRadius + (DROP_SIZE / 2 - restRadius) * t,
          Math.min(w, h) / 2,
        );
        drawSurface();
      };

      // Deterministic start states. A scrubbed timeline records `from()` values
      // lazily — the tween would not exist yet at progress 0, so the content
      // would be plainly visible until the playhead reached P4. Setting the
      // states up front and using only `to()` removes that whole class of bug.
      // No `will-change: clip-path` here. It pins the panel into its own
      // composited layer for the whole sequence, and a promoted layer whose
      // clip changes every frame is exactly where Chrome has been seen to
      // rasterise the clip without its `round` — the panel flashing as a
      // hard-cornered rectangle mid-morph. The clip is re-rasterised every
      // frame regardless, so the hint buys nothing to trade for that.
      gsap.set(surface, { autoAlpha: 0 });
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
      // At rest the surface is already clipped to the drop, so the first frame
      // of the opening is the last frame of the close.
      applyMorph(1);

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

      /**
       * The morph's two windows, and the shape it travels through them.
       *
       * NOT tweens, on purpose, and this is the whole reason the drop used to
       * strobe between a circle and a rectangle on the way back up. Two tweens
       * writing one shared value cannot agree on a scrubbed seek: GSAP renders a
       * timeline's children last-to-first when the playhead moves backwards, so
       * every frame of the reverse close was drawn twice — once by the closing
       * tween at its real value, then again by the *opening* tween asserting its
       * finished state (the full panel). Which one landed last decided what the
       * frame looked like, and it alternated.
       *
       * Computing `t` from the playhead instead leaves exactly one writer, and
       * the result no longer depends on the order anything renders in.
       */
      const morphEase = gsap.parseEase("power2.inOut");
      const OPEN = { from: PHASE.spread + 4, to: PHASE.hold };
      const CLOSE = { from: PHASE.dissolve + 3, to: PHASE.handback };

      const morphAt = (at: number) => {
        if (at <= OPEN.from) return 1;
        if (at < OPEN.to)
          return 1 - morphEase((at - OPEN.from) / (OPEN.to - OPEN.from));
        if (at <= CLOSE.from) return 0;
        if (at < CLOSE.to)
          return morphEase((at - CLOSE.from) / (CLOSE.to - CLOSE.from));
        return 1;
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
            // viewport. Re-measure and redraw at whatever `t` the playhead is
            // sitting on, or the clip keeps describing the old box.
            const r = surface.getBoundingClientRect();
            box.w = r.width;
            box.h = r.height;
            applyMorph(morphT);
          },
        },
      });

      // One writer for the geometry, driven by the playhead — the scrubbed
      // time, not the raw scroll position, so the clip stays in step with every
      // other tween on the timeline.
      //
      // It hangs off a do-nothing tween spanning the whole piece rather than
      // the timeline's own `onUpdate`, because ScrollTrigger renders a scrubbed
      // timeline with its events suppressed: that callback fired a handful of
      // times across the entire sequence, which made the panel jump between a
      // few frozen shapes instead of morphing. A child tween's `onUpdate` is
      // part of the render itself and runs on every frame.
      const paint = () => {
        const at = tl.time();
        applyMorph(morphAt(at));
        // Flat only while the geometry is actually travelling. The closing
        // window ends at `handback`, not at the end of the timeline: from there
        // the panel is a resting circle cross-fading with the blob, and the blob
        // is frosted — leaving the surface flat through that swap would show one
        // as milkier than the other.
        setFlat(
          (at < OPEN.to && at >= OPEN.from) ||
            (at >= CLOSE.from && at < CLOSE.to),
        );
      };

      tl.to({}, { duration: PHASE.end, ease: "none", onUpdate: paint }, 0);

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
      // The exact mirror of the handback in P6: the surface is already a 132px
      // circle sitting on the same centre as the blob, so this is a cross-fade
      // between two identical circles — neither one grows during the swap, or
      // the trade reads as a substitution rather than one body of water.
      tl.to(surface, { autoAlpha: 1, duration: 4 }, PHASE.spread);
      tl.to(drop, { autoAlpha: 0, duration: 4 }, PHASE.spread);
      if (handle)
        tl.to(handle, { autoAlpha: 1, duration: 6 }, PHASE.spread + 8);

      // …and only then does it spread, over `OPEN` — see `morphAt`.

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

      // The same morph as P2, run forwards over `CLOSE` — see `morphAt`. Lands
      // exactly on `handback`, where the blob takes over.

      // ── P6 — hand back to the blob, then let it go ─────────────────────
      //
      // Both halves of the swap start at `handback`, which is the frame the
      // clip above finishes on. The panel is a 132px circle by then, centred on
      // exactly the same point as the blob (see `.trust-drop` in globals.css),
      // so this is a cross-fade between two identical circles — the eye reads
      // one object, not a substitution.
      //
      // Nothing here may overlap the release below. These two beats used to run
      // 97→98 against 97→100, both writing `scale` and `autoAlpha` on the SAME
      // element in opposite directions: GSAP keeps both tweens alive, so
      // whichever rendered last won the frame, and a scrubbed playhead sitting
      // on that boundary made the blob strobe in and out.
      tl.to(drop, { autoAlpha: 1, scale: 1, duration: 4 }, PHASE.handback);
      tl.to(surface, { autoAlpha: 0, duration: 4 }, PHASE.handback);

      // The blob is whole and alone before it goes. `release` is deliberately a
      // clear unit past the end of the cross-fade rather than butted against
      // it, so a scrub that overshoots cannot land inside both.
      tl.to(
        drop,
        {
          scale: 0,
          autoAlpha: 0,
          filter: "blur(6px)",
          duration: 4,
          ease: "power2.in",
        },
        PHASE.release,
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
