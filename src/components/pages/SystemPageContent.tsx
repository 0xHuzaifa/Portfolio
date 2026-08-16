import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Compass,
  Layers,
  Lightbulb,
  Monitor,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  type SystemSection,
  SystemSectionNav,
} from "@/components/systems/SystemSectionNav";
import { SystemShots } from "@/components/systems/SystemShots";
import { SystemStage } from "@/components/systems/SystemStage";
import { projects } from "@/data/projects";
import type { System } from "@/data/systems";
import { TechChip } from "@/lib/techIcons";

/**
 * A case study, on the site's own material.
 *
 * Built to the `project-detail` reference: stage, sticky numbered rail, an
 * overview band, the four-part story, the feature list beside the screenshots,
 * the stack, the impact, and the closing invitation.
 *
 * Copy comes from `systems.ts` and nowhere else, with two joins outward:
 * `projects.ts` supplies the short display title and the category chips —
 * `systems.ts` titles are long and SEO-weighted, and a headline is not a page
 * title — matched on `caseStudySlug`, which is what that field is for.
 *
 * Sections whose data a system does not carry are dropped rather than filled:
 * the rail is built from what actually rendered, so it can never point at an
 * anchor that is not on the page.
 */

const CONTENT = "mx-auto w-full max-w-[1400px] px-6 md:px-10";

/** A band: the frosted panel every section on this page sits in. Deliberately
 *  thinner than `--glass-fill-strong` — the page canvas has to stay readable
 *  through it, or six stacked bands turn the beige into a white column. */
const BAND =
  "rounded-[26px] border border-white/45 bg-white/[0.30] shadow-[var(--shadow-sm)] backdrop-blur-[20px]";

export function SystemPageContent({ system }: { system: System }) {
  // The card-level entry for the same work. Absent for a system with no grid
  // card, in which case the long title and the authored category stand in.
  const card = projects.find((entry) => entry.caseStudySlug === system.slug);
  const title = card?.title ?? system.title;
  const categories = card?.categories ?? [system.category];

  const facts = [
    system.duration && {
      icon: CalendarDays,
      label: "Duration",
      value: system.duration,
    },
    system.platform && {
      icon: Monitor,
      label: "Platform",
      value: system.platform,
    },
    system.teamSize && {
      icon: Users,
      label: "Team Size",
      value: system.teamSize,
    },
  ].filter(Boolean) as { icon: typeof Users; label: string; value: string }[];

  const story = [
    { icon: Target, title: "The Challenge", body: lead(system.problem) },
    { icon: Lightbulb, title: "The Solution", body: lead(system.solution) },
    system.approach && {
      icon: Compass,
      title: "My Approach",
      body: lead(system.approach),
    },
    (system.outcome ?? system.impact?.[0]) && {
      icon: TrendingUp,
      title: "The Outcome",
      body: lead(system.outcome ?? system.impact?.[0] ?? ""),
    },
  ].filter(Boolean) as {
    icon: typeof Target;
    title: string;
    body: string;
  }[];

  const features = system.features.slice(0, 6).map(splitFeature);
  const hasGallery = (system.images?.length ?? 0) > 1;
  const results = system.impact ?? system.highlights;

  // No Gallery entry, deliberately. The screenshots share a row with the
  // feature list, so both start at the same scroll position — the rail resolves
  // ties to the topmost section, which means Gallery could never light up and
  // the reader watched the rail jump Features → Tech Stack → Impact. A rail
  // item that can never be current is worse than one that is not there.
  const sections: SystemSection[] = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "stack", label: "Tech Stack" },
    ...(results.length > 0 ? [{ id: "impact", label: "Impact" }] : []),
  ];

  return (
    <main className="bg-[hsl(var(--beige-1))] text-[hsl(var(--ink-1))]">
      <SystemStage system={system} title={title} categories={categories} />

      <SystemSectionNav sections={sections} />

      {/* ── 01 · overview ─────────────────────────────────────────────────── */}
      <section id="overview" className={`${CONTENT} scroll-mt-[150px] pt-16`}>
        <div
          className={`${BAND} grid gap-10 p-8 lg:grid-cols-4 lg:gap-8 lg:p-10`}
        >
          <div>
            <h2 className="text-[30px] font-extrabold tracking-[-0.03em] lg:text-[34px]">
              Overview
            </h2>
            <p className="mt-6 text-[15px] leading-[1.75] text-[hsl(var(--ink-2))]">
              {system.shortDescription}
            </p>
          </div>

          <div className="lg:border-l lg:border-[var(--ink-a08)] lg:pl-8">
            <h3 className="text-[17px] font-bold tracking-[-0.02em]">
              My Role
            </h3>
            {system.role && (
              <p className="mt-5 text-[15px] font-medium text-[hsl(var(--ink-1))]">
                {roleTitle(system.role)}
              </p>
            )}
            {system.contributions && (
              <ul className="mt-5 space-y-[14px]">
                {system.contributions.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="relative pl-[18px] text-[14px] leading-[1.6] text-[hsl(var(--ink-2))] before:absolute before:left-0 before:top-[9px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-[hsl(var(--ink-3))]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {facts.length > 0 && (
            <dl className="lg:border-l lg:border-[var(--ink-a08)] lg:pl-8">
              {facts.map(({ icon: Icon, label, value }, i) => (
                <div
                  key={label}
                  className={`flex items-start gap-[14px] ${
                    i > 0 ? "mt-6 border-t border-[var(--ink-a08)] pt-6" : ""
                  }`}
                >
                  <Icon
                    className="mt-[2px] h-[19px] w-[19px] flex-none text-[hsl(var(--ink-3))]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[16px] font-bold tracking-[-0.01em]">
                      {label}
                    </dt>
                    <dd className="mt-[5px] text-[14px] text-[hsl(var(--ink-2))]">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          )}

          {results.length > 0 && (
            <div className="lg:border-l lg:border-[var(--ink-a08)] lg:pl-8">
              <h3 className="text-[17px] font-bold tracking-[-0.02em]">
                Key Results
              </h3>
              <ul className="mt-5 space-y-[14px]">
                {results.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-[11px]">
                    <CheckCircle2
                      className="mt-[2px] h-[17px] w-[17px] flex-none text-[hsl(var(--yellow-deep))]"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-[14px] leading-[1.6] text-[hsl(var(--ink-2))]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ── the story ─────────────────────────────────────────────────────── */}
      <section className={`${CONTENT} pt-14`}>
        <div className={`${BAND} p-8 lg:p-10`}>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {story.map(({ icon: Icon, title: heading, body }, i) => (
              <div
                key={heading}
                className={
                  i > 0 ? "lg:border-l lg:border-[var(--ink-a08)] lg:pl-8" : ""
                }
              >
                <div className="flex items-center gap-[13px]">
                  <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[11px] bg-[hsl(var(--yellow))]">
                    <Icon
                      className="h-[18px] w-[18px]"
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="text-[17px] font-bold tracking-[-0.02em]">
                    {heading}
                  </h3>
                </div>
                <p className="mt-4 text-[14px] leading-[1.7] text-[hsl(var(--ink-2))]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 features · 04 gallery ──────────────────────────────────────── */}
      <section className={`${CONTENT} pt-14`}>
        <div className={`${BAND} p-8 lg:p-10`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-14">
            <div id="features" className="scroll-mt-[150px]">
              <h2 className="text-[26px] font-extrabold tracking-[-0.03em] lg:text-[30px]">
                Core Features
              </h2>
              <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-2">
                {features.map(({ title: heading, detail }) => (
                  <li key={heading} className="flex items-start gap-[13px]">
                    <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] bg-[hsl(var(--yellow))]">
                      <Sparkles
                        className="h-[16px] w-[16px]"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-bold leading-[1.35] tracking-[-0.01em]">
                        {heading}
                      </h3>
                      {detail && (
                        <p className="mt-[6px] text-[13px] leading-[1.6] text-[hsl(var(--ink-2))]">
                          {detail}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {hasGallery && system.images && (
              <div>
                <SystemShots images={system.images} title={title} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 03 · the stack ────────────────────────────────────────────────── */}
      <section id="stack" className={`${CONTENT} scroll-mt-[150px] pt-14`}>
        <div className={`${BAND} p-8 lg:p-10`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-14">
            <div>
              <h2 className="text-[26px] font-extrabold tracking-[-0.03em] lg:text-[30px]">
                Tech Stack
              </h2>
              <p className="mt-5 max-w-[420px] text-[15px] leading-[1.7] text-[hsl(var(--ink-2))]">
                What the system runs on, and the decisions behind each layer.
              </p>
              <div className="mt-7 flex flex-wrap gap-[10px]">
                {system.technologies.map((tech) => (
                  <TechChip key={tech} name={tech} />
                ))}
              </div>
            </div>

            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {architectureRows(system).map(({ label, value }) => (
                <div
                  key={label}
                  className="border-t border-[var(--ink-a08)] pt-5"
                >
                  <dt className="flex items-center gap-[9px] font-data text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--ink-3))]">
                    <Layers
                      className="h-[14px] w-[14px]"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    {label}
                  </dt>
                  <dd className="mt-[9px] text-[15px] leading-[1.55]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── 05 · impact ───────────────────────────────────────────────────── */}
      {results.length > 0 && (
        <section id="impact" className={`${CONTENT} scroll-mt-[150px] pt-14`}>
          <div className={`${BAND} p-8 lg:p-10`}>
            <h2 className="text-[26px] font-extrabold tracking-[-0.03em] lg:text-[30px]">
              Impact
            </h2>
            <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {results.map((item) => (
                <li key={item} className="flex items-start gap-[13px]">
                  <CheckCircle2
                    className="mt-[3px] h-[18px] w-[18px] flex-none text-[hsl(var(--yellow-deep))]"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span className="text-[15px] leading-[1.65] text-[hsl(var(--ink-2))]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── the invitation ────────────────────────────────────────────────── */}
      <section className={`${CONTENT} py-14 lg:py-20`}>
        <div
          className={`${BAND} flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:gap-12 lg:p-10`}
        >
          <span className="flex h-[72px] w-[72px] flex-none items-center justify-center rounded-full bg-[hsl(var(--yellow))] shadow-[0_12px_30px_rgba(246,242,60,0.5)]">
            <CalendarDays
              className="h-[30px] w-[30px]"
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </span>
          <h2 className="max-w-[380px] text-[30px] font-extrabold leading-[1.15] tracking-[-0.03em] lg:text-[34px]">
            Have a similar project in mind?
          </h2>
          <p className="max-w-[300px] flex-1 text-[16px] leading-[1.6] text-[hsl(var(--ink-2))] lg:border-l lg:border-[var(--ink-a08)] lg:pl-12">
            Let&rsquo;s build something exceptional together.
          </p>
          <Link
            href="/contact"
            className="inline-flex flex-none items-center gap-[10px] self-start rounded-full bg-[hsl(var(--yellow))] px-[28px] py-[15px] text-[15px] font-bold tracking-[0.02em] shadow-[var(--shadow-sm)] transition-[transform,background-color] duration-200 ease-[var(--ease)] hover:-translate-y-[3px] hover:bg-[hsl(var(--yellow-deep))] lg:self-auto"
          >
            LET&rsquo;S TALK
            <ArrowRight
              className="h-[17px] w-[17px]"
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

/** Body copy in `systems.ts` runs to several paragraphs; a band holds one. */
function lead(text: string) {
  return text.split("\n\n")[0] ?? text;
}

/** `role` is authored as "Full-stack developer — built x, y and z". The band
 *  shows the title; the contributions below it already carry the detail. */
function roleTitle(role: string) {
  return role.split("—")[0]?.trim() ?? role;
}

/** Features are authored as one line, often "Name — what it does". Split where
 *  that dash exists so the list reads as titled entries, and fall back to the
 *  whole line where it does not. */
function splitFeature(feature: string) {
  const [title, ...rest] = feature.split("—");
  return {
    title: rest.length > 0 ? title.trim() : feature,
    detail: rest.length > 0 ? rest.join("—").trim() : undefined,
  };
}

function architectureRows(system: System) {
  const { architecture } = system;

  return [
    { label: "Frontend", value: architecture.frontend },
    { label: "Backend", value: architecture.backend },
    { label: "Database", value: architecture.database },
    architecture.auth && { label: "Auth", value: architecture.auth },
    architecture.realtime && {
      label: "Realtime",
      value: architecture.realtime,
    },
    architecture.jobs && { label: "Jobs", value: architecture.jobs },
    architecture.tenancy && { label: "Tenancy", value: architecture.tenancy },
    architecture.storage && { label: "Storage", value: architecture.storage },
    architecture.infrastructure && {
      label: "Infrastructure",
      value: architecture.infrastructure,
    },
    architecture.media && { label: "Media", value: architecture.media },
    architecture.ai && { label: "AI", value: architecture.ai },
  ].filter(Boolean) as { label: string; value: string }[];
}
