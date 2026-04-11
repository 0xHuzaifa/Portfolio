import {
  ArrowRight,
  CheckCircle2,
  Database,
  Globe,
  HardDrive,
  KeyRound,
  Layers3,
  Lock,
  Monitor,
  Package,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { AppLink } from "@/components/navigation/AppLink";
import { TechChip } from "@/lib/techIcons";
import { SystemImageGallery } from "@/components/systems/SystemImageGallery";
import type { System } from "@/data/systems";

// ── Feature grouping ──────────────────────────────────────────────────────────
const featureGroups: {
  key: string;
  label: string;
  icon: React.ReactNode;
  keywords: string[];
}[] = [
  {
    key: "security",
    label: "Security & Auth",
    icon: <Lock className="h-4 w-4" />,
    keywords: [
      "auth",
      "jwt",
      "session",
      "permission",
      "role",
      "access",
      "secure",
    ],
  },
  {
    key: "realtime",
    label: "Real-time",
    icon: <Zap className="h-4 w-4" />,
    keywords: [
      "real-time",
      "realtime",
      "websocket",
      "socket",
      "chat",
      "notification",
      "presence",
      "typing",
    ],
  },
  {
    key: "data",
    label: "Data & Storage",
    icon: <Database className="h-4 w-4" />,
    keywords: [
      "database",
      "storage",
      "upload",
      "import",
      "csv",
      "bulk",
      "pagination",
      "search",
      "filter",
      "image",
    ],
  },
  {
    key: "users",
    label: "Users & Tenancy",
    icon: <Users className="h-4 w-4" />,
    keywords: [
      "multi-tenant",
      "workspace",
      "subdomain",
      "user",
      "group",
      "onboard",
      "invite",
      "team",
    ],
  },
  {
    key: "automation",
    label: "Automation & Jobs",
    icon: <Package className="h-4 w-4" />,
    keywords: [
      "campaign",
      "schedul",
      "queue",
      "worker",
      "automat",
      "email",
      "sms",
      "follow-up",
      "renewal",
      "job",
    ],
  },
  {
    key: "api",
    label: "API & Integration",
    icon: <Globe className="h-4 w-4" />,
    keywords: [
      "api",
      "integration",
      "docusign",
      "smtp",
      "rest",
      "webhook",
      "external",
    ],
  },
];

function groupFeatures(features: string[]) {
  const assigned = new Set<string>();
  const result: { group: (typeof featureGroups)[0]; items: string[] }[] = [];

  for (const g of featureGroups) {
    const matched = features.filter((f) => {
      if (assigned.has(f)) return false;
      return g.keywords.some((kw) => f.toLowerCase().includes(kw));
    });
    if (matched.length > 0) {
      matched.forEach((f) => assigned.add(f));
      result.push({ group: g, items: matched });
    }
  }

  const remaining = features.filter((f) => !assigned.has(f));
  if (remaining.length > 0) {
    result.push({
      group: {
        key: "core",
        label: "Core",
        icon: <Sparkles className="h-4 w-4" />,
        keywords: [],
      },
      items: remaining,
    });
  }
  return result;
}

// ── Architecture layer icons ───────────────────────────────────────────────────
const archLayerMeta: Record<string, { icon: React.ReactNode; accent: string }> =
  {
    Frontend: {
      icon: <Monitor className="h-4 w-4" />,
      accent: "hsl(var(--vscode-accent))",
    },
    Backend: {
      icon: <Server className="h-4 w-4" />,
      accent: "hsl(var(--vscode-warm))",
    },
    Database: { icon: <Database className="h-4 w-4" />, accent: "#47A248" },
    Auth: { icon: <KeyRound className="h-4 w-4" />, accent: "#BB6BD9" },
    Realtime: { icon: <Zap className="h-4 w-4" />, accent: "#F9C74F" },
    Jobs: { icon: <Package className="h-4 w-4" />, accent: "#EF4444" },
    Infrastructure: {
      icon: <HardDrive className="h-4 w-4" />,
      accent: "#2496ED",
    },
    Storage: { icon: <HardDrive className="h-4 w-4" />, accent: "#FF9900" },
    Tenancy: { icon: <Users className="h-4 w-4" />, accent: "#68D391" },
    Media: { icon: <Globe className="h-4 w-4" />, accent: "#3448C5" },
  };

// ── Component ─────────────────────────────────────────────────────────────────
export function SystemPageContent({ system }: { system: System }) {
  const archEntries: { label: string; value: string }[] = [
    { label: "Frontend", value: system.architecture.frontend },
    { label: "Backend", value: system.architecture.backend },
    { label: "Database", value: system.architecture.database },
    ...(system.architecture.auth
      ? [{ label: "Auth", value: system.architecture.auth }]
      : []),
    ...(system.architecture.realtime
      ? [{ label: "Realtime", value: system.architecture.realtime }]
      : []),
    ...(system.architecture.jobs
      ? [{ label: "Jobs", value: system.architecture.jobs }]
      : []),
    ...(system.architecture.infrastructure
      ? [{ label: "Infrastructure", value: system.architecture.infrastructure }]
      : []),
    ...(system.architecture.storage
      ? [{ label: "Storage", value: system.architecture.storage }]
      : []),
    ...(system.architecture.tenancy
      ? [{ label: "Tenancy", value: system.architecture.tenancy }]
      : []),
    ...(system.architecture.media
      ? [{ label: "Media", value: system.architecture.media }]
      : []),
  ];

  const groupedFeatures = groupFeatures(system.features);

  return (
    <div className="space-y-8">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsla(194,100%,56%,0.12),transparent_40%)]" />
        <div className="relative">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--vscode-accent))]/35 bg-[hsl(var(--vscode-accent))]/10 px-3 py-1 text-xs font-medium text-[hsl(var(--vscode-accent))]">
              <Sparkles className="h-3 w-3" />
              {system.type}
            </span>
            <span className="rounded-full border border-[hsl(var(--vscode-border))] px-3 py-1 text-xs text-[hsl(var(--vscode-text-muted))]">
              {system.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-[hsl(var(--vscode-text))] md:text-[2.5rem]">
            {system.title}
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-3xl text-[0.9375rem] leading-[1.85] text-[hsl(var(--vscode-text-muted))]">
            {system.shortDescription}
          </p>

          {/* systemType / role */}
          {(system.systemType || system.role) && (
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              {system.systemType && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--vscode-accent))]/30 bg-[hsl(var(--vscode-accent))]/8 px-3 py-1 text-[hsl(var(--vscode-accent))]">
                  <Layers3 className="h-3 w-3 shrink-0" />
                  {system.systemType}
                </span>
              )}
              {system.role && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--vscode-border))] px-3 py-1 text-[hsl(var(--vscode-text-muted))]">
                  <ShieldCheck className="h-3 w-3 shrink-0" />
                  {system.role}
                </span>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="mt-6 border-t border-[hsl(var(--vscode-border))]/50" />

          {/* Highlights + Quick stack mini-cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* Key highlights */}
            {system.highlights && (
              <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
                  Key highlights
                </p>
                <ul className="mt-3 space-y-2">
                  {system.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-xs text-[hsl(var(--vscode-text))]"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--vscode-success))]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Primary stack */}
            <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4">
              <div className="flex items-center gap-1.5">
                <Monitor className="h-3.5 w-3.5 text-[hsl(var(--vscode-accent))]" />
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  Primary stack
                </p>
              </div>
              <p className="mt-2 text-sm font-medium text-[hsl(var(--vscode-text))]">
                {system.architecture.frontend}
              </p>
              <p className="mt-1 text-xs text-[hsl(var(--vscode-text-muted))]">
                {system.architecture.backend}
              </p>
            </div>

            {/* Data layer */}
            <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4">
              <div className="flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-[#47A248]" />
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  Data layer
                </p>
              </div>
              <p className="mt-2 text-sm font-medium text-[hsl(var(--vscode-text))]">
                {system.architecture.database}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SYSTEM IMAGES ───────────────────────────────────────────────────── */}
      {system.images && system.images.length > 0 && (
        <SystemImageGallery images={system.images} />
      )}

      {/* ── PROBLEM / SOLUTION ───────────────────────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
            Problem
          </p>
          <p className="mt-3 text-sm leading-[1.85] text-[hsl(var(--vscode-text-muted))] whitespace-pre-line max-w-3xl">
            {system.problem}
          </p>
        </article>

        <article className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-success))]/10 text-[hsl(var(--vscode-success))]">
            <Wrench className="h-5 w-5" />
          </div>
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
            Solution
          </p>
          <p className="mt-3 text-sm leading-[1.85] text-[hsl(var(--vscode-text-muted))] whitespace-pre-line max-w-3xl">
            {system.solution}
          </p>
        </article>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
          Features
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[hsl(var(--vscode-text))]">
          Capabilities &amp; System Features
        </h2>

        <div className="mt-6 space-y-6">
          {groupedFeatures.map(({ group, items }) => (
            <div key={group.key}>
              {/* Group label */}
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[hsl(var(--vscode-accent))]/12 text-[hsl(var(--vscode-accent))]">
                  {group.icon}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
                  {group.label}
                </span>
                <div className="flex-1 border-t border-[hsl(var(--vscode-border))]/40" />
              </div>

              {/* Feature cards */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2.5 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4 text-sm leading-[1.7] text-[hsl(var(--vscode-text-muted))] transition-all duration-150 hover:-translate-y-0.5 hover:border-[hsl(var(--vscode-accent))]/20"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--vscode-success))]" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ENGINEERING CHALLENGES ───────────────────────────────────────────── */}
      {system.engineeringChallenges && (
        <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
            Engineering challenges
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[hsl(var(--vscode-text))]">
            Complex problems solved
          </h2>

          <div className="mt-6 space-y-4">
            {system.engineeringChallenges.map((c, i) => (
              <div
                key={c.title}
                className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-5 transition-all duration-150 hover:-translate-y-0.5"
              >
                {/* Title row */}
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--vscode-accent))]/12 text-xs font-bold text-[hsl(var(--vscode-accent))]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-[hsl(var(--vscode-text))]">
                    {c.title}
                  </h3>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  {/* Problem */}
                  <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-red-400">
                      Problem
                    </p>
                    <p className="text-sm leading-[1.75] text-[hsl(var(--vscode-text-muted))]">
                      {c.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="rounded-xl border border-[hsl(var(--vscode-success))]/15 bg-[hsl(var(--vscode-success))]/5 p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--vscode-success))]">
                      Solution
                    </p>
                    <p className="text-sm leading-[1.75] text-[hsl(var(--vscode-text-muted))]">
                      {c.solution}
                    </p>
                  </div>
                </div>

                {/* Impact */}
                {c.impact && (
                  <div className="mt-3 flex items-start gap-2 rounded-xl border border-[hsl(var(--vscode-accent))]/15 bg-[hsl(var(--vscode-accent))]/5 px-4 py-3">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--vscode-accent))]" />
                    <p className="text-sm leading-[1.75] text-[hsl(var(--vscode-text-muted))]">
                      <span className="font-semibold text-[hsl(var(--vscode-accent))]">
                        Impact:{" "}
                      </span>
                      {c.impact}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── ARCHITECTURE + TECHNOLOGIES ──────────────────────────────────────── */}
      <section className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
        {/* Architecture */}
        <article className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
              <Layers3 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
                Architecture
              </p>
              <h2 className="mt-0.5 text-2xl font-bold text-[hsl(var(--vscode-text))]">
                System structure
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {archEntries.map((item) => {
              const meta = archLayerMeta[item.label] ?? {
                icon: <Layers3 className="h-4 w-4" />,
                accent: "hsl(var(--vscode-accent))",
              };
              return (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] p-4 transition-all duration-150 hover:-translate-y-0.5"
                  style={{
                    borderLeft: `2px solid ${meta.accent}`,
                  }}
                >
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: `${meta.accent}18`,
                      color: meta.accent,
                    }}
                  >
                    {meta.icon}
                  </span>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-[hsl(var(--vscode-text))]">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        {/* Technologies + CTA */}
        <article className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
            Technologies
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[hsl(var(--vscode-text))]">
            Tooling used
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {system.technologies.map((technology) => (
              <TechChip key={technology} name={technology} size="md" />
            ))}
          </div>

          {/* CTA card */}
          <div className="mt-8 rounded-2xl border border-[hsl(var(--vscode-accent))]/20 bg-[linear-gradient(135deg,hsla(194,100%,56%,0.14),transparent_42%),hsl(var(--vscode-panel))] p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-[hsl(var(--vscode-text))]">
                  Building something complex?
                </h3>
                <p className="mt-2 text-sm leading-[1.75] text-[hsl(var(--vscode-text-muted))]">
                  I design and build scalable systems like this — from
                  architecture to production-ready implementation.
                </p>
                <AppLink
                  href="/contact"
                  tabTitle="Contact"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--vscode-accent))] px-4 py-2 text-sm font-bold text-[hsl(var(--vscode-bg))] shadow-md shadow-[hsl(var(--vscode-accent))]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[hsl(var(--vscode-accent))]/35"
                >
                  Talk about your system
                  <ArrowRight className="h-3.5 w-3.5" />
                </AppLink>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
