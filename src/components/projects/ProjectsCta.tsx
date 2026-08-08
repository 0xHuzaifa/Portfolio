import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

/**
 * The band that closes the grid. Flows with section 2 rather than sitting on
 * the canvas, so it stays glued to the end of the list however long that grows.
 */

export function ProjectsCta() {
  return (
    <section className="w-full bg-[hsl(var(--beige-1))] px-6 pb-24 text-[hsl(var(--ink-1))] md:px-10">
      <div className="pg-cta mx-auto flex w-full max-w-[1400px] flex-col items-start gap-6 rounded-[26px] border border-[var(--glass-border)] bg-[var(--glass-fill)] px-6 py-8 shadow-[var(--shadow)] backdrop-blur-[16px] [transform:translateZ(0)] md:px-10 lg:flex-row lg:items-center lg:gap-10 lg:py-9">
        <span className="flex h-[62px] w-[62px] flex-none items-center justify-center rounded-full bg-[hsl(var(--yellow))] shadow-[0_10px_26px_rgba(246,242,60,0.5)]">
          <CalendarDays
            className="h-[27px] w-[27px]"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>

        <h2 className="text-[28px] font-extrabold leading-[1.15] tracking-[-0.025em] lg:text-[32px]">
          Have a project
          <br className="hidden lg:block" /> in mind?
        </h2>

        <span
          aria-hidden="true"
          className="hidden h-[64px] w-px bg-[var(--ink-a12)] lg:block"
        />

        <p className="max-w-[360px] text-[16px] leading-[1.5] text-[hsl(var(--ink-2))]">
          Let&rsquo;s build something exceptional together.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-[10px] rounded-full bg-[hsl(var(--yellow))] px-[26px] py-[14px] text-[15px] font-bold tracking-[0.03em] shadow-[var(--shadow-sm)] transition-[transform,background-color] duration-200 ease-[var(--ease)] hover:-translate-y-[3px] hover:bg-[hsl(var(--yellow-deep))] lg:ml-auto"
        >
          LET&apos;S TALK
          <ArrowRight className="h-[16px] w-[16px]" strokeWidth={2.4} />
        </Link>
      </div>
    </section>
  );
}
