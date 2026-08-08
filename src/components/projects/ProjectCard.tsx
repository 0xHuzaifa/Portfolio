import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectEntry } from "@/data/projects";

/**
 * One grid card: screenshot on the left, the record on the right.
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
  const href = project.caseStudySlug
    ? `/systems/${project.caseStudySlug}`
    : project.liveUrl;
  const label = project.caseStudySlug ? "View Case Study" : "Visit Live Site";
  const external = !project.caseStudySlug;

  return (
    <article className="pg-card group relative flex flex-col gap-5 rounded-[26px] border border-[var(--glass-border)] bg-[var(--glass-fill)] p-4 shadow-[var(--shadow)] backdrop-blur-[16px] transition-[transform,box-shadow] duration-300 ease-[var(--ease)] [transform:translateZ(0)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-hover)] sm:flex-row sm:p-5">
      {/* `contain`, not `cover`: today's screenshots are a mix of architecture
          diagrams and device mockups, and cropping either one cuts it mid-
          content. Once every project ships a real UI screenshot at a consistent
          ratio, `object-cover` is the treatment the reference actually uses. */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[18px] border border-[var(--glass-border)] bg-[rgba(255,255,255,0.55)] p-2 sm:aspect-auto sm:h-auto sm:w-[44%] sm:self-stretch">
        <Image
          src={project.image}
          alt={`${project.title} interface`}
          placeholder="blur"
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 90vw"
          className="object-contain transition-transform duration-500 ease-[var(--ease)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden="true"
            className="text-[38px] font-extrabold leading-none tracking-[-0.02em] text-[rgba(17,17,17,0.16)]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} — open live site`}
              className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-[hsl(var(--yellow))] shadow-[0_8px_18px_rgba(246,242,60,0.45)] transition-transform duration-200 ease-[var(--ease)] hover:-translate-y-[2px]"
            >
              <ArrowUpRight className="h-[17px] w-[17px]" strokeWidth={2.2} />
            </Link>
          )}
        </div>

        <h3 className="mt-2 text-[19px] font-extrabold leading-[1.2] tracking-[-0.02em]">
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

        <div className="mt-3 flex flex-wrap gap-2">
          {project.categories.slice(0, 2).map((category, i) => (
            <span
              key={category}
              className={`rounded-full px-[11px] py-[4px] text-[12px] font-semibold ${
                i === 0
                  ? "bg-[hsl(var(--yellow))]"
                  : "border border-[var(--glass-border-ink)] bg-[var(--glass-fill-strong)] text-[hsl(var(--ink-2))]"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <p className="mt-3 text-[14px] leading-[1.55] text-[hsl(var(--ink-2))]">
          {project.description}
        </p>

        {href && (
          <Link
            href={href}
            {...(external
              ? { target: "_blank", rel: "noreferrer" }
              : undefined)}
            className="mt-auto inline-flex w-fit items-center gap-[9px] pt-4 text-[14px] font-bold transition-transform duration-200 ease-[var(--ease)] hover:translate-x-[3px]"
          >
            {label}
            <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.2} />
          </Link>
        )}
      </div>
    </article>
  );
}
