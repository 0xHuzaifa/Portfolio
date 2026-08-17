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
import { RevealContainer } from "@/components/motion/RevealContainer";
import { AppLink } from "@/components/navigation/AppLink";
import { Eyebrow } from "@/components/ui/eyebrow";
import { systemBuildPhases } from "@/data/portfolio/process";

const serviceCards = [
  {
    title: "SaaS platforms",
    description:
      "Products with account flows, role-based dashboards, operational panels, and the backend structure needed to support growth. Built to scale from day one, not patched later.",
    icon: Layers3,
    examples: [
      "Multi-tenant architecture",
      "Subscription workflows",
      "Admin dashboards",
    ],
  },
  {
    title: "CRM and operations systems",
    description:
      "Internal platforms for sales, support, or team management — with automation pipelines, real-time communication, and workflows that replace manual processes permanently.",
    icon: BriefcaseBusiness,
    examples: [
      "Campaign automation",
      "Lead and client management",
      "Real-time notifications",
    ],
  },
  {
    title: "Custom business tools",
    description:
      "Purpose-built systems for inventory, allocation, approvals, client portals, or any process-heavy use case that off-the-shelf software handles badly.",
    icon: Blocks,
    examples: [
      "Inventory and allocation engines",
      "Approval workflows",
      "Client portals",
    ],
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
    <RevealContainer>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 md:px-6 md:pt-20">
        <Eyebrow className="text-[hsl(var(--primary))]">Services</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.15] tracking-[-0.02em] md:text-5xl">
          I help founders and teams turn complex workflows into software people
          can actually use.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-[1.7] text-[hsl(var(--muted-foreground))]">
          My work is strongest where product thinking, system design, and
          full-stack delivery all matter at once — SaaS platforms, CRMs,
          internal tools, and custom business systems built to last.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <AppLink
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-md shadow-[hsl(var(--primary))]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[hsl(var(--primary))]/35"
          >
            Start with a discovery call
            <ArrowRight className="h-4 w-4" />
          </AppLink>
          <AppLink
            href="/systems/crm-system"
            className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:bg-[hsl(var(--secondary))]"
          >
            See a production system
          </AppLink>
        </div>
      </section>

      {/* Service cards */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 md:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {serviceCards.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                data-reveal
                className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-colors hover:border-[hsl(var(--primary))]/25"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/14 text-[hsl(var(--primary))]">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-xl font-semibold">{service.title}</h2>
                <p className="mt-3 text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {service.examples.map((example) => (
                    <li
                      key={example}
                      className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]/80"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--state-success))]" />
                      {example}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {/* Differentiators */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 md:px-6">
        <div data-reveal>
          <Eyebrow>Why work with me</Eyebrow>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            What makes this engagement different
          </h2>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              data-reveal
              className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5"
            >
              <span className="font-data text-xs font-semibold text-[hsl(var(--primary))]/60">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement model + fit */}
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pt-16 md:px-6 xl:grid-cols-[1.05fr_0.95fr]">
        {/* How it works */}
        <div
          data-reveal
          className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8"
        >
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            From first conversation to shipped product
          </h2>
          <p className="mt-3 text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
            Pricing is project-based and scoped after a discovery conversation —
            not quoted blind. Every engagement starts with understanding the
            problem before discussing cost.
          </p>

          <div className="mt-6 grid gap-3">
            {engagementSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="flex gap-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/14 text-[hsl(var(--primary))]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-data text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--primary))]/60">
                        {step.step}
                      </span>
                      <p className="text-sm font-semibold">{step.title}</p>
                    </div>
                    <p className="mt-1 text-sm leading-[1.6] text-[hsl(var(--muted-foreground))]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Best fit */}
          <div
            data-reveal
            className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
          >
            <Eyebrow>Best fit</Eyebrow>
            <h2 className="mt-2 text-xl font-semibold">This works well when</h2>
            <div className="mt-4 space-y-3">
              {fitPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4 text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]"
                >
                  <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-[hsl(var(--state-success))]" />
                  {point}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            data-reveal
            className="rounded-2xl border border-[hsl(var(--primary))]/25 bg-[linear-gradient(135deg,hsla(227,68%,55%,0.14),transparent_42%),hsl(var(--card))] p-6"
          >
            <Eyebrow className="text-[hsl(var(--primary))]">
              Ready to start
            </Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold">
              Not sure if your project is a fit?
            </h2>
            <p className="mt-3 text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
              Describe the workflow or the problem — even rough ideas. A short
              conversation costs nothing and tells us both whether this makes
              sense to build together.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AppLink
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start the conversation
                <ArrowRight className="h-4 w-4" />
              </AppLink>
              <AppLink
                href="/about"
                className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-3 text-sm font-medium transition-colors hover:bg-[hsl(var(--secondary))]"
              >
                View experience
              </AppLink>
            </div>
          </div>
        </div>
      </section>

      {/* Process phases */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:pb-24">
        <div data-reveal>
          <Eyebrow>Build process</Eyebrow>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            How I structure every build
          </h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {systemBuildPhases.map((phase, index) => {
            const Icon = phaseIcons[index] ?? Blocks;
            return (
              <div
                key={phase.id}
                data-reveal
                className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-data text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                    Phase 0{index + 1}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/14 text-[hsl(var(--primary))]">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold">{phase.title}</h3>
                <p className="mt-2 text-sm leading-[1.6] text-[hsl(var(--muted-foreground))]">
                  {phase.description}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
          This is the same structure I used for the CRM and inventory systems at
          Solvevare — both of which went from requirements to production without
          scope drift or architecture rewrites.
        </p>
      </section>
    </RevealContainer>
  );
}
