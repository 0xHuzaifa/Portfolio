import { ArrowRight, Layers3, ShieldCheck, Wrench } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { systems } from "@/data/systems";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const system = systems.find((item) => item.slug === slug);

  if (!system) {
    return {
      title: "System Not Found | Huzaifa Ahmed",
    };
  }

  return {
    title: `${system.title} | Huzaifa Ahmed`,
    description: system.shortDescription,
    openGraph: {
      title: `${system.title} | Huzaifa Ahmed`,
      description: system.shortDescription,
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return systems.map((system) => ({
    slug: system.slug,
  }));
}

export default async function SystemPage({ params }: Props) {
  const { slug } = await params;
  const system = systems.find((item) => item.slug === slug);

  if (!system) return notFound();

  const architectureItems = [
    { label: "Frontend", value: system.architecture.frontend },
    { label: "Backend", value: system.architecture.backend },
    { label: "Database", value: system.architecture.database },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[hsl(var(--vscode-accent))]/35 bg-[hsl(var(--vscode-accent))]/10 px-3 py-1 text-xs font-medium text-[hsl(var(--vscode-accent))]">
            {system.type}
          </span>
          <span className="rounded-full border border-[hsl(var(--vscode-border))] px-3 py-1 text-xs text-[hsl(var(--vscode-text-muted))]">
            {system.category}
          </span>
        </div>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-[hsl(var(--vscode-text))]">
          {system.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[hsl(var(--vscode-text-muted))]">
          {system.shortDescription}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
              Features
            </p>
            <p className="mt-2 text-sm text-[hsl(var(--vscode-text))]">
              {system.features.length} delivered modules
            </p>
          </div>
          <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
              Primary stack
            </p>
            <p className="mt-2 text-sm text-[hsl(var(--vscode-text))]">
              {system.architecture.frontend} + {system.architecture.backend}
            </p>
          </div>
          <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
              Data layer
            </p>
            <p className="mt-2 text-sm text-[hsl(var(--vscode-text))]">
              {system.architecture.database}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
            Problem
          </p>
          <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
            {system.problem}
          </p>
        </article>

        <article className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
            <Wrench className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
            Solution
          </p>
          <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
            {system.solution}
          </p>
        </article>
      </section>

      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
          Features
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-[hsl(var(--vscode-text))]">
          Core capabilities
        </h2>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {system.features.map((feature) => (
            <div
              key={feature}
              className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-5 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
        <article className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
              <Layers3 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
                Architecture
              </p>
              <h2 className="mt-1 text-3xl font-semibold text-[hsl(var(--vscode-text))]">
                System structure
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {architectureItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-5"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-[hsl(var(--vscode-text))]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {(system.architecture.auth || system.architecture.realtime) && (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {system.architecture.auth && (
                <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                    Auth
                  </p>
                  <p className="mt-2 text-sm text-[hsl(var(--vscode-text))]">
                    {system.architecture.auth}
                  </p>
                </div>
              )}
              {system.architecture.realtime && (
                <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                    Realtime
                  </p>
                  <p className="mt-2 text-sm text-[hsl(var(--vscode-text))]">
                    {system.architecture.realtime}
                  </p>
                </div>
              )}
            </div>
          )}
        </article>

        <article className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
            Technologies
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[hsl(var(--vscode-text))]">
            Tooling used
          </h2>

          <div className="mt-6 flex flex-wrap gap-2">
            {system.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-3 py-1.5 text-sm text-[hsl(var(--vscode-text))]"
              >
                {technology}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[linear-gradient(135deg,hsla(194,100%,56%,0.14),transparent_42%),hsl(var(--vscode-panel))] p-5">
            <h3 className="text-xl font-semibold text-[hsl(var(--vscode-text))]">
              Need something similar?
            </h3>
            <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
              I can help shape the architecture and interface for platforms with
              comparable product and operational demands.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--vscode-accent))]"
            >
              Talk about your system
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
