import { ArrowRight, Blocks, Compass, Rocket, Workflow } from "lucide-react";
import { RevealContainer } from "@/components/motion/RevealContainer";
import { AppLink } from "@/components/navigation/AppLink";
import {
  systemBuildPhases,
  systemBuildPrinciples,
} from "@/data/portfolio/process";

const phaseIcons = [Compass, Blocks, Workflow, Rocket] as const;

export function HowIBuildSystemsPageContent() {
  return (
    <RevealContainer className="mx-auto w-full max-w-6xl space-y-8 px-4 py-16 md:px-6">
      <section className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsla(227,68%,55%,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,hsla(30,71%,55%,0.12),transparent_34%)]" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
            Process
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[hsl(var(--foreground))]">
            I treat system building as product design, architecture, and
            delivery working together.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
            The strongest systems are not only technically sound. They also make
            sense to people using them, teams maintaining them, and business
            relying on them.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {systemBuildPhases.map((phase, index) => {
          const Icon = phaseIcons[index] ?? Compass;

          return (
            <div
              key={phase.title}
              className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                  Phase 0{index + 1}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--primary))]/14 text-[hsl(var(--primary))]">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-[hsl(var(--foreground))]">
                {phase.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                {phase.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
          Core principles
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {systemBuildPrinciples.map((principle) => (
            <div
              key={principle}
              className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-5 text-sm leading-7 text-[hsl(var(--muted-foreground))]"
            >
              {principle}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[hsl(var(--border))] bg-[linear-gradient(135deg,hsla(227,68%,55%,0.12),transparent_42%),hsl(var(--card))] p-6 md:p-8">
        <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))]">
          Want to turn an idea into a structured system plan?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
          I can help define scope, architecture, and delivery steps before the
          build becomes expensive or confusing.
        </p>
        <AppLink
          href="/contact"
          tabTitle="Contact"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))]"
        >
          Start the conversation
          <ArrowRight className="h-4 w-4" />
        </AppLink>
      </section>
    </RevealContainer>
  );
}
