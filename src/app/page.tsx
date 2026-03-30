"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import FeaturedSystems from "@/components/portfolio/FeaturedSystems";
import { useTabs } from "@/contexts/TabContext";
import { categoryLabels, techStack } from "@/data/techStack";

const capabilityCards = [
  {
    title: "Business-first systems",
    description:
      "Dashboards, CRM platforms, inventory tools, and client portals designed around real workflows.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Scalable architecture",
    description:
      "Frontend, backend, data, and deployment choices shaped for maintainability from day one.",
    icon: Layers3,
  },
  {
    title: "Reliable delivery",
    description:
      "Clear communication, thoughtful UX, and production-ready implementation across the full stack.",
    icon: ShieldCheck,
  },
] as const;

export default function Home() {
  const { openTab } = useTabs();

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
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsla(194,100%,56%,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,hsla(32,94%,63%,0.14),transparent_34%)]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.32em] text-[hsl(var(--vscode-accent))]">
              Simplified workspace
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[hsl(var(--vscode-text))] md:text-5xl">
              I build modern systems that feel polished for teams and clear for
              clients.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[hsl(var(--vscode-text-muted))]">
              Full-stack development focused on SaaS platforms, internal tools,
              and operations software. The goal is always the same: strong
              architecture underneath, intuitive UX on top.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  openTab("/systems/article-platform", "Article Platform.tsx")
                }
                className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-bg))] transition-transform duration-200 hover:-translate-y-0.5"
              >
                View systems
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  openTab("/how-i-build-systems", "How I Build Systems")
                }
                className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-5 py-3 text-sm font-medium text-[hsl(var(--vscode-text))] transition-colors hover:bg-[hsl(var(--vscode-hover))]"
              >
                How I build systems
              </button>
              <button
                type="button"
                onClick={() => openTab("/contact", "Contact")}
                className="rounded-2xl border border-[hsl(var(--vscode-border))] px-5 py-3 text-sm font-medium text-[hsl(var(--vscode-text-muted))] transition-colors hover:border-[hsl(var(--vscode-accent))]/45 hover:text-[hsl(var(--vscode-text))]"
              >
                Start a conversation
              </button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))]/90 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  Focus
                </p>
                <p className="mt-2 text-sm text-[hsl(var(--vscode-text))]">
                  SaaS, dashboards, operations software
                </p>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))]/90 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  Stack
                </p>
                <p className="mt-2 text-sm text-[hsl(var(--vscode-text))]">
                  React, Next.js, Node.js, PostgreSQL, MongoDB
                </p>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))]/90 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  Outcome
                </p>
                <p className="mt-2 text-sm text-[hsl(var(--vscode-text))]">
                  Strong UX paired with maintainable delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {capabilityCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-[26px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-[hsl(var(--vscode-text))]">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
              Systems
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[hsl(var(--vscode-text))]">
              Selected builds and platform work
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
            A mix of personal products and professional delivery across content,
            operations, customer management, and real-time communication.
          </p>
        </div>

        <FeaturedSystems />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.08fr]">
        <div className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
            Approach
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[hsl(var(--vscode-text))]">
            A process built for clarity and momentum
          </h2>
          <div className="mt-6 space-y-4">
            {[
              "Start with business goals, user flows, and the shape of the product before touching implementation.",
              "Design the system so operations, permissions, data modeling, and future features have room to grow.",
              "Ship interfaces that are simple to navigate and easy to explain to stakeholders, not just developers.",
            ].map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--vscode-accent))]/14 text-sm font-semibold text-[hsl(var(--vscode-accent))]">
                  0{index + 1}
                </span>
                <p className="text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
              Tech stack
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[hsl(var(--vscode-text))]">
              Tools I reach for most
            </h2>
          </div>

          <div className="mt-6 space-y-5">
            {(
              Object.entries(grouped) as [
                keyof typeof categoryLabels,
                string[],
              ][]
            ).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  {categoryLabels[category]}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-3 py-1.5 text-sm text-[hsl(var(--vscode-text))]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[linear-gradient(135deg,hsla(194,100%,56%,0.16),transparent_45%),hsl(var(--vscode-sidebar-elevated))] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-accent))]">
          Ready to build
        </p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-[hsl(var(--vscode-text))]">
              Need a system that feels professional from the first walkthrough?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
              I can help shape the architecture, user experience, and delivery
              plan for platforms that need to be both reliable and easy to use.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTab("/contact", "Contact")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[hsl(var(--vscode-text))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-bg))] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Contact me
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
