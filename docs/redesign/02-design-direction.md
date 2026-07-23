# 02 — Design Direction

Informed by: `ui-ux-pro-max` design-system + domain searches (style/color/typography/landing), `frontend-design` principles (avoid templated defaults), and the two reference sites (horizonx.so, webild.io). See `01-design-audit.md` for what this replaces.

**Revision note:** the first draft of this doc picked a single generic indigo accent on near-black — running it back through `frontend-design` flagged that "near-black + one bright accent" is literally one of that skill's three named AI-design clichés. Sections 2, 3, and 5 below are revised to fix that; the signature/distinctiveness reasoning is in §1a.

## 1. Style: "Precision Dark" — refined developer-premium, not developer-novelty

Blend of two `ui-ux-pro-max` matches:
- **Modern Dark Cinema** (deep near-black, indigo accent glow, glassmorphism, ambient motion) — this is the same register as Linear/Vercel/horizonx.so, and it's what "premium developer tool" actually looks like today, as opposed to VS Code chrome which looks like "a developer's actual editor."
- **Trust & Authority + Conversion** landing pattern (credibility hero → proof/stats → solution → clear CTA) — this is the structural pattern for a page whose job is to get a stranger to book a call.

**Explicitly avoid** (from the anti-pattern data, the audit, and the `frontend-design` re-check): Cyberpunk/neon-terminal aesthetics, HUD/sci-fi FUI, heavy scroll-jacked parallax (poor accessibility/performance per the tool's own scoring), AI purple/pink gradient clichés, generic "near-black + one bright accent" minimalism, and — carried over from the audit — the IDE chrome itself.

## 1a. The signature: systems, not decoration

`frontend-design`'s process asks for one real, subject-specific element the page is remembered by — not a generic dark-SaaS look wearing your name. The subject here is concrete: you design and build *systems* (CRMs, inventory platforms, data pipelines), and you already have real architecture diagrams for them (`SystemArchitecture.tsx`). That's the signature, not an invented decoration:

- **Hero/section backgrounds:** thin-line schematic/node-and-connector motifs (the same visual language as a real system architecture diagram — faint, low-opacity, technical) instead of generic blurred gradient blobs. It's on-brand precisely because it's what you actually draw when you plan a build.
- **Section dividers/transitions:** a connector line "draws in" (GSAP path animation) between sections, echoing how a diagram's edges connect nodes — motion that means something, not ambient glow.
- This keeps the "developer" identity the IDE theme was going for, but expressed through your actual craft (systems thinking) instead of a literal editor costume.

## 2. Color

Keep dark as the only mode (light mode not required — commit to one register well). Fix from the revision note: don't collapse to one generic accent. Keep the *structure* the current site already has right — a cool primary + a warm secondary — just retune both hues away from cyan-terminal:

| Role | Hex | Notes |
|---|---|---|
| Background | `#050810` | near-black, slight blue-black temperature (not pure #000) |
| Surface / card | `#0E1320` | one step up, for cards/panels |
| Surface elevated | `#171d30` | hover/active surfaces, popovers |
| Border | `#242b40` | hairline borders, low-contrast |
| Foreground | `#F4F5F7` | primary text |
| Foreground muted | `#9198A8` | secondary text, labels |
| Primary accent (cool) | `#3E63DD` | a tuned cobalt-blue, not Tailwind's default indigo-500 — CTAs, links, active states, schematic lines |
| Secondary accent (warm) | `#E08A3C` | muted amber — used only for the signature schematic motif's "active node" highlight and sparingly elsewhere, the two-tone pairing is the actual distinctive move here |
| Success | `#34B37A` | availability pill, positive states only — not a dominant color |
| Destructive | `#E5484D` | form errors only |

Reasoning: a single flat accent-on-black is the exact cliché `frontend-design` calls out. A deliberate cool/warm pair (kept from the current site's own instinct, just retuned) reads as an actual system: signal color + highlight color, the way a real architecture diagram uses two colors to distinguish data flow from state. Still kill the 4-hue theme-switcher (cyan/ocean/sunset/forest) — that was novelty, not identity; this two-tone pair replaces it as the one identity the site has.

## 3. Typography

Keep **Geist Sans** for body/UI — already integrated, already distinctive relative to the Inter-everywhere default. But "just Geist because it's there" isn't a deliberate pairing — add **Geist Mono** (same family, already available via `next/font`, zero new dependency) for anything that functions as *data*: eyebrow labels, stat numbers, tech-stack chips, architecture diagram annotations. This isn't decoration — it's the same instinct as a real systems diagram using monospace for field names/types. Sans carries the human-facing copy; mono carries anything that's structurally "data." Reserve Satoshi/General Sans or pure Inter (from the `ui-ux-pro-max` pairings) only as a fallback if this pairing doesn't hold up in practice — don't swap speculatively.

Type scale discipline (tighten vs. current ad-hoc sizes):
- Display/Hero H1: 44–56px, weight 700, tight tracking (-0.02em)
- H2 (section): 28–32px, weight 600
- H3 (card title): 18–20px, weight 600
- Body: 16px, weight 400, line-height 1.6–1.7
- Label/eyebrow: 11px, weight 500, uppercase, tracking +0.2em (keep — this pattern already works well in the current site)

## 4. Layout patterns

- **Full-width sections**, not a fixed IDE workspace column. Max-width container `~1200–1280px` for text-heavy sections, full-bleed for hero backgrounds/visuals.
- **Home hero**: credibility-first per Trust & Authority pattern — headline + subline + proof strip (client logos or "systems shipped" stats) + single dominant CTA, no sidebar/tab chrome competing for attention.
- **Bento/card grids** for capability cards, systems grid, tech stack — already directionally present in the current homepage (capability cards, systems grid); keep the card language, drop the "floating panel inside an IDE" framing.
- **Case study (system detail) pages**: keep the existing content shape (highlights → stack → challenges solved → architecture → gallery) from the audit — it's already close to right — but present it as a standalone long-form page, not an "open file in an editor" pane.
- Radius: dial back from `rounded-[26px]–[30px]` to **12–16px** — the current bulbous radius reads soft/toy-like; premium dark-SaaS sites use tighter corners.
- Glassmorphism used sparingly: sticky nav only (backdrop-blur + subtle border), not on every card — avoid the "blur everything" trap.

## 5. Motion

`gsap-core` / `gsap-react` / `gsap-scrolltrigger` skills are now installed — use them instead of the current single CSS `fade-up` keyframe:
- Scroll-triggered fade/slide-up reveals on section entry (stagger 30–50ms per card in a grid) — used on **every** page, see §5a for which pages also get 3D
- Signature motion (§1a): schematic connector-lines draw in via GSAP `DrawSVGPlugin`/stroke-dashoffset on scroll, not ambient gradient blobs — keep opacity/weight low (0.08–0.18 equivalent) so it never competes with text. On Tier 1 pages (§5a) this motif is realized as an actual 3D object, not just an SVG line drawing.
- Respect `prefers-reduced-motion` throughout (already a project convention to establish, not previously present)
- **Correction from the first pass of this doc:** the anti-pattern to avoid is scroll-*jacking* specifically — hijacking native scroll to drive a fixed camera/story. Scroll-*triggered* reveals and GSAP `scrub`-linked animation (motion tied to normal scroll position, native scroll behavior untouched) are fine everywhere, including Tier 2 pages. What's actually restricted to Tier 1 is 3D canvas weight (a mounted Three.js scene), not motion in general — see §5a for the reasoning and the exact split.

## 5a. 3D & motion architecture — the page-tier split

Revisited 2026-07-23 after the first "Claude Design" mockup pass came back visually flat (no 3D, no scroll animation, single static page) — root cause was that a one-shot design-mockup generation never touches the actual skill/tooling stack below; this section is what the real implementation uses instead.

The site is split into two motion tiers by page *function*, not applied uniformly:

**Tier 1 — Rich (home hero, `/systems` list, `/systems/[slug]` case studies).** These are the pages meant to impress: the hero is the first-five-seconds "this person builds impressive things" moment, and the case-study pages are what get pasted directly into Upwork messages/DMs — a project page that feels like a crafted product experience is itself a proof point. Stack:
- **React Three Fiber + drei** for the live, interactive 3D — a real WebGL scene rendering the schematic node/connector signature from §1a as an actual 3D object (not a flat SVG motif), rather than a pre-rendered video asset. Chosen over `hyperframes`' motion-graphics workflow because that tool renders finished video deliverables (paused timeline, seek-safe, meant to be exported), not live interactive site components — R3F is the standard approach for 3D that runs natively inside a Next.js/React page.
- **GSAP `ScrollTrigger` with `scrub`** drives camera position / object rotation / connector-draw progress off normal scroll position — premium, connected-feeling motion without hijacking scroll or breaking the browser's native scroll behavior or accessibility.
- Performance/accessibility guardrails, all required, none optional: the R3F/Three.js bundle is code-split (`next/dynamic` with `ssr: false`) so it's never shipped to Tier 2 pages at all; the canvas only mounts once scrolled into view (`IntersectionObserver`); `prefers-reduced-motion` gets a static fallback (the flat schematic SVG/image, no canvas mounted at all); `pointer: coarse` / low `navigator.hardwareConcurrency` gets either the same static fallback or a reduced-complexity scene (fewer nodes, no post-processing) — a cold client opening a shared project link on their phone must still get a fast, readable page.

**Tier 2 — Fast (services, contact, about, experience, how-i-build-systems).** No 3D canvas, ever — these pages' only job is converting a cold visitor into a booked call, and every extra KB of WebGL between the visitor and the contact form is pure conversion risk, not a feature. They still get full GSAP `ScrollTrigger` fade/slide-up reveals (§5, unchanged) — restrained doesn't mean static, it means no 3D weight.

`scroll-world` remains reserved for a possible future portfolio-flex page only (unchanged from the original call in §5) — it is not part of this build; Tier 1's 3D is delivered via R3F + GSAP as described above.

## 6. What carries over unchanged

Per the audit: all data files, the contact form + email pipeline, the AI chat backend, sitemap/robots, and the case-study content structure carry over as-is. This is a visual/layout redesign, not a content or backend rewrite.

## 7. AI assistant panel — decided

Resolved 2026-07-23: option (a) from the original open decision — collapse the Copilot-style chat into a floating launcher (bottom-right bubble, opens an overlay), available site-wide. Keeps the differentiator without the docked IDE-panel framing. Defaulting to this since no objection was raised; revisit if it turns out to compete with the Tier 1 pages' 3D/motion budget in practice.
