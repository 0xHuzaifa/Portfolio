"use client";

import {
  ArrowRight,
  Globe,
  Mail,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { useRef } from "react";
import {
  scale,
  sectionClass,
  stageClass,
  stageStyle,
} from "@/components/portfolio/stage";
import { impactStats, projectsDelivered } from "@/data/projects";
import { ProjectDeck } from "./ProjectDeck";
import { useGlassParallax } from "./useGlassParallax";

/**
 * Section 1 of /systems, fitted to the shared 1620x875 canvas so it stands at
 * the same width and one-screen height as every homepage section.
 *
 * Layout on the canvas: the copy column runs down the left at x44, the work
 * itself is dealt out as a card deck on the right, and the metrics bar spans
 * the base — all on the site-wide 44/1576 content edge the header sets. Below
 * `lg` the canvas is abandoned and the whole thing reflows into a stack.
 *
 * What used to be here was a deck of five category slabs, four of which read
 * "1 Project". Categories belong next to the results they filter, so they moved
 * to the grid; this section is now the argument for the work rather than a
 * control panel for it.
 *
 * The `ph-*` classes are handles for the animation pass; nothing reads them yet.
 */

const statIcons = [Users, Mail, Globe, TrendingUp, ShieldCheck];

export function ProjectsHero() {
  const root = useRef<HTMLElement>(null);

  useGlassParallax(root);

  return (
    <section ref={root} style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        <ProjectDeck />

        {/* ---------- copy column ---------- */}
        <div className="ph-head flex items-center gap-[14px] pt-16 lg:absolute lg:left-[calc(44*var(--s))] lg:top-[calc(158*var(--s))] lg:z-[6] lg:gap-[calc(16*var(--s))] lg:pt-0">
          <span className="h-[20px] w-[3px] rounded-[2px] bg-[hsl(var(--yellow))] lg:h-[calc(22*var(--s))] lg:w-[calc(3*var(--s))]" />
          <span className="font-data text-[13px] font-bold tracking-[0.04em] text-[hsl(var(--yellow-deep))] lg:text-[calc(15*var(--s))]">
            01
          </span>
          <span className="font-data text-[12px] font-semibold uppercase tracking-[0.18em] lg:text-[calc(14*var(--s))]">
            Projects
          </span>
        </div>

        <h1 className="ph-head mt-6 text-[clamp(2.5rem,11vw,80px)] font-extrabold leading-[1.04] tracking-[-0.034em] lg:absolute lg:left-[calc(42*var(--s))] lg:top-[calc(196*var(--s))] lg:z-[6] lg:mt-0 lg:w-[calc(620*var(--s))] lg:text-[calc(76*var(--s))] lg:leading-[calc(86*var(--s))]">
          Systems built
          <br />
          to create impact<span className="text-[hsl(var(--yellow))]">.</span>
        </h1>

        <p className="ph-head mt-6 max-w-[460px] text-[17px] leading-[1.6] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(44*var(--s))] lg:top-[calc(378*var(--s))] lg:z-[6] lg:mt-0 lg:w-[calc(500*var(--s))] lg:max-w-none lg:text-[calc(20*var(--s))] lg:leading-[calc(34*var(--s))]">
          A curated collection of digital products, platforms and systems built
          to solve real business problems and deliver measurable results.
        </p>

        {/* delivered card — canvas 44,486 · 510x100 */}
        <a
          href="#projects-grid"
          style={{ ["--in-delay" as string]: "0.35s" }}
          className="ph-delivered glass-card group mt-9 flex w-full max-w-[520px] items-center rounded-[20px] lg:absolute lg:left-[calc(44*var(--s))] lg:top-[calc(486*var(--s))] lg:z-[6] lg:mt-0 lg:h-[calc(104*var(--s))] lg:w-[calc(510*var(--s))] lg:max-w-none lg:rounded-[calc(22*var(--s))] lg:[transform:translate(calc(var(--px,0)*2px),calc(var(--py,0)*2px))]"
        >
          <span className="glass-card-inner flex h-full w-full items-center gap-[20px] p-[18px] lg:gap-[calc(22*var(--s))] lg:p-[calc(19*var(--s))]">
            <span className="flex h-[58px] w-[58px] flex-none items-center justify-center rounded-[16px] bg-[hsl(var(--yellow))] shadow-[0_10px_26px_rgba(246,242,60,0.5)] lg:h-[calc(66*var(--s))] lg:w-[calc(66*var(--s))] lg:rounded-[calc(18*var(--s))]">
              <span className="font-data text-[19px] font-bold lg:text-[calc(21*var(--s))]">
                &lt;/&gt;
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[32px] font-extrabold leading-none tracking-[-0.03em] lg:text-[calc(38*var(--s))]">
                {projectsDelivered.value}
              </span>
              <span className="mt-[7px] block text-[15px] text-[hsl(var(--ink-2))] lg:mt-[calc(8*var(--s))] lg:text-[calc(16*var(--s))]">
                {projectsDelivered.label}
              </span>
            </span>
            <span className="flex h-[44px] w-[44px] flex-none items-center justify-center rounded-full bg-white/85 shadow-[var(--shadow-sm)] transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-[3px] lg:h-[calc(50*var(--s))] lg:w-[calc(50*var(--s))]">
              <ArrowRight
                className="h-[19px] w-[19px] lg:h-[calc(21*var(--s))] lg:w-[calc(21*var(--s))]"
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </span>
          </span>
        </a>

        {/* signature line — canvas 44,634 */}
        <div className="ph-sign mt-9 flex items-center gap-[26px] lg:absolute lg:left-[calc(44*var(--s))] lg:top-[calc(634*var(--s))] lg:z-[6] lg:mt-0 lg:gap-[calc(28*var(--s))]">
          <span className="font-hand text-[30px] leading-none lg:text-[calc(38*var(--s))]">
            Huzaifa Ahmed
          </span>
          <span
            aria-hidden="true"
            className="h-[42px] w-px bg-[var(--ink-a12)] lg:h-[calc(52*var(--s))]"
          />
          <p className="text-[14px] leading-[1.5] text-[hsl(var(--ink-2))] lg:w-[calc(230*var(--s))] lg:text-[calc(16*var(--s))] lg:leading-[calc(26*var(--s))]">
            Building digital systems that drive real outcomes.
          </p>
        </div>

        {/* ---------- metrics bar — canvas 44,712 · 1532x128 ----------
            `glass-panel-static`: it takes the surface and the arrival but never
            the drift, because it is the ground the composition stands on. */}
        <div
          style={{ ["--in-delay" as string]: "0.65s" }}
          className="ph-strip glass-card glass-panel-static mt-10 rounded-[22px] lg:absolute lg:left-[calc(44*var(--s))] lg:top-[calc(712*var(--s))] lg:z-[6] lg:mt-0 lg:h-[calc(128*var(--s))] lg:w-[calc(1532*var(--s))] lg:rounded-[calc(26*var(--s))]"
        >
          <dl className="glass-card-inner grid h-full grid-cols-1 gap-x-6 gap-y-6 px-[24px] py-[24px] sm:grid-cols-2 lg:flex lg:items-center lg:justify-between lg:gap-0 lg:px-[calc(40*var(--s))] lg:py-0">
            {impactStats.map((stat, i) => {
              const Icon = statIcons[i];

              return (
                <div
                  key={stat.label}
                  className="ph-stat flex items-center gap-[16px] lg:gap-[calc(18*var(--s))]"
                >
                  {/* The divider is the item's own left edge rather than a
                      separate node, so the row spaces five items evenly
                      instead of nine. */}
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="mr-[calc(18*var(--s))] hidden w-px bg-[var(--ink-a12)] lg:block lg:h-[calc(62*var(--s))]"
                    />
                  )}
                  <span className="flex h-[54px] w-[54px] flex-none items-center justify-center rounded-[15px] bg-white/70 shadow-[0_6px_18px_rgba(0,0,0,0.05)] lg:h-[calc(60*var(--s))] lg:w-[calc(60*var(--s))] lg:rounded-[calc(16*var(--s))]">
                    <Icon
                      className="h-[24px] w-[24px] lg:h-[calc(26*var(--s))] lg:w-[calc(26*var(--s))]"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>
                  {/* Reversed rather than reordered in the markup: a `dl` wants
                      its `dt` before its `dd`, and the figure reads first. */}
                  <div className="flex flex-col-reverse">
                    <dt className="mt-[7px] whitespace-nowrap text-[13px] text-[hsl(var(--ink-2))] lg:mt-[calc(8*var(--s))] lg:text-[calc(15*var(--s))]">
                      {stat.label}
                      {/* The accent underline from the reference: a short rule
                          under each label, tying the row to the one colour the
                          page uses. */}
                      <span
                        aria-hidden="true"
                        className="mt-[7px] block h-[3px] w-[26px] rounded-[2px] bg-[hsl(var(--yellow))] lg:mt-[calc(8*var(--s))] lg:h-[calc(3*var(--s))] lg:w-[calc(28*var(--s))]"
                      />
                    </dt>
                    <dd className="text-[24px] font-extrabold leading-none tracking-[-0.03em] lg:text-[calc(30*var(--s))]">
                      {stat.value}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
