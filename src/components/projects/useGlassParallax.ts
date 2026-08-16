"use client";

import { type RefObject, useEffect } from "react";

/**
 * Pointer parallax for the projects hero's glass cards.
 *
 * Writes two unitless values in [-1, 1] onto the section — `--px` and `--py` —
 * which each card multiplies by its own few pixels. Keeping the shared signal
 * unitless is what lets the deck drift further than the stat card without the
 * hook knowing anything about either.
 *
 * One listener on the section rather than one per card, and the per-card
 * highlight is resolved through `closest()` on the event target, so a move
 * costs a single `getBoundingClientRect` instead of one for every card.
 *
 * Reduced motion gets no listener at all: the custom properties stay unset and
 * every `var(--px, 0)` falls back to zero.
 */

/** Cards the highlight can land on. */
const CARD = ".glass-card";

export function useGlassParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let lit: HTMLElement | null = null;

    const onMove = (event: PointerEvent) => {
      // Coalesced into one write per frame; pointermove fires far faster than
      // the compositor can use.
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;

        const box = section.getBoundingClientRect();
        const px = (event.clientX - box.left) / box.width - 0.5;
        const py = (event.clientY - box.top) / box.height - 0.5;

        section.style.setProperty("--px", String(px * 2));
        section.style.setProperty("--py", String(py * 2));

        const card = (event.target as Element | null)?.closest?.(
          CARD,
        ) as HTMLElement | null;

        // The previous card keeps its last highlight position otherwise, which
        // reads as the light sticking when the pointer has already left.
        if (lit && lit !== card) {
          lit.style.removeProperty("--mx");
          lit.style.removeProperty("--my");
        }

        lit = card;

        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty(
            "--mx",
            `${((event.clientX - rect.left) / rect.width) * 100}%`,
          );
          card.style.setProperty(
            "--my",
            `${((event.clientY - rect.top) / rect.height) * 100}%`,
          );
        }
      });
    };

    const onLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }

      section.style.removeProperty("--px");
      section.style.removeProperty("--py");

      if (lit) {
        lit.style.removeProperty("--mx");
        lit.style.removeProperty("--my");
        lit = null;
      }
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, [ref]);
}
