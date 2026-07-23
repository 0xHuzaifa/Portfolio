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

## ⬜ Phase 1 — Home page (Tier 1 — rich)

Plan (`03-build-plan.md`):
- Rebuild `HomePageContent`: credibility hero (headline + subline + proof strip + single CTA) → systems grid → principles → social proof → approach + tech stack → closing CTA.
- Hero 3D: R3F + drei schematic node/connector scene, GSAP ScrollTrigger `scrub` camera/object motion. Guardrails mandatory: `next/dynamic({ ssr:false })` code-split, mount only in view, static schematic fallback for `prefers-reduced-motion` / `pointer:coarse` / low `hardwareConcurrency`.
- GSAP section reveals (stagger 30–50ms grid cards).
- Copy reused as-is; copy pass is Phase 6.
- Tools: 21st Magic MCP or `stitch-generate-design` for scaffolds, `gsap-react`/`gsap-scrolltrigger` skills.

## ⬜ Phase 2 — Services + Contact (Tier 2 — fast)

- Restyle both in new visual language; form + `/api/contact` wiring untouched.
- GSAP reveals only — no 3D canvas.
- `cro` skill pass on both pages (form friction, CTA placement, fit-check copy).

## ⬜ Phase 3 — About + Experience (Tier 2 — fast)

- Restyle only; content structure stays. GSAP reveals only.
- `frontend-design` polish pass.

## ⬜ Phase 4 — Systems list + case-study pages (Tier 1 — rich; biggest phase)

- `SystemsPageContent`: grid restyle + R3F schematic treatment (object responds to card focus).
- `SystemPageContent` (593 lines): restyle as long-form case study; architecture section carries 3D schematic motif.
- **Per-project OG images:** add `openGraph.images`/`twitter.images` to `generateMetadata` in `src/app/systems/[slug]/page.tsx` from `system.images[0]` — shared links unfurl with real project screenshot.
- `ImageLightbox`/`SystemImageGallery` restyle only, logic untouched.

## ⬜ Phase 5 — How I Build Systems (Tier 2 — fast)

- Smallest page (94 lines). Restyle + GSAP reveals only.

## ⬜ Phase 6 — Cross-cutting polish (last, all pages)

- Copy pass: `copywriting` + `cro` skills across every page.
- Motion pass: consistent GSAP reveal rhythm site-wide.
- UI audit: `web-design-guidelines` review (a11y, touch targets, contrast, responsive).
- SEO check: `sitemap.ts`/`robots.ts`/metadata still match structure.
- Cleanup: delete `--vscode-*` legacy aliases from `globals.css`; drop `react-icons` if `techIcons.tsx` migrated off it (else keep pinned); verify `next-themes` only used by `sonner.tsx`.
- Browser check every page at 375/768/1440.

---

## Out of scope (unchanged from `03-build-plan.md`)

No new pages, no backend/data changes, no Quovative branding, no `scroll-world` anywhere this pass, no 3D on Tier 2 pages ever.
