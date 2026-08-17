"use client";

import { useMemo, useState } from "react";
import { Footer } from "@/components/portfolio/Footer";
import { ProjectsCta } from "@/components/projects/ProjectsCta";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { type ProjectCategory, projects } from "@/data/projects";

/**
 * /systems — the page the header's "PROJECTS" link points at.
 *
 * The shell owns one piece of state: which category is selected. The grid's own
 * filter row both writes and reads it now — it used to be written a section
 * away, by the hero's category deck. Kept as component state rather than a
 * `?category=` search param because reading search params in Next 16 needs a
 * Suspense boundary, which is a lot of machinery for one filter — worth
 * revisiting if shareable filtered links are ever wanted.
 */

export function SystemsPageContent() {
  const [active, setActive] = useState<ProjectCategory | null>(null);

  const filtered = useMemo(
    () =>
      active
        ? projects.filter((project) => project.categories.includes(active))
        : projects,
    [active],
  );

  // Pressing the lit chip clears, which is what `aria-pressed` promises. No
  // scroll any more: the filter now sits with the results, so moving the page
  // under the pointer would only take the control the visitor just used away
  // from them.
  const select = (category: ProjectCategory) =>
    setActive((current) => (current === category ? null : category));

  return (
    <>
      <ProjectsHero />
      <ProjectsGrid
        projects={filtered}
        active={active}
        onSelect={select}
        onClear={() => setActive(null)}
      />
      <ProjectsCta />
      <Footer />
    </>
  );
}
