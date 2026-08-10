"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { aboutCasesSequence } from "@/animations/about-page/cases";
import {
  scale,
  sectionClass,
  stageClass,
  stageStyle,
} from "@/components/portfolio/stage";
import { caseNotes } from "@/data/about";
import { AboutEyebrow } from "./AboutEyebrow";

gsap.registerPlugin(useGSAP);

/**
 * Section 04 — The hardest things I've built. Pinned.
 *
 * The one section that breaks the page's editorial rule on purpose. Everywhere
 * else the page uses rules and bare margins; here the two problems sit on glass
 * cards with a margin annotation beside them, because this is the most
 * convincing material on the page and it benefits from reading as evidence
 * rather than as prose. On the old page it was a paragraph near the bottom.
 *
 * `ac-*` classes are handles for `aboutCasesSequence`.
 */
export function AboutCaseNotes() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // Returned so StrictMode's remount reverts the matchMedia; without it
      // the first run's pinned ScrollTrigger survives and fights the second.
      return aboutCasesSequence(root.current);
    },
    { scope: root },
  );

  return (
    <section ref={root} style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        {/* ---------- head ---------- */}
        <div className="lg:absolute lg:left-[calc(97*var(--s))] lg:top-[calc(113*var(--s))] lg:w-[calc(810*var(--s))]">
          <AboutEyebrow className="ac-head">Case notes</AboutEyebrow>
          <h2 className="ac-head mt-6 text-[clamp(2.25rem,9vw,58px)] font-extrabold leading-[1.04] tracking-[-0.033em] lg:mt-[calc(32*var(--s))] lg:text-[calc(91*var(--s))] lg:leading-[calc(93*var(--s))]">
            The two I had to
            <br />
            solve from first
            <br />
            <span className="text-[hsl(var(--yellow))]">principles.</span>
          </h2>
        </div>

        {/* ---------- margin annotation ---------- */}
        <div className="ac-note mt-8 lg:absolute lg:right-[calc(97*var(--s))] lg:top-[calc(194*var(--s))] lg:mt-0 lg:w-[calc(421*var(--s))] lg:text-right">
          <div className="font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-3))] lg:text-[calc(15*var(--s))]">
            Annotation
          </div>
          <p className="mt-2 text-[15px] italic leading-[1.6] text-[hsl(var(--ink-2))] lg:mt-[calc(10*var(--s))] lg:text-[calc(19*var(--s))] lg:leading-[calc(31*var(--s))]">
            Both had to be reasoned out rather than looked up. That is the part
            worth showing.
          </p>
        </div>

        {/* ---------- the two notes ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:contents">
          {caseNotes.map((note, i) => (
            <article
              key={note.n}
              className={`ac-card relative rounded-[24px] border border-[var(--glass-border)] bg-[var(--glass-fill)] p-[24px] shadow-[var(--shadow)] backdrop-blur-[16px] [transform:translateZ(0)] lg:absolute lg:top-[calc(518*var(--s))] lg:h-[calc(275*var(--s))] lg:w-[calc(680*var(--s))] lg:rounded-[calc(28*var(--s))] lg:px-[calc(42*var(--s))] lg:py-[calc(36*var(--s))] ${
                i === 0
                  ? "lg:left-[calc(97*var(--s))]"
                  : "lg:left-[calc(842*var(--s))]"
              }`}
            >
              <div
                aria-hidden="true"
                className="absolute right-[24px] top-[20px] font-extrabold leading-none text-[rgba(17,17,17,0.18)] text-[32px] lg:right-[calc(42*var(--s))] lg:top-[calc(34*var(--s))] lg:text-[calc(55*var(--s))]"
              >
                {note.n}
              </div>

              <div className="font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-3))] lg:text-[calc(15*var(--s))]">
                {note.context}
              </div>

              <h3 className="mt-3 pr-[52px] text-[21px] font-extrabold leading-[1.15] tracking-[-0.02em] lg:mt-[calc(11*var(--s))] lg:pr-[calc(70*var(--s))] lg:text-[calc(34*var(--s))]">
                {note.title}
              </h3>

              <p className="mt-3 text-[15px] leading-[1.6] text-[hsl(var(--ink-2))] lg:mt-[calc(18*var(--s))] lg:text-[calc(19*var(--s))] lg:leading-[calc(30*var(--s))]">
                {note.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
