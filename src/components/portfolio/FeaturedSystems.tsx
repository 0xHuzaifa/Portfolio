import { ArrowUpRight, Layers3, Sparkles } from "lucide-react";
import Link from "next/link";
import { systems } from "@/data/systems";

const typeStyles = {
  "Personal Project":
    "border-[hsl(var(--vscode-accent))]/35 bg-[hsl(var(--vscode-accent))]/10 text-[hsl(var(--vscode-accent))]",
  "Professional Experience":
    "border-[hsl(var(--vscode-success))]/35 bg-[hsl(var(--vscode-success))]/10 text-[hsl(var(--vscode-success))]",
} as const;

export default function FeaturedSystems() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {systems.map((system, index) => (
        <Link
          key={system.slug}
          href={`/systems/${system.slug}`}
          className="group relative overflow-hidden rounded-[26px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 transition-transform duration-200 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsla(194,100%,56%,0.12),transparent_38%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

          <div className="relative flex h-full flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
                  System {index + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[hsl(var(--vscode-text))]">
                  {system.title}
                </h3>
              </div>

              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] text-[hsl(var(--vscode-accent))]">
                <Layers3 className="h-5 w-5" />
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${typeStyles[system.type]}`}
              >
                {system.type}
              </span>
              <span className="rounded-full border border-[hsl(var(--vscode-border))] px-3 py-1 text-xs text-[hsl(var(--vscode-text-muted))]">
                {system.category}
              </span>
            </div>

            <p className="text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
              {system.shortDescription}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  Scope
                </p>
                <p className="mt-2 text-sm text-[hsl(var(--vscode-text))]">
                  {system.features.length} key features delivered
                </p>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  Stack
                </p>
                <p className="mt-2 text-sm text-[hsl(var(--vscode-text))]">
                  {system.architecture.frontend} + {system.architecture.backend}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {system.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[hsl(var(--vscode-border))] px-3 py-1 text-xs text-[hsl(var(--vscode-text-muted))]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between pt-2 text-sm">
              <span className="inline-flex items-center gap-2 text-[hsl(var(--vscode-accent))]">
                <Sparkles className="h-4 w-4" />
                Open system
              </span>
              <ArrowUpRight className="h-4 w-4 text-[hsl(var(--vscode-text-muted))] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[hsl(var(--vscode-text))]" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
