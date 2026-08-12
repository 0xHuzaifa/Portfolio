"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRef } from "react";
import { aboutCtaSequence } from "@/animations/about-page/cta";
import {
  scale,
  sectionClass,
  stageClass,
  stageStyle,
} from "@/components/portfolio/stage";
import { AboutEyebrow } from "./AboutEyebrow";

gsap.registerPlugin(useGSAP);

/**
 * Section 09 — Close. Pinned.
 *
 * Same pill button and the same wipe-open treatment as the homepage's final
 * CTA, so both pages end the same way and the button is a recognisable object
 * rather than a new one. `ax-cta` is the wipe handle; `ax-orb` is the disc that
 * lands after the wipe finishes.
 */
export function AboutCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // Returned so StrictMode's remount reverts the matchMedia; without it
      // the first run's pinned ScrollTrigger survives and fights the second.
      return aboutCtaSequence(root.current);
    },
    { scope: root },
  );

  return (
    <section ref={root} style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        {/* background wordmark, cropped by the right edge */}
        <div
          aria-hidden="true"
          className="ax-word pointer-events-none absolute hidden select-none font-extrabold leading-none tracking-[0.02em] text-[rgba(17,17,17,0.045)] lg:block lg:right-[calc(32*var(--s))] lg:top-[calc(97*var(--s))] lg:text-[calc(356*var(--s))]"
        >
          TALK
        </div>

        <div className="lg:absolute lg:left-[calc(97*var(--s))] lg:top-[calc(194*var(--s))] lg:z-[5] lg:w-[calc(972*var(--s))]">
          <AboutEyebrow className="ax-head">Next step</AboutEyebrow>

          <h2 className="ax-head mt-6 text-[clamp(2.25rem,9vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em] lg:mt-[calc(36*var(--s))] lg:text-[calc(97*var(--s))] lg:leading-[calc(99*var(--s))]">
            If you need someone
            <br />
            who thinks in product,
            <br />
            architecture{" "}
            <span className="text-[hsl(var(--yellow))]">and delivery.</span>
          </h2>

          <p className="ax-head mt-6 max-w-[520px] text-[17px] leading-[1.6] text-[hsl(var(--ink-2))] lg:mt-[calc(39*var(--s))] lg:w-[calc(616*var(--s))] lg:max-w-none lg:text-[calc(19*var(--s))] lg:leading-[calc(31*var(--s))]">
            Bring the rough idea, the existing workflow, or the messy process.
            I&rsquo;ll help shape it into something worth building &mdash; and
            worth maintaining after launch.
          </p>
        </div>

        {/* ---------- the button ---------- */}
        <Link
          href="/contact"
          className="ax-cta mt-10 flex h-[84px] items-center gap-[18px] rounded-full pl-[26px] pr-[10px] [background:linear-gradient(95deg,#f8f45a_0%,#f2ee34_55%,#ece52a_100%)] shadow-[0_26px_50px_rgba(246,242,60,0.5)] transition-transform duration-200 ease-[var(--ease)] [transform:translateZ(0)] hover:-translate-y-[3px] lg:absolute lg:left-[calc(97*var(--s))] lg:top-[calc(713*var(--s))] lg:z-[5] lg:mt-0 lg:h-[calc(97*var(--s))] lg:w-[calc(648*var(--s))] lg:gap-[calc(22*var(--s))] lg:pl-[calc(32*var(--s))] lg:pr-[calc(13*var(--s))]"
        >
          <span className="text-[21px] font-extrabold tracking-[-0.01em] lg:text-[calc(25*var(--s))]">
            Book a Strategy Call
          </span>
          <span className="ax-orb ml-auto flex h-[64px] w-[64px] flex-none items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] lg:h-[calc(71*var(--s))] lg:w-[calc(71*var(--s))]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[26px] w-[26px] lg:h-[calc(32*var(--s))] lg:w-[calc(32*var(--s))]"
            >
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
