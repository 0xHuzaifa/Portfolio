"use client";

import {
  Code2,
  Globe,
  Mail,
  MousePointerClick,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  scale,
  sectionClass,
  stageClass,
  stageStyle,
} from "@/components/portfolio/stage";
import {
  impactStats,
  type ProjectCategory,
  projectsDelivered,
} from "@/data/projects";
import { CategoryDeck } from "./CategoryDeck";

/**
 * Section 1 of /systems, fitted to the shared 1620x875 canvas so it stands at
 * the same width and one-screen height as every homepage section.
 *
 * Layout on the canvas: headline column down the left at x60, the category deck
 * on the right centred at y400, and the impact strip along the base at y731.
 * Below `lg` the canvas is abandoned and all of it reflows into a stack.
 *
 * The `ph-*` classes are handles for the animation pass; nothing reads them yet.
 */

const statIcons = [Users, Mail, Globe, TrendingUp, ShieldCheck];

export function ProjectsHero({
  active,
  onSelect,
}: {
  active: ProjectCategory | null;
  onSelect: (category: ProjectCategory) => void;
}) {
  return (
    <section style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        {/* ---------- headline column ---------- */}
        <div className="ph-head flex items-center gap-[14px] pt-16 lg:absolute lg:left-[calc(60*var(--s))] lg:top-[calc(195*var(--s))] lg:z-[3] lg:gap-[calc(14*var(--s))] lg:pt-0">
          <span className="h-[3px] w-[38px] rounded-[2px] bg-[hsl(var(--yellow))] lg:w-[calc(38*var(--s))]" />
          <span className="font-data text-[12px] font-semibold uppercase tracking-[0.18em] lg:text-[calc(13*var(--s))]">
            Projects
          </span>
        </div>

        <h1 className="ph-head mt-6 text-[clamp(2.5rem,11vw,80px)] font-extrabold leading-[1.04] tracking-[-0.032em] lg:absolute lg:left-[calc(58*var(--s))] lg:top-[calc(225*var(--s))] lg:z-[3] lg:mt-0 lg:text-[calc(64*var(--s))] lg:leading-[calc(68*var(--s))]">
          Systems that
          <br />
          create impact<span className="text-[hsl(var(--yellow))]">.</span>
        </h1>

        <p className="ph-head mt-6 max-w-[440px] text-[17px] leading-[1.5] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(60*var(--s))] lg:top-[calc(405*var(--s))] lg:z-[3] lg:mt-0 lg:w-[calc(400*var(--s))] lg:max-w-none lg:text-[calc(20*var(--s))] lg:leading-[calc(30*var(--s))]">
          A curated collection of digital products, platforms and systems built
          to solve real business problems.
        </p>

        {/* projects-delivered card — canvas 60,548 · 333x138 */}
        <div className="ph-delivered mt-8 flex w-full max-w-[360px] items-center gap-[18px] rounded-[22px] border border-[var(--glass-border)] bg-[var(--glass-fill)] p-[24px] shadow-[var(--shadow)] backdrop-blur-[16px] [transform:translateZ(0)] lg:absolute lg:left-[calc(60*var(--s))] lg:top-[calc(548*var(--s))] lg:z-[3] lg:mt-0 lg:h-[calc(138*var(--s))] lg:w-[calc(333*var(--s))] lg:max-w-none lg:gap-[calc(20*var(--s))] lg:rounded-[calc(22*var(--s))] lg:p-[calc(26*var(--s))]">
          <span className="flex h-[64px] w-[64px] flex-none items-center justify-center rounded-full bg-[hsl(var(--yellow))] shadow-[0_10px_26px_rgba(246,242,60,0.5)] lg:h-[calc(72*var(--s))] lg:w-[calc(72*var(--s))]">
            <Code2
              className="h-[28px] w-[28px] lg:h-[calc(30*var(--s))] lg:w-[calc(30*var(--s))]"
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </span>
          <div>
            <div className="text-[34px] font-extrabold leading-none tracking-[-0.02em] lg:text-[calc(38*var(--s))]">
              {projectsDelivered.value}
            </div>
            <div className="mt-[8px] text-[14px] text-[hsl(var(--ink-2))] lg:mt-[calc(8*var(--s))] lg:text-[calc(15*var(--s))]">
              {projectsDelivered.label}
            </div>
          </div>
        </div>

        {/* ---------- category deck ---------- */}
        <CategoryDeck active={active} onSelect={onSelect} />

        {/* affordance — canvas centred under the deck at y665 */}
        <p className="ph-hint mt-6 flex items-center justify-center gap-[9px] text-[13px] text-[hsl(var(--ink-3))] lg:absolute lg:left-[calc(620*var(--s))] lg:top-[calc(655*var(--s))] lg:z-[2] lg:mt-0 lg:w-[calc(940*var(--s))] lg:gap-[calc(9*var(--s))] lg:text-[calc(13*var(--s))]">
          <MousePointerClick
            className="h-[15px] w-[15px] lg:h-[calc(15*var(--s))] lg:w-[calc(15*var(--s))]"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          Select a category to filter the projects below
        </p>

        {/* ---------- impact strip — canvas 60,731 · 1500x112 ---------- */}
        <div className="ph-strip mt-10 grid grid-cols-2 gap-x-6 gap-y-6 rounded-[22px] border border-[var(--glass-border)] bg-[var(--glass-fill)] px-[24px] py-[24px] shadow-[var(--shadow)] backdrop-blur-[16px] [transform:translateZ(0)] sm:grid-cols-3 lg:absolute lg:left-[calc(60*var(--s))] lg:top-[calc(731*var(--s))] lg:z-[3] lg:mt-0 lg:flex lg:h-[calc(112*var(--s))] lg:w-[calc(1500*var(--s))] lg:items-center lg:justify-between lg:gap-0 lg:rounded-[calc(26*var(--s))] lg:px-[calc(48*var(--s))] lg:py-0">
          {impactStats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <div
                key={stat.label}
                className="ph-stat flex items-center gap-[14px] lg:gap-[calc(16*var(--s))]"
              >
                {/* The divider is the item's own left edge rather than a
                    separate node, so the flex row spaces five items evenly
                    instead of nine. */}
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="hidden bg-[var(--ink-a12)] lg:block lg:h-[calc(48*var(--s))] lg:w-px lg:mr-[calc(16*var(--s))]"
                  />
                )}
                <Icon
                  className="h-[24px] w-[24px] flex-none text-[hsl(var(--ink-1))] lg:h-[calc(28*var(--s))] lg:w-[calc(28*var(--s))]"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <div>
                  <div className="text-[22px] font-extrabold leading-none tracking-[-0.02em] lg:text-[calc(26*var(--s))]">
                    {stat.value}
                  </div>
                  <div className="mt-[6px] whitespace-nowrap text-[13px] text-[hsl(var(--ink-2))] lg:mt-[calc(7*var(--s))] lg:text-[calc(14*var(--s))]">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
