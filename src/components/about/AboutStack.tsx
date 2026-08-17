import { scale, stageStyle } from "@/components/portfolio/stage";
import { categoryLabels, techStack } from "@/data/techStack";
import { AboutEyebrow } from "./AboutEyebrow";
import { flowSectionClass, flowStageClass } from "./aboutStage";

/**
 * Section 05 — Skills & stack. Scrolls.
 *
 * Four ruled category rows. Pure reference: someone checking whether you know
 * Postgres wants to find "PostgreSQL" in under a second, so nothing here is
 * animated on a scrub and nothing is hidden behind an interaction.
 *
 * Grouped from `techStack` at render rather than hand-listed, so adding a
 * technology to that file is the only edit needed.
 */
export function AboutStack() {
  const grouped = techStack.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item.name);
      return acc;
    },
    {} as Record<string, string[]>,
  );

  const categories = Object.entries(grouped) as [
    keyof typeof categoryLabels,
    string[],
  ][];

  return (
    <section style={stageStyle} className={flowSectionClass}>
      <div style={scale} className={flowStageClass}>
        <AboutEyebrow>Stack</AboutEyebrow>

        <h2 className="mt-6 text-[clamp(2.25rem,9vw,56px)] font-extrabold leading-[1.02] tracking-[-0.033em] lg:mt-[calc(34*var(--s))] lg:text-[calc(87*var(--s))] lg:leading-[calc(88*var(--s))]">
          What I reach for<span className="text-[hsl(var(--yellow-deep))]">.</span>
        </h2>

        <dl className="mt-12 lg:mt-[calc(72*var(--s))]">
          {categories.map(([category, items]) => (
            <div
              key={category}
              data-reveal
              className="grid grid-cols-1 gap-3 border-t border-[var(--ink-a12)] py-6 last:border-b sm:grid-cols-[180px_1fr] sm:gap-8 lg:grid-cols-[calc(230*var(--s))_1fr] lg:gap-[calc(40*var(--s))] lg:py-[calc(34*var(--s))]"
            >
              <dt className="font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-3))] sm:pt-[10px] lg:pt-[calc(12*var(--s))] lg:text-[calc(15*var(--s))]">
                {categoryLabels[category]}
              </dt>
              <dd className="flex flex-wrap gap-[10px] lg:gap-[calc(14*var(--s))]">
                {items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-[var(--ink-a12)] px-[16px] py-[8px] text-[14px] font-semibold lg:px-[calc(22*var(--s))] lg:py-[calc(11*var(--s))] lg:text-[calc(19*var(--s))]"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
