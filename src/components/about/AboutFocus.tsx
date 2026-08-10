import { scale, stageStyle } from "@/components/portfolio/stage";
import { portfolioProfile } from "@/data/portfolio";
import { systemBuildPhases } from "@/data/portfolio/process";
import { AboutEyebrow } from "./AboutEyebrow";
import { flowSectionClass, flowStageClass } from "./aboutStage";

/**
 * Section 06 — What I focus on, and how I keep it practical. Scrolls.
 *
 * Specialties and the build process were two separate thin sections on the old
 * page. Merged into one two-column reference spread: they answer the same
 * question from either end — what the work is, and how it gets done — and
 * neither had enough substance to hold a screen alone.
 */
export function AboutFocus() {
  return (
    <section style={stageStyle} className={flowSectionClass}>
      <div style={scale} className={flowStageClass}>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-[calc(120*var(--s))]">
          {/* ---------- what I focus on ---------- */}
          <div data-reveal>
            <AboutEyebrow>What I focus on</AboutEyebrow>
            <h2 className="mt-5 text-[clamp(1.75rem,7vw,40px)] font-extrabold leading-[1.06] tracking-[-0.03em] lg:mt-[calc(26*var(--s))] lg:text-[calc(55*var(--s))] lg:leading-[calc(58*var(--s))]">
              The work I do best
            </h2>

            <ol className="mt-8 lg:mt-[calc(42*var(--s))]">
              {portfolioProfile.specialties.map((specialty, i) => (
                <li
                  key={specialty}
                  className="flex gap-5 border-t border-[var(--ink-a12)] py-5 last:border-b lg:gap-[calc(26*var(--s))] lg:py-[calc(24*var(--s))]"
                >
                  <span className="font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-3))] lg:pt-[calc(3*var(--s))] lg:text-[calc(15*var(--s))]">
                    {`0${i + 1}`}
                  </span>
                  <p className="text-[16px] leading-[1.6] text-[hsl(var(--ink-2))] lg:text-[calc(20*var(--s))] lg:leading-[calc(31*var(--s))]">
                    {specialty}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* ---------- how I build ---------- */}
          <div data-reveal>
            <AboutEyebrow>How I build</AboutEyebrow>
            <h2 className="mt-5 text-[clamp(1.75rem,7vw,40px)] font-extrabold leading-[1.06] tracking-[-0.03em] lg:mt-[calc(26*var(--s))] lg:text-[calc(55*var(--s))] lg:leading-[calc(58*var(--s))]">
              Four phases
            </h2>

            <ol className="mt-8 lg:mt-[calc(42*var(--s))]">
              {systemBuildPhases.map((phase) => (
                <li
                  key={phase.id}
                  className="border-t border-[var(--ink-a12)] py-5 last:border-b lg:py-[calc(24*var(--s))]"
                >
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] lg:text-[calc(22*var(--s))]">
                    {phase.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-[1.6] text-[hsl(var(--ink-2))] lg:mt-[calc(7*var(--s))] lg:text-[calc(19*var(--s))] lg:leading-[calc(30*var(--s))]">
                    {phase.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
