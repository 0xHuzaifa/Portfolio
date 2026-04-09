"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Database,
  Layers3,
  MonitorSmartphone,
  Package,
  Rocket,
  ServerCog,
  ShieldCheck,
  Target,
} from "lucide-react";
import { AppLink } from "@/components/navigation/AppLink";
import FeaturedSystems from "@/components/portfolio/FeaturedSystems";
import { TechChip } from "@/lib/techIcons";
import { categoryLabels, techStack } from "@/data/techStack";

const capabilityCards = [
  {
    title: "Business-first systems",
    description:
      "Dashboards, CRM platforms, inventory tools, and client portals designed around real workflows.",
    icon: BriefcaseBusiness,
    gradient: "from-[hsl(var(--vscode-accent))]/10 to-transparent",
  },
  {
    title: "Scalable architecture",
    description:
      "Frontend, backend, data, and deployment choices shaped for maintainability from day one.",
    icon: Layers3,
    gradient: "from-[hsl(var(--vscode-warm))]/8 to-transparent",
  },
  {
    title: "Reliable delivery",
    description:
      "Clear communication, thoughtful UX, and production-ready implementation across the full stack.",
    icon: ShieldCheck,
    gradient: "from-[hsl(var(--vscode-success))]/8 to-transparent",
  },
] as const;

const heroStats = [
  {
    label: "Focus",
    value: "SaaS, dashboards & ops software",
    icon: Target,
  },
  {
    label: "Stack",
    value: "React, Next.js, Node.js, MongoDB",
    icon: Layers3,
  },
  {
    label: "Outcome",
    value: "Strong UX + maintainable delivery",
    icon: Rocket,
  },
] as const;

const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <MonitorSmartphone className="h-3.5 w-3.5" />,
  backend: <ServerCog className="h-3.5 w-3.5" />,
  database: <Database className="h-3.5 w-3.5" />,
  devops: <Package className="h-3.5 w-3.5" />,
  other: <Layers3 className="h-3.5 w-3.5" />,
};

export function HomePageContent() {
  const grouped = techStack.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item.name);
      return acc;
    },
    {} as Record<string, string[]>,
  );

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsla(194,100%,56%,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,hsla(32,94%,63%,0.14),transparent_34%)]" />
          <div className="relative">
            <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-[hsl(var(--vscode-accent))]">
              Simplified workspace
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-[hsl(var(--vscode-text))] md:text-5xl">
              I design and build scalable systems for real-world business
              workflows.
            </h1>
            <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.85] text-[hsl(var(--vscode-text-muted))]">
              Full-stack development focused on SaaS platforms, internal tools,
              and operations software. The goal is always the same: strong
              architecture underneath, intuitive UX on top.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <AppLink
                href="/systems/article-platform"
                tabTitle="Article Platform.tsx"
                className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-bg))] shadow-md shadow-[hsl(var(--vscode-accent))]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[hsl(var(--vscode-accent))]/35"
              >
                View systems
                <ArrowRight className="h-4 w-4" />
              </AppLink>
              <AppLink
                href="/how-i-build-systems"
                tabTitle="How I Build Systems"
                className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-5 py-3 text-sm font-medium text-[hsl(var(--vscode-text))] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[hsl(var(--vscode-hover))]"
              >
                How I build systems
              </AppLink>
              <AppLink
                href="/contact"
                tabTitle="Contact"
                className="rounded-2xl border border-[hsl(var(--vscode-border))] px-5 py-3 text-sm font-medium text-[hsl(var(--vscode-text-muted))] transition-all duration-200 hover:-translate-y-0.5 hover:border-[hsl(var(--vscode-accent))]/45 hover:text-[hsl(var(--vscode-text))]"
              >
                Start a conversation
              </AppLink>
            </div>

            {/* Hero stat cards */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))]/90 p-4"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--vscode-accent))]/12 text-[hsl(var(--vscode-accent))]">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-[hsl(var(--vscode-text))]">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capability cards */}
        <div className="grid gap-4">
          {capabilityCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group rounded-[26px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[hsl(var(--vscode-accent))]/20"
              >
                <div
                  className={`absolute inset-0 rounded-[26px] bg-gradient-to-br opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${card.gradient}`}
                />
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-[0.9375rem] font-bold text-[hsl(var(--vscode-text))]">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-[1.75] text-[hsl(var(--vscode-text-muted))]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SYSTEMS ──────────────────────────────────────── */}
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
              Systems
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[hsl(var(--vscode-text))]">
              Selected builds and platform work
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-[1.75] text-[hsl(var(--vscode-text-muted))]">
            A mix of personal products and professional delivery across content,
            operations, customer management, and real-time communication.
          </p>
        </div>
        <FeaturedSystems />
      </section>

      {/* ── APPROACH + TECH STACK ─────────────────────────── */}
      <section className="grid gap-6 xl:grid-cols-[1fr_1.08fr]">
        {/* Approach */}
        <div className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
            Approach
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[hsl(var(--vscode-text))]">
            A process built for clarity and momentum
          </h2>
          <div className="mt-6 space-y-3">
            {[
              "Start with business goals, user flows, and the shape of the product before touching implementation.",
              "Design the system so operations, permissions, data modeling, and future features have room to grow.",
              "Ship interfaces that are simple to navigate and easy to explain to stakeholders, not just developers.",
            ].map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4 transition-all duration-150 hover:border-[hsl(var(--vscode-accent))]/20"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--vscode-accent))]/14 text-sm font-bold text-[hsl(var(--vscode-accent))]">
                  0{index + 1}
                </span>
                <p className="text-sm leading-[1.75] text-[hsl(var(--vscode-text-muted))]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
            Tech stack
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[hsl(var(--vscode-text))]">
            Tools I reach for most
          </h2>
          <div className="mt-6 space-y-5">
            {(
              Object.entries(grouped) as [keyof typeof categoryLabels, string[]][]
            ).map(([category, items]) => (
              <div key={category}>
                <div className="flex items-center gap-1.5">
                  <span className="text-[hsl(var(--vscode-text-muted))]">
                    {categoryIcons[category]}
                  </span>
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
                    {categoryLabels[category]}
                  </p>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <TechChip key={item} name={item} size="md" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[30px] border border-[hsl(var(--vscode-accent))]/20 bg-[linear-gradient(135deg,hsla(194,100%,56%,0.16),transparent_45%),hsl(var(--vscode-sidebar-elevated))] p-6 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsla(32,94%,63%,0.10),transparent_55%)]" />
        <div className="relative">
          <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-[hsl(var(--vscode-accent))]">
            Ready to build
          </p>
          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold leading-tight text-[hsl(var(--vscode-text))]">
                Need a system that feels professional from the first walkthrough?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-[1.85] text-[hsl(var(--vscode-text-muted))]">
                I can help shape the architecture, user experience, and delivery
                plan for platforms that need to be both reliable and easy to use.
              </p>
            </div>
            <AppLink
              href="/contact"
              tabTitle="Contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--vscode-bg))] shadow-lg shadow-[hsl(var(--vscode-accent))]/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[hsl(var(--vscode-accent))]/40"
            >
              Contact me
              <ArrowRight className="h-4 w-4" />
            </AppLink>
          </div>
        </div>
      </section>
    </div>
  );
}
