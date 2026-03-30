import { BriefcaseBusiness } from "lucide-react";
import { experience } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-accent))]">
          Experience
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[hsl(var(--vscode-text))]">
          Full-stack experience across product delivery, client systems, and
          applied technical research.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[hsl(var(--vscode-text-muted))]">
          My work spans building production platforms, shaping backend
          architecture, and contributing to research-led technical exploration.
        </p>
      </section>

      <section className="space-y-4">
        {experience.map((item) => (
          <article
            key={item.id}
            className="rounded-[26px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6"
          >
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
                </div>

                <h2 className="mt-5 text-2xl font-semibold text-[hsl(var(--vscode-text))]">
                  {item.role}
                </h2>
                <p className="mt-1 text-sm text-[hsl(var(--vscode-text-muted))]">
                  {item.company}
                </p>
                <p className="mt-4 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
                  {item.description}
                </p>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm text-[hsl(var(--vscode-text))]">
                {item.period}
              </div>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              {item.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
