"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { aboutThinkingSequence } from "@/animations/about-page/thinking";
import {
  scale,
  sectionClass,
  stageClass,
  stageStyle,
} from "@/components/portfolio/stage";

gsap.registerPlugin(useGSAP);

/**
 * Section 07 — How I think, and where I'm going. Pinned.
 *
 * The most human material on the page, so it gets the biggest type and the most
 * empty space around it. The chess line is the detail people actually remember
 * from an about page, which is why it sits on its own beneath the quote rather
 * than being folded into it.
 *
 * `at-*` classes are handles for `aboutThinkingSequence`. The quote is split
 * per line here so the sequence can bring the statement in one clause at a time.
 */
const quoteLines = [
  "Most developers build for",
  "the ticket in front of them.",
] as const;

export function AboutThinking() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // Returned so StrictMode's remount reverts the matchMedia; without it
      // the first run's pinned ScrollTrigger survives and fights the second.
      return aboutThinkingSequence(root.current);
    },
    { scope: root },
  );

  return (
    <section ref={root} style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        {/* oversized opening mark */}
        <div
          aria-hidden="true"
          className="at-mark pointer-events-none absolute hidden select-none font-hand font-bold leading-[0.8] text-[rgba(17,17,17,0.055)] lg:block lg:left-[calc(65*var(--s))] lg:top-[calc(52*var(--s))] lg:text-[calc(356*var(--s))]"
        >
          &ldquo;
        </div>

        {/* ---------- the statement ---------- */}
        <blockquote className="lg:absolute lg:left-[calc(194*var(--s))] lg:top-[calc(178*var(--s))] lg:w-[calc(1005*var(--s))]">
          <p className="text-[clamp(1.9rem,7.5vw,46px)] font-extrabold leading-[1.14] tracking-[-0.033em] lg:text-[calc(71*var(--s))] lg:leading-[calc(81*var(--s))]">
            {quoteLines.map((line) => (
              <span key={line} className="at-line block">
                {line}
              </span>
            ))}
            <span className="at-line block text-[hsl(var(--yellow-deep))]">
              I build for the system
            </span>
            <span className="at-line block text-[hsl(var(--yellow-deep))]">
              that ticket belongs to.
            </span>
          </p>
        </blockquote>

        {/* ---------- chess ---------- */}
        <div className="at-col mt-10 lg:absolute lg:left-[calc(194*var(--s))] lg:top-[calc(583*var(--s))] lg:mt-0 lg:w-[calc(551*var(--s))]">
          <div className="at-col-rule h-[4px] w-[56px] origin-left rounded-[2px] bg-[hsl(var(--yellow))] lg:h-[calc(5*var(--s))] lg:w-[calc(97*var(--s))]" />
          <p className="mt-5 text-[16px] leading-[1.6] text-[hsl(var(--ink-2))] lg:mt-[calc(23*var(--s))] lg:text-[calc(20*var(--s))] lg:leading-[calc(32*var(--s))]">
            I also play chess. Both disciplines share the same logic &mdash;
            read the whole board before you move, not just the piece in front of
            you.
          </p>
        </div>

        {/* ---------- where I'm going ---------- */}
        <div className="at-col mt-8 lg:absolute lg:left-[calc(907*var(--s))] lg:top-[calc(583*var(--s))] lg:mt-0 lg:w-[calc(551*var(--s))]">
          <div className="font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-3))] lg:text-[calc(15*var(--s))]">
            Where I&rsquo;m going
          </div>
          <p className="mt-4 text-[16px] leading-[1.6] text-[hsl(var(--ink-2))] lg:mt-[calc(18*var(--s))] lg:text-[calc(20*var(--s))] lg:leading-[calc(32*var(--s))]">
            Three years out I want to be running my own software house or
            shipping my own SaaS. Every production system I build now is
            practice for that &mdash; not just code that ships, but decisions
            that still hold up six months later.
          </p>
        </div>
      </div>
    </section>
  );
}
