"use client";

import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { scale, stageStyle } from "@/components/portfolio/stage";
import {
  categories,
  categoryCount,
  type ProjectCategory,
  type ProjectEntry,
} from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

/**
 * Section 2 of /systems. Deliberately NOT on the shared stage canvas: this list
 * grows with the project count, and fitting it to a fixed 1620x875 would either
 * cap how many projects can ever be shown or break on short viewports. It is an
 * ordinary flow section, and the animation pass gives it reveal-on-scroll
 * rather than a pinned scrub.
 *
 * The `pg-*` classes are handles for that pass; nothing reads them yet.
 */

/** Cards revealed per press of "load more". */
const BATCH = 6;

/** Filter chip. Selected is the accent filled solid — nothing else on the page
 *  is, so the current filter is readable from across the section. */
const chipClass = (on: boolean) =>
  `inline-flex items-center gap-[8px] rounded-full px-[17px] py-[9px] text-[14px] font-bold tracking-[-0.01em] transition-[background-color,border-color,transform] duration-200 ease-[var(--ease)] hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ink-1))] ${
    on
      ? "border border-transparent bg-[hsl(var(--yellow))] text-[hsl(var(--ink-1))] shadow-[var(--shadow-sm)]"
      : "border border-[var(--ink-a12)] bg-transparent text-[hsl(var(--ink-2))] hover:border-[hsl(var(--ink-1))] hover:text-[hsl(var(--ink-1))]"
  }`;

/** Content column: the site-wide 1532-unit width above `lg`, plain flow below. */
export const contentClass =
  "mx-auto w-full max-w-[1400px] lg:w-[calc(1532*var(--s))] lg:max-w-none";

export function ProjectsGrid({
  projects,
  active,
  onSelect,
  onClear,
}: {
  projects: ProjectEntry[];
  active: ProjectCategory | null;
  onSelect: (category: ProjectCategory) => void;
  onClear: () => void;
}) {
  const [visible, setVisible] = useState(BATCH);

  // A filter change re-slices the list, so carrying the old offset across would
  // leave someone looking at a batch count from a longer result set.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `active` is the reset trigger, not a value this reads
  useEffect(() => {
    setVisible(BATCH);
  }, [active]);

  const shown = projects.slice(0, visible);
  const remaining = projects.length - shown.length;

  return (
    <section
      id="projects-grid"
      style={stageStyle}
      className="w-full scroll-mt-[110px] bg-[hsl(var(--beige-1))] px-6 pb-20 pt-16 text-[hsl(var(--ink-1))] md:px-10 lg:px-0 lg:pb-28"
    >
      {/* Same 1532-unit content width the canvas sections use, off the same
          `--s`. A fixed `max-w` looked right at 1440 and drifted everywhere
          else — at 1920 it held 1400px while the header ran to 1816. */}
      <div style={scale} className={contentClass}>
        {/* The filter lives here, against the results it changes, rather than a
            screen up in the hero — which is what the old "select a category to
            filter the projects below" line was there to apologise for. */}
        <div className="pg-filters mb-7 flex flex-wrap items-center gap-[10px] border-b border-[var(--ink-a08)] pb-7">
          <button
            type="button"
            onClick={onClear}
            aria-pressed={active === null}
            className={chipClass(active === null)}
          >
            All work
          </button>
          {categories.map((category) => {
            const count = categoryCount(category);
            const on = active === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelect(category.id)}
                aria-pressed={on}
                className={chipClass(on)}
              >
                {category.label}
                <span
                  className={`text-[12px] font-semibold tabular-nums ${
                    on
                      ? "text-[hsl(var(--ink-1))]/55"
                      : "text-[hsl(var(--ink-3))]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result count, announced so a filter press is not a silent change for
            anyone who cannot see the grid re-flow. */}
        <div
          aria-live="polite"
          className="pg-head mb-8 flex flex-wrap items-center gap-3 text-[14px] text-[hsl(var(--ink-2))]"
        >
          <span>
            Showing {projects.length} project
            {projects.length === 1 ? "" : "s"}
            {active ? ` in ${active}` : ""}
          </span>
          {active && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-[7px] text-[13px] font-semibold text-[hsl(var(--ink-1))] underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
            >
              <X className="h-[13px] w-[13px]" strokeWidth={2.4} />
              Clear filter
            </button>
          )}
        </div>

        {shown.length > 0 ? (
          // Column and row gaps differ, as they do in the reference: 23 and 17
          // against its 1022 grid, scaled by 1400/1022.
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-6">
            {shown.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-[26px] border border-[var(--glass-border)] bg-[var(--glass-fill)] px-6 py-16 text-center shadow-[var(--shadow)] backdrop-blur-[16px]">
            <p className="text-[17px] font-semibold">
              Nothing here yet in {active}.
            </p>
            <p className="mt-2 text-[15px] text-[hsl(var(--ink-2))]">
              The work in this category is under NDA or still in build.
            </p>
            <button
              type="button"
              onClick={onClear}
              className="mt-6 inline-flex items-center gap-[9px] rounded-full bg-[hsl(var(--yellow))] px-[22px] py-[11px] text-[14px] font-bold shadow-[var(--shadow-sm)] transition-[transform,background-color] duration-200 ease-[var(--ease)] hover:-translate-y-[3px] hover:bg-[hsl(var(--yellow-deep))]"
            >
              Show all projects
            </button>
          </div>
        )}

        {remaining > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((n) => n + BATCH)}
              className="pg-more inline-flex items-center gap-[10px] rounded-full border border-[var(--glass-border-ink)] bg-[var(--glass-fill-strong)] px-[26px] py-[13px] text-[14px] font-bold tracking-[0.02em] shadow-[var(--shadow-sm)] backdrop-blur-[16px] transition-transform duration-200 ease-[var(--ease)] hover:-translate-y-[3px]"
            >
              LOAD MORE PROJECTS
              <ChevronDown className="h-[16px] w-[16px]" strokeWidth={2.4} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
