"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Fragment, useRef } from "react";
import { quoteSequence } from "@/animations/quote";
import { scale, sectionClass, stageClass, stageStyle } from "./stage";

gsap.registerPlugin(useGSAP);

/**
 * Lifted out of the About section so both fit one screen. Geometry follows the
 * quote reference (1024x328 card), scaled onto the shared 1620x875 canvas.
 *
 * The `qt-*` classes are handles for `quoteSequence`. The sentence is split
 * into its two clauses here, at build time rather than at runtime, so the
 * server renders the finished markup and the words never reflow on hydration.
 */

/**
 * The statement, as the sequence needs to speak it.
 *
 * Split by clause, not by line: the pause between the setup and the turn is
 * the whole rhetorical move, and it belongs to the sentence rather than to
 * wherever the type happens to wrap. `invisible` and the full stop are rendered
 * separately below — neither behaves like the words around it.
 */
const setup = ["Good", "software", "isn’t", "impressive."];
const turn = ["Good", "software", "is"];

export function Quote() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // Returned so StrictMode's remount reverts the matchMedia; without it the
      // first run's pinned ScrollTrigger survives and fights the second.
      return quoteSequence(root.current);
    },
    { scope: root },
  );

  return (
    <section ref={root} style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        <div className="qt-panel relative flex flex-col gap-8 rounded-[28px] border border-[var(--glass-border)] bg-[var(--glass-fill)] p-[28px] shadow-[var(--shadow)] backdrop-blur-[16px] [transform:translateZ(0)] lg:absolute lg:left-[calc(60*var(--s))] lg:top-[calc(224*var(--s))] lg:h-[calc(427*var(--s))] lg:w-[calc(1500*var(--s))] lg:gap-0 lg:rounded-[calc(44*var(--s))] lg:p-0">
          <span className="qt-mark inline-block font-hand text-[64px] font-bold leading-[0.6] text-[hsl(var(--yellow))] lg:absolute lg:left-[calc(68*var(--s))] lg:top-[calc(52*var(--s))] lg:text-[calc(150*var(--s))]">
            &ldquo;
          </span>

          {/* Words are `inline-block` so they can be transformed individually.
              Each carries a real space after it as a text node, rather than
              margin, so the paragraph still wraps and collapses at line ends
              exactly as it did before the split. */}
          <p className="text-[30px] font-extrabold leading-[1.14] tracking-[-0.02em] lg:absolute lg:left-[calc(366*var(--s))] lg:top-[calc(48*var(--s))] lg:w-[calc(700*var(--s))] lg:text-[calc(74*var(--s))] lg:leading-[calc(71*var(--s))]">
            <span className="qt-clause">
              {setup.map((word) => (
                <Fragment key={word}>
                  <span className="qt-word inline-block">{word}</span>{" "}
                </Fragment>
              ))}
            </span>
            <span className="qt-clause">
              {turn.map((word) => (
                <Fragment key={word}>
                  <span className="qt-word inline-block">{word}</span>{" "}
                </Fragment>
              ))}
              <span className="qt-punchline inline-block">invisible</span>
              <span className="qt-stop inline-block text-[hsl(var(--yellow))]">
                .
              </span>
            </span>
          </p>

          <div className="lg:absolute lg:left-[calc(1123*var(--s))] lg:top-[calc(140*var(--s))] lg:w-[calc(300*var(--s))]">
            <div className="qt-credit-rule h-[2px] w-[26px] bg-[hsl(var(--yellow))] lg:mb-[calc(18*var(--s))] lg:h-[calc(3*var(--s))] lg:w-[calc(30*var(--s))]" />
            <p className="qt-credit mt-4 text-[17px] leading-[1.6] lg:mt-0 lg:text-[calc(27*var(--s))] lg:leading-[calc(41*var(--s))]">
              I build systems that don&rsquo;t just work — they create real
              value for real people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
