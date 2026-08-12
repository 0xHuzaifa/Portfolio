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
 * The shell owns one piece of state: which category is selected. The hero's
 * deck writes it, the grid reads it. Kept as component state rather than a
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

  const select = (category: ProjectCategory) => {
    // Pressing the lit card clears, which is what `aria-pressed` promises.
    setActive((current) => (current === category ? null : category));

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.getElementById("projects-grid")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <ProjectsHero active={active} onSelect={select} />
      <ProjectsGrid
        projects={filtered}
        active={active}
        onClear={() => setActive(null)}
      />
      <ProjectsCta />
      <Footer />
    </>
  );
}
