import Link from "next/link";

/**
 * Re-fitted from the design's 1620x1012 stage onto the shared 1620x875 canvas.
 * The two card rows carry the compression: 330 -> 285 tall with tighter
 * internals, rows moved to y100 / y415.
 */
import { scale, sectionClass, stageClass, stageStyle } from "./stage";

type Card = {
  n: string;
  title: [string, string];
  points: string[];
  icon: React.ReactNode;
};

const cards: Card[] = [
  {
    n: "01",
    title: ["Full-Stack", "Development"],
    points: [
      "MERN / PERN Stack",
      "Scalable Web Applications",
      "RESTful & GraphQL APIs",
      "Clean, Maintainable Code",
    ],
    icon: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />,
  },
  {
    n: "02",
    title: ["System", "Architecture"],
    points: [
      "Scalable System Design",
      "Microservices Architecture",
      "Database Design & Optimization",
      "Security & Performance",
    ],
    icon: (
      <>
        <path d="M12 2l4 2.3v4.6L12 11 8 8.9V4.3L12 2z" />
        <path d="M6 12l4 2.3v4.6L6 21l-4-2.1v-4.6L6 12z" />
        <path d="M18 12l4 2.3v4.6L18 21l-4-2.1v-4.6L18 12z" />
      </>
    ),
  },
  {
    n: "03",
    title: ["AI &", "Automation"],
    points: [
      "LLM Integration",
      "AI Agents & Workflows",
      "Intelligent Automation",
      "RAG & Vector Search",
    ],
    icon: (
      <>
        <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.6A3 3 0 0 0 6 18a3 3 0 0 0 3 2V4z" />
        <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1.5 5.6A3 3 0 0 1 18 18a3 3 0 0 1-3 2V4z" />
      </>
    ),
  },
  {
    n: "04",
    title: ["Cloud &", "DevOps"],
    points: [
      "AWS / DigitalOcean",
      "CI/CD Pipelines",
      "Docker & Containerization",
      "Monitoring & Logging",
    ],
    icon: (
      <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.98A6 6 0 0 0 6 9a4.5 4.5 0 0 0 .5 10H17.5z" />
    ),
  },
  {
    n: "05",
    title: ["Data &", "Integrations"],
    points: [
      "Database Modeling",
      "Third-Party Integrations",
      "Real-time Processing",
      "Data Security",
    ],
    icon: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </>
    ),
  },
  {
    n: "06",
    title: ["Product", "Engineering"],
    points: [
      "End-to-End Product Build",
      "MVP to Production",
      "Feature Planning",
      "Long-term Support",
    ],
    icon: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M11 18.5h2" />
      </>
    ),
  },
];

const stats: { value: string; label: string; icon: React.ReactNode }[] = [
  {
    value: "10+",
    label: "Tech Stack Expertise",
    icon: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />,
  },
  {
    value: "7+",
    label: "Years of Experience",
    icon: (
      <>
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </>
    ),
  },
  {
    value: "80+",
    label: "Projects Delivered",
    icon: (
      <>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </>
    ),
  },
  {
    value: "100%",
    label: "Commitment to Quality",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
  },
];

const builtFor: { label: [string, string?]; icon: React.ReactNode }[] = [
  {
    label: ["Startups"],
    icon: (
      <>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </>
    ),
  },
  {
    label: ["Growing", "Businesses"],
    icon: (
      <>
        <path d="M3 21h18" />
        <rect x="5" y="11" width="3.4" height="8" />
        <rect x="10.3" y="7" width="3.4" height="12" />
        <rect x="15.6" y="13" width="3.4" height="6" />
        <path d="M6 8l4-3 4 2 5-4" />
      </>
    ),
  },
  {
    label: ["Enterprises"],
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1.2" />
        <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      </>
    ),
  },
  {
    label: ["SaaS", "Platforms"],
    icon: (
      <>
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </>
    ),
  },
  {
    label: ["AI-Driven", "Products"],
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
  },
];

const panel =
  "rounded-[26px] border border-[var(--glass-border)] bg-[var(--glass-fill)] shadow-[var(--shadow)] backdrop-blur-[16px] [transform:translateZ(0)]";

function Glyph({
  children,
  className,
  width = 1.9,
}: {
  children: React.ReactNode;
  className: string;
  width?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function Capabilities() {
  return (
    <section style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        {/* background wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[-24px] hidden select-none text-center font-extrabold leading-none tracking-[0.04em] text-[rgba(17,17,17,0.035)] lg:block lg:bottom-[calc(-24*var(--s))] lg:text-[calc(210*var(--s))]"
        >
          CAPABILITIES
        </div>

        {/* ---------- left column ---------- */}
        <div className="flex items-center gap-[16px] lg:absolute lg:left-[calc(62*var(--s))] lg:top-[calc(120*var(--s))] lg:z-[5] lg:gap-[calc(16*var(--s))]">
          <span className="h-[3px] w-[44px] rounded-[2px] bg-[hsl(var(--yellow))] lg:w-[calc(44*var(--s))]" />
          <span className="font-data text-[12px] font-semibold uppercase tracking-[0.18em] lg:text-[calc(14*var(--s))]">
            What I Do Best
          </span>
        </div>

        <h2 className="mt-6 text-[clamp(2.5rem,11vw,80px)] font-extrabold leading-none tracking-[-0.03em] lg:absolute lg:left-[calc(56*var(--s))] lg:top-[calc(165*var(--s))] lg:z-[5] lg:mt-0 lg:text-[calc(70*var(--s))]">
          Capabilities<span className="text-[hsl(var(--yellow))]">.</span>
        </h2>

        <p className="mt-6 max-w-[460px] text-[18px] leading-[1.5] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(62*var(--s))] lg:top-[calc(268*var(--s))] lg:z-[5] lg:mt-0 lg:w-[calc(400*var(--s))] lg:max-w-none lg:text-[calc(18*var(--s))]">
          End-to-end engineering across product, platform, and AI systems —
          built for{" "}
          <strong className="font-bold text-[hsl(var(--ink-1))] [border-bottom:3px_solid_hsl(var(--yellow))]">
            performance
          </strong>
          ,{" "}
          <strong className="font-bold text-[hsl(var(--ink-1))]">scale</strong>,
          and{" "}
          <strong className="font-bold text-[hsl(var(--ink-1))]">impact</strong>
          .
        </p>

        {/* stat card — design 58,458 · 398 wide */}
        <div
          className={`mt-8 grid grid-cols-1 gap-[28px] p-[28px] sm:grid-cols-2 ${panel} lg:absolute lg:left-[calc(58*var(--s))] lg:top-[calc(400*var(--s))] lg:z-[5] lg:mt-0 lg:w-[calc(420*var(--s))] lg:gap-x-[calc(28*var(--s))] lg:gap-y-[calc(26*var(--s))] lg:rounded-[calc(28*var(--s))] lg:px-[calc(30*var(--s))] lg:py-[calc(26*var(--s))]`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-start gap-[14px] lg:gap-[calc(14*var(--s))]"
            >
              <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[13px] bg-[hsl(var(--yellow))] lg:h-[calc(46*var(--s))] lg:w-[calc(46*var(--s))] lg:rounded-[calc(13*var(--s))]">
                <Glyph
                  width={2}
                  className="h-[22px] w-[22px] lg:h-[calc(22*var(--s))] lg:w-[calc(22*var(--s))]"
                >
                  {stat.icon}
                </Glyph>
              </span>
              <div>
                <div className="text-[26px] font-extrabold leading-none tracking-[-0.02em] lg:text-[calc(29*var(--s))]">
                  {stat.value}
                </div>
                <div className="mt-[6px] text-[14px] leading-[1.28] text-[hsl(var(--ink-2))] lg:mt-[calc(6*var(--s))] lg:text-[calc(14*var(--s))]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- capability cards — design 572/910/1248 x 122/488 ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:contents">
          {cards.map((card, i) => (
            <div
              key={card.n}
              className={`relative p-[24px] ${panel} lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:z-[3] lg:h-[calc(285*var(--s))] lg:w-[calc(314*var(--s))] lg:p-[calc(24*var(--s))]`}
              style={{
                ["--x" as string]: `calc(${572 + (i % 3) * 338}*var(--s))`,
                ["--y" as string]: `calc(${i < 3 ? 100 : 415}*var(--s))`,
              }}
            >
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-[hsl(var(--yellow))] lg:h-[calc(48*var(--s))] lg:w-[calc(48*var(--s))] lg:rounded-[calc(14*var(--s))]">
                <Glyph className="h-[26px] w-[26px] lg:h-[calc(24*var(--s))] lg:w-[calc(24*var(--s))]">
                  {card.icon}
                </Glyph>
              </span>

              <span className="absolute right-[24px] top-[22px] font-data text-[18px] font-bold text-[rgba(17,17,17,0.28)] lg:right-[calc(24*var(--s))] lg:top-[calc(22*var(--s))] lg:text-[calc(18*var(--s))]">
                {card.n}
              </span>

              <div className="mt-[18px] text-[22px] font-extrabold leading-[1.12] tracking-[-0.02em] lg:mt-[calc(16*var(--s))] lg:text-[calc(22*var(--s))]">
                {card.title[0]}
                <br />
                {card.title[1]}
              </div>

              <div className="mt-[16px] flex flex-col gap-[10px] lg:mt-[calc(14*var(--s))] lg:gap-[calc(9*var(--s))]">
                {card.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-[10px] text-[14px] lg:gap-[calc(10*var(--s))] lg:text-[calc(13.5*var(--s))]"
                  >
                    <span className="mt-[8px] h-[4px] w-[4px] flex-none rounded-full bg-[hsl(var(--ink-1))] lg:mt-[calc(8*var(--s))] lg:h-[calc(4*var(--s))] lg:w-[calc(4*var(--s))]" />
                    {point}
                  </div>
                ))}
              </div>

              <Link
                href="/services"
                aria-label={`${card.title.join(" ")} — learn more`}
                className="mt-5 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[rgba(17,17,17,0.28)] transition-[transform,background-color] duration-200 hover:-translate-y-[2px] hover:bg-[var(--ink-a04)] lg:absolute lg:bottom-[calc(18*var(--s))] lg:right-[calc(18*var(--s))] lg:mt-0 lg:h-[calc(38*var(--s))] lg:w-[calc(38*var(--s))]"
              >
                <Glyph
                  width={2}
                  className="h-[18px] w-[18px] lg:h-[calc(18*var(--s))] lg:w-[calc(18*var(--s))]"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </Glyph>
              </Link>
            </div>
          ))}
        </div>

        {/* ---------- built-for strip — design 48,826 · 1006x120 ---------- */}
        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 px-[28px] py-[24px] ${panel} lg:absolute lg:left-[calc(48*var(--s))] lg:top-[calc(730*var(--s))] lg:z-[4] lg:mt-0 lg:h-[calc(110*var(--s))] lg:w-[calc(1006*var(--s))] lg:flex-nowrap lg:justify-between lg:gap-0 lg:rounded-[calc(26*var(--s))] lg:px-[calc(44*var(--s))] lg:py-0`}
        >
          <div>
            <div className="text-[15px] font-extrabold tracking-[-0.01em] lg:text-[calc(16*var(--s))]">
              BUILT FOR
            </div>
            <div className="mt-[8px] h-[3px] w-[34px] rounded-[2px] bg-[hsl(var(--yellow))] lg:mt-[calc(8*var(--s))] lg:w-[calc(34*var(--s))]" />
          </div>
          {builtFor.map((item) => (
            <span
              key={item.label.join(" ")}
              className="inline-flex items-center gap-[12px] text-[14px] font-semibold lg:gap-[calc(12*var(--s))] lg:text-[calc(15*var(--s))]"
            >
              <Glyph className="h-[20px] w-[20px] flex-none lg:h-[calc(22*var(--s))] lg:w-[calc(22*var(--s))]">
                {item.icon}
              </Glyph>
              <span className="lg:leading-[1.25]">
                {item.label[0]}
                {item.label[1] && (
                  <>
                    <br className="hidden lg:inline" />
                    <span className="lg:hidden"> </span>
                    {item.label[1]}
                  </>
                )}
              </span>
            </span>
          ))}
        </div>

        {/* ---------- value statement — design 1076,826 · 486x120 ---------- */}
        <div
          className={`relative mt-6 flex items-center gap-[20px] overflow-hidden px-[28px] py-[24px] ${panel} lg:absolute lg:left-[calc(1076*var(--s))] lg:top-[calc(730*var(--s))] lg:z-[4] lg:mt-0 lg:h-[calc(110*var(--s))] lg:w-[calc(486*var(--s))] lg:gap-[calc(22*var(--s))] lg:rounded-[calc(26*var(--s))] lg:px-[calc(34*var(--s))] lg:py-0`}
        >
          <span className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full bg-[hsl(var(--yellow))] shadow-[0_8px_20px_rgba(246,242,60,0.55)] lg:h-[calc(56*var(--s))] lg:w-[calc(56*var(--s))]">
            <Glyph
              width={2.2}
              className="h-[22px] w-[22px] lg:h-[calc(24*var(--s))] lg:w-[calc(24*var(--s))]"
            >
              <path d="M7 17L17 7M8 7h9v9" />
            </Glyph>
          </span>
          <p className="max-w-[280px] text-[15px] leading-[1.45] lg:max-w-[calc(280*var(--s))] lg:text-[calc(16*var(--s))]">
            I build systems that don&rsquo;t just work — they scale, adapt, and
            create <strong className="font-extrabold">real value.</strong>
          </p>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-20px] right-[-20px] hidden h-[96px] w-[96px] rounded-[16px] border border-dashed border-[rgba(17,17,17,0.22)] [background:repeating-linear-gradient(45deg,transparent,transparent_7px,rgba(17,17,17,0.05)_7px,rgba(17,17,17,0.05)_8px)] lg:block lg:bottom-[calc(-20*var(--s))] lg:right-[calc(-20*var(--s))] lg:h-[calc(96*var(--s))] lg:w-[calc(96*var(--s))] lg:rounded-[calc(16*var(--s))]"
          />
        </div>
      </div>
    </section>
  );
}
