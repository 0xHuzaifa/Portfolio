import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  Layers3,
  Rocket,
} from "lucide-react";
import { AppLink } from "@/components/navigation/AppLink";
import { systemBuildPhases } from "@/data/portfolio/process";

const serviceCards = [
  {
    title: "SaaS platforms",
    description:
      "Products with account flows, role-based dashboards, operational panels, and the backend structure needed to support growth.",
    icon: Layers3,
  },
  {
    title: "CRM and admin systems",
    description:
      "Internal interfaces for sales, support, operations, or team management with workflows that reduce manual work.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Custom business tools",
    description:
      "Purpose-built systems for inventory, approvals, reporting, client portals, or other process-heavy use cases.",
    icon: Blocks,
  },
] as const;

const fitPoints = [
  "You need more than a landing page and want a real product or internal system.",
  "The project has workflows, permissions, data relationships, or operational edge cases.",
  "You want one developer who can think through UI, backend, and delivery decisions together.",
] as const;

const phaseIcons = [Blocks, Layers3, BriefcaseBusiness, Rocket] as const;

export function ServicesPageContent() {
  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-accent))]">
          Services
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[hsl(var(--vscode-text))]">
          I help founders and teams turn complex workflows into software people
          can actually use.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[hsl(var(--vscode-text-muted))]">
          My work is strongest where product thinking, system design, and
          full-stack delivery all matter at once. That usually means SaaS
          products, CRMs, internal tools, and custom business platforms.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {serviceCards.map((service) => {
          const Icon = service.icon;

          return (
            <article
              key={service.title}
              className="rounded-[26px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-[hsl(var(--vscode-text))]">
                {service.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
                {service.description}
              </p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
            What working together looks like
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[hsl(var(--vscode-text))]">
            A structured path from idea to implementation
          </h2>

          <div className="mt-6 grid gap-4">
            {systemBuildPhases.map((phase, index) => {
              const Icon = phaseIcons[index] ?? Blocks;

              return (
                <div
                  key={phase.id}
                  className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                      Phase 0{index + 1}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[hsl(var(--vscode-text))]">
                    {phase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
                    {phase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="space-y-4">
          <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
              Best fit
            </p>
            <div className="mt-5 space-y-3">
              {fitPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]"
                >
                  {point}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] border border-[hsl(var(--vscode-accent))]/20 bg-[linear-gradient(135deg,hsla(194,100%,56%,0.14),transparent_42%),hsl(var(--vscode-sidebar-elevated))] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-accent))]">
              Start here
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[hsl(var(--vscode-text))]">
              Need help scoping a build?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
              Share the workflow, the users, or the messy part of the process. I
              can help define the shape of the system before it turns into
              expensive guesswork.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AppLink
                href="/contact"
                tabTitle="Contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-bg))]"
              >
                Send project brief
                <ArrowRight className="h-4 w-4" />
              </AppLink>
              <AppLink
                href="/systems/article-platform"
                tabTitle="Article Platform.tsx"
                className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-5 py-3 text-sm font-medium text-[hsl(var(--vscode-text))] transition-colors hover:bg-[hsl(var(--vscode-hover))]"
              >
                View a system example
              </AppLink>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
