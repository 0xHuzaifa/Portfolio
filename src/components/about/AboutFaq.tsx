import { scale, stageStyle } from "@/components/portfolio/stage";
import { faqs } from "@/data/about";
import { AboutEyebrow } from "./AboutEyebrow";
import { flowSectionClass, flowStageClass } from "./aboutStage";

/**
 * Section 08 — Questions people actually ask. Scrolls.
 *
 * Sits immediately before the close so it answers objections at the moment of
 * the ask, rather than after it.
 *
 * Deliberately NOT an accordion. All six answers are visible at once: there is
 * nothing to click, the whole set can be scanned in a glance, and every word is
 * indexable — FAQ copy hidden inside collapsed panels is a common and expensive
 * SEO mistake. Rendered as a real `<dl>` for the same reason.
 */
export function AboutFaq() {
  return (
    <section style={stageStyle} className={flowSectionClass}>
      <div style={scale} className={flowStageClass}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-[calc(60*var(--s))]">
          <div>
            <AboutEyebrow>FAQ</AboutEyebrow>
            <h2 className="mt-6 text-[clamp(2.25rem,9vw,56px)] font-extrabold leading-[1.02] tracking-[-0.033em] lg:mt-[calc(34*var(--s))] lg:text-[calc(87*var(--s))] lg:leading-[calc(88*var(--s))]">
              Before you
              <br />
              get in touch<span className="text-[hsl(var(--yellow-deep))]">.</span>
            </h2>
          </div>

          <p className="max-w-[520px] text-[16px] leading-[1.6] text-[hsl(var(--ink-2))] lg:mb-[calc(12*var(--s))] lg:w-[calc(550*var(--s))] lg:max-w-none lg:text-[calc(19*var(--s))] lg:leading-[calc(31*var(--s))]">
            The things that come up in almost every first conversation &mdash;
            answered here so the first message can be about your project
            instead.
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-x-16 md:grid-cols-2 lg:mt-[calc(78*var(--s))] lg:gap-x-[calc(97*var(--s))]">
          {faqs.map((faq) => (
            <div
              key={faq.n}
              data-reveal
              className="border-t border-[var(--ink-a12)] py-7 lg:py-[calc(38*var(--s))]"
            >
              <div className="flex gap-5 lg:gap-[calc(24*var(--s))]">
                <span className="font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-3))] lg:pt-[calc(6*var(--s))] lg:text-[calc(15*var(--s))]">
                  {faq.n}
                </span>
                <div>
                  <dt className="text-[18px] font-extrabold leading-[1.25] tracking-[-0.015em] lg:text-[calc(28*var(--s))]">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 text-[15px] leading-[1.65] text-[hsl(var(--ink-2))] lg:mt-[calc(14*var(--s))] lg:text-[calc(19*var(--s))] lg:leading-[calc(31*var(--s))]">
                    {faq.answer}
                  </dd>
                </div>
              </div>
            </div>
          ))}
        </dl>

        <div className="border-t border-[var(--ink-a12)]" />
      </div>
    </section>
  );
}
