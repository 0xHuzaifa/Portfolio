# 03 — Build Plan

References: `01-design-audit.md` (current state), `02-design-direction.md` (target style/palette/typography).

## Working approach

- **Branch:** do this on a dedicated branch (e.g. `redesign`) off `portfolio`, not directly on `portfolio` — this touches every page's shell and layout; keeping the live branch stable while this is in progress is worth the branch overhead. Merge phase-by-phase once each is checked in a real browser, not all at once at the end.
- **Incremental, not big-bang:** ship the new shell + home page first, verify it actually reads better than the current site before touching every other page.
- **Data layer untouched:** `data/*`, `lib/contact/*`, `lib/ai/*`, email templates, `sitemap.ts`/`robots.ts` are not touched except where a page rewrite needs new fields.
- **Test in browser at each phase** (via the `run` skill / dev server) at 375px, 768px, 1440px — not just a code read.

## Phase 0 — Foundation (do first, blocks everything else)

- New design tokens in `globals.css`: near-black palette + cool/warm accent pair from `02-design-direction.md`, radius `12–16px`, remove the 4-theme switcher (`data-theme` variants) and `SidebarSettings` theme picker
- New top-level shell to replace `EditorLayout`: standard header/nav (logo, nav links, CTA button) + footer, no sidebar/activity-bar/tab-bar
- AI assistant becomes a floating launcher (bottom-right bubble, opens an overlay) — decided, see `02-design-direction.md` §7
- Install new deps for the 3D/motion stack (§5a of the direction doc): `three`, `@react-three/fiber`, `@react-three/drei`; confirm `gsap` presence/version in `package.json` and add if missing
- Tools: `ui-ux-pro-max` (`--stack` / `--domain ux` for nav/header patterns), `frontend-design` skill for the header/footer aesthetic pass, `shadcn-ui` skill if new primitives are needed (e.g. `sheet`/`dialog` for mobile nav or the chat launcher)
- Remove: `ActivityBar.tsx`, `Sidebar.tsx`, `TabBar.tsx`, `TabItem.tsx`, `WorkspaceContent.tsx`, `SidebarAvatar.tsx`, `SidebarSettings.tsx`, `NavigationContext`/`TabContext` (or fold into a much simpler nav-active-state hook), `react-icons/vsc` dependency
- Keep: `Header.tsx` gets rewritten (not deleted) into the new nav bar

## Phase 1 — Home page (Tier 1 — rich)

- Rebuild `HomePageContent` inside the new shell: credibility hero (headline + subline + proof strip + single CTA) → systems grid → principles → social proof → approach + tech stack → closing CTA
- Hero carries the Tier 1 3D treatment (§5a of direction doc): React Three Fiber + drei scene rendering the schematic node/connector signature as a live 3D object, camera/object motion scrubbed to scroll via GSAP `ScrollTrigger`. Code-split via `next/dynamic({ ssr: false })`, canvas mounts only in view, `prefers-reduced-motion`/`pointer: coarse`/low `hardwareConcurrency` fallback to the static schematic image — all required, not optional
- Reuse existing copy/content wholesale first pass; copy pass comes in Phase 6
- Tools: `21st.dev Magic` MCP (`/ui` for hero/card component scaffolds, now configured at user scope) or `stitch-generate-design` as an alternative component-generation path, `gsap-scrolltrigger` for section reveals, `hyperframes-animation`'s Three.js runtime notes as a reference for R3F patterns (not for rendering — this is a live component, not an exported video)

## Phase 2 — Services + Contact (Tier 2 — fast; highest conversion value, per career-path memory)

- `ServicesPageContent`: keep existing structure (offer cards, engagement differentiators, process, fit-check) in the new visual language
- `ContactPageContent`: keep the form + `/api/contact` wiring untouched; only restyle
- GSAP `ScrollTrigger` fade/slide-up reveals only — no 3D canvas on these pages (§5a of direction doc)
- Tools: `cro` skill — explicit conversion pass on these two pages specifically (form friction, CTA placement, fit-check copy)

## Phase 3 — About + Experience (Tier 2 — fast)

- Restyle only; content structure from the audit already works
- GSAP `ScrollTrigger` reveals only, same as Phase 2 — no 3D
- Tools: `frontend-design` for visual polish pass

## Phase 4 — Systems (list + case-study detail) — Tier 1, largest page, budget the most time

- `SystemsPageContent`: grid restyle, carries the same R3F + GSAP `ScrollTrigger` treatment as the home hero (§5a) — the schematic 3D object responds to which project card is in focus
- `SystemPageContent` (593 lines, the big one): keep the highlights/stack/challenges/architecture/gallery structure, restyle as a long-form case-study page instead of an "open file" pane; architecture section is a natural fit for the 3D schematic motif since it's already a diagram
- **Per-project OG/Twitter-card images:** `generateMetadata` in `src/app/systems/[slug]/page.tsx` currently omits `openGraph.images`, so shared links fall back to the site-wide `/full-logo-with-bg.png`. Fix: add `openGraph.images`/`twitter.images` sourced from each project's existing `system.images[0]` (already imported `StaticImageData` per system in `data/systems.ts`, no new asset work needed) so a pasted case-study link actually unfurls with that project's real screenshot in Upwork/Slack/WhatsApp/LinkedIn
- Tools: `ui-ux-pro-max --domain landing "case-study"` if a more specific case-study section pattern is needed, `ImageLightbox`/`SystemImageGallery` restyle only (logic untouched)

## Phase 5 — How I Build Systems (Tier 2 — fast)

- Smallest page (94 lines) — restyle only, GSAP reveals only, no 3D

## Phase 6 — Cross-cutting polish pass (do last, across all pages)

- **Copy pass:** `copywriting` skill on headlines/CTAs, `cro` skill for a final conversion audit across every page (not just services/contact)
- **Motion pass:** consistent GSAP scroll-reveal rhythm across all sections (`gsap-core`/`gsap-react`/`gsap-scrolltrigger`)
- **UI audit:** `web-design-guidelines` skill — run this as a review pass against the finished pages (accessibility, touch targets, contrast, responsive)
- **SEO check:** confirm `sitemap.ts`/`robots.ts`/metadata still match the new page structure (should be unaffected, but verify)
- **Dependency cleanup:** remove `react-icons` (vsc icons) if nothing else uses it after the IDE chrome is gone; confirm `next-themes`/`ThemeContext` usage post theme-switcher removal

## Explicitly out of scope for this redesign

- No new pages/sections beyond what's in the audit (no speculative "blog," "testimonials wall," etc. unless you ask)
- No backend/data-model changes
- No Quovative agency branding work (per career-path memory, that's lower priority than this portfolio)
- No `scroll-world` treatment anywhere in this pass — reserved for a possible future flex page only (§5a of direction doc); Tier 1's 3D is React Three Fiber + GSAP `ScrollTrigger` scrub, not scroll-jacking
- No 3D/Three.js canvas on Tier 2 pages (services, contact, about, experience, how-i-build-systems) — ever, not just "first pass"

## Before starting Phase 0

Resolved: 21st.dev Magic MCP is now configured at user scope (`~/.claude.json`, available in every project, not just this one) — `/ui` component generation is available starting now, no longer a fallback-only path.
