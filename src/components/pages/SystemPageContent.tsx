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
import { RevealContainer } from "@/components/motion/RevealContainer";
import { AppLink } from "@/components/navigation/AppLink";
import { SystemImageGallery } from "@/components/systems/SystemImageGallery";
import { SchematicVisual } from "@/components/three/SchematicVisual";
import type { System } from "@/data/systems";
import { TechChip } from "@/lib/techIcons";

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
      accent: "hsl(var(--accent-cool))",
    },
    Backend: {
      icon: <Server className="h-4 w-4" />,
      accent: "hsl(var(--accent-warm))",
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
    AI: { icon: <Sparkles className="h-4 w-4" />, accent: "#8B5CF6" },
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
    ...(system.architecture.ai
      ? [{ label: "AI", value: system.architecture.ai }]
      : []),
  ];

  const groupedFeatures = groupFeatures(system.features);

  return (
    <RevealContainer className="mx-auto w-full max-w-6xl space-y-8 px-4 py-16 md:px-6">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsla(227,68%,55%,0.12),transparent_40%)]" />
        <SchematicVisual className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] opacity-60 lg:block" />
        <div className="relative">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--primary))]/35 bg-[hsl(var(--primary))]/10 px-3 py-1 text-xs font-medium text-[hsl(var(--primary))]">
              <Sparkles className="h-3 w-3" />
              {system.type}
            </span>
            <span className="rounded-full border border-[hsl(var(--border))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
              {system.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-[hsl(var(--foreground))] md:text-[2.5rem]">
            {system.title}
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-3xl text-[0.9375rem] leading-[1.85] text-[hsl(var(--muted-foreground))]">
            {system.shortDescription}
          </p>

          {/* systemType / role */}
          {(system.systemType || system.role) && (
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              {system.systemType && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/8 px-3 py-1 text-[hsl(var(--primary))]">
                  <Layers3 className="h-3 w-3 shrink-0" />
                  {system.systemType}
                </span>
              )}
              {system.role && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--border))] px-3 py-1 text-[hsl(var(--muted-foreground))]">
                  <ShieldCheck className="h-3 w-3 shrink-0" />
                  {system.role}
                </span>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="mt-6 border-t border-[hsl(var(--border))]/50" />

          {/* ── METRICS STRIP (new) ─────────────────────────────────────────── */}
          {system.metrics && system.metrics.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {system.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4"
                >
                  <p className="text-xl font-bold text-[hsl(var(--primary))]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-[hsl(var(--muted-foreground))]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Quick stack mini-cards — shown only when no metrics */}
          {(!system.metrics || system.metrics.length === 0) && (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {system.highlights && (
                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                    Key highlights
                  </p>
                  <ul className="mt-3 space-y-2">
                    {system.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs text-[hsl(var(--foreground))]"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--state-success))]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4">
                <div className="flex items-center gap-1.5">
                  <Monitor className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                    Primary stack
                  </p>
                </div>
                <p className="mt-2 text-sm font-medium text-[hsl(var(--foreground))]">
                  {system.architecture.frontend}
                </p>
                <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                  {system.architecture.backend}
                </p>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4">
                <div className="flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-[#47A248]" />
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                    Data layer
                  </p>
                </div>
                <p className="mt-2 text-sm font-medium text-[hsl(var(--foreground))]">
                  {system.architecture.database}
                </p>
              </div>
            </div>
          )}

          {/* Highlights row — shown below metrics when metrics exist */}
          {system.metrics && system.metrics.length > 0 && system.highlights && (
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4 md:col-span-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                  Key highlights
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                  {system.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-xs text-[hsl(var(--foreground))]"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--state-success))]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4">
                <div className="flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-[#47A248]" />
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                    Data layer
                  </p>
                </div>
                <p className="mt-2 text-sm font-medium text-[hsl(var(--foreground))]">
                  {system.architecture.database}
                </p>
                <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                  {system.architecture.backend}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SYSTEM IMAGES ───────────────────────────────────────────────────── */}
      {system.images && system.images.length > 0 && (
        <SystemImageGallery images={system.images} />
      )}

      {/* ── PROBLEM / SOLUTION ───────────────────────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--muted-foreground))]">
            Problem
          </p>
          <p className="mt-3 text-sm leading-[1.85] text-[hsl(var(--muted-foreground))] whitespace-pre-line max-w-3xl">
            {system.problem}
          </p>
        </article>

        <article className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--state-success))]/10 text-[hsl(var(--state-success))]">
            <Wrench className="h-5 w-5" />
          </div>
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--muted-foreground))]">
            Solution
          </p>
          <p className="mt-3 text-sm leading-[1.85] text-[hsl(var(--muted-foreground))] whitespace-pre-line max-w-3xl">
            {system.solution}
          </p>
        </article>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--muted-foreground))]">
          Features
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[hsl(var(--foreground))]">
          Capabilities &amp; System Features
        </h2>

        <div className="mt-6 space-y-6">
          {groupedFeatures.map(({ group, items }) => (
            <div key={group.key}>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/12 text-[hsl(var(--primary))]">
                  {group.icon}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                  {group.label}
                </span>
                <div className="flex-1 border-t border-[hsl(var(--border))]/40" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2.5 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4 text-sm leading-[1.7] text-[hsl(var(--muted-foreground))] transition-all duration-150 hover:-translate-y-0.5 hover:border-[hsl(var(--primary))]/20"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--state-success))]" />
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
        <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--muted-foreground))]">
            Engineering challenges
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[hsl(var(--foreground))]">
            Complex problems solved
          </h2>

          <div className="mt-6 space-y-4">
            {system.engineeringChallenges.map((c, i) => (
              <div
                key={c.title}
                className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-5 transition-all duration-150 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/12 text-xs font-bold text-[hsl(var(--primary))]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-[hsl(var(--foreground))]">
                    {c.title}
                  </h3>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-red-400">
                      Problem
                    </p>
                    <p className="text-sm leading-[1.75] text-[hsl(var(--muted-foreground))]">
                      {c.problem}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[hsl(var(--state-success))]/15 bg-[hsl(var(--state-success))]/5 p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--state-success))]">
                      Solution
                    </p>
                    <p className="text-sm leading-[1.75] text-[hsl(var(--muted-foreground))]">
                      {c.solution}
                    </p>
                  </div>
                </div>

                {c.impact && (
                  <div className="mt-3 flex items-start gap-2 rounded-xl border border-[hsl(var(--primary))]/15 bg-[hsl(var(--primary))]/5 px-4 py-3">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--primary))]" />
                    <p className="text-sm leading-[1.75] text-[hsl(var(--muted-foreground))]">
                      <span className="font-semibold text-[hsl(var(--primary))]">
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
        <article className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--primary))]/14 text-[hsl(var(--primary))]">
              <Layers3 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--muted-foreground))]">
                Architecture
              </p>
              <h2 className="mt-0.5 text-2xl font-bold text-[hsl(var(--foreground))]">
                System structure
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {archEntries.map((item) => {
              const meta = archLayerMeta[item.label] ?? {
                icon: <Layers3 className="h-4 w-4" />,
                accent: "hsl(var(--accent-cool))",
              };
              return (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-4 transition-all duration-150 hover:-translate-y-0.5"
                  style={{ borderLeft: `2px solid ${meta.accent}` }}
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
                    <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-[hsl(var(--foreground))]">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--muted-foreground))]">
            Technologies
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[hsl(var(--foreground))]">
            Tooling used
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {system.technologies.map((technology) => (
              <TechChip key={technology} name={technology} size="md" />
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[hsl(var(--primary))]/20 bg-[linear-gradient(135deg,hsla(227,68%,55%,0.14),transparent_42%),hsl(var(--card))] p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/14 text-[hsl(var(--primary))]">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-[hsl(var(--foreground))]">
                  Need something similar built?
                </h3>
                <p className="mt-2 text-sm leading-[1.75] text-[hsl(var(--muted-foreground))]">
                  Describe your system — the workflow, the users, the
                  constraints. I'll respond with what it would take to build it
                  properly.
                </p>
                <AppLink
                  href="/contact"
                  tabTitle="Contact"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-bold text-[hsl(var(--primary-foreground))] shadow-md shadow-[hsl(var(--accent-cool))]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[hsl(var(--accent-cool))]/35"
                >
                  Send your project brief
                  <ArrowRight className="h-3.5 w-3.5" />
                </AppLink>
              </div>
            </div>
          </div>
        </article>
      </section>
    </RevealContainer>
  );
}
