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
import { RevealContainer } from "@/components/motion/RevealContainer";
import { AppLink } from "@/components/navigation/AppLink";
import { About } from "@/components/portfolio/About";
import { Capabilities } from "@/components/portfolio/Capabilities";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import FeaturedSystems from "@/components/portfolio/FeaturedSystems";
import { FinalCta } from "@/components/portfolio/FinalCta";
import { Footer } from "@/components/portfolio/Footer";
import { HeroTrustStage } from "@/components/portfolio/HeroTrustStage";
import { HowIThink } from "@/components/portfolio/HowIThink";
import { Quote } from "@/components/portfolio/Quote";
import { SocialProof } from "@/components/portfolio/SocialProof";
import { Eyebrow } from "@/components/ui/eyebrow";
import { systemBuildPrinciples } from "@/data/portfolio/process";
import { categoryLabels, techStack } from "@/data/techStack";
import { TechChip } from "@/lib/techIcons";

// Hero-only pass while the intro/scroll choreography is being built.
// Flip to true to bring the rest of the homepage back.
const SHOW_SECTIONS = false;

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
    <RevealContainer>
      <HeroTrustStage />
      <FeaturedProjects />
      <HowIThink />
      <Capabilities />
      <About />
      <Quote />
      <FinalCta />
      <Footer />

      {SHOW_SECTIONS && (
        <>
          {/* ── CAPABILITIES ─────────────────────────────────── */}
          <section className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
            <div className="grid gap-4 md:grid-cols-3">
              {capabilityCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    data-reveal
                    className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-colors hover:border-[hsl(var(--primary))]/25"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/14 text-[hsl(var(--primary))]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 text-base font-semibold">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── SYSTEMS ──────────────────────────────────────── */}
          <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-6">
            <div data-reveal className="mb-8">
              <Eyebrow>Systems</Eyebrow>
              <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Selected builds and platform work
                </h2>
                <p className="max-w-xl text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
                  A mix of personal products and professional delivery across
                  content, operations, customer management, and real-time
                  communication.
                </p>
              </div>
            </div>
            <div data-reveal>
              <FeaturedSystems />
            </div>
          </section>

          {/* ── PRINCIPLES ──────────────────────────────────── */}
          <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-6">
            <div data-reveal>
              <Eyebrow>How I think</Eyebrow>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Principles behind every build
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {systemBuildPrinciples.map((principle) => (
                <div
                  key={principle}
                  data-reveal
                  className="flex gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[hsl(var(--primary))]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-[1.7]">{principle}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
              See how these principles translate into a structured build process
              →{" "}
              <AppLink
                href="/how-i-build-systems"
                className="text-[hsl(var(--primary))] underline-offset-4 hover:underline"
              >
                How I build systems
              </AppLink>
            </p>
          </section>

          {/* ── SOCIAL PROOF ─────────────────────────────────── */}
          <section
            data-reveal
            className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-6"
          >
            <SocialProof />
          </section>

          {/* ── APPROACH + TECH STACK ─────────────────────────── */}
          <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-20 md:px-6 xl:grid-cols-[1fr_1.08fr]">
            <div
              data-reveal
              className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8"
            >
              <Eyebrow>Approach</Eyebrow>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
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
                    className="flex gap-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/14 font-data text-sm font-semibold text-[hsl(var(--primary))]">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              data-reveal
              className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8"
            >
              <Eyebrow>Tech stack</Eyebrow>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
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
                      <span className="text-[hsl(var(--muted-foreground))]">
                        {categoryIcons[category]}
                      </span>
                      <p className="font-data text-[11px] font-medium uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
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
          <section className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
            <div
              data-reveal
              className="relative overflow-hidden rounded-2xl border border-[hsl(var(--primary))]/25 bg-[linear-gradient(135deg,hsla(227,68%,55%,0.14),transparent_45%),hsl(var(--card))] p-6 md:p-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsla(30,71%,55%,0.08),transparent_55%)]" />
              <div className="relative">
                <p className="font-data text-[11px] font-medium uppercase tracking-[0.24em] text-[hsl(var(--primary))]">
                  Ready to build
                </p>
                <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                      Have a system in mind? Let's scope it out.
                    </h2>
                    <p className="mt-3 text-base leading-[1.7] text-[hsl(var(--muted-foreground))]">
                      Send over what you're building — the workflow, the
                      problem, or even just a rough idea. I'll come back with a
                      clear picture of what it takes to build it properly.
                    </p>
                    <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]/70">
                      Typical response within 24 hours.
                    </p>
                  </div>
                  <AppLink
                    href="/contact"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-6 py-3.5 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(var(--primary))]/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[hsl(var(--primary))]/40"
                  >
                    Send your project brief
                    <ArrowRight className="h-4 w-4" />
                  </AppLink>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </RevealContainer>
  );
}
