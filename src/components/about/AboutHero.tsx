"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { aboutHeroSequence } from "@/animations/about-page/hero";
import {
  scale,
  sectionClass,
  stageClass,
  stageStyle,
} from "@/components/portfolio/stage";
import { originFacts } from "@/data/about";
import { AboutEyebrow } from "./AboutEyebrow";

gsap.registerPlugin(useGSAP);

/**
 * Section 01 — Who I am. Pinned.
 *
 * Editorial: the portrait is a plate bleeding off the left edge of the canvas,
 * the headline is set large across the right, and the three credentials sit
 * bare in the margin with no cards and no icons. The "300,000+ applicants"
 * figure gets real size here for the first time — on the old page it was a line
 * of small grey text near the bottom.
 *
 * The plate is deliberately flush to the canvas edges (left 0, bottom 875) so
 * it reads as cropped by the page rather than placed on it — a different
 * treatment from the Hero's floating cut-out and the homepage About's
 * step-into-frame, using the same photograph.
 *
 * `ah-*` classes are handles for `aboutHeroSequence`.
 */
export function AboutHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // Returned so StrictMode's remount reverts the matchMedia; without it
      // the first run's pinned ScrollTrigger survives and fights the second.
      return aboutHeroSequence(root.current);
    },
    { scope: root },
  );

  return (
    <section ref={root} style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        {/* background numeral, cropped by the bottom edge */}
        <div
          aria-hidden="true"
          className="ah-ghost pointer-events-none absolute hidden select-none font-extrabold leading-[0.7] tracking-[-0.02em] text-[rgba(17,17,17,0.05)] lg:block lg:bottom-[calc(-114*var(--s))] lg:right-[calc(16*var(--s))] lg:text-[calc(486*var(--s))]"
        >
          01
        </div>

        {/* ---------- portrait plate — flush left, flush bottom ---------- */}
        <div className="ah-plate relative mt-8 h-[340px] overflow-hidden rounded-[24px] bg-[hsl(var(--beige-2))] sm:h-[440px] lg:absolute lg:left-0 lg:top-[calc(80*var(--s))] lg:mt-0 lg:h-[calc(795*var(--s))] lg:w-[calc(520*var(--s))] lg:rounded-[0_calc(48*var(--s))_0_0]">
          <Image
            src="/no-bg-profile.png"
            alt="Huzaifa Ahmed"
            width={1024}
            height={1024}
            priority
            className="ah-portrait pointer-events-none absolute bottom-0 left-1/2 h-auto w-[78%] max-w-none -translate-x-1/2 select-none object-contain lg:w-[104%]"
          />
        </div>

        {/* ---------- headline column ---------- */}
        <div className="mt-10 lg:absolute lg:left-[calc(616*var(--s))] lg:top-[calc(128*var(--s))] lg:mt-0 lg:w-[calc(940*var(--s))]">
          <AboutEyebrow className="ah-head">About</AboutEyebrow>

          <h1 className="ah-head mt-6 text-[clamp(2.5rem,10vw,72px)] font-extrabold leading-[1.0] tracking-[-0.035em] lg:mt-[calc(38*var(--s))] lg:text-[calc(116*var(--s))] lg:leading-[calc(114*var(--s))]">
            I build the
            <br />
            systems teams
            <br />
            actually <span className="text-[hsl(var(--yellow))]">live in.</span>
          </h1>

          <div className="ah-head-rule mt-8 h-px w-[240px] origin-left bg-[var(--ink-a12)] lg:mt-[calc(45*var(--s))] lg:w-[calc(390*var(--s))]" />

          <p className="ah-lead mt-6 max-w-[520px] text-[17px] leading-[1.6] text-[hsl(var(--ink-2))] lg:mt-[calc(32*var(--s))] lg:w-[calc(550*var(--s))] lg:max-w-none lg:text-[calc(19*var(--s))] lg:leading-[calc(31*var(--s))]">
            Nawabshah to Karachi. Computers were never tools &mdash; they were
            puzzles. The question that started all of it:{" "}
            <em>could I build one myself?</em>
          </p>
        </div>

        {/* ---------- credentials, bare in the margin ---------- */}
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 lg:absolute lg:left-[calc(616*var(--s))] lg:top-[calc(744*var(--s))] lg:mt-0 lg:flex-nowrap lg:gap-[calc(96*var(--s))]">
          {originFacts.map((fact) => (
            <div key={fact.label} className="ah-fact">
              <div className="font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-3))] lg:text-[calc(15*var(--s))]">
                {fact.label}
              </div>
              <div className="mt-[6px] whitespace-nowrap text-[18px] font-bold tracking-[-0.01em] lg:mt-[calc(10*var(--s))] lg:text-[calc(28*var(--s))]">
                {fact.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
