import { scale, stageStyle } from "@/components/portfolio/stage";
import { experience } from "@/data/experience";
import { AboutEyebrow } from "./AboutEyebrow";
import { flowSectionClass, flowStageClass } from "./aboutStage";

/**
 * Section 03 — Experience. Scrolls.
 *
 * Absorbed from `/experience`, which the redesigned nav no longer links; that
 * route now redirects here.
 *
 * A ruled editorial timeline rather than a pinned set piece, because this is
 * the one part of the page people scan for a specific fact — a job title, a
 * date, a number. Holding that hostage to a scrubbed timeline would be actively
 * hostile. The current role's marker is the only yellow one on the rail, so the
 * eye lands on it first.
 *
 * Reads `experience` directly, so this stays in step with the AI retrieval
 * layer that answers questions about the same roles.
 */
export function AboutExperience() {
  return (
    <section style={stageStyle} className={flowSectionClass}>
      <div style={scale} className={flowStageClass}>
        <AboutEyebrow>Experience</AboutEyebrow>

        <h2 className="mt-6 text-[clamp(2.25rem,9vw,56px)] font-extrabold leading-[1.02] tracking-[-0.033em] lg:mt-[calc(34*var(--s))] lg:text-[calc(87*var(--s))] lg:leading-[calc(88*var(--s))]">
          Three years, in
          <br />
          production<span className="text-[hsl(var(--yellow))]">.</span>
        </h2>

        <ol className="mt-12 border-l border-[var(--ink-a12)] pl-8 lg:mt-[calc(78*var(--s))] lg:pl-[calc(57*var(--s))]">
          {experience.map((role, i) => (
            <li
              key={role.id}
              data-reveal
              className={`relative ${i === experience.length - 1 ? "" : "pb-12 lg:pb-[calc(66*var(--s))]"}`}
            >
              {/* marker — yellow only for the current role */}
              <span
                aria-hidden="true"
                className={`absolute -left-[calc(2rem+5.5px)] top-[7px] h-[11px] w-[11px] rounded-full shadow-[0_0_0_5px_hsl(var(--beige-1))] lg:-left-[calc(57*var(--s)+5.5*var(--s))] lg:top-[calc(9*var(--s))] lg:h-[calc(11*var(--s))] lg:w-[calc(11*var(--s))] lg:shadow-[0_0_0_calc(6*var(--s))_hsl(var(--beige-1))] ${
                  role.current
                    ? "bg-[hsl(var(--yellow))]"
                    : "bg-[rgba(17,17,17,0.25)]"
                }`}
              />

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 lg:gap-x-[calc(16*var(--s))]">
                <span className="font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-3))] lg:text-[calc(15*var(--s))]">
                  {role.period}
                  {role.duration && !role.current ? ` · ${role.duration}` : ""}
                </span>
                {role.current && (
                  <span className="rounded-full bg-[hsl(var(--yellow))] px-[10px] py-[3px] font-data text-[10px] font-extrabold uppercase tracking-[0.14em] lg:px-[calc(13*var(--s))] lg:py-[calc(4*var(--s))] lg:text-[calc(13*var(--s))]">
                    Current
                  </span>
                )}
              </div>

              <h3 className="mt-3 text-[22px] font-extrabold tracking-[-0.02em] lg:mt-[calc(13*var(--s))] lg:text-[calc(39*var(--s))]">
                {role.role}
                <span className="font-semibold text-[hsl(var(--ink-3))]">
                  {" · "}
                  {role.company}
                </span>
              </h3>

              <p className="mt-3 max-w-[760px] text-[16px] leading-[1.6] text-[hsl(var(--ink-2))] lg:mt-[calc(16*var(--s))] lg:w-[calc(1010*var(--s))] lg:max-w-none lg:text-[calc(19*var(--s))] lg:leading-[calc(31*var(--s))]">
                {role.companyContext ? `${role.companyContext}. ` : ""}
                {role.description}
              </p>

              {role.highlights.length > 0 && (
                <ul className="mt-4 flex flex-col gap-3 lg:mt-[calc(20*var(--s))] lg:w-[calc(1010*var(--s))] lg:gap-[calc(12*var(--s))]">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-[15px] leading-[1.6] text-[hsl(var(--ink-2))] lg:gap-[calc(14*var(--s))] lg:text-[calc(18*var(--s))] lg:leading-[calc(29*var(--s))]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-[4px] w-[4px] flex-none rounded-full bg-[hsl(var(--yellow))] lg:mt-[calc(12*var(--s))] lg:h-[calc(5*var(--s))] lg:w-[calc(5*var(--s))]"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
