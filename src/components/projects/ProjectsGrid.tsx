"use client";

import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { ProjectCategory, ProjectEntry } from "@/data/projects";
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

export function ProjectsGrid({
  projects,
  active,
  onClear,
}: {
  projects: ProjectEntry[];
  active: ProjectCategory | null;
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
      className="w-full scroll-mt-[110px] bg-[hsl(var(--beige-1))] px-6 pb-20 pt-16 text-[hsl(var(--ink-1))] md:px-10 lg:pb-28"
    >
      <div className="mx-auto w-full max-w-[1400px]">
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
              className="inline-flex items-center gap-[7px] rounded-full border border-[var(--glass-border-ink)] bg-[var(--glass-fill-strong)] px-[13px] py-[6px] text-[13px] font-semibold text-[hsl(var(--ink-1))] backdrop-blur-md transition-colors duration-200 hover:bg-[var(--ink-a04)]"
            >
              <X className="h-[13px] w-[13px]" strokeWidth={2.4} />
              Clear filter
            </button>
          )}
        </div>

        {shown.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
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
