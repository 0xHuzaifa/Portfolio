import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectEntry } from "@/data/projects";

/**
 * One grid card, fitted to the reference.
 *
 * Proportions measured off it and scaled by 1400/1022 (the reference grid's
 * width against this container's): the screenshot takes 53% of the card's inner
 * width and the record 43%, with a 27px channel between them. The screenshot is
 * flush — no frame, no inset border — and fills its box edge to edge, which is
 * what makes the row read as a product shelf rather than a list of thumbnails.
 *
 * This is an `<article>`, never a link. The corner badge and the footer link
 * point at different destinations, and wrapping the card in an anchor would
 * nest them — invalid HTML that collapses keyboard navigation. The title
 * carries the primary destination instead, and `group-hover` lets the whole
 * card still respond to the pointer.
 */

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectEntry;
  index: number;
}) {
  const caseStudy = project.caseStudySlug
    ? `/systems/${project.caseStudySlug}`
    : undefined;
  const href = caseStudy ?? project.liveUrl;
  const label = caseStudy ? "View Case Study" : "Visit Live Site";
  const external = !caseStudy;

  // The reference puts the badge on every card. It sends you out to the live
  // system when there is one and falls back to the case study otherwise, so it
  // is never a dead ornament.
  const badgeHref = project.liveUrl ?? caseStudy;
  const badgeExternal = Boolean(project.liveUrl);

  return (
    <article className="pg-card group relative flex flex-col gap-5 rounded-[22px] border border-[var(--glass-border)] bg-[var(--glass-fill)] p-5 shadow-[var(--shadow)] backdrop-blur-[16px] transition-[transform,box-shadow] duration-300 ease-[var(--ease)] [transform:translateZ(0)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-hover)] sm:flex-row sm:gap-[27px]">
      {/* Flush and cropped, exactly as the reference frames it. The current
          assets are architecture diagrams rather than UI screenshots, so they
          crop to their top edge — swapping in real product shots is the only
          thing standing between this and the reference's shelf of dashboards. */}
      <div className="relative aspect-[233/221] w-full shrink-0 overflow-hidden rounded-[12px] bg-[rgba(255,255,255,0.5)] sm:aspect-auto sm:h-auto sm:w-[53%] sm:self-stretch">
        <Image
          src={project.image}
          alt={`${project.title} interface`}
          placeholder="blur"
          fill
          sizes="(min-width: 1024px) 26vw, (min-width: 640px) 48vw, 90vw"
          className="object-cover object-top transition-transform duration-500 ease-[var(--ease)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden="true"
            className="text-[44px] font-extrabold leading-[0.8] tracking-[-0.02em] text-[rgba(17,17,17,0.16)]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {badgeHref && (
            <Link
              href={badgeHref}
              {...(badgeExternal
                ? { target: "_blank", rel: "noreferrer" }
                : undefined)}
              aria-label={
                badgeExternal
                  ? `${project.title} — open live site`
                  : `${project.title} — open case study`
              }
              className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-[hsl(var(--yellow))] shadow-[0_8px_18px_rgba(246,242,60,0.45)] transition-transform duration-200 ease-[var(--ease)] hover:-translate-y-[2px]"
            >
              <ArrowUpRight className="h-[17px] w-[17px]" strokeWidth={2.2} />
            </Link>
          )}
        </div>

        <h3 className="mt-[18px] text-[22px] font-extrabold leading-[1.18] tracking-[-0.025em]">
          {href ? (
            <Link
              href={href}
              {...(external
                ? { target: "_blank", rel: "noreferrer" }
                : undefined)}
              className="transition-colors duration-200 hover:text-[hsl(var(--ink-2))]"
            >
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>

        <div className="mt-[14px] flex flex-wrap gap-[9px]">
          {project.categories.slice(0, 2).map((category, i) => (
            <span
              key={category}
              className={`rounded-full px-[12px] py-[5px] text-[12px] font-semibold ${
                i === 0
                  ? "bg-[hsl(var(--yellow))]"
                  : "border border-[var(--glass-border-ink)] bg-[var(--glass-fill-strong)] text-[hsl(var(--ink-2))]"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <p className="mt-[16px] text-[15px] leading-[25px] text-[hsl(var(--ink-2))]">
          {project.description}
        </p>

        {href && (
          <Link
            href={href}
            {...(external
              ? { target: "_blank", rel: "noreferrer" }
              : undefined)}
            className="mt-auto inline-flex w-fit items-center gap-[10px] pt-5 text-[15px] font-bold transition-transform duration-200 ease-[var(--ease)] hover:translate-x-[3px]"
          >
            {label}
            <ArrowRight className="h-[16px] w-[16px]" strokeWidth={2.2} />
          </Link>
        )}
      </div>
    </article>
  );
}
