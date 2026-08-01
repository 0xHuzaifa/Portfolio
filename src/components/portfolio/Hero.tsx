"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  ArrowRight,
  Brain,
  Calendar,
  Cloud,
  Code,
  Database,
  Layers,
  Lightbulb,
  Rocket,
  Sparkle,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { heroIdle, heroIntro } from "@/animations/hero";

gsap.registerPlugin(useGSAP);

/**
 * Desktop geometry is a 1:1 port of the 1620x971 design reference. Every
 * number below is a measured reference pixel; `--s` scales the whole stage
 * with its own width (container query unit, so it is scrollbar-safe), which
 * keeps proportions exact at any viewport instead of approximating them.
 */
const stageStyle = { containerType: "inline-size" } as const;
/** Contain-fit: the stage never exceeds the viewport on either axis, so the
 *  whole composition reads in one screen with no scroll. 875 is short of the
 *  strip bottom on purpose: the strip is bottom-anchored and bleeds off the
 *  edge, which trades ~13px of its lower rim for ~90px of stage width. */
const scale = {
  ["--s" as string]: "min(calc(100cqw/1620),calc(100svh/875))",
};

const metrics = [
  { icon: Code, value: "80+", label: ["Projects", "Delivered"] },
  { icon: Rocket, value: "3+", label: ["Years of", "Experience"] },
] as const;

const traits = [
  { icon: Lightbulb, label: "Problem Solver" },
  { icon: Layers, label: "Clean Architect" },
  { icon: Sparkle, label: "AI-Integrated" },
  { icon: Target, label: "Detail Oriented" },
  { icon: TrendingUp, label: "Results Driven" },
] as const;

const capabilities = [
  { icon: Code, title: "FULL-STACK EXPERTISE", detail: "MERN/PERN Stack" },
  { icon: Brain, title: "AI INTEGRATION", detail: "LLMs, Agents, Automation" },
  {
    icon: Database,
    title: "SCALABLE BACKENDS",
    detail: "Optimized. Secure. Reliable.",
  },
  { icon: Cloud, title: "CLOUD & DEVOPS", detail: "AWS, Docker, CI/CD" },
  { icon: Zap, title: "FAST & RELIABLE", detail: "On-time. Every time." },
] as const;

const glass =
  "border border-white/[0.35] bg-white/[0.20] shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur-[20px] backdrop-saturate-150 [transform:translateZ(0)]";

/** Floating information panel: frosted, barely-there rim, soft float shadow. */
const floatPanel =
  "border border-white/[0.35] bg-white/[0.20] shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur-[20px] backdrop-saturate-150 [transform:translateZ(0)]";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      heroIntro();
      if (root.current) heroIdle(root.current);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      style={stageStyle}
      className="relative w-full overflow-hidden bg-[hsl(var(--beige-1))] text-[hsl(var(--ink-1))] lg:grid lg:h-svh lg:items-end lg:justify-items-center"
    >
      <div
        style={scale}
        className="relative flex flex-col px-6 pb-10 pt-[88px] md:px-8 lg:block lg:h-[calc(875*var(--s))] lg:w-[calc(1620*var(--s))] lg:px-0 lg:pb-0 lg:pt-0"
      >
        {/* ---------- backdrop: wordmark + portrait ---------- */}
        <div
          style={scale}
          className="pointer-events-none absolute inset-x-0 top-[88px] h-[86vw] select-none lg:inset-0 lg:h-full"
        >
          {/* The mask is the word's own box, so the reveal line is its
              baseline — it rises out of itself, not off the screen. */}
          <div
            aria-hidden="true"
            // ref: cap-height band y 82-343, left edge x 36
            className="hero-wordmark absolute inset-x-0 top-[14%] overflow-hidden text-center lg:inset-x-auto lg:left-[calc(30*var(--s))] lg:top-[calc(41*var(--s))]"
            style={scale}
          >
            <div className="hero-wordmark-text text-[21.7vw] font-extrabold leading-none tracking-[0.02em] text-[hsl(var(--yellow))] lg:text-[calc(346*var(--s))]">
              HUZAIFA
            </div>
          </div>
          <Image
            src="/no-bg-profile.png"
            alt="Huzaifa — full-stack developer"
            width={1024}
            height={1024}
            priority
            // ref: subject centred at x 852, image box 857px tall from y 77
            className="hero-portrait absolute bottom-0 left-1/2 h-[76%] w-auto max-w-none -translate-x-1/2 object-contain lg:bottom-auto lg:left-[calc(848*var(--s))] lg:top-[calc(77*var(--s))] lg:h-[calc(728*var(--s))]"
            style={scale}
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,hsl(var(--beige-1)),transparent)] lg:hidden" />
        </div>

        {/* ---------- foreground ---------- */}
        <div
          className="relative z-10 flex flex-col gap-12 pt-[88vw] lg:block lg:gap-0 lg:pt-0"
          style={scale}
        >
          {/* copy column — ref x 60 */}
          <div className="lg:absolute lg:left-[calc(60*var(--s))] lg:top-[calc(378*var(--s))] lg:w-[calc(380*var(--s))]">
            <p className="hero-support text-[14px] font-bold leading-[1.2] tracking-[0.02em] lg:text-[calc(14*var(--s))]">
              FULL-STACK DEVELOPER (MERN/PERN)
            </p>
            <h1 className="hero-left mt-[22px] text-[clamp(2.75rem,11vw,62px)] font-extrabold leading-[1.03] tracking-[-0.03em] lg:mt-[calc(19*var(--s))] lg:text-[calc(62*var(--s))]">
              I Build<span className="text-[hsl(var(--yellow))]">.</span>
              <br />
              Ship<span className="text-[hsl(var(--yellow))]">.</span>
              <br />
              Scale<span className="text-[hsl(var(--yellow))]">.</span>
            </h1>
            <p className="hero-support mt-[26px] max-w-[300px] text-[16px] leading-[1.56] text-[hsl(var(--ink-2))] lg:mt-[calc(20*var(--s))] lg:max-w-[calc(285*var(--s))] lg:text-[calc(16*var(--s))]">
              I build production-grade web systems with clean architecture,
              powerful APIs, and exceptional user experiences.
            </p>
            <div className="mt-[30px] flex gap-[21px] lg:mt-[calc(24*var(--s))] lg:gap-[calc(21*var(--s))]">
              <Link
                href="/contact"
                className="hero-cta group relative isolate inline-flex h-[48px] shrink-0 items-center gap-[10px] overflow-hidden whitespace-nowrap rounded-2xl border border-[hsl(var(--yellow))] px-[20px] text-[16px] font-bold shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-200 ease-[var(--ease)] hover:-translate-y-[2px] hover:shadow-[var(--shadow)] lg:h-[calc(48*var(--s))] lg:gap-[calc(10*var(--s))] lg:px-[calc(20*var(--s))] lg:text-[calc(16*var(--s))]"
              >
                {/* the poured liquid: rises from below, its surface drifting */}
                <span
                  aria-hidden="true"
                  className="hero-fill absolute inset-x-0 bottom-0 -z-10 h-full bg-[hsl(var(--yellow))] transition-colors duration-200 group-hover:bg-[hsl(var(--yellow-deep))]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    className="hero-wave absolute -top-[7px] left-0 h-[8px] w-[200%] fill-[hsl(var(--yellow))] transition-colors duration-200 group-hover:fill-[hsl(var(--yellow-deep))]"
                  >
                    <path d="M0 12V6q12.5-6 25 0t25 0 25 0 25 0 25 0 25 0 25 0 25 0v6z" />
                  </svg>
                </span>
                <Calendar className="hero-fill-icon h-[18px] w-[18px] lg:h-[calc(18*var(--s))] lg:w-[calc(18*var(--s))]" />
                Book a Call
              </Link>
              <Link
                href="/systems"
                className={`hero-cta inline-flex h-[48px] shrink-0 items-center gap-[10px] whitespace-nowrap rounded-2xl px-[22px] text-[16px] font-bold transition-transform duration-200 ease-[var(--ease)] hover:-translate-y-[3px] ${glass} lg:h-[calc(48*var(--s))] lg:gap-[calc(10*var(--s))] lg:px-[calc(22*var(--s))] lg:text-[calc(16*var(--s))]`}
              >
                View My Work
                <ArrowRight className="h-[18px] w-[18px] lg:h-[calc(18*var(--s))] lg:w-[calc(18*var(--s))]" />
              </Link>
            </div>
          </div>

          {/* metric cards — ref 429/437 and 443/581, both right-aligned to x 623 */}
          <div className="flex flex-wrap gap-4 lg:contents">
            {metrics.map(({ icon: Icon, value, label }, i) => (
              <div
                key={value}
                className={`hero-card flex items-center gap-[14px] rounded-[24px] p-[16px] ${floatPanel} ${
                  i === 0
                    ? "lg:absolute lg:left-[calc(429*var(--s))] lg:top-[calc(437*var(--s))] lg:w-[calc(194*var(--s))]"
                    : "lg:absolute lg:left-[calc(443*var(--s))] lg:top-[calc(581*var(--s))] lg:w-[calc(196*var(--s))]"
                } lg:gap-[calc(14*var(--s))] lg:rounded-[calc(24*var(--s))] lg:p-[calc(14*var(--s))]`}
              >
                <span className="hero-accent flex h-[61px] w-[61px] flex-none items-center justify-center rounded-[16px] bg-[hsl(var(--yellow))] lg:h-[calc(61*var(--s))] lg:w-[calc(61*var(--s))] lg:rounded-[calc(16*var(--s))]">
                  <Icon
                    className="h-[28px] w-[28px] lg:h-[calc(28*var(--s))] lg:w-[calc(28*var(--s))]"
                    strokeWidth={2.2}
                  />
                </span>
                <div>
                  <div className="text-[26px] font-extrabold leading-none tracking-[-0.02em] lg:text-[calc(26*var(--s))]">
                    {value}
                  </div>
                  <div className="mt-[5px] text-[14px] leading-[1.18] text-[hsl(var(--ink-2))] lg:mt-[calc(5*var(--s))] lg:text-[calc(13*var(--s))]">
                    {label[0]}
                    <br />
                    {label[1]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* trait panel — ref 1099/381, 191x224 */}
          <div
            className={`hero-card flex flex-col gap-[13px] rounded-[24px] px-[21px] py-[16px] ${floatPanel} lg:absolute lg:left-[calc(1099*var(--s))] lg:top-[calc(381*var(--s))] lg:w-[calc(191*var(--s))] lg:gap-[calc(13*var(--s))] lg:rounded-[calc(24*var(--s))] lg:px-[calc(21*var(--s))] lg:py-[calc(16*var(--s))]`}
          >
            {traits.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-[11px] lg:gap-[calc(11*var(--s))]"
              >
                <span className="flex h-[28px] w-[28px] flex-none items-center justify-center rounded-[8px] bg-[hsl(var(--yellow))] lg:h-[calc(28*var(--s))] lg:w-[calc(28*var(--s))] lg:rounded-[calc(8*var(--s))]">
                  <Icon
                    className="h-[15px] w-[15px] lg:h-[calc(15*var(--s))] lg:w-[calc(15*var(--s))]"
                    strokeWidth={2.1}
                  />
                </span>
                <span className="whitespace-nowrap text-[14px] font-bold tracking-[-0.01em] lg:text-[calc(14*var(--s))]">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* tagline — ref x 1319, text box top 620, rule at y 719 */}
          <div className="hero-right lg:absolute lg:left-[calc(1319*var(--s))] lg:top-[calc(618*var(--s))] lg:w-[calc(255*var(--s))]">
            <p className="text-[20px] leading-[1.5] lg:text-[calc(20*var(--s))]">
              Turning ideas into powerful{" "}
              <strong className="font-bold">digital products</strong> that
              create <strong className="font-bold">real impact.</strong>
            </p>
            <div className="mt-[18px] h-[5px] w-[55px] rounded-[2px] bg-[hsl(var(--yellow))] lg:mt-[calc(11*var(--s))] lg:h-[calc(5*var(--s))] lg:w-[calc(55*var(--s))] lg:rounded-[calc(2*var(--s))]" />
          </div>

          {/* capability strip — ref 30/805, 1558x105 */}
          <div
            className={`hero-strip grid grid-cols-1 overflow-hidden rounded-[22px] ${glass} sm:grid-cols-2 lg:absolute lg:left-[calc(30*var(--s))] lg:top-[calc(785*var(--s))] lg:grid-cols-5 lg:h-[calc(105*var(--s))] lg:w-[calc(1558*var(--s))] lg:rounded-b-none lg:rounded-t-[calc(22*var(--s))]`}
          >
            {capabilities.map(({ icon: Icon, title, detail }) => (
              <div
                key={title}
                className="flex items-center gap-[20px] border-b border-[var(--ink-a08)] px-[26px] py-5 last:border-b-0 lg:h-full lg:gap-[calc(20*var(--s))] lg:border-b-0 lg:border-r lg:pl-[calc(56*var(--s))] lg:pr-[calc(10*var(--s))] lg:py-0 lg:last:border-r-0"
              >
                <span className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-[12px] bg-[hsl(var(--ink-1))] lg:h-[calc(50*var(--s))] lg:w-[calc(50*var(--s))] lg:rounded-[calc(12*var(--s))]">
                  <Icon
                    className="h-[24px] w-[24px] text-[hsl(var(--yellow))] lg:h-[calc(24*var(--s))] lg:w-[calc(24*var(--s))]"
                    strokeWidth={2.1}
                  />
                </span>
                <div>
                  <div className="whitespace-nowrap text-[14px] font-bold tracking-[0.02em] lg:text-[calc(13.5*var(--s))]">
                    {title}
                  </div>
                  <div className="mt-[3px] text-[14px] text-[hsl(var(--ink-2))] lg:mt-[calc(3*var(--s))] lg:text-[calc(14*var(--s))]">
                    {detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
