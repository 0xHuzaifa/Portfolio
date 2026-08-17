"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { thinkSequence } from "@/animations/think";
import { scale, sectionClass, stageClass, stageStyle } from "./stage";

gsap.registerPlugin(useGSAP);

/**
 * Re-fitted from the design's 1620x1080 stage onto the shared 1620x875 canvas.
 * The diagram (panel + connectors + nodes) keeps its ORIGINAL 1620x1080
 * coordinate system and is scaled as a single group — the connector paths are
 * hand-authored against those coordinates, so moving nodes individually would
 * desynchronise every line. Scroll indicator and section nav are dropped.
 *
 * The `hit-*` classes and the `data-draw` / `data-pop` attributes are handles
 * for `thinkSequence`, which assembles the diagram on scroll. `data-draw`
 * groups connectors into the order they are drawn; `data-pop` marks the
 * junction dots and the bus diamond that land on top of finished lines.
 */

type Node = {
  n: string;
  x: number;
  y: number;
  title: string;
  body: string;
  icon: React.ReactNode;
};

const nodes: Node[] = [
  {
    n: "01",
    x: 796,
    y: 150,
    title: "Understand the Problem",
    body: "Dig deep to understand the real problem, users, and business goals.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </>
    ),
  },
  {
    n: "02",
    x: 558,
    y: 372,
    title: "Research & Analyze",
    body: "Study the domain, analyze workflows, data, and technical constraints.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.5 19a6.5 6.5 0 0 1 13 0" />
        <path d="M16.5 5.6a3 3 0 0 1 0 5.2M21 19a6.5 6.5 0 0 0-4.5-6.2" />
      </>
    ),
  },
  {
    n: "03",
    x: 796,
    y: 372,
    title: "Architecture First",
    body: "Design a clean, scalable, and maintainable system architecture.",
    icon: (
      <>
        <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" />
        <path d="M12 3v18M5 7l7 4 7-4" />
      </>
    ),
  },
  {
    n: "04",
    x: 1044,
    y: 372,
    title: "Plan & Prototype",
    body: "Map the solution, create prototypes, and validate before building.",
    icon: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </>
    ),
  },
  {
    n: "05",
    x: 558,
    y: 606,
    title: "Build with Precision",
    body: "Write clean, tested, and efficient code with best practices.",
    icon: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />,
  },
  {
    n: "06",
    x: 796,
    y: 606,
    title: "Test & Optimize",
    body: "Ensure performance, security, and reliability through rigorous testing.",
    icon: (
      <>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </>
    ),
  },
  {
    n: "07",
    x: 1044,
    y: 606,
    title: "Deploy & Monitor",
    body: "Deploy to production, monitor real-world usage, and system health.",
    icon: (
      <>
        <path d="M3 21h18" />
        <rect x="5" y="12" width="3.5" height="7" />
        <rect x="10.5" y="8" width="3.5" height="11" />
        <rect x="16" y="4" width="3.5" height="15" />
      </>
    ),
  },
  {
    n: "08",
    x: 796,
    y: 828,
    title: "Measure & Improve",
    body: "Collect feedback, analyze results, and iterate to make the system better.",
    icon: (
      <>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </>
    ),
  },
];

const attributes: { label: string; icon: React.ReactNode }[] = [
  {
    label: "User Focused",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </>
    ),
  },
  {
    label: "System Oriented",
    icon: (
      <>
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </>
    ),
  },
  {
    label: "Scalable Solutions",
    icon: <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />,
  },
  {
    label: "Performance Driven",
    icon: <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />,
  },
  {
    label: "Continuous Growth",
    icon: <path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" />,
  },
];

const nodeFace =
  "rounded-[20px] border border-white/70 bg-white/55 shadow-[0_20px_44px_rgba(0,0,0,0.07)] backdrop-blur-[14px] [transform:translateZ(0)]";

export function HowIThink() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      // Returned so StrictMode's remount reverts the matchMedia; without it the
      // first run's pinned ScrollTrigger survives and fights the second.
      return thinkSequence(root.current);
    },
    { scope: root },
  );

  return (
    <section ref={root} style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        {/* background wordmark */}
        <div
          aria-hidden="true"
          className="hit-think pointer-events-none absolute inset-x-0 bottom-[-30px] hidden select-none text-center font-extrabold leading-none tracking-[0.04em] text-[rgba(17,17,17,0.035)] lg:block lg:bottom-[calc(-30*var(--s))] lg:text-[calc(300*var(--s))]"
        >
          THINK
        </div>

        {/* ---------- left column ---------- */}
        <div className="hit-head flex items-center gap-[16px] lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(150*var(--s))] lg:z-[5] lg:gap-[calc(16*var(--s))]">
          <span className="h-[3px] w-[44px] rounded-[2px] bg-[hsl(var(--yellow))] lg:w-[calc(44*var(--s))]" />
          <span className="font-data text-[12px] font-semibold uppercase tracking-[0.18em] lg:text-[calc(14*var(--s))]">
            My Approach
          </span>
        </div>

        <h2 className="hit-head mt-6 text-[clamp(3rem,15vw,110px)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] lg:absolute lg:left-[calc(62*var(--s))] lg:top-[calc(190*var(--s))] lg:z-[5] lg:mt-0 lg:text-[calc(92*var(--s))]">
          How
          <br />I Think<span className="text-[hsl(var(--yellow-deep))]">.</span>
        </h2>

        <p className="hit-head mt-6 max-w-[420px] text-[19px] leading-[1.45] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(66*var(--s))] lg:top-[calc(390*var(--s))] lg:z-[5] lg:mt-0 lg:w-[calc(300*var(--s))] lg:max-w-none lg:text-[calc(19*var(--s))]">
          A system-first mindset to turn complex problems into simple,{" "}
          <strong className="font-bold text-[hsl(var(--ink-1))] [border-bottom:3px_solid_hsl(var(--yellow))]">
            scalable solutions.
          </strong>
        </p>

        <div className="hit-quote mt-8 max-w-[420px] rounded-[24px] border border-[var(--glass-border)] bg-[var(--glass-fill)] px-[26px] pb-[28px] pt-[24px] shadow-[var(--shadow)] backdrop-blur-[22px] [transform:translateZ(0)] lg:absolute lg:left-[calc(66*var(--s))] lg:top-[calc(500*var(--s))] lg:z-[5] lg:mt-0 lg:w-[calc(280*var(--s))] lg:max-w-none lg:rounded-[calc(24*var(--s))] lg:px-[calc(26*var(--s))] lg:pb-[calc(28*var(--s))] lg:pt-[calc(24*var(--s))]">
          <div className="font-hand h-[34px] text-[62px] font-bold leading-[0.5] text-[hsl(var(--yellow-deep))] lg:h-[calc(34*var(--s))] lg:text-[calc(62*var(--s))]">
            &ldquo;
          </div>
          <p className="mt-[6px] text-[17px] leading-[1.55] lg:mt-[calc(6*var(--s))] lg:text-[calc(18*var(--s))]">
            I don&rsquo;t just write code. I engineer systems that solve real
            problems and create lasting impact.
          </p>
        </div>

        {/* ---------- diagram ---------- */}
        <div className="mt-12 lg:absolute lg:left-[calc(8*var(--s))] lg:top-[calc(-43*var(--s))] lg:mt-0 lg:h-[calc(1080*var(--s))] lg:w-[calc(1620*var(--s))] lg:origin-top-left lg:[transform:scale(0.835)]">
          {/* panel */}
          <div className="hit-panel hidden lg:absolute lg:left-[calc(470*var(--s))] lg:top-[calc(100*var(--s))] lg:z-[1] lg:block lg:h-[calc(952*var(--s))] lg:w-[calc(860*var(--s))] lg:rounded-[calc(44*var(--s))] lg:border lg:border-white/50 lg:[background:linear-gradient(160deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] lg:shadow-[var(--shadow)] lg:backdrop-blur-[20px] lg:backdrop-saturate-[1.3] lg:[transform:translateZ(0)]" />

          {/* connectors — design coordinates, so the viewBox is the stage */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1620 1080"
            fill="none"
            className="pointer-events-none absolute inset-0 z-[2] hidden h-full w-full lg:block"
          >
            {/*
              The feedback loops cannot draw themselves: `stroke-dasharray` is
              already spoken for by their dash pattern. They are revealed
              through this mask instead, whose paths are the same two routes
              drawn with a fat solid stroke — so the dashes appear along the
              route in order, exactly like every other connector.
            */}
            <mask
              id="hit-loop-mask"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1620"
              height="1080"
            >
              <path
                data-draw="loop"
                d="M796,919 L536,919 Q512,919 512,895 L512,487 Q512,463 536,463 L558,463"
                fill="none"
                stroke="#ffffff"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                data-draw="loop"
                d="M988,919 L1264,919 Q1288,919 1288,895 L1288,487 Q1288,463 1264,463 L1236,463"
                fill="none"
                stroke="#ffffff"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </mask>

            <g
              stroke="rgba(17,17,17,0.34)"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path data-draw="trunk" d="M892,332 L892,372" />
              <path
                data-draw="branch"
                d="M892,332 L892,344 Q892,352 884,352 L662,352 Q654,352 654,360 L654,372"
              />
              <path
                data-draw="branch"
                d="M892,332 L892,344 Q892,352 900,352 L1132,352 Q1140,352 1140,360 L1140,372"
              />
              <path data-draw="links" d="M750,463 L796,463" />
              <path data-draw="links" d="M988,463 L1044,463" />
              <path data-draw="bus" d="M892,554 L892,580" />
              <path
                data-draw="bus"
                d="M654,554 L654,568 Q654,580 666,580 L884,580"
              />
              <path
                data-draw="bus"
                d="M1140,554 L1140,568 Q1140,580 1128,580 L900,580"
              />
              <path data-draw="drop" d="M892,580 L892,606" />
              {/* Authored from the card up to the bus, which is backwards for
                  the reveal — `data-draw-from` flips these two without
                  disturbing coordinates fitted to the node grid. */}
              <path
                data-draw="drop"
                data-draw-from="end"
                d="M654,606 L654,594 Q654,580 666,580"
              />
              <path
                data-draw="drop"
                data-draw-from="end"
                d="M1140,606 L1140,594 Q1140,580 1128,580"
              />
              <path data-draw="stem" d="M892,788 L892,828" />
            </g>

            <g
              className="hit-loops"
              mask="url(#hit-loop-mask)"
              stroke="rgba(17,17,17,0.3)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="6 7"
            >
              <path d="M796,919 L536,919 Q512,919 512,895 L512,487 Q512,463 536,463 L558,463" />
              <path d="M988,919 L1264,919 Q1288,919 1288,895 L1288,487 Q1288,463 1264,463 L1236,463" />
            </g>

            {/* The diamond keeps its own rotate attribute and the group takes
                the tween, so a CSS transform never overwrites it. */}
            <g data-pop="bus">
              <rect
                x="884"
                y="559"
                width="16"
                height="16"
                rx="2"
                transform="rotate(45 892 567)"
                fill="#ffffff"
                stroke="rgba(17,17,17,0.35)"
                strokeWidth="1.4"
              />
            </g>

            <g fill="#f6f23c" stroke="rgba(17,17,17,0.25)" strokeWidth="1">
              <circle data-pop="branch" cx="654" cy="372" r="5" />
              <circle data-pop="branch" cx="1140" cy="372" r="5" />
              <circle data-pop="links" cx="750" cy="463" r="5" />
              <circle data-pop="links" cx="988" cy="463" r="5" />
            </g>
          </svg>

          {/* nodes */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:contents">
            {nodes.map((node) => (
              <div
                key={node.n}
                className={`hit-node relative px-[18px] pb-[16px] pt-[34px] text-center ${nodeFace} lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:z-[3] lg:h-[calc(182*var(--s))] lg:w-[calc(192*var(--s))] lg:rounded-[calc(20*var(--s))] lg:px-[calc(18*var(--s))] lg:pb-[calc(16*var(--s))] lg:pt-[calc(34*var(--s))]`}
                style={{
                  ["--x" as string]: `calc(${node.x}*var(--s))`,
                  ["--y" as string]: `calc(${node.y}*var(--s))`,
                }}
              >
                <span className="absolute left-1/2 top-[-15px] flex h-[30px] w-[30px] -translate-x-1/2 items-center justify-center rounded-full bg-[hsl(var(--yellow))] font-data text-[12px] font-bold shadow-[0_6px_14px_rgba(246,242,60,0.6)] lg:top-[calc(-15*var(--s))] lg:h-[calc(30*var(--s))] lg:w-[calc(30*var(--s))] lg:text-[calc(12*var(--s))]">
                  {node.n}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto h-[30px] w-[30px] lg:h-[calc(30*var(--s))] lg:w-[calc(30*var(--s))]"
                >
                  {node.icon}
                </svg>
                <div className="mt-[12px] text-[15px] font-bold leading-[1.25] lg:mt-[calc(12*var(--s))] lg:text-[calc(13*var(--s))]">
                  {node.title}
                </div>
                <div className="mt-[8px] text-[13px] leading-[1.4] text-[hsl(var(--ink-2))] lg:mt-[calc(8*var(--s))] lg:text-[calc(12*var(--s))]">
                  {node.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- attributes panel ---------- */}
        <div className="hit-attrs mt-10 flex flex-col gap-[22px] rounded-[28px] border border-[var(--glass-border)] bg-[var(--glass-fill)] p-[26px] shadow-[var(--shadow)] backdrop-blur-[22px] [transform:translateZ(0)] sm:flex-row sm:flex-wrap lg:absolute lg:left-[calc(1220*var(--s))] lg:top-[calc(250*var(--s))] lg:z-[5] lg:mt-0 lg:w-[calc(300*var(--s))] lg:flex-col lg:flex-nowrap lg:gap-[calc(24*var(--s))] lg:rounded-[calc(28*var(--s))] lg:px-[calc(26*var(--s))] lg:py-[calc(30*var(--s))]">
          {attributes.map((attr) => (
            <div
              key={attr.label}
              className="hit-attr flex items-center gap-[16px] lg:gap-[calc(16*var(--s))]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[24px] w-[24px] flex-none lg:h-[calc(24*var(--s))] lg:w-[calc(24*var(--s))]"
              >
                {attr.icon}
              </svg>
              <div>
                <div className="whitespace-nowrap text-[15px] font-semibold lg:text-[calc(15*var(--s))]">
                  {attr.label}
                </div>
                <div className="mt-[6px] h-[2px] w-[28px] bg-[hsl(var(--yellow))] lg:mt-[calc(6*var(--s))] lg:w-[calc(28*var(--s))]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
