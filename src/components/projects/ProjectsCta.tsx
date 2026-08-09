import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { scale, stageStyle } from "@/components/portfolio/stage";
import { contentClass } from "./ProjectsGrid";

/**
 * The band that closes the grid. Flows with section 2 rather than sitting on
 * the canvas, so it stays glued to the end of the list however long that grows.
 *
 * Four parts separated by two hairlines, as the reference divides it: badge and
 * heading, then the line, then the sub-line, then the line again, then the CTA
 * hard against the right edge.
 */

export function ProjectsCta() {
  return (
    <section
      style={stageStyle}
      className="w-full bg-[hsl(var(--beige-1))] px-6 pb-24 text-[hsl(var(--ink-1))] md:px-10 lg:px-0"
    >
      <div
        style={scale}
        className={`pg-cta flex flex-col ${contentClass} items-start gap-7 rounded-[22px] border border-[var(--glass-border)] bg-[var(--glass-fill)] px-7 py-8 shadow-[var(--shadow)] backdrop-blur-[16px] [transform:translateZ(0)] md:px-10 lg:h-[129px] lg:flex-row lg:items-center lg:gap-9 lg:py-0`}
      >
        <span className="flex h-[62px] w-[62px] flex-none items-center justify-center rounded-full bg-[hsl(var(--yellow))] shadow-[0_10px_26px_rgba(246,242,60,0.5)] lg:h-[68px] lg:w-[68px]">
          <CalendarDays
            className="h-[27px] w-[27px] lg:h-[30px] lg:w-[30px]"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>

        <h2 className="text-[26px] font-extrabold leading-[1.16] tracking-[-0.025em] lg:text-[27px]">
          Have a project
          <br className="hidden lg:block" /> in mind?
        </h2>

        <span
          aria-hidden="true"
          className="hidden w-px flex-none bg-[var(--ink-a12)] lg:block lg:h-[63px]"
        />

        <p className="max-w-[300px] text-[15px] leading-[1.5] text-[hsl(var(--ink-2))]">
          Let&rsquo;s build something exceptional together.
        </p>

        <span
          aria-hidden="true"
          className="hidden w-px flex-none bg-[var(--ink-a12)] lg:ml-auto lg:block lg:h-[63px]"
        />

        <Link
          href="/contact"
          className="inline-flex h-[48px] items-center gap-[10px] rounded-full bg-[hsl(var(--yellow))] px-[28px] text-[15px] font-bold tracking-[0.03em] shadow-[var(--shadow-sm)] transition-[transform,background-color] duration-200 ease-[var(--ease)] hover:-translate-y-[3px] hover:bg-[hsl(var(--yellow-deep))] lg:h-[44px]"
        >
          LET&apos;S TALK
          <ArrowRight className="h-[16px] w-[16px]" strokeWidth={2.4} />
        </Link>
      </div>
    </section>
  );
}
