"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRef } from "react";
import { footerSequence } from "@/animations/footer";
import { halfSectionClass, halfStageClass, scale, stageStyle } from "./stage";

gsap.registerPlugin(useGSAP);

/**
 * Lifted out of FinalCta so that section fits one screen. Runs at half height
 * (1620x437) on the same `--s`, so it lines up with every other section's width.
 *
 * The `ft-*` classes are handles for `footerSequence` — the only sequence on
 * the page that does not pin, because this is the last element in the document
 * and a pin would have no scroll room to play out in.
 */
const social: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "GitHub",
    href: "https://github.com/0xhuzaifa",
    icon: (
      <path
        fill="currentColor"
        stroke="none"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/0xhuzaifa",
    icon: (
      <path
        fill="currentColor"
        stroke="none"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z"
      />
    ),
  },
  {
    label: "Email",
    href: "mailto:huzaifa.rb00@gmail.com",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
  {
    label: "Resume",
    href: "/about",
    icon: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </>
    ),
  },
];

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // Returned so StrictMode's remount reverts the matchMedia; without it the
      // first run's ScrollTrigger survives and fights the second.
      return footerSequence(root.current);
    },
    { scope: root },
  );

  return (
    <section ref={root} style={stageStyle} className={halfSectionClass}>
      <div style={scale} className={halfStageClass}>
        {/* divider with its glowing origin dot — the dot lands first and the
            rule is drawn out of it */}
        <div className="ft-rule relative h-px w-full bg-[rgba(17,17,17,0.12)] lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(190*var(--s))] lg:z-[2] lg:w-[calc(1480*var(--s))]" />
        <span className="ft-dot absolute left-0 hidden rounded-full bg-[hsl(var(--yellow))] shadow-[0_0_14px_3px_rgba(246,242,60,0.7)] lg:block lg:left-[calc(66*var(--s))] lg:top-[calc(185*var(--s))] lg:z-[3] lg:h-[calc(11*var(--s))] lg:w-[calc(11*var(--s))]" />

        <div className="mt-8 flex flex-col gap-6 lg:mt-0 lg:block">
          <div className="ft-copy text-[14px] leading-[1.6] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(220*var(--s))] lg:z-[3] lg:text-[calc(15*var(--s))]">
            <div>
              &copy; {new Date().getFullYear()} 0xHuzaifa. All rights reserved.
            </div>
            <div>Built with precision. Designed for impact.</div>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:absolute lg:right-[calc(70*var(--s))] lg:top-[calc(226*var(--s))] lg:z-[3] lg:gap-[calc(40*var(--s))]">
            {social.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="ft-social inline-flex items-center gap-[9px] text-[14px] transition-opacity hover:opacity-70 lg:gap-[calc(9*var(--s))] lg:text-[calc(15*var(--s))]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[19px] w-[19px] lg:h-[calc(20*var(--s))] lg:w-[calc(20*var(--s))]"
                >
                  {item.icon}
                </svg>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
