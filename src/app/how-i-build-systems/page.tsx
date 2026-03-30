import { ArrowRight, Blocks, Compass, Rocket, Workflow } from "lucide-react";
import Link from "next/link";

const phases = [
  {
    title: "Discovery and framing",
    description:
      "Clarify business goals, users, workflows, and success signals before architecture starts taking shape.",
    icon: Compass,
  },
  {
    title: "System design",
    description:
      "Map roles, permissions, data flow, integrations, and operational constraints so the product can grow cleanly.",
    icon: Blocks,
  },
  {
    title: "Delivery rhythm",
    description:
      "Build in small, visible milestones that make collaboration easier for both technical and non-technical stakeholders.",
    icon: Workflow,
  },
  {
    title: "Launch and iteration",
    description:
      "Ship with a stable baseline, monitor usage, then refine the product around real feedback and edge cases.",
    icon: Rocket,
  },
] as const;

const principles = [
  "The interface should be understandable without a handoff meeting.",
  "Architecture decisions should reduce future friction, not just solve the next ticket.",
  "Business systems deserve polished UX because clarity saves teams time every day.",
  "Scalability includes maintainable code, durable data models, and sensible deployment strategy.",
];

export default function HowIBuildSystemsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-accent))]">
          Process
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[hsl(var(--vscode-text))]">
          I treat system building as product design, architecture, and delivery
          working together.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[hsl(var(--vscode-text-muted))]">
          The strongest systems are not only technically sound. They also make
          sense to the people using them, the teams maintaining them, and the
          business relying on them.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {phases.map((phase, index) => {
          const Icon = phase.icon;

          return (
            <div
              key={phase.title}
              className="rounded-[26px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  Phase 0{index + 1}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-[hsl(var(--vscode-text))]">
                {phase.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
                {phase.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
          Core principles
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {principles.map((principle) => (
            <div
              key={principle}
              className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-5 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]"
            >
              {principle}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[linear-gradient(135deg,hsla(194,100%,56%,0.12),transparent_42%),hsl(var(--vscode-sidebar-elevated))] p-6 md:p-8">
        <h2 className="text-3xl font-semibold text-[hsl(var(--vscode-text))]">
          Want to turn an idea into a structured system plan?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
          I can help define scope, architecture, and delivery steps before the
          build becomes expensive or confusing.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-bg))]"
        >
          Start the conversation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
