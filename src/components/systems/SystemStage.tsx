import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Github,
  Globe,
  Mail,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { System } from "@/data/systems";

/**
 * The case study's opening: identity on the left, the product itself on the
 * right, laid back in perspective on a warm pool of light.
 *
 * The screenshot is the argument — it is the first thing on the page that is
 * evidence rather than claim — so it takes the larger half and bleeds off the
 * right edge. It leans away from the reader rather than sitting flat, which is
 * what stops a wide screenshot reading as a banner.
 *
 * Not on the fixed 1620x875 canvas: a case study is a document, it scrolls, and
 * every section below it is ordinary flow. It keeps the site's content width
 * instead.
 */

/** Icons for the metric row, in order. Metrics are authored per system, so this
 *  is a rotation rather than a lookup — it runs out gracefully. */
const METRIC_ICONS = [Users, Mail, Globe, Clock];

export function SystemStage({
  system,
  title,
  categories,
}: {
  system: System;
  title: string;
  categories: string[];
}) {
  const metrics = system.metrics?.slice(0, 4) ?? [];

  return (
    <section className="relative overflow-hidden pb-8 pt-[112px] lg:pb-16 lg:pt-[128px]">
      {/* The light the screenshot sits in. Anchored to the panel, not the page,
          so it reads as coming off the product. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[120px] hidden h-[620px] w-[70%] bg-[radial-gradient(circle_at_58%_46%,rgba(246,226,90,0.28),rgba(246,226,90,0.08)_34%,transparent_62%)] lg:block"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <Link
          href="/systems"
          className="group inline-flex items-center gap-[10px] text-[15px] font-medium text-[hsl(var(--ink-2))] transition-colors duration-200 hover:text-[hsl(var(--ink-1))]"
        >
          <ArrowLeft
            className="h-[17px] w-[17px] transition-transform duration-300 ease-[var(--ease)] group-hover:-translate-x-[3px]"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          Back to Projects
        </Link>

        <div className="mt-10 grid items-start gap-12 lg:mt-8 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-16">
          {/* ---------- identity ---------- */}
          <div className="lg:pt-16">
            <div className="flex flex-wrap items-center gap-[10px]">
              {categories.map((category, i) => (
                <span
                  key={category}
                  className={`rounded-full px-[15px] py-[7px] text-[13px] font-bold tracking-[-0.01em] ${
                    // The first category is the one the project leads with, so
                    // it is the one that carries the accent.
                    i === 0
                      ? "bg-[hsl(var(--yellow))] text-[hsl(var(--ink-1))]"
                      : "border border-[var(--ink-a12)] text-[hsl(var(--ink-2))]"
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>

            <h1 className="mt-6 text-[clamp(2.5rem,7vw,58px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
              {title}
              <span className="text-[hsl(var(--yellow))]">.</span>
            </h1>

            <p className="mt-5 max-w-[520px] text-[17px] leading-[1.65] text-[hsl(var(--ink-2))] lg:text-[18px]">
              {system.systemType ?? firstSentence(system.shortDescription)}
            </p>

            {/* Two by two, not a single row: metric labels here are authored
                sentences rather than one-word units, and four of those across a
                420px column collapses into shreds. */}
            {metrics.length > 0 && (
              <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
                {metrics.map((metric, i) => {
                  const Icon = METRIC_ICONS[i % METRIC_ICONS.length];

                  return (
                    <div
                      key={metric.label}
                      className="flex items-start gap-[11px]"
                    >
                      <Icon
                        className="mt-[3px] h-[20px] w-[20px] flex-none text-[hsl(var(--ink-3))]"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                      {/* Reversed rather than reordered in the markup: a `dl`
                          wants its `dt` before its `dd`, and the figure reads
                          first. */}
                      <div className="flex min-w-0 flex-col-reverse">
                        <dt className="mt-[5px] text-[12.5px] leading-[1.45] text-[hsl(var(--ink-2))]">
                          {metric.label}
                        </dt>
                        <dd className="text-[20px] font-extrabold leading-[1.15] tracking-[-0.03em]">
                          {metric.value}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            )}

            {(system.liveUrl || system.repoUrl) && (
              <div className="mt-10 flex flex-wrap gap-[14px]">
                {system.liveUrl && (
                  <a
                    href={system.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-[10px] rounded-full bg-[hsl(var(--yellow))] px-[26px] py-[14px] text-[15px] font-bold shadow-[var(--shadow-sm)] transition-[transform,background-color] duration-200 ease-[var(--ease)] hover:-translate-y-[3px] hover:bg-[hsl(var(--yellow-deep))]"
                  >
                    Live Preview
                    <ArrowUpRight
                      className="h-[17px] w-[17px]"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </a>
                )}
                {system.repoUrl && (
                  <a
                    href={system.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-[10px] rounded-full border border-[var(--ink-a12)] bg-[var(--glass-fill-strong)] px-[24px] py-[14px] text-[15px] font-bold backdrop-blur-[16px] transition-transform duration-200 ease-[var(--ease)] hover:-translate-y-[3px]"
                  >
                    <Github
                      className="h-[18px] w-[18px]"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    View on GitHub
                  </a>
                )}
              </div>
            )}
          </div>

          {/* ---------- the product ---------- */}
          {system.images?.[0] && (
            <div className="relative lg:-mr-[2%] lg:pt-6">
              {/* Laid back at rest, square to the reader on hover. The lean is
                  what makes it read as an object on the page; straightening on
                  approach is what lets it be read as a screen. `.system-shot`
                  in globals.css owns both states — the transition has to live
                  with the transform, and a Tailwind arbitrary transform this
                  long stops being legible. */}
              <div className="system-shot overflow-hidden rounded-[18px] border border-white/60 shadow-[0_50px_90px_-30px_rgba(60,50,35,0.42)] lg:rounded-[22px]">
                <Image
                  src={system.images[0]}
                  alt={`${title} — product interface`}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  placeholder="blur"
                  priority
                  className="h-full w-full object-cover object-left-top"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** The `shortDescription` runs to a paragraph on most systems; the stage wants
 *  the one line that says what the thing is. */
function firstSentence(text: string) {
  const [sentence] = text.split(/(?<=\.)\s+/);
  return sentence ?? text;
}
