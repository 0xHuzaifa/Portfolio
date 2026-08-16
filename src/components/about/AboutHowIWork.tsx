"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { aboutWorkSequence } from "@/animations/about-page/work";
import {
  scale,
  sectionClass,
  stageClass,
  stageStyle,
} from "@/components/portfolio/stage";
import { credibilityPoints } from "@/data/about";
import { AboutEyebrow } from "./AboutEyebrow";

gsap.registerPlugin(useGSAP);

/**
 * Section 02 — How I work. Pinned.
 *
 * Three claims as ruled columns. No cards: a ghost numeral, a rule, a title and
 * a paragraph. The rule is what the eye follows, which is why each column's
 * rule draws before its text arrives in the sequence.
 *
 * `aw-*` classes are handles for `aboutWorkSequence`.
 */
export function AboutHowIWork() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // Returned so StrictMode's remount reverts the matchMedia; without it
      // the first run's pinned ScrollTrigger survives and fights the second.
      return aboutWorkSequence(root.current);
    },
    { scope: root },
  );

  return (
    <section ref={root} style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        {/* ---------- head ---------- */}
        <div className="lg:absolute lg:left-[calc(97*var(--s))] lg:top-[calc(130*var(--s))] lg:w-[calc(650*var(--s))]">
          <AboutEyebrow className="aw-head">How I work</AboutEyebrow>
          <h2 className="aw-head mt-6 text-[clamp(2.25rem,9vw,60px)] font-extrabold leading-[1.02] tracking-[-0.033em] lg:mt-[calc(36*var(--s))] lg:text-[calc(97*var(--s))] lg:leading-[calc(97*var(--s))]">
            Decisions before
            <br />
            keystrokes<span className="text-[hsl(var(--yellow-deep))]">.</span>
          </h2>
        </div>

        <p className="aw-head mt-6 max-w-[520px] text-[17px] leading-[1.6] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(972*var(--s))] lg:top-[calc(178*var(--s))] lg:mt-0 lg:w-[calc(535*var(--s))] lg:max-w-none lg:text-[calc(19*var(--s))] lg:leading-[calc(31*var(--s))]">
          Most bugs in business systems are UX decisions, not code errors. So
          the work starts before the editor is open.
        </p>

        {/* ---------- three ruled columns ---------- */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 lg:absolute lg:left-[calc(97*var(--s))] lg:top-[calc(470*var(--s))] lg:mt-0 lg:flex lg:w-[calc(1426*var(--s))] lg:gap-[calc(65*var(--s))]">
          {credibilityPoints.map((point) => (
            <div key={point.n} className="aw-col lg:flex-1">
              <div
                aria-hidden="true"
                className="aw-col-ghost font-extrabold leading-[0.72] text-[rgba(17,17,17,0.055)] text-[64px] lg:text-[calc(81*var(--s))]"
              >
                {point.n}
              </div>

              <div className="aw-col-rule mt-4 h-px w-full origin-left bg-[var(--ink-a12)] lg:mt-[calc(16*var(--s))]" />

              <div className="aw-col-title mt-6 text-[22px] font-extrabold leading-[1.1] tracking-[-0.02em] lg:mt-[calc(26*var(--s))] lg:text-[calc(32*var(--s))] lg:leading-[calc(35*var(--s))]">
                {point.title[0]}
                <br />
                {point.title[1]}
              </div>

              <p className="aw-col-body mt-4 text-[15px] leading-[1.6] text-[hsl(var(--ink-2))] lg:mt-[calc(20*var(--s))] lg:text-[calc(19*var(--s))] lg:leading-[calc(31*var(--s))]">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
