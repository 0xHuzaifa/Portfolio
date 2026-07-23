# 04 — Implementation Progress Tracker

Working doc. Update after every phase: mark status, write what was actually done (files touched, decisions, deviations from plan). Phases defined in `03-build-plan.md`; design targets in `02-design-direction.md` §5a (page-tier split).

**Status legend:** ✅ complete · 🔨 in progress · ⬜ not started

---

## ✅ Pre-phase — Setup & docs (2026-07-23)

- Branch `redesign` created off `portfolio`.
- Docs revised after failed one-shot "Claude Design" mockup:
  - `02-design-direction.md`: added §5a page-tier split — Tier 1 rich (home hero, `/systems`, `/systems/[slug]`) gets React Three Fiber + GSAP ScrollTrigger scrub; Tier 2 fast (services, contact, about, experience, how-i-build-systems) gets GSAP reveals only, no 3D ever. §7 assistant decision resolved: floating launcher.
  - `03-build-plan.md`: phases annotated with tiers, R3F guardrails (code-split `ssr:false`, mount-in-view, `prefers-reduced-motion` / `pointer:coarse` static fallback), per-project OG image fix spec'd for Phase 4.
- Deps installed: `gsap@3.15`, `three@0.185`, `@react-three/fiber@9`, `@react-three/drei@10`.
- `react-icons` pinned exact `5.5.0` — AWS icon (`SiAmazonwebservices`) removed from simple-icons in 5.6+, `techIcons.tsx` needs it.
- 21st.dev Magic MCP moved to user scope (`~/.claude.json`) — available for component generation.

## ✅ Phase 0 — Foundation: new shell, kill IDE chrome (2026-07-23, commit `c44a547`)

**Done:**
- `globals.css` rewritten: new token set — bg `#050810`-family HSL vars (`--surface-*`, `--text*`, `--accent-cool` cobalt / `--accent-warm` amber pair, `--state-*`), radius `0.875rem`, shadcn-compatible semantic mappings, `.font-data` utility (Geist Mono). 4-theme switcher (`data-theme` ocean/sunset/forest) deleted.
  - **Legacy aliases kept**: `--vscode-*` vars alias to new tokens — 22 page files still reference them; delete aliases after Phases 1–5 rewrite each page.
- New shell components:
  - `src/components/layout/SiteHeader.tsx` — sticky blur nav: logo, Work/Services/Process/About/Experience links, "Start a project" CTA, mobile disclosure menu, active-route styling via `usePathname`.
  - `src/components/layout/SiteFooter.tsx` — copyright, footer nav, GitHub/LinkedIn.
  - `src/components/assistant/ChatLauncher.tsx` — floating bottom-right bubble, opens overlay panel wrapping existing `PortfolioChat` (untouched).
- `src/app/layout.tsx`: providers stripped to `TooltipProvider` only; renders `SiteHeader` → `main` → `SiteFooter` → `ChatLauncher` → `Toaster`.
- `AppLink` rewritten as thin `next/link` wrapper, same props (`tabTitle` accepted, ignored) — zero page-file edits needed.
- **Deleted:** `EditorLayout`, `Header` (old), `ActivityBar`, `Sidebar`, `WorkspaceContent`, `AssistantPanel`, `SidebarAvatar`, `SidebarSettings`, `TabBar`, `TabItem`, `NavigationContext`, `TabContext`, `ThemeContext`, `data/systemMap.ts`, `config/routes.ts`.
- Verified: `tsc --noEmit` clean, `next build` clean — all 18 routes generate (incl. 4 SSG system pages).

**Not done in this phase (deliberate):** browser visual check at 375/768/1440 — do at start of Phase 1.

## ✅ Phase 1 — Home page (Tier 1 — rich) (2026-07-23)

**Done:**
- `src/components/three/HeroScene.tsx` — R3F scene: 12-node/18-edge schematic (hub-and-spoke architecture diagram look), cobalt nodes/lines + 2 warm "active" nodes, `meshBasicMaterial` (no lights, cheap), slow deliberate y-rotation via `useFrame`, GSAP ScrollTrigger `scrub` tilts + recedes group over first 700px scroll. `dpr [1,1.75]`, alpha canvas.
- `src/components/three/SchematicVisual.tsx` — gate wrapper: `next/dynamic({ ssr:false })` code-split; starts static, upgrades to 3D only when in view (`IntersectionObserver`, 200px margin) AND not `prefers-reduced-motion` / `pointer:coarse` / `hardwareConcurrency<4`. Static fallback = inline SVG schematic (same motif, low opacity). `aria-hidden`.
- `HomePageContent.tsx` full rewrite: full-width sections (max-w-6xl containers) replacing IDE card-in-card. Hero = availability pill → H1 (tight tracking) → subline → dual CTA → proof strip (3 mono stats: 4 systems, 36K+ emails/hr, 2+ yrs). 3D canvas absolute right 55%, `lg:` only. Capabilities / systems / principles / social proof / approach+stack / CTA sections carried over, restyled to new tokens (`--card`, `--primary`, `--font-data` eyebrows, rounded-2xl).
- Scroll reveals: one `useGSAP` (scope container), `[data-reveal]` elements fade/slide via per-element ScrollTrigger, wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`.
- "See the work" CTA now → `/systems` (was `/systems/crm-system`).
- `@gsap/react` added.
- `FeaturedSystems`/`SocialProof`/`TechChip` child components untouched (render fine via legacy aliases; restyle in later phases).
- Verified: `tsc` clean, biome clean, `next build` clean (18/18 routes), page serves with new markup.

**Deviation:** capability cards' per-card gradient hovers dropped (was novelty); reveal stagger achieved by per-card triggers, not `stagger:` param.

## ✅ Phase 2 — Services + Contact (Tier 2 — fast) (2026-07-23)

**Done:**
- Shared components extracted first: `src/components/motion/RevealContainer.tsx` (client wrapper — `[data-reveal]` descendants fade/slide in via GSAP ScrollTrigger, no-op under reduced motion) and `src/components/ui/eyebrow.tsx`. `HomePageContent` refactored onto both (inline hook/Eyebrow deleted, back to server-compatible component without own GSAP imports).
- `ServicesPageContent`: full rewrite in new language — full-width sections replacing IDE cards, all content/data arrays byte-identical. Hero (no card, no 3D — Tier 2), service cards, differentiators, engagement + fit 2-col, phases strip. `data-reveal` on cards/sections.
- `ContactPageContent`: restyle only — form logic, `/api/contact` wiring, validation, submitted state all untouched. Input classes deduped into one `inputClasses` const. Hero flattened, form + sidebar cards in new tokens.
- Verified: tsc clean, biome clean, build 18/18, both pages screenshot-checked at 1440px in browser.

**Not done:** `cro` skill pass — deferred to Phase 6 copy/conversion pass (both pages get it there anyway; avoids two copy passes).

## ✅ Phase 3 — About + Experience (Tier 2 — fast) (2026-07-23)

**Done:**
- Mechanical token migration on both pages (sed): `--vscode-*` → new semantic tokens, `rounded-[26/30px]` → `rounded-2xl`, old cyan/amber gradient hsla values → new cool/warm pair. Zero `vscode` references remain in either file.
- Both wrapped in `RevealContainer` with own `max-w-6xl` container (old EditorLayout container gone).
- Content, structure, and card-grid layouts untouched — restyle only, per plan.
- Verified: tsc clean, build 18/18, both screenshot-checked at 1440px.

**Deviation:** kept the card-based hero layout on these two pages (vs. full-bleed hero on home/services/contact) — works fine visually, avoids unneeded rewrite. `frontend-design` polish deferred to Phase 6 UI audit.

## ✅ Phase 4 — Systems list + case-study pages (Tier 1 — rich) (2026-07-23)

**Done:**
- Token migration (sed) on `SystemsPageContent`, `SystemPageContent`, plus `FeaturedSystems` + `SocialProof` (home children picked up as bonus — legacy aliases no longer needed by them). Zero `vscode` refs remain in any of the four.
- Both pages wrapped in `RevealContainer` + own `max-w-6xl` container.
- `SystemPageContent` hero now carries the 3D schematic: `SchematicVisual` absolute right 40%, opacity-60, `lg:` only, clipped by hero's `overflow-hidden` — same component as home hero (code-split bundle shared, all fallback gates inherited).
- **Per-project OG/Twitter images shipped**: `generateMetadata` in `src/app/systems/[slug]/page.tsx` now emits `openGraph.images` + `twitter.images` (`summary_large_image`) from `system.images[0]` with real width/height from `StaticImageData`. Verified in served HTML: `og:image` resolves to the project's actual screenshot.
- Verified: tsc clean, build 18/18, `/systems` + `/systems/crm-system` screenshot-checked.

**Deviations:**
- Skipped bespoke "3D object responds to card focus" interaction on the list page — reused the same hero schematic on detail pages instead; interaction idea parked as possible Phase 6 polish. // ponytail: revisit only if the static treatment feels flat in real use
- 7 pre-existing biome lint findings in these files (`useButtonType`, `noImgElement`, `noExplicitAny`) left untouched — present before this phase, queued for Phase 6 UI audit.

## ✅ Phase 5 — How I Build Systems (Tier 2 — fast) (2026-07-23)

**Done:** token migration (sed) + `RevealContainer` wrapper + `max-w-6xl` container. Content untouched. tsc clean, build 18/18, screenshot-checked.

## 🔨 Phase 6 — Cross-cutting polish (in progress, 2026-07-23)

**Done so far:**
- Cleanup (commit `f212231`): last 3 legacy-token files migrated (`PortfolioChat`, `SystemImageGallery`, `techIcons`); `--vscode-*` aliases deleted from `globals.css` — zero vscode refs repo-wide. `react-icons` stays (pinned 5.5.0, `techIcons` brand icons). `next-themes` only in `sonner.tsx` — fine.
- Lint (commit `301f8bd`): 4× `useButtonType` fixed, `imageMap` typed `StaticImageData`, systems-grid `<img>` → `next/image` with `fill`/`sizes`. All 7 previously-flagged findings resolved.
- SEO check: `sitemap.ts` already lists all static routes + per-system routes — matches new structure, no change. `robots.ts` untouched.
- All phases' builds verified: tsc clean, biome clean on touched files, `next build` 18/18 routes.

**Remaining:**
- Copy pass: `copywriting` + `cro` skills across pages (incl. deferred Phase 2 cro pass on services/contact).
- Motion rhythm consistency review site-wide.
- UI audit: `web-design-guidelines` (a11y, touch targets, contrast).
- Browser check at 375/768 (1440 done per page during phases; 375 check was interrupted by a wedged automation browser — retry).

---

## Out of scope (unchanged from `03-build-plan.md`)

No new pages, no backend/data changes, no Quovative branding, no `scroll-world` anywhere this pass, no 3D on Tier 2 pages ever.
