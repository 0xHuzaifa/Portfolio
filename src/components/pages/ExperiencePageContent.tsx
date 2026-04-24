import { ArrowUpRight, BriefcaseBusiness, TrendingUp } from "lucide-react";
import { experience } from "@/data/experience";
import { AppLink } from "@/components/navigation/AppLink";

// Impact stats pulled from real production numbers
const impactStats = [
  { value: "30k+", label: "Emails/hour campaign capacity" },
  { value: "8,000+", label: "Products in inventory system" },
  { value: "6 mo", label: "Intern-to-developer at ICreativez" },
  { value: "2", label: "Production systems at Solvevare" },
] as const;

export function ExperiencePageContent() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-accent))]">
          Experience
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[hsl(var(--vscode-text))]">
          Full-stack experience across product delivery, client systems, and
          applied technical research.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[hsl(var(--vscode-text-muted))]">
          Two years building production systems across a software agency, a
          global IT consultancy, and a bank-backed research institution. Every
          role involved shipping real work to real users.
        </p>

        {/* Impact stats strip */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4"
            >
              <p className="text-2xl font-semibold text-[hsl(var(--vscode-accent))]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs leading-5 text-[hsl(var(--vscode-text-muted))]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience cards */}
      <section className="space-y-4">
        {experience.map((item) => (
          <article
            key={item.id}
            className="rounded-[26px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8"
          >
            {/* Header row */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </span>
                  {item.current && (
                    <span className="rounded-full border border-[hsl(var(--vscode-success))]/35 bg-[hsl(var(--vscode-success))]/10 px-3 py-1 text-xs font-medium text-[hsl(var(--vscode-success))]">
                      Current
                    </span>
                  )}
                  {!item.current && item.duration && (
                    <span className="rounded-full border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-3 py-1 text-xs font-medium text-[hsl(var(--vscode-text-muted))]">
                      {item.duration}
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-2xl font-semibold text-[hsl(var(--vscode-text))]">
                  {item.role}
                </h2>
                <p className="mt-1 text-base font-medium text-[hsl(var(--vscode-text-muted))]">
                  {item.company}
                </p>
                {item.companyContext && (
                  <p className="mt-0.5 text-xs text-[hsl(var(--vscode-text-muted))]/60">
                    {item.companyContext}
                  </p>
                )}
              </div>

              {/* Period badge — top right on desktop */}
              <div className="shrink-0 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm tabular-nums text-[hsl(var(--vscode-text))]">
                {item.period}
              </div>
            </div>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
              {item.description}
            </p>

            {/* Highlights */}
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {item.highlights.map((highlight, index) => (
                <div
                  key={highlight}
                  className="flex gap-3 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                    <TrendingUp className="h-3.5 w-3.5 text-[hsl(var(--vscode-accent))]/60" />
                  </span>
                  <p className="text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>

            {/* Related systems */}
            {item.relatedSystems && item.relatedSystems.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[hsl(var(--vscode-text-muted))]/60">
                  Related systems:
                </span>
                {item.relatedSystems.map((system) => (
                  <AppLink
                    key={system.slug}
                    href={`/systems/${system.slug}`}
                    tabTitle={`${system.label}.tsx`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--vscode-accent))]/30 bg-[hsl(var(--vscode-accent))]/8 px-3 py-1 text-xs font-medium text-[hsl(var(--vscode-accent))] transition-colors hover:border-[hsl(var(--vscode-accent))]/50 hover:bg-[hsl(var(--vscode-accent))]/14"
                  >
                    {system.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </AppLink>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="rounded-[30px] border border-[hsl(var(--vscode-accent))]/20 bg-[linear-gradient(135deg,hsla(194,100%,56%,0.14),transparent_45%),hsl(var(--vscode-sidebar-elevated))] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-accent))]">
          Next step
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold text-[hsl(var(--vscode-text))]">
          Two years of production systems. Ready for the next one.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
          If you need a developer who has shipped complex business systems end
          to end — not just contributed to them — let's talk about what you are
          building.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <AppLink
            href="/contact"
            tabTitle="Contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-bg))] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4" />
          </AppLink>
          <AppLink
            href="/systems/crm-system"
            tabTitle="CRM System"
            className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-5 py-3 text-sm font-medium text-[hsl(var(--vscode-text))] transition-colors hover:bg-[hsl(var(--vscode-hover))]"
          >
            See the systems
          </AppLink>
        </div>
      </section>
    </div>
  );
}
