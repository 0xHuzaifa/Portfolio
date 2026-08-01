import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Clock,
  FileCheck,
  Send,
  Users,
} from "lucide-react";
import Link from "next/link";
import { scale, sectionClass, stageClass, stageStyle } from "./stage";

/**
 * Re-fitted from the 1536x1024 reference onto the shared 1620x875 canvas so the
 * section is exactly one screen. Bands: head 108-320, showcase 350-650,
 * supporting cards 664-859. The reference scroll hint is dropped.
 */

const featured = {
  index: "01",
  kind: "PLATFORM",
  title: "Real Estate CRM",
  href: "/systems/crm-system",
  description:
    "A multi-tenant CRM for real estate agencies to manage leads, deals, contracts, and teams in one secure workspace.",
  stats: [
    { icon: Users, value: "10K+", label: "Users" },
    { icon: Send, value: "36K+/hr", label: "Emails Sent" },
    { icon: FileCheck, value: "2.5K+", label: "Documents Signed" },
    { icon: Building2, value: "120+", label: "Agencies" },
  ],
} as const;

const selector = [
  { index: "01", title: "Real Estate CRM", href: "/systems/crm-system" },
  {
    index: "02",
    title: "AI Command Center",
    href: "/systems/realtime-communication",
  },
  {
    index: "03",
    title: "Crowdfunding Platform",
    href: "/systems/article-platform",
  },
  {
    index: "04",
    title: "Inventory & POS System",
    href: "/systems/inventory-system",
  },
] as const;

const supporting = [
  {
    index: "02",
    kind: "SYSTEM",
    title: "AI Command Center",
    href: "/systems/realtime-communication",
    description:
      "AI-powered assistant that understands natural language and executes complex multi-step actions across your systems.",
  },
  {
    index: "03",
    kind: "PLATFORM",
    title: "Crowdfunding Platform",
    href: "/systems/article-platform",
    description:
      "A secure and scalable platform that helps creators launch campaigns and collect funding globally.",
  },
  {
    index: "04",
    kind: "SYSTEM",
    title: "Inventory & POS System",
    href: "/systems/inventory-system",
    description:
      "Smart inventory and POS system with real-time analytics and multi-branch management.",
  },
] as const;

const glass =
  "border border-[var(--glass-border)] bg-[var(--glass-fill)] backdrop-blur-[16px] [transform:translateZ(0)]";

/** Awaiting real product screenshots — same role as the design's image slots. */
function DeviceSlot({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-[14px] border border-dashed border-[var(--ink-a12)] bg-[hsl(var(--beige-2))]/60 p-4 text-center text-[hsl(var(--ink-3))] ${className}`}
    >
      <span className="font-data text-[11px] uppercase leading-[1.5] tracking-[0.14em] lg:text-[calc(11*var(--s))]">
        {label}
      </span>
    </div>
  );
}

/**
 * Yellow tick + mono label. The reference sizes only apply from `lg` up — they
 * ride on `--s`, which is meaningless at phone widths — so they come in as
 * utility classes rather than inline styles.
 */
function Eyebrow({
  children,
  className = "",
  ruleClass = "lg:w-[calc(38*var(--s))]",
  textClass = "lg:text-[calc(13*var(--s))]",
}: {
  children: React.ReactNode;
  className?: string;
  ruleClass?: string;
  textClass?: string;
}) {
  return (
    <div
      className={`flex items-center gap-[14px] lg:gap-[calc(14*var(--s))] ${className}`}
    >
      <span
        className={`h-[3px] w-[38px] rounded-[2px] bg-[hsl(var(--yellow))] ${ruleClass}`}
      />
      <span
        className={`font-data text-[12px] font-semibold uppercase tracking-[0.18em] ${textClass}`}
      >
        {children}
      </span>
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <section style={stageStyle} className={sectionClass}>
      <div style={scale} className={stageClass}>
        {/* ---------- section head ---------- */}
        <Eyebrow className="lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(108*var(--s))]">
          Featured Projects
        </Eyebrow>

        <h2 className="mt-6 text-[clamp(2.25rem,9vw,64px)] font-extrabold leading-[1.06] tracking-[-0.032em] lg:absolute lg:left-[calc(68*var(--s))] lg:top-[calc(138*var(--s))] lg:mt-0 lg:text-[calc(56*var(--s))] lg:leading-[calc(60*var(--s))]">
          Systems I&rsquo;ve
          <br />
          Built &amp; Shipped
          <span className="text-[hsl(var(--yellow))]">.</span>
        </h2>

        <p className="mt-5 text-[17px] leading-[1.5] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(272*var(--s))] lg:mt-0 lg:w-[calc(430*var(--s))] lg:text-[calc(16*var(--s))] lg:leading-[calc(24*var(--s))]">
          A selection of production systems built
          <br className="hidden lg:block" /> to solve{" "}
          <strong className="font-bold text-[hsl(var(--ink-1))] [border-bottom:3px_solid_hsl(var(--yellow))]">
            real business problems.
          </strong>
        </p>

        {/* hero device — ref 77,362 · 827x432 */}
        <DeviceSlot
          label="Real Estate CRM — dashboard"
          className="mt-8 h-[220px] w-full sm:h-[300px] lg:absolute lg:left-[calc(70*var(--s))] lg:top-[calc(350*var(--s))] lg:mt-0 lg:h-[calc(300*var(--s))] lg:w-[calc(720*var(--s))] lg:rounded-[calc(14*var(--s))]"
        />

        {/* ---------- featured project detail ---------- */}
        <div className="mt-12 lg:mt-0">
          <div className="text-[64px] font-extrabold leading-none tracking-[-0.02em] text-[hsl(var(--yellow))] lg:absolute lg:left-[calc(830*var(--s))] lg:top-[calc(148*var(--s))] lg:text-[calc(92*var(--s))]">
            {featured.index}
          </div>

          <Eyebrow
            ruleClass="lg:w-[calc(32*var(--s))]"
            className="mt-4 lg:absolute lg:left-[calc(831*var(--s))] lg:top-[calc(258*var(--s))] lg:mt-0"
          >
            {featured.kind}
          </Eyebrow>

          <h3 className="mt-3 text-[30px] font-extrabold tracking-[-0.025em] lg:absolute lg:left-[calc(832*var(--s))] lg:top-[calc(284*var(--s))] lg:mt-0 lg:text-[calc(30*var(--s))]">
            {featured.title}
          </h3>

          <p className="mt-4 max-w-[420px] text-[16px] leading-[1.5] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(831*var(--s))] lg:top-[calc(334*var(--s))] lg:mt-0 lg:w-[calc(300*var(--s))] lg:max-w-none lg:text-[calc(15*var(--s))] lg:leading-[calc(21.5*var(--s))]">
            {featured.description}
          </p>

          {/* stat cards — ref 795,503 · 539x120 */}
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:absolute lg:left-[calc(830*var(--s))] lg:top-[calc(420*var(--s))] lg:mt-0 lg:flex lg:h-[calc(105*var(--s))] lg:w-[calc(560*var(--s))] lg:gap-[calc(18*var(--s))]">
            {featured.stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className={`flex flex-col justify-between rounded-[16px] p-[16px] ${glass} lg:flex-1 lg:rounded-[calc(16*var(--s))] lg:p-[calc(14*var(--s))]`}
              >
                <Icon
                  className="h-[24px] w-[24px] text-[hsl(var(--yellow-deep))] lg:h-[calc(24*var(--s))] lg:w-[calc(24*var(--s))]"
                  strokeWidth={2}
                />
                <div className="mt-4 lg:mt-0">
                  <div className="whitespace-nowrap text-[20px] font-extrabold leading-none tracking-[-0.02em] lg:text-[calc(21*var(--s))]">
                    {value}
                  </div>
                  <div className="mt-[6px] whitespace-nowrap text-[13px] leading-[1.2] text-[hsl(var(--ink-2))] lg:mt-[calc(6*var(--s))] lg:text-[calc(11*var(--s))]">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* actions — ref 795,656 · 40 tall */}
          <div className="mt-7 flex flex-wrap gap-[14px] lg:absolute lg:left-[calc(830*var(--s))] lg:top-[calc(545*var(--s))] lg:mt-0 lg:gap-[calc(20*var(--s))]">
            <Link
              href={featured.href}
              className="inline-flex h-[44px] items-center gap-[10px] whitespace-nowrap rounded-full bg-[hsl(var(--yellow))] px-[22px] text-[15px] font-bold shadow-[var(--shadow-sm)] transition-[transform,background-color] duration-200 ease-[var(--ease)] hover:-translate-y-[3px] hover:bg-[hsl(var(--yellow-deep))] lg:h-[calc(40*var(--s))] lg:gap-[calc(10*var(--s))] lg:px-[calc(22*var(--s))] lg:text-[calc(15*var(--s))]"
            >
              View Case Study
              <ArrowUpRight className="h-[17px] w-[17px] lg:h-[calc(16*var(--s))] lg:w-[calc(16*var(--s))]" />
            </Link>
            <Link
              href={featured.href}
              className={`inline-flex h-[44px] items-center gap-[10px] whitespace-nowrap rounded-full border border-[var(--glass-border-ink)] bg-[var(--glass-fill-strong)] px-[22px] text-[15px] font-semibold backdrop-blur-[22px] transition-transform duration-200 ease-[var(--ease)] [transform:translateZ(0)] hover:-translate-y-[3px] lg:h-[calc(40*var(--s))] lg:gap-[calc(10*var(--s))] lg:px-[calc(22*var(--s))] lg:text-[calc(15*var(--s))]`}
            >
              Live System
              <ArrowUpRight className="h-[17px] w-[17px] lg:h-[calc(16*var(--s))] lg:w-[calc(16*var(--s))]" />
            </Link>
          </div>
        </div>

        {/* ---------- project selector — ref 1234,140 · 246x294 ---------- */}
        <div
          className={`mt-10 flex flex-col gap-[10px] rounded-[26px] p-[14px] shadow-[var(--shadow)] ${glass} lg:absolute lg:left-[calc(1330*var(--s))] lg:top-[calc(148*var(--s))] lg:mt-0 lg:w-[calc(246*var(--s))] lg:gap-[calc(14*var(--s))] lg:rounded-[calc(26*var(--s))] lg:p-[calc(26*var(--s))]`}
        >
          {selector.map((item) => {
            const active = item.index === featured.index;
            return (
              <Link
                key={item.index}
                href={item.href}
                aria-current={active ? "true" : undefined}
                className={`flex h-[52px] items-center gap-[14px] rounded-[16px] px-[18px] transition-colors duration-200 lg:h-[calc(42*var(--s))] lg:gap-[calc(12*var(--s))] lg:rounded-[calc(14*var(--s))] lg:px-[calc(14*var(--s))] ${
                  active
                    ? "bg-[hsl(var(--yellow))] shadow-[0_10px_24px_rgba(246,242,60,0.5)]"
                    : "hover:bg-[var(--ink-a04)]"
                }`}
              >
                <span
                  className={`font-data text-[14px] font-bold lg:text-[calc(13*var(--s))] ${
                    active ? "" : "text-[hsl(var(--ink-3))]"
                  }`}
                >
                  {item.index}
                </span>
                <span
                  className={`flex-1 whitespace-nowrap text-[15px] lg:text-[calc(13*var(--s))] ${
                    active ? "font-bold" : "font-semibold"
                  }`}
                >
                  {item.title}
                </span>
                {active && (
                  <Clock
                    className="h-[18px] w-[18px] lg:h-[calc(16*var(--s))] lg:w-[calc(16*var(--s))]"
                    strokeWidth={2}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ---------- supporting projects — ref 41,751 · 1453x236 ---------- */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:absolute lg:left-[calc(40*var(--s))] lg:top-[calc(664*var(--s))] lg:mt-0 lg:flex lg:h-[calc(195*var(--s))] lg:w-[calc(1540*var(--s))] lg:gap-[calc(20*var(--s))]">
          {supporting.map((project) => (
            <div
              key={project.index}
              className={`relative flex flex-col rounded-[28px] p-[26px] shadow-[var(--shadow)] ${glass} lg:flex-1 lg:rounded-[calc(28*var(--s))] lg:p-[calc(18*var(--s))]`}
            >
              {/* Text stays clear of the device slot's left edge (223 in from
                  the card) and the link is flowed, not pinned, so a longer
                  title can never ride over it. */}
              <div className="relative z-10 lg:w-[calc(288*var(--s))]">
                <div className="text-[48px] font-extrabold leading-none tracking-[-0.02em] text-[rgba(17,17,17,0.16)] lg:text-[calc(32*var(--s))]">
                  {project.index}
                </div>
                <Eyebrow
                  ruleClass="lg:w-[calc(24*var(--s))]"
                  textClass="lg:text-[calc(11*var(--s))]"
                  className="mt-3 lg:mt-[calc(10*var(--s))]"
                >
                  {project.kind}
                </Eyebrow>
                <div className="mt-3 text-[20px] font-extrabold tracking-[-0.02em] lg:mt-[calc(7*var(--s))] lg:text-[calc(18*var(--s))]">
                  {project.title}
                </div>
                <p className="mt-3 text-[15px] leading-[1.45] text-[hsl(var(--ink-2))] lg:mt-[calc(7*var(--s))] lg:text-[calc(12*var(--s))] lg:leading-[calc(17*var(--s))]">
                  {project.description}
                </p>
              </div>

              <Link
                href={project.href}
                className="relative z-10 mt-5 inline-flex items-center gap-[9px] text-[15px] font-bold transition-transform duration-200 hover:translate-x-[3px] lg:mt-auto lg:pt-[calc(6*var(--s))] lg:text-[calc(13*var(--s))]"
              >
                View Project
                <ArrowRight className="h-[16px] w-[16px] lg:h-[calc(14*var(--s))] lg:w-[calc(14*var(--s))]" />
              </Link>

              <DeviceSlot
                label={`${project.title} — mockup`}
                className="mt-6 h-[180px] w-full lg:absolute lg:right-[calc(14*var(--s))] lg:top-[calc(-14*var(--s))] lg:mt-0 lg:h-[calc(200*var(--s))] lg:w-[calc(170*var(--s))] lg:rounded-[calc(12*var(--s))]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
