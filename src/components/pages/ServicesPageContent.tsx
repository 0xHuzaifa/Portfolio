import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  Layers3,
  MessageSquare,
  Rocket,
  Wrench,
} from "lucide-react";
import { AppLink } from "@/components/navigation/AppLink";
import { systemBuildPhases } from "@/data/portfolio/process";

const serviceCards = [
  {
    title: "SaaS platforms",
    description:
      "Products with account flows, role-based dashboards, operational panels, and the backend structure needed to support growth. Built to scale from day one, not patched later.",
    icon: Layers3,
    examples: ["Multi-tenant architecture", "Subscription workflows", "Admin dashboards"],
  },
  {
    title: "CRM and operations systems",
    description:
      "Internal platforms for sales, support, or team management — with automation pipelines, real-time communication, and workflows that replace manual processes permanently.",
    icon: BriefcaseBusiness,
    examples: ["Campaign automation", "Lead and client management", "Real-time notifications"],
  },
  {
    title: "Custom business tools",
    description:
      "Purpose-built systems for inventory, allocation, approvals, client portals, or any process-heavy use case that off-the-shelf software handles badly.",
    icon: Blocks,
    examples: ["Inventory and allocation engines", "Approval workflows", "Client portals"],
  },
] as const;

const differentiators = [
  {
    title: "One developer, full ownership",
    description:
      "I own the full stack — UI, API, database, deployment. No handoffs between specialists means fewer gaps and faster decisions.",
  },
  {
    title: "Architecture before code",
    description:
      "Every build starts with system design on paper. The decisions that define a product's lifespan are made before a line of code is written.",
  },
  {
    title: "Business logic, not just features",
    description:
      "I build systems around how your team actually works — permissions, edge cases, and operational constraints are designed in, not bolted on.",
  },
] as const;

const fitPoints = [
  "You need more than a landing page — a real product or internal system with workflows and data.",
  "The project has permissions, integrations, operational edge cases, or scale requirements.",
  "You want one developer who thinks through UI, backend, and delivery decisions together.",
  "You want clear communication, honest scope discussion, and no surprise pivots mid-build.",
] as const;

const engagementSteps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Discovery conversation",
    description:
      "A short 20–30 minute call to understand your workflow, users, and what the system needs to do. No commitment required.",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Scope and proposal",
    description:
      "Based on the discovery call, I define the build scope, technical approach, and project-based cost. You decide whether to proceed.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Build and delivery",
    description:
      "Structured delivery in visible milestones. You see progress regularly — not just a finished product after weeks of silence.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch and handover",
    description:
      "Shipped to production with documentation. If you need ongoing support or iteration, we can discuss that after launch.",
  },
] as const;

const phaseIcons = [Blocks, Layers3, BriefcaseBusiness, Rocket] as const;

export function ServicesPageContent() {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsla(194,100%,56%,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,hsla(32,94%,63%,0.12),transparent_34%)]" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-accent))]">
            Services
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[hsl(var(--vscode-text))]">
            I help founders and teams turn complex workflows into software
            people can actually use.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[hsl(var(--vscode-text-muted))]">
            My work is strongest where product thinking, system design, and
            full-stack delivery all matter at once — SaaS platforms, CRMs,
            internal tools, and custom business systems built to last.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <AppLink
              href="/contact"
              tabTitle="Contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-bg))] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start with a discovery call
              <ArrowRight className="h-4 w-4" />
            </AppLink>
            <AppLink
              href="/systems/crm-system"
              tabTitle="CRM System"
              className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-5 py-3 text-sm font-medium text-[hsl(var(--vscode-text))] transition-colors hover:bg-[hsl(var(--vscode-hover))]"
            >
              See a production system
            </AppLink>
          </div>
        </div>
      </section>

      {/* Service cards with examples */}
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
              <ul className="mt-4 space-y-2">
                {service.examples.map((example) => (
                  <li
                    key={example}
                    className="flex items-center gap-2 text-xs text-[hsl(var(--vscode-text-muted))]/80"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--vscode-success))]" />
                    {example}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      {/* Why me — differentiators */}
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
          Why work with me
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-[hsl(var(--vscode-text))]">
          What makes this engagement different
        </h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-5"
            >
              <span className="text-xs font-bold text-[hsl(var(--vscode-accent))]/60">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-base font-semibold text-[hsl(var(--vscode-text))]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement model + fit */}
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">

        {/* How it works */}
        <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[hsl(var(--vscode-text))]">
            From first conversation to shipped product
          </h2>
          <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
            Pricing is project-based and scoped after a discovery conversation
            — not quoted blind. Every engagement starts with understanding the
            problem before discussing cost.
          </p>

          <div className="mt-6 grid gap-3">
            {engagementSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="flex gap-4 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--vscode-accent))]/60">
                        {step.step}
                      </span>
                      <p className="text-sm font-semibold text-[hsl(var(--vscode-text))]">
                        {step.title}
                      </p>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[hsl(var(--vscode-text-muted))]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="flex flex-col gap-4">

          {/* Best fit */}
          <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
              Best fit
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[hsl(var(--vscode-text))]">
              This works well when
            </h2>
            <div className="mt-4 space-y-3">
              {fitPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]"
                >
                  <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-[hsl(var(--vscode-success))]" />
                  {point}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-[30px] border border-[hsl(var(--vscode-accent))]/20 bg-[linear-gradient(135deg,hsla(194,100%,56%,0.14),transparent_42%),hsl(var(--vscode-sidebar-elevated))] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-accent))]">
              Ready to start
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[hsl(var(--vscode-text))]">
              Not sure if your project is a fit?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
              Describe the workflow or the problem — even rough ideas. A short
              conversation costs nothing and tells us both whether this makes
              sense to build together.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AppLink
                href="/contact"
                tabTitle="Contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-bg))] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start the conversation
                <ArrowRight className="h-4 w-4" />
              </AppLink>
              <AppLink
                href="/experience"
                tabTitle="Experience"
                className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-5 py-3 text-sm font-medium text-[hsl(var(--vscode-text))] transition-colors hover:bg-[hsl(var(--vscode-hover))]"
              >
                View experience
              </AppLink>
            </div>
          </section>
        </div>
      </section>

      {/* Process phases — collapsed to a compact strip */}
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
          Build process
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-[hsl(var(--vscode-text))]">
          How I structure every build
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {systemBuildPhases.map((phase, index) => {
            const Icon = phaseIcons[index] ?? Blocks;
            return (
              <div
                key={phase.id}
                className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                    Phase 0{index + 1}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-[hsl(var(--vscode-text))]">
                  {phase.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[hsl(var(--vscode-text-muted))]">
                  {phase.description}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
          This is the same structure I used for the CRM and inventory systems
          at Solvevare — both of which went from requirements to production
          without scope drift or architecture rewrites.
        </p>
      </section>

    </div>
  );
}