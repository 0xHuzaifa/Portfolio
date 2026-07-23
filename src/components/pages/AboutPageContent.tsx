import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Trophy,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import { RevealContainer } from "@/components/motion/RevealContainer";
import { AppLink } from "@/components/navigation/AppLink";
import { portfolioProfile } from "@/data/portfolio";
import { systemBuildPrinciples } from "@/data/portfolio/process";

const credibilityPoints = [
  {
    title: "Business-aware development",
    description:
      "I focus on how teams actually work so the software supports real operations — not the other way around. Most bugs in business systems are UX decisions, not code errors.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Architecture before code",
    description:
      "Before touching a keyboard I map data models, permissions, and growth paths on paper. The decisions that matter most are made in the first hour, not the last sprint.",
    icon: Workflow,
  },
  {
    title: "Reliable under pressure",
    description:
      "I keep backups before every deployment, flag deadline risks a week early, and take ownership when something breaks. Steady communication is part of the build, not an extra.",
    icon: ShieldCheck,
  },
] as const;

const originPoints = [
  {
    icon: MapPin,
    label: "Based in",
    value: "Karachi — originally from Nawabshah",
  },
  {
    icon: GraduationCap,
    label: "Studied",
    value: "Information Technology · SBBU Nawabshah",
  },
  {
    icon: Trophy,
    label: "Selected from",
    value: "50,000 out of 300,000+ applicants · Governor Sindh Initiative",
  },
] as const;

const hardestProblems = [
  {
    number: "01",
    title: "Campaign automation engine",
    context: "Multi-tenant CRM · Solvevare",
    description:
      "First time architecting a background job system from scratch. Scheduling, custom intervals, per-user SMTP configs, retry logic, failure tracking — and one hard constraint: never send the same person the same campaign twice. Built with BullMQ and Redis without blocking the main application.",
  },
  {
    number: "02",
    title: "Hierarchical allotment engine",
    context: "Inventory platform · Solvevare",
    description:
      "Allocation rules cascading from category to subcategory to individual product, across user groups and individuals. Deducting one person's limit could not affect anyone else's. No good tutorials exist for this — the logic had to come from first principles.",
  },
] as const;

export function AboutPageContent() {
  return (
    <RevealContainer className="mx-auto w-full max-w-6xl space-y-8 px-4 py-16 md:px-6">
      {/* Hero */}
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsla(227,68%,55%,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,hsla(30,71%,55%,0.12),transparent_34%)]" />
          <div className="relative flex h-full flex-col">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
                About
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[hsl(var(--foreground))]">
                The person behind the systems
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
                I grew up in Nawabshah and moved to Karachi to build things
                professionally. Computers fascinated me not as tools but as
                puzzles — I kept asking{" "}
                <em>
                  how does this actually work, and could I build one myself?
                </em>{" "}
                That question led me to programming, and programming led me to
                realising that software is really just a set of decisions made
                concrete.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
                My degree gave me foundations. Everything production-level came
                from building things myself, breaking them, and figuring out
                why.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <AppLink
                href="/contact"
                tabTitle="Contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </AppLink>
              <AppLink
                href="/experience"
                tabTitle="Experience"
                className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 px-5 py-3 text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--secondary))]"
              >
                See experience
              </AppLink>
            </div>
          </div>
        </div>

        {/* Snapshot + origin facts */}
        <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
            Snapshot
          </p>

          <div className="mt-5 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-5">
            <Image
              src="/huzaifa.jpg"
              alt={portfolioProfile.name}
              width={64}
              height={64}
              className="h-16 w-16 rounded-2xl object-cover"
            />
            <h2 className="mt-4 text-2xl font-semibold text-[hsl(var(--foreground))]">
              {portfolioProfile.name}
            </h2>
            <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
              {portfolioProfile.title}
            </p>
            <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
              {portfolioProfile.availability}
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {originPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.label}
                  className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/14 text-[hsl(var(--primary))]">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]/60">
                      {point.label}
                    </p>
                    <p className="mt-0.5 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                      {point.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>

      {/* Credibility points */}
      <section className="grid gap-4 lg:grid-cols-3">
        {credibilityPoints.map((point) => {
          const Icon = point.icon;
          return (
            <article
              key={point.title}
              className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--primary))]/14 text-[hsl(var(--primary))]">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-[hsl(var(--foreground))]">
                {point.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                {point.description}
              </p>
            </article>
          );
        })}
      </section>

      {/* Hardest problems + specialties */}
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        {/* Hardest problems — stretches to match right column height */}
        <section className="flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
            Real work
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[hsl(var(--foreground))]">
            The hardest problems I have solved
          </h2>
          <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
            These are the kinds of problems I am built for — complex enough that
            no tutorial covers them, specific enough that they had to be thought
            through from first principles.
          </p>

          <div className="mt-6 flex flex-1 flex-col justify-between gap-3">
            {hardestProblems.map((problem) => (
              <div
                key={problem.number}
                className="flex gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/14 text-sm font-bold text-[hsl(var(--primary))]">
                  {problem.number}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                    {problem.title}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]/60">
                    {problem.context}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Filler card — shows only when right column is taller */}
            <div className="flex-1 rounded-2xl border border-[hsl(var(--border))]/50 border-dashed bg-[hsl(var(--background))]/40 p-5 flex flex-col justify-center gap-2 min-h-[80px]">
              <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]/50">
                More on the systems
              </p>
              <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]/70">
                Each of these problems is documented in detail on the system
                pages — engineering decisions, tradeoffs, and what the solution
                looks like in production.
              </p>
              <AppLink
                href="/systems/crm-system"
                tabTitle="CRM System"
                className="mt-1 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-[hsl(var(--primary))] hover:underline"
              >
                Read the CRM case study
                <ArrowRight className="h-3 w-3" />
              </AppLink>
            </div>
          </div>
        </section>

        {/* Specialties + principles */}
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
              What I focus on
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[hsl(var(--foreground))]">
              The kind of work I do best
            </h2>

            <div className="mt-5 grid gap-3">
              {portfolioProfile.specialties.map((specialty, index) => (
                <div
                  key={specialty}
                  className="flex gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/14 text-sm font-bold text-[hsl(var(--primary))]">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                    {specialty}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
              Working principles
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[hsl(var(--foreground))]">
              How I keep builds practical
            </h2>

            <div className="mt-5 space-y-3">
              {systemBuildPrinciples.map((principle) => (
                <div
                  key={principle}
                  className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]"
                >
                  {principle}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* Philosophy strip */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
            How I think
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[hsl(var(--foreground))]">
            Systems before code
          </h2>
          <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
            Most developers build for the ticket in front of them. I try to
            build for the system that ticket belongs to. Before writing a line
            of code I spend time on paper — mapping flows, permissions, data
            models, and edge cases. The decisions that matter most in a system
            are usually made in the first hour, not the last week.
          </p>
          <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
            I also play chess. Both disciplines share the same underlying logic
            — read the full board before making a move, not just the piece in
            front of you.
          </p>
        </div>

        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
            Where I am going
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[hsl(var(--foreground))]">
            Building toward ownership
          </h2>
          <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
            Three years from now I want to be running my own software house or
            shipping a SaaS product. I am building toward that every day — in
            the systems I architect, the clients I work with, and the standards
            I hold myself to.
          </p>
          <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
            Every production system I build is practice for that. Not just code
            that ships — decisions that hold up six months later when the team
            grows and requirements change.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-[hsl(var(--primary))]/20 bg-[linear-gradient(135deg,hsla(227,68%,55%,0.14),transparent_45%),hsl(var(--card))] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
          Next step
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-[hsl(var(--foreground))]">
          If you need a developer who thinks in product, architecture, and
          delivery at the same time — we should talk.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
          Bring the rough idea, existing workflow, or messy process. I will help
          shape it into a system that makes sense to build — and to maintain
          after you ship it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <AppLink
            href="/contact"
            tabTitle="Contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </AppLink>
          <AppLink
            href="/systems/crm-system"
            tabTitle="CRM System"
            className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 px-5 py-3 text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--secondary))]"
          >
            See the work
          </AppLink>
        </div>
      </section>
    </RevealContainer>
  );
}
