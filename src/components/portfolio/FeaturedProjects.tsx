"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Clock,
  FileCheck,
  Send,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { featuredSequence } from "@/animations/featured";
import articlePlatformMain from "@/assets/article-platform/main.png";
import chatSystemMain from "@/assets/chat-system/main.png";
import inventorySystemMain from "@/assets/inventory-system/main.png";
import { LaptopSequence } from "./LaptopSequence";
import { scale, sectionClass, stageClass, stageStyle } from "./stage";

gsap.registerPlugin(useGSAP);

/**
 * Re-fitted from the 1536x1024 reference onto the shared 1620x875 canvas so the
 * section is exactly one screen. Bands: head 108-320, showcase 350-650,
 * supporting cards 664-859. The reference scroll hint is dropped.
 */

const featured = {
  index: "01",
  kind: "PLATFORM",
  title: "Real Estate CRM",
  href: "/systems/crm-system",
  description:
    "A multi-tenant CRM for real estate agencies — leads, deals, contracts, and campaigns in one workspace, with an AI assistant that runs tasks from plain English.",
  stats: [
    { icon: Send, value: "36K+/hr", label: "Emails Automated" },
    { icon: Building2, value: "Isolated", label: "Agency Data" },
    { icon: FileCheck, value: "DocuSign", label: "Contract Signing" },
    { icon: Sparkles, value: "AI Agent", label: "Natural Language" },
  ],
} as const;

const selector = [
  { index: "01", title: "Real Estate CRM", href: "/systems/crm-system" },
  {
    index: "02",
    title: "Live Messaging",
    href: "/systems/realtime-communication",
  },
  {
    index: "03",
    title: "Article Platform",
    href: "/systems/article-platform",
  },
  {
    index: "04",
    title: "Inventory Control",
    href: "/systems/inventory-system",
  },
] as const;

const supporting = [
  {
    index: "02",
    kind: "SYSTEM",
    title: "Live Messaging System",
    href: "/systems/realtime-communication",
    image: chatSystemMain,
    description:
      "Real-time chat that stays accurate through dropped connections and multiple tabs — no lost messages, no stale online status.",
  },
  {
    index: "03",
    kind: "PLATFORM",
    title: "Article Publishing Platform",
    href: "/systems/article-platform",
    image: articlePlatformMain,
    description:
      "A CMS with a full editorial workflow — writers draft, admins review and approve, nothing goes live without the right steps.",
  },
  {
    index: "04",
    kind: "SYSTEM",
    title: "Inventory & Spending Control",
    href: "/systems/inventory-system",
    image: inventorySystemMain,
    description:
      "8,000+ products under a three-level spending rules engine that enforces who can order what, automatically.",
  },
] as const;

const glass =
  "border border-[var(--glass-border)] bg-[var(--glass-fill)] backdrop-blur-[16px] [transform:translateZ(0)]";

/**
 * Yellow tick + mono label. The reference sizes only apply from `lg` up — they
 * ride on `--s`, which is meaningless at phone widths — so they come in as
 * utility classes rather than inline styles.
 */
function Eyebrow({
  children,
  className = "",
  ruleClass = "lg:w-[calc(38*var(--s))]",
  textClass = "lg:text-[calc(13*var(--s))]",
}: {
  children: React.ReactNode;
  className?: string;
  ruleClass?: string;
  textClass?: string;
}) {
  return (
    <div
      className={`flex items-center gap-[14px] lg:gap-[calc(14*var(--s))] ${className}`}
    >
      <span
        className={`h-[3px] w-[38px] rounded-[2px] bg-[hsl(var(--yellow))] ${ruleClass}`}
      />
      <span
        className={`font-data text-[12px] font-semibold uppercase tracking-[0.18em] ${textClass}`}
      >
        {children}
      </span>
    </div>
  );
}

export function FeaturedProjects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // Returned so StrictMode's remount reverts the matchMedia; without it the
      // first run's pinned ScrollTrigger survives and fights the second.
      return featuredSequence(root.current);
    },
    { scope: root },
  );

  return (
    <section ref={root} style={stageStyle} className={sectionClass}>
      {/* `fp-stage` is the exit handle: the sequence fades this one wrapper so
          the assembled section leaves as a unit, not element by element. */}
      <div style={scale} className={`fp-stage ${stageClass}`}>
        {/* ---------- section head ---------- */}
        <Eyebrow className="fp-head lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(108*var(--s))]">
          Featured Projects
        </Eyebrow>

        <h2 className="fp-head mt-6 text-[clamp(2.25rem,9vw,64px)] font-extrabold leading-[1.06] tracking-[-0.032em] lg:absolute lg:left-[calc(68*var(--s))] lg:top-[calc(138*var(--s))] lg:mt-0 lg:text-[calc(56*var(--s))] lg:leading-[calc(60*var(--s))]">
          Systems I&rsquo;ve
          <br />
          Built &amp; Shipped
          <span className="text-[hsl(var(--yellow-deep))]">.</span>
        </h2>

        <p className="fp-head mt-5 text-[17px] leading-[1.5] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(272*var(--s))] lg:mt-0 lg:w-[calc(430*var(--s))] lg:text-[calc(16*var(--s))] lg:leading-[calc(24*var(--s))]">
          A selection of production systems built
          <br className="hidden lg:block" /> to solve{" "}
          <strong className="font-bold text-[hsl(var(--ink-1))] [border-bottom:3px_solid_hsl(var(--yellow))]">
            real business problems.
          </strong>
        </p>

        {/* hero device — ref 77,362 · 827x432 */}
        <LaptopSequence className="fp-device mt-8 h-[220px] w-full sm:h-[300px] lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(330*var(--s))] lg:mt-0 lg:h-[calc(340*var(--s))] lg:w-[calc(740*var(--s))]" />

        {/* ---------- featured project detail ---------- */}
        <div className="mt-12 lg:mt-0">
          <div className="fp-detail text-[64px] font-extrabold leading-none tracking-[-0.02em] text-[hsl(var(--yellow-deep))] lg:absolute lg:left-[calc(830*var(--s))] lg:top-[calc(148*var(--s))] lg:text-[calc(92*var(--s))]">
            {featured.index}
          </div>

          <Eyebrow
            ruleClass="lg:w-[calc(32*var(--s))]"
            className="fp-detail mt-4 lg:absolute lg:left-[calc(831*var(--s))] lg:top-[calc(258*var(--s))] lg:mt-0"
          >
            {featured.kind}
          </Eyebrow>

          <h3 className="fp-detail mt-3 text-[30px] font-extrabold tracking-[-0.025em] lg:absolute lg:left-[calc(832*var(--s))] lg:top-[calc(284*var(--s))] lg:mt-0 lg:text-[calc(30*var(--s))]">
            {featured.title}
          </h3>

          <p className="fp-detail mt-4 max-w-[420px] text-[16px] leading-[1.5] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(831*var(--s))] lg:top-[calc(334*var(--s))] lg:mt-0 lg:w-[calc(300*var(--s))] lg:max-w-none lg:text-[calc(15*var(--s))] lg:leading-[calc(21.5*var(--s))]">
            {featured.description}
          </p>

          {/* stat cards — ref 795,503 · 539x120 */}
          <div className="fp-detail mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:absolute lg:left-[calc(830*var(--s))] lg:top-[calc(420*var(--s))] lg:mt-0 lg:flex lg:h-[calc(105*var(--s))] lg:w-[calc(560*var(--s))] lg:gap-[calc(18*var(--s))]">
            {featured.stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className={`flex flex-col justify-between rounded-[16px] p-[16px] ${glass} lg:flex-1 lg:rounded-[calc(16*var(--s))] lg:p-[calc(14*var(--s))]`}
              >
                <Icon
                  className="h-[24px] w-[24px] text-[hsl(var(--yellow-deep))] lg:h-[calc(24*var(--s))] lg:w-[calc(24*var(--s))]"
                  strokeWidth={2}
                />
                <div className="mt-4 lg:mt-0">
                  <div className="whitespace-nowrap text-[20px] font-extrabold leading-none tracking-[-0.02em] lg:text-[calc(21*var(--s))]">
                    {value}
                  </div>
                  <div className="mt-[6px] whitespace-nowrap text-[13px] leading-[1.2] text-[hsl(var(--ink-2))] lg:mt-[calc(6*var(--s))] lg:text-[calc(11*var(--s))]">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* actions — ref 795,656 · 40 tall */}
          <div className="fp-detail mt-7 flex flex-wrap gap-[14px] lg:absolute lg:left-[calc(830*var(--s))] lg:top-[calc(545*var(--s))] lg:mt-0 lg:gap-[calc(20*var(--s))]">
            <Link
              href={featured.href}
              className="inline-flex h-[44px] items-center gap-[10px] whitespace-nowrap rounded-full bg-[hsl(var(--yellow))] px-[22px] text-[15px] font-bold shadow-[var(--shadow-sm)] transition-[transform,background-color] duration-200 ease-[var(--ease)] hover:-translate-y-[3px] hover:bg-[hsl(var(--yellow-deep))] lg:h-[calc(40*var(--s))] lg:gap-[calc(10*var(--s))] lg:px-[calc(22*var(--s))] lg:text-[calc(15*var(--s))]"
            >
              View Case Study
              <ArrowUpRight className="h-[17px] w-[17px] lg:h-[calc(16*var(--s))] lg:w-[calc(16*var(--s))]" />
            </Link>
            <Link
              href={featured.href}
              className={`inline-flex h-[44px] items-center gap-[10px] whitespace-nowrap rounded-full border border-[var(--glass-border-ink)] bg-[var(--glass-fill-strong)] px-[22px] text-[15px] font-semibold backdrop-blur-[22px] transition-transform duration-200 ease-[var(--ease)] [transform:translateZ(0)] hover:-translate-y-[3px] lg:h-[calc(40*var(--s))] lg:gap-[calc(10*var(--s))] lg:px-[calc(22*var(--s))] lg:text-[calc(15*var(--s))]`}
            >
              Technical Breakdown
              <ArrowUpRight className="h-[17px] w-[17px] lg:h-[calc(16*var(--s))] lg:w-[calc(16*var(--s))]" />
            </Link>
          </div>
        </div>

        {/* ---------- project selector — ref 1234,140 · 246x294 ---------- */}
        <div
          className={`fp-selector mt-10 flex flex-col gap-[10px] rounded-[26px] p-[14px] shadow-[var(--shadow)] ${glass} lg:absolute lg:left-[calc(1330*var(--s))] lg:top-[calc(148*var(--s))] lg:mt-0 lg:w-[calc(246*var(--s))] lg:gap-[calc(14*var(--s))] lg:rounded-[calc(26*var(--s))] lg:p-[calc(26*var(--s))]`}
        >
          {selector.map((item) => {
            const active = item.index === featured.index;
            return (
              <Link
                key={item.index}
                href={item.href}
                aria-current={active ? "true" : undefined}
                className={`flex h-[52px] items-center gap-[14px] rounded-[16px] px-[18px] transition-colors duration-200 lg:h-[calc(42*var(--s))] lg:gap-[calc(12*var(--s))] lg:rounded-[calc(14*var(--s))] lg:px-[calc(14*var(--s))] ${
                  active
                    ? "bg-[hsl(var(--yellow))] shadow-[0_10px_24px_rgba(246,242,60,0.5)]"
                    : "hover:bg-[var(--ink-a04)]"
                }`}
              >
                <span
                  className={`font-data text-[14px] font-bold lg:text-[calc(13*var(--s))] ${
                    active ? "" : "text-[hsl(var(--ink-3))]"
                  }`}
                >
                  {item.index}
                </span>
                <span
                  className={`flex-1 whitespace-nowrap text-[15px] lg:text-[calc(13*var(--s))] ${
                    active ? "font-bold" : "font-semibold"
                  }`}
                >
                  {item.title}
                </span>
                {active && (
                  <Clock
                    className="h-[18px] w-[18px] lg:h-[calc(16*var(--s))] lg:w-[calc(16*var(--s))]"
                    strokeWidth={2}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ---------- supporting projects — ref 41,751 · 1453x236 ---------- */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:absolute lg:left-[calc(40*var(--s))] lg:top-[calc(664*var(--s))] lg:mt-0 lg:flex lg:h-[calc(195*var(--s))] lg:w-[calc(1540*var(--s))] lg:gap-[calc(20*var(--s))]">
          {supporting.map((project, i) => (
            <div
              key={project.index}
              // Descending z-index: 02 paints over 03 paints over 04. That is
              // what lets each card slide out from BEHIND its neighbour during
              // the deal instead of gliding across the front of it.
              style={{ zIndex: 30 - i * 10 }}
              className={`fp-card relative flex flex-col rounded-[28px] p-[26px] shadow-[var(--shadow)] ${glass} lg:flex-1 lg:rounded-[calc(28*var(--s))] lg:p-[calc(18*var(--s))]`}
            >
              {/* Text stays clear of the device slot's left edge (223 in from
                  the card) and the link is flowed, not pinned, so a longer
                  title can never ride over it. */}
              <div className="relative z-10 lg:w-[calc(288*var(--s))]">
                <div className="text-[48px] font-extrabold leading-none tracking-[-0.02em] text-[rgba(17,17,17,0.16)] lg:text-[calc(32*var(--s))]">
                  {project.index}
                </div>
                <Eyebrow
                  ruleClass="lg:w-[calc(24*var(--s))]"
                  textClass="lg:text-[calc(11*var(--s))]"
                  className="mt-3 lg:mt-[calc(10*var(--s))]"
                >
                  {project.kind}
                </Eyebrow>
                <div className="mt-3 text-[20px] font-extrabold tracking-[-0.02em] lg:mt-[calc(7*var(--s))] lg:text-[calc(18*var(--s))]">
                  {project.title}
                </div>
                <p className="mt-3 text-[15px] leading-[1.45] text-[hsl(var(--ink-2))] lg:mt-[calc(7*var(--s))] lg:text-[calc(12*var(--s))] lg:leading-[calc(17*var(--s))]">
                  {project.description}
                </p>
              </div>

              <Link
                href={project.href}
                className="relative z-10 mt-5 inline-flex items-center gap-[9px] text-[15px] font-bold transition-transform duration-200 hover:translate-x-[3px] lg:mt-auto lg:pt-[calc(6*var(--s))] lg:text-[calc(13*var(--s))]"
              >
                View Project
                <ArrowRight className="h-[16px] w-[16px] lg:h-[calc(14*var(--s))] lg:w-[calc(14*var(--s))]" />
              </Link>

              {/* No device frame here on purpose: these renders already ARE
                  device mockups, so wrapping them would put a screen inside a
                  screen. They float on the card instead. */}
              <Image
                src={project.image}
                alt={`${project.title} interface`}
                placeholder="blur"
                sizes="(min-width: 1024px) 18vw, 60vw"
                className="mt-6 h-[180px] w-full object-contain object-right lg:absolute lg:right-[calc(6*var(--s))] lg:top-[calc(-6*var(--s))] lg:mt-0 lg:h-[calc(200*var(--s))] lg:w-[calc(190*var(--s))]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
