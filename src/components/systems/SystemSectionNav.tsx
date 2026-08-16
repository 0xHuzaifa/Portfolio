"use client";

import { useEffect, useState } from "react";
import { scale } from "@/components/portfolio/stage";

/**
 * The numbered section rail under the stage.
 *
 * Sticky, and it tracks what the reader is actually looking at rather than what
 * they last clicked: a click that scrolls past two sections would otherwise
 * leave the rail lying about position.
 *
 * Position is READ, not observed. An IntersectionObserver only speaks when a
 * boundary is crossed, so any scroll position with no section inside its band —
 * a gap between two panels, a section taller than the band, a jump that skips
 * the band entirely — left the rail showing whatever it last heard about. That
 * is what made it stick on one item and then leap two ahead. Comparing every
 * section's top against the rail line answers the question directly at any
 * scroll position, including the ones nothing happens at.
 */

export interface SystemSection {
  id: string;
  label: string;
}

export function SystemSectionNav({ sections }: { sections: SystemSection[] }) {
  const [current, setCurrent] = useState(sections[0]?.id);

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return;

    let frame = 0;

    const read = () => {
      frame = 0;

      // A little below the rail itself: a section becomes current once its
      // heading has cleared the bar, not when its top edge grazes it.
      const line = window.innerHeight * 0.32;

      let next = nodes[0].id;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) next = node.id;
      }

      // The last section can be shorter than the space under the line — at the
      // very bottom of the page it would otherwise never become current.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      setCurrent(atBottom ? nodes[nodes.length - 1].id : next);
    };

    const onScroll = () => {
      // Scroll fires far faster than the rail can usefully change.
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <nav
      aria-label="Case study sections"
      style={scale}
      // The header is `fixed` and its height is 88 *canvas* units, so above
      // `lg` it is shorter than 88px. Parking the rail at a flat 88px left a
      // few pixels of gap between the two, and page content ran up through it
      // while scrolling — the rail was pinned, but it read as sliding. The
      // offset has to come off the same `--s` the header sizes itself with.
      className="sticky top-[88px] z-30 border-b border-[var(--ink-a08)] bg-[hsl(var(--beige-1))]/92 backdrop-blur-[18px] lg:top-[calc(88*var(--s))]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <ul className="-mx-2 flex items-center gap-1 overflow-x-auto md:gap-4 lg:justify-between">
          {sections.map((section, i) => {
            const on = current === section.id;

            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`inline-flex items-center gap-[10px] whitespace-nowrap border-b-2 px-2 py-[18px] text-[14px] font-semibold tracking-[0.02em] transition-colors duration-200 md:py-[20px] ${
                    on
                      ? "border-[hsl(var(--yellow-deep))] border-b-3 text-[hsl(var(--ink-1))]"
                      : "border-transparent text-[hsl(var(--ink-3))] hover:text-[hsl(var(--ink-1))]"
                  }`}
                >
                  {/* The number takes the label's colour: it is part of the
                      same word, and giving it the accent made the rail read as
                      five separate things instead of one list. */}
                  <span className="font-data text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="uppercase">{section.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
