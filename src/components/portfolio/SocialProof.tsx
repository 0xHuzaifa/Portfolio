import { BadgeCheck, Briefcase, Building2, Code2 } from "lucide-react";

const proofStats = [
  {
    value: "2+",
    label: "Years building production systems",
    icon: Code2,
  },
  {
    value: "2",
    label: "Companies — real client delivery",
    icon: Building2,
  },
  {
    value: "4",
    label: "Production systems shipped",
    icon: Briefcase,
  },
  {
    value: "100%",
    label: "Full-stack — from schema to UI",
    icon: BadgeCheck,
  },
] as const;

const verifiedSignals = [
  {
    company: "Solvevare",
    context: "Software agency · Current",
    detail:
      "Architected and shipped a multi-tenant CRM and inventory platform for real estate clients — both in production.",
    type: "current" as const,
  },
  {
    company: "ICreativez Technologies",
    context: "Global IT firm · 201–500 people",
    detail:
      "Promoted from intern to full-time developer. Delivered production interfaces and APIs across multiple client projects.",
    type: "past" as const,
  },
  {
    company: "HBL Center for Blockchain & Applied Research",
    context: "Pakistan's largest bank · GIKI",
    detail:
      "Applied research on blockchain integration in financial systems. Built proof-of-concept applications on Ethereum and Hyperledger.",
    type: "past" as const,
  },
] as const;

const typeStyles = {
  current:
    "border-[hsl(var(--vscode-success))]/35 bg-[hsl(var(--vscode-success))]/10 text-[hsl(var(--vscode-success))]",
  past: "border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] text-[hsl(var(--vscode-text-muted))]",
} as const;

const typeLabel = {
  current: "Current",
  past: "Verified",
} as const;

export function SocialProof() {
  return (
    <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
          Track record
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[hsl(var(--vscode-text))]">
          Real work, verified employment
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-[1.75] text-[hsl(var(--vscode-text-muted))]">
          No testimonials yet — but here's what's verifiable: two professional
          roles, production systems in use, and a clear record of what was built
          where.
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {proofStats.map(({ value, label, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col gap-2 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
              <Icon className="h-4 w-4" />
            </span>
            <p className="text-2xl font-bold text-[hsl(var(--vscode-text))]">
              {value}
            </p>
            <p className="text-xs leading-[1.6] text-[hsl(var(--vscode-text-muted))]">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Verified employment signals */}
      <div className="space-y-3">
        {verifiedSignals.map((signal) => (
          <div
            key={signal.company}
            className="flex flex-col gap-3 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4 sm:flex-row sm:items-start sm:gap-4"
          >
            {/* Company initial */}
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--vscode-accent))]/14 text-sm font-bold text-[hsl(var(--vscode-accent))]">
              {signal.company[0]}
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-[hsl(var(--vscode-text))]">
                  {signal.company}
                </p>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${typeStyles[signal.type]}`}
                >
                  {typeLabel[signal.type]}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[hsl(var(--vscode-text-muted))]/70">
                {signal.context}
              </p>
              <p className="mt-2 text-sm leading-[1.7] text-[hsl(var(--vscode-text-muted))]">
                {signal.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Future testimonial placeholder — honest, not fake */}
      <div className="mt-4 rounded-2xl border border-dashed border-[hsl(var(--vscode-border))] p-4">
        <p className="text-xs leading-[1.7] text-[hsl(var(--vscode-text-muted))]/60">
          Client testimonials will appear here as projects complete. If you've
          worked with me and want to share feedback, reach out via the contact
          page.
        </p>
      </div>
    </section>
  );
}
