"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { trustSequence } from "@/animations/trust";
import { Hero } from "./Hero";
import { Trust } from "./Trust";

gsap.registerPlugin(useGSAP);

/**
 * Holds the hero and Trust together so one pinned ScrollTrigger can play them
 * as a single scene: the hero stays under the visitor while the drop lands on
 * it and becomes the Trust panel.
 *
 * Server-rendered as two ordinary stacked sections. The overlay layout is
 * switched on by `trustSequence` only once it knows the viewport and the
 * visitor's motion preference allow it, so this degrades to the plain
 * hero-then-Trust page everywhere else.
 */
export function HeroTrustStage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // The return value MUST be handed back to useGSAP. React runs effects
      // twice under StrictMode, and `trustSequence` builds a gsap.matchMedia
      // that a context revert does not reach on its own — drop this and the
      // first run survives the remount, leaving two timelines and two pinned
      // ScrollTriggers scrubbing the same elements against each other.
      return trustSequence(root.current);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="trust-stage relative w-full">
      <Hero />
      <Trust />
    </div>
  );
}
