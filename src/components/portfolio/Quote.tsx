import { scale, sectionClass, stageClass, stageStyle } from "./stage";

/**
 * Lifted out of the About section so both fit one screen. Geometry follows the
 * quote reference (1024x328 card), scaled onto the shared 1620x875 canvas.
 */
export function Quote() {
  return (
    <section style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        <div className="relative flex flex-col gap-8 rounded-[28px] border border-[var(--glass-border)] bg-[var(--glass-fill)] p-[28px] shadow-[var(--shadow)] backdrop-blur-[16px] [transform:translateZ(0)] lg:absolute lg:left-[calc(60*var(--s))] lg:top-[calc(224*var(--s))] lg:h-[calc(427*var(--s))] lg:w-[calc(1500*var(--s))] lg:gap-0 lg:rounded-[calc(44*var(--s))] lg:p-0">
          <span className="font-hand text-[64px] font-bold leading-[0.6] text-[hsl(var(--yellow))] lg:absolute lg:left-[calc(68*var(--s))] lg:top-[calc(52*var(--s))] lg:text-[calc(150*var(--s))]">
            &ldquo;
          </span>

          <p className="text-[30px] font-extrabold leading-[1.14] tracking-[-0.02em] lg:absolute lg:left-[calc(366*var(--s))] lg:top-[calc(48*var(--s))] lg:w-[calc(700*var(--s))] lg:text-[calc(74*var(--s))] lg:leading-[calc(71*var(--s))]">
            Good software isn&rsquo;t impressive. Good software is invisible
            <span className="text-[hsl(var(--yellow))]">.</span>
          </p>

          <div className="lg:absolute lg:left-[calc(1123*var(--s))] lg:top-[calc(140*var(--s))] lg:w-[calc(300*var(--s))]">
            <div className="h-[2px] w-[26px] bg-[hsl(var(--yellow))] lg:mb-[calc(18*var(--s))] lg:h-[calc(3*var(--s))] lg:w-[calc(30*var(--s))]" />
            <p className="mt-4 text-[17px] leading-[1.6] lg:mt-0 lg:text-[calc(27*var(--s))] lg:leading-[calc(41*var(--s))]">
              I build systems that don&rsquo;t just work — they create real
              value for real people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
