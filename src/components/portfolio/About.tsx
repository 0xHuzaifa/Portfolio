"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { aboutSequence } from "@/animations/about";
import { scale, sectionClass, stageClass, stageStyle } from "./stage";

gsap.registerPlugin(useGSAP);

/**
 * Follows the about3 reference (1536x700), re-fitted onto the shared 1620x875
 * canvas. The quote that used to live here is now its own section.
 *
 * The `ab-*` classes are handles for `aboutSequence`, which walks the portrait
 * into its frame and then assembles the claims around it on scroll.
 */

/** The three statements, each clipped to its own box so it can rise out of it. */
const claims = ["Engineer.", "Problem Solver.", "System Builder."] as const;
const stats: { value: string; label: string; icon: React.ReactNode }[] = [
  {
    value: "80+",
    label: "Projects Delivered",
    icon: (
      <>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </>
    ),
  },
  {
    value: "3+",
    label: "Years Experience",
    icon: (
      <>
        <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
        <path d="M3 9h18M8 2.5v4M16 2.5v4" />
      </>
    ),
  },
  {
    value: "50K+",
    label: "Users Impacted",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.5 19a6.5 6.5 0 0 1 13 0" />
        <path d="M16.5 5.6a3 3 0 0 1 0 5.2M21 19a6.5 6.5 0 0 0-4.5-6.2" />
      </>
    ),
  },
  {
    value: "100%",
    label: "Commitment to Quality",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </>
    ),
  },
];

function Glyph({
  children,
  className,
  width = 1.9,
}: {
  children: React.ReactNode;
  className: string;
  width?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // Returned so StrictMode's remount reverts the matchMedia; without it the
      // first run's pinned ScrollTrigger survives and fights the second.
      return aboutSequence(root.current);
    },
    { scope: root },
  );

  return (
    <section ref={root} style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        {/* ---------- left column ---------- */}
        <div className="ab-eyebrow flex items-center gap-[14px] lg:absolute lg:left-[calc(116*var(--s))] lg:top-[calc(140*var(--s))] lg:z-[5] lg:gap-[calc(14*var(--s))]">
          <span className="ab-eyebrow-rule h-[3px] w-[31px] rounded-[2px] bg-[hsl(var(--yellow))] lg:w-[calc(31*var(--s))]" />
          <span className="font-data text-[12px] font-semibold uppercase tracking-[0.18em] lg:text-[calc(14*var(--s))]">
            About Me
          </span>
        </div>

        <h2 className="mt-6 text-[clamp(2.25rem,9vw,67px)] font-extrabold leading-[0.96] tracking-[-0.03em] lg:absolute lg:left-[calc(119*var(--s))] lg:top-[calc(195*var(--s))] lg:z-[5] lg:mt-0 lg:text-[calc(67*var(--s))] lg:leading-[calc(64*var(--s))]">
          {claims.map((claim, i) => (
            // The line-height here is tighter than the type size, so a bare
            // mask would shave the descender off "System Builder." The
            // clearance is padded onto the INNER span — the one that moves —
            // rather than the wrapper, so it counts towards the height the
            // reveal translates by and the text still clears the mask
            // completely at yPercent 110. The wrapper pulls the same amount
            // back off as negative margin, so the line advance is unchanged.
            <span
              key={claim}
              className="ab-line -mb-[0.22em] block overflow-hidden"
            >
              <span
                className={`ab-line-text block pb-[0.22em] ${
                  i === claims.length - 1 ? "text-[hsl(var(--yellow-deep))]" : ""
                }`}
              >
                {claim}
              </span>
            </span>
          ))}
        </h2>

        <p className="ab-lead mt-6 max-w-[460px] text-[17px] leading-[1.5] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(117*var(--s))] lg:top-[calc(416*var(--s))] lg:z-[5] lg:mt-0 lg:w-[calc(440*var(--s))] lg:max-w-none lg:text-[calc(18*var(--s))] lg:leading-[calc(26*var(--s))]">
          I help businesses turn complex problems into scalable, reliable, and
          impactful digital systems.
        </p>

        <Link
          href="/about"
          className="ab-cta mt-8 inline-flex h-[48px] items-center gap-[12px] rounded-[14px] border border-[var(--glass-border)] bg-[var(--glass-fill-strong)] px-[22px] text-[15px] font-bold shadow-[var(--shadow-sm)] backdrop-blur-[16px] transition-transform duration-200 ease-[var(--ease)] [transform:translateZ(0)] hover:-translate-y-[3px] lg:absolute lg:left-[calc(116*var(--s))] lg:top-[calc(529*var(--s))] lg:z-[5] lg:mt-0 lg:h-[calc(50*var(--s))] lg:gap-[calc(12*var(--s))] lg:rounded-[calc(14*var(--s))] lg:px-[calc(24*var(--s))] lg:text-[calc(16*var(--s))]"
        >
          Know more about me
          <Glyph
            width={2}
            className="h-[15px] w-[15px] lg:h-[calc(15*var(--s))] lg:w-[calc(15*var(--s))]"
          >
            <path d="M7 17L17 7M8 7h9v9" />
          </Glyph>
        </Link>

        {/* ---------- portrait card ----------
            The frame clips, which is the whole mechanism: the sequence walks
            the portrait up from below this box's bottom edge. */}
        <div className="ab-frame relative mt-10 h-[320px] overflow-hidden rounded-[28px] border border-[var(--glass-border)] bg-[hsl(var(--beige-2))] shadow-[var(--shadow)] sm:h-[420px] lg:absolute lg:left-[calc(773*var(--s))] lg:top-[calc(98*var(--s))] lg:z-[2] lg:mt-0 lg:h-[calc(510*var(--s))] lg:w-[calc(704*var(--s))] lg:rounded-[calc(28*var(--s))]">
          <Image
            src="/no-bg-profile.png"
            alt="Huzaifa Ahmed"
            width={1024}
            height={1024}
            className="ab-portrait pointer-events-none absolute bottom-0 left-1/2 h-auto w-[74%] max-w-none -translate-x-1/2 select-none object-contain"
          />
        </div>

        {/* availability chip, overhanging the card's bottom-right corner */}
        <div className="ab-chip mt-4 flex items-center justify-between gap-4 rounded-[18px] border border-white/70 bg-white/[0.62] p-[18px] shadow-[0_10px_26px_rgba(0,0,0,0.08)] backdrop-blur-[10px] [transform:translateZ(0)] lg:absolute lg:left-[calc(1192*var(--s))] lg:top-[calc(513*var(--s))] lg:z-[4] lg:mt-0 lg:h-[calc(95*var(--s))] lg:w-[calc(297*var(--s))] lg:gap-0 lg:rounded-[calc(18*var(--s))] lg:px-[calc(22*var(--s))] lg:py-0">
          <div>
            <div className="flex items-center gap-[9px] text-[15px] font-bold lg:gap-[calc(9*var(--s))] lg:text-[calc(16*var(--s))]">
              {/* Status light. Pulses on its own clock in CSS — the sequence
                  deliberately never touches it, so it keeps breathing once the
                  scroll has moved on. */}
              <span className="ab-live h-[9px] w-[9px] rounded-full bg-[hsl(var(--yellow))] lg:h-[calc(9*var(--s))] lg:w-[calc(9*var(--s))]" />
              Based in Pakistan
            </div>
            <div className="mt-[6px] text-[13px] text-[hsl(var(--ink-2))] lg:mt-[calc(7*var(--s))] lg:text-[calc(14*var(--s))]">
              Available for new opportunities
            </div>
          </div>
          <Glyph className="h-[22px] w-[22px] flex-none text-[hsl(var(--yellow-deep))] lg:h-[calc(26*var(--s))] lg:w-[calc(26*var(--s))]">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
          </Glyph>
        </div>

        {/* ---------- divider + stat cards ---------- */}
        <div className="ab-rule mt-10 hidden h-px bg-[var(--ink-a08)] lg:absolute lg:left-[calc(116*var(--s))] lg:top-[calc(649*var(--s))] lg:z-[2] lg:mt-0 lg:block lg:w-[calc(1388*var(--s))]" />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:absolute lg:left-[calc(123*var(--s))] lg:top-[calc(672*var(--s))] lg:z-[3] lg:mt-0 lg:flex lg:h-[calc(135*var(--s))] lg:w-[calc(1356*var(--s))] lg:gap-[calc(27*var(--s))]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="ab-stat flex items-center gap-[16px] rounded-[20px] border border-[var(--glass-border)] bg-[var(--glass-fill)] p-[20px] shadow-[var(--shadow-sm)] backdrop-blur-[16px] [transform:translateZ(0)] lg:flex-1 lg:gap-[calc(18*var(--s))] lg:rounded-[calc(20*var(--s))] lg:px-[calc(24*var(--s))] lg:py-0"
            >
              <span className="flex h-[48px] w-[48px] flex-none items-center justify-center rounded-[14px] bg-[hsl(var(--yellow))] lg:h-[calc(50*var(--s))] lg:w-[calc(50*var(--s))] lg:rounded-[calc(14*var(--s))]">
                <Glyph className="h-[22px] w-[22px] lg:h-[calc(24*var(--s))] lg:w-[calc(24*var(--s))]">
                  {stat.icon}
                </Glyph>
              </span>
              <div>
                <div className="text-[28px] font-extrabold leading-none tracking-[-0.02em] lg:text-[calc(32*var(--s))]">
                  {stat.value}
                </div>
                <div className="mt-[6px] text-[14px] text-[hsl(var(--ink-2))] lg:mt-[calc(8*var(--s))] lg:text-[calc(15*var(--s))]">
                  {stat.label}
                </div>
                <div className="ab-stat-bar mt-[8px] h-[3px] w-[30px] bg-[hsl(var(--yellow))] lg:mt-[calc(9*var(--s))] lg:w-[calc(34*var(--s))]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
