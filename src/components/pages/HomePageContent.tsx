"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Database,
  Layers3,
  MonitorSmartphone,
  Package,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import { AppLink } from "@/components/navigation/AppLink";
import FeaturedSystems from "@/components/portfolio/FeaturedSystems";
import { TechChip } from "@/lib/techIcons";
import { categoryLabels, techStack } from "@/data/techStack";
import { systemBuildPrinciples } from "@/data/portfolio/process";
import { SocialProof } from "@/components/portfolio/SocialProof";

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
        {/* Left: main hero card */}
        <div className="relative overflow-hidden rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsla(194,100%,56%,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,hsla(32,94%,63%,0.14),transparent_34%)]" />
          <div className="relative">
            {/* Availability pill */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--vscode-success))]/30 bg-[hsl(var(--vscode-success))]/10 px-3 py-1 text-[11px] font-medium text-[hsl(var(--vscode-success))]">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--vscode-success))]" />
              Available for new builds
            </span>

            {/* H1 — outcome-driven, client-facing */}
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-[hsl(var(--vscode-text))] md:text-5xl">
              I build business software that your team will actually use.
            </h1>

            {/* Subline — who + what */}
            <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.85] text-[hsl(var(--vscode-text-muted))]">
              Full-stack developer specialising in SaaS platforms, CRMs, and
              internal tools — systems designed around real workflows, not just
              technical requirements.
            </p>

            {/* Single dominant CTA + soft secondary */}
            <div className="mt-8 flex flex-wrap gap-3">
              <AppLink
                href="/contact"
                tabTitle="Contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-bg))] shadow-md shadow-[hsl(var(--vscode-accent))]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[hsl(var(--vscode-accent))]/35"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </AppLink>
              <AppLink
                href="/systems/crm-system"
                tabTitle="CRM System.tsx"
                className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-5 py-3 text-sm font-medium text-[hsl(var(--vscode-text))] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[hsl(var(--vscode-hover))]"
              >
                See the work
              </AppLink>
            </div>

            {/* Photo + bio — human presence */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))]/90 p-4">
              <img
                src="/huzaifa.jpg"
                alt="Huzaifa Ahmed"
                className="h-14 w-14 shrink-0 rounded-2xl object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-[hsl(var(--vscode-text))]">
                  Huzaifa Ahmed
                </p>
                <p className="mt-0.5 text-sm leading-[1.7] text-[hsl(var(--vscode-text-muted))]">
                  Full-stack developer with hands-on experience building
                  production CRMs, inventory systems, and SaaS platforms for
                  real clients.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: capability cards — unchanged */}
        <div className="grid gap-4">
          {capabilityCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative rounded-[26px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[hsl(var(--vscode-accent))]/20"
              >
                <div
                  className={`pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-br opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${card.gradient}`}
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

      {/* ── PRINCIPLES ──────────────────────────────────── */}
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <div className="mb-6 flex flex-col gap-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
            How I think
          </p>
          <h2 className="text-3xl font-bold text-[hsl(var(--vscode-text))]">
            Principles behind every build
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {systemBuildPrinciples.map((principle) => (
            <div
              key={principle}
              className="flex gap-4 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-5"
            >
              <span
                className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[hsl(var(--vscode-accent))]"
                aria-hidden="true"
              />
              <p className="text-sm leading-[1.8] text-[hsl(var(--vscode-text))]">
                {principle}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm leading-[1.75] text-[hsl(var(--vscode-text-muted))]">
          See how these principles translate into a structured build process →{" "}
          <AppLink
            href="/how-i-build-systems"
            tabTitle="How I Build Systems"
            className="text-[hsl(var(--vscode-accent))] underline-offset-4 hover:underline"
          >
            How I build systems
          </AppLink>
        </p>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────── */}
      <SocialProof />

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
              Object.entries(grouped) as [
                keyof typeof categoryLabels,
                string[],
              ][]
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
                Have a system in mind? Let's scope it out.
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-[1.85] text-[hsl(var(--vscode-text-muted))]">
                Send over what you're building — the workflow, the problem, or
                even just a rough idea. I'll come back with a clear picture of
                what it takes to build it properly.
              </p>
              <p className="mt-2 text-sm text-[hsl(var(--vscode-text-muted))]/70">
                Typical response within 24 hours.
              </p>
            </div>
            <AppLink
              href="/contact"
              tabTitle="Contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--vscode-bg))] shadow-lg shadow-[hsl(var(--vscode-accent))]/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[hsl(var(--vscode-accent))]/40"
            >
              Send your project brief
              <ArrowRight className="h-4 w-4" />
            </AppLink>
          </div>
        </div>
      </section>
    </div>
  );
}
