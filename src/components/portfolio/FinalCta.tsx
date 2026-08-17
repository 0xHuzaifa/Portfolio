"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRef } from "react";
import { finalCtaSequence } from "@/animations/final-cta";
import { scale, sectionClass, stageClass, stageStyle } from "./stage";

gsap.registerPlugin(useGSAP);

/**
 * Re-fitted from the design's 1620x1400 stage onto the shared 1620x875 canvas.
 * The footer half of the original design is now its own half-height section.
 *
 * The `fc-*` classes are handles for `finalCtaSequence`, which lets the pitch
 * arrive plainly and spends the section's motion on the button.
 */

/**
 * Split so the sequence can bring them in one statement at a time. The last
 * line is the one the design sets in yellow; its full stop stays in ink.
 */
const headline = [
  "Have an idea?",
  "Let’s engineer",
  "something exceptional",
] as const;

const assurances: { title: string; body: string; icon: React.ReactNode }[] = [
  {
    title: "Fast Response",
    body: "Within 24 hours",
    icon: <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />,
  },
  {
    title: "Confidential",
    body: "Your ideas are safe",
    icon: <path d="M12 3l7 3v5c0 4.6-3.1 7.6-7 9-3.9-1.4-7-4.4-7-9V6l7-3z" />,
  },
  {
    title: "Founder Focused",
    body: "I understand your goals",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </>
    ),
  },
  {
    title: "Results Driven",
    body: "Impact that matters",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </>
    ),
  },
];

const panel =
  "rounded-[26px] border border-[var(--glass-border)] bg-[var(--glass-fill)] shadow-[var(--shadow)] backdrop-blur-[16px] [transform:translateZ(0)]";

function Glyph({
  children,
  className,
  width = 2,
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

export function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // Returned so StrictMode's remount reverts the matchMedia; without it the
      // first run's pinned ScrollTrigger survives and fights the second.
      return finalCtaSequence(root.current);
    },
    { scope: root },
  );

  return (
    <section ref={root} style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        {/* background wordmark */}
        <div
          aria-hidden="true"
          className="fc-word pointer-events-none absolute right-[calc(20*var(--s))] top-[calc(90*var(--s))] hidden select-none font-extrabold leading-none tracking-[0.02em] text-[rgba(17,17,17,0.045)] lg:block lg:text-[calc(230*var(--s))]"
        >
          START
        </div>

        {/* ---------- head ---------- */}
        <div className="fc-eyebrow flex items-center gap-[16px] lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(110*var(--s))] lg:z-[5] lg:gap-[calc(16*var(--s))]">
          <span className="fc-eyebrow-rule h-[3px] w-[44px] rounded-[2px] bg-[hsl(var(--yellow))] lg:w-[calc(44*var(--s))]" />
          <span className="font-data text-[12px] font-semibold uppercase tracking-[0.18em] lg:text-[calc(14*var(--s))]">
            Let&rsquo;s build something great
          </span>
        </div>

        {/* Block spans rather than `<br />`, so each line is an element the
            sequence can bring in on its own beat. */}
        <h2 className="mt-6 text-[clamp(2.5rem,10vw,116px)] font-extrabold leading-none tracking-[-0.035em] lg:absolute lg:left-[calc(62*var(--s))] lg:top-[calc(145*var(--s))] lg:z-[5] lg:mt-0 lg:text-[calc(88*var(--s))] lg:leading-[calc(88*var(--s))]">
          {headline.map((line, i) => (
            <span key={line} className="fc-line block">
              {i === headline.length - 1 ? (
                <>
                  <span className="text-[hsl(var(--yellow-deep))]">{line}</span>.
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </h2>

        <p className="fc-lead mt-6 max-w-[520px] text-[19px] leading-[1.45] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(435*var(--s))] lg:z-[5] lg:mt-0 lg:w-[calc(560*var(--s))] lg:max-w-none lg:text-[calc(19*var(--s))] lg:leading-[calc(28*var(--s))]">
          I partner with ambitious founders and businesses to build digital
          systems that solve real problems and drive growth.
        </p>

        {/* ---------- primary CTA — design 70,864 · 642x108 ---------- */}
        <Link
          href="/contact"
          className="fc-cta mt-10 flex h-[84px] items-center gap-[18px] rounded-full pl-[26px] pr-[10px] [background:linear-gradient(95deg,#f8f45a_0%,#f2ee34_55%,#ece52a_100%)] shadow-[0_26px_50px_rgba(246,242,60,0.5)] transition-transform duration-200 ease-[var(--ease)] [transform:translateZ(0)] hover:-translate-y-[3px] lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(530*var(--s))] lg:z-[5] lg:mt-0 lg:h-[calc(90*var(--s))] lg:w-[calc(600*var(--s))] lg:gap-[calc(20*var(--s))] lg:pl-[calc(30*var(--s))] lg:pr-[calc(12*var(--s))]"
        >
          <Glyph className="h-[26px] w-[26px] flex-none lg:h-[calc(30*var(--s))] lg:w-[calc(30*var(--s))]">
            <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
            <path d="M3 9h18M8 2.5v4M16 2.5v4" />
          </Glyph>
          <span className="text-[21px] font-extrabold tracking-[-0.01em] lg:text-[calc(23*var(--s))]">
            Book a Strategy Call
          </span>
          <span className="fc-cta-orb ml-auto flex h-[64px] w-[64px] flex-none items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] lg:h-[calc(66*var(--s))] lg:w-[calc(66*var(--s))]">
            <Glyph className="h-[26px] w-[26px] lg:h-[calc(30*var(--s))] lg:w-[calc(30*var(--s))]">
              <path d="M7 17L17 7M8 7h9v9" />
            </Glyph>
          </span>
        </Link>

        {/* email line — design 74,1014 + 120,1046 */}
        <div className="fc-email mt-8 flex items-center gap-[12px] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(74*var(--s))] lg:top-[calc(645*var(--s))] lg:z-[5] lg:mt-0 lg:gap-[calc(12*var(--s))]">
          <Glyph className="h-[18px] w-[18px] lg:h-[calc(20*var(--s))] lg:w-[calc(20*var(--s))]">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </Glyph>
          <span className="text-[15px] lg:text-[calc(17*var(--s))]">
            Or email me directly
          </span>
        </div>
        {/* The rule is its own element, not a border, so the sequence can draw
            it. It renders solid by default; only the lg motion path collapses
            it. */}
        <a
          href="mailto:huzaifa.rb00@gmail.com"
          className="fc-mail relative mt-2 inline-block pb-[3px] text-[18px] font-bold transition-opacity hover:opacity-70 lg:absolute lg:left-[calc(120*var(--s))] lg:top-[calc(672*var(--s))] lg:z-[5] lg:mt-0 lg:text-[calc(20*var(--s))]"
        >
          huzaifa.rb00@gmail.com
          <span
            aria-hidden="true"
            className="fc-mail-rule absolute inset-x-0 bottom-0 h-[2px] bg-[hsl(var(--yellow))]"
          />
        </a>

        {/* ---------- availability card — design 832,864 · 718x206 ---------- */}
        <div
          className={`fc-avail relative mt-10 overflow-hidden p-[28px] ${panel} lg:absolute lg:left-[calc(832*var(--s))] lg:top-[calc(530*var(--s))] lg:z-[5] lg:mt-0 lg:h-[calc(180*var(--s))] lg:w-[calc(718*var(--s))] lg:rounded-[calc(26*var(--s))] lg:px-[calc(36*var(--s))] lg:py-[calc(30*var(--s))]`}
        >
          <div className="fc-avail-row flex items-center gap-[11px] text-[18px] font-bold lg:gap-[calc(11*var(--s))] lg:text-[calc(20*var(--s))]">
            <span className="h-[11px] w-[11px] rounded-full bg-[hsl(var(--yellow))] lg:h-[calc(11*var(--s))] lg:w-[calc(11*var(--s))]" />
            Available for new projects
          </div>
          <p className="fc-avail-row mt-[18px] max-w-[340px] text-[16px] leading-[1.45] text-[hsl(var(--ink-2))] lg:mt-[calc(20*var(--s))] lg:max-w-[calc(340*var(--s))] lg:text-[calc(19*var(--s))]">
            Accepting selected projects for Q4 2026
          </p>
          <svg
            aria-hidden="true"
            viewBox="0 0 130 130"
            fill="none"
            stroke="rgba(17,17,17,0.28)"
            strokeWidth="1"
            className="fc-avail-row pointer-events-none absolute right-[calc(44*var(--s))] top-[calc(38*var(--s))] hidden lg:block lg:h-[calc(130*var(--s))] lg:w-[calc(130*var(--s))]"
          >
            <circle cx="65" cy="65" r="55" />
            <ellipse cx="65" cy="65" rx="24" ry="55" />
            <ellipse cx="65" cy="65" rx="45" ry="55" />
            <line x1="10" y1="65" x2="120" y2="65" />
            <ellipse cx="65" cy="65" rx="55" ry="24" />
            <ellipse cx="65" cy="65" rx="55" ry="45" />
          </svg>
          <span className="fc-avail-row absolute bottom-[calc(44*var(--s))] right-[calc(52*var(--s))] hidden rounded-full bg-[hsl(var(--yellow))] lg:block lg:h-[calc(12*var(--s))] lg:w-[calc(12*var(--s))]" />
        </div>

        {/* ---------- assurances — design 70,1150 · 1480x132 ---------- */}
        <div
          className={`fc-assure mt-8 grid grid-cols-1 gap-6 p-[24px] sm:grid-cols-2 ${panel} lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(745*var(--s))] lg:z-[4] lg:mt-0 lg:flex lg:h-[calc(105*var(--s))] lg:w-[calc(1480*var(--s))] lg:items-center lg:gap-0 lg:rounded-[calc(26*var(--s))] lg:px-[calc(20*var(--s))] lg:py-0`}
        >
          {assurances.map((item) => (
            <div
              key={item.title}
              className="fc-assure-item flex items-center gap-[16px] lg:flex-1 lg:gap-[calc(16*var(--s))] lg:px-[calc(26*var(--s))]"
            >
              <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full bg-white shadow-[0_6px_16px_rgba(0,0,0,0.06)] lg:h-[calc(50*var(--s))] lg:w-[calc(50*var(--s))]">
                <Glyph className="h-[20px] w-[20px] lg:h-[calc(22*var(--s))] lg:w-[calc(22*var(--s))]">
                  {item.icon}
                </Glyph>
              </span>
              <div>
                <div className="text-[15px] font-bold lg:text-[calc(16*var(--s))]">
                  {item.title}
                </div>
                <div className="mt-[4px] text-[13px] text-[hsl(var(--ink-2))] lg:mt-[calc(4*var(--s))] lg:text-[calc(14*var(--s))]">
                  {item.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
