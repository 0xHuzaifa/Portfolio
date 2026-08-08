# Projects page — design spec

> Date: 2026-08-09
> Route: `/systems`
> Status: approved, static build (animation is a separate pass)

## Purpose

Rebuild `/systems` — the page the header's "PROJECTS" link points at — from the two
reference designs. It is the only remaining high-traffic page still on the pre-redesign
visual language, and it is where a visitor goes after the homepage's `FeaturedProjects`
section has interested them.

The page answers one question: *what has this person actually shipped?*

## Structure

Two sections, deliberately built on different layout models.

```
SystemsPageContent            "use client", owns activeCategory
├── ProjectsHero              stage canvas 1620×875, one screen
│   └── CategoryDeck          5 perspective cards, real buttons
├── ProjectsGrid              normal flow, scrolls
│   ├── ProjectCard × N       batched, 6 at a time
│   └── load more
├── ProjectsCta               "Have a project in mind?"
└── Footer                    reused from components/portfolio
```

Section 1 uses the shared stage canvas (`components/portfolio/stage.ts`) so it sits at
exactly the same width and one-screen height as every homepage section, and so the
animation pass can pin it the way `Capabilities` and `FeaturedProjects` are pinned.

Section 2 deliberately does **not**. A grid that grows with the project list cannot be
fitted to a fixed 1620×875 canvas without either capping how many projects can ever be
shown or breaking on short viewports. It is an ordinary responsive flow section, and the
animation pass will give it reveal-on-scroll rather than a pinned scrub.

New components live in `src/components/projects/`, matching the existing convention:
`portfolio/` holds homepage sections, `systems/` holds detail-page pieces.

## Route

`/systems` is kept. The nav label "PROJECTS" is display wording and already points here;
renaming would cost a redirect, a sitemap change, and a move of `/systems/[slug]` for no
user-visible gain. `SiteFooter` gains `/systems` in its skip list, because the page now
ends with the full `Footer` section the way the homepage does.

## Data

New `src/data/projects.ts` is the source of truth for the grid. It does not derive from
`systems.ts`: card copy is deliberately shorter than a case study's `shortDescription`,
and the display titles differ from the SEO-weighted case-study titles (the homepage's
`FeaturedProjects` already keeps its own short titles for the same reason). `systems.ts`
remains the source of truth for detail pages.

```ts
type ProjectCategory = "SaaS" | "CRM" | "AI" | "CMS" | "IMS";

interface ProjectEntry {
  id: string;
  title: string;                  // "Real Estate CRM"
  categories: ProjectCategory[];  // first is primary, shown lit
  description: string;
  image: StaticImageData;
  caseStudySlug?: string;         // present → "View Case Study" → /systems/[slug]
  liveUrl?: string;               // present → the ↗ badge links out
}
```

Case-study entries and lite entries are the same shape; the only branch in `ProjectCard`
is which footer link it gets. Four real case studies exist today (`crm-system`,
`realtime-communication`, `article-platform`, `inventory-system`). Lite entries are added
as their copy and screenshots arrive — the file carries a commented template showing the
shape, and nothing invented is shipped in the meantime.

### Numbers

Category counts are derived: `projects.filter(p => p.categories.includes(id)).length`,
so a card can never advertise a number that filtering fails to produce. Each category may
carry an optional authored `count` that overrides the derived one — for the case where
the real total spans client work not listed on the page. The override is opt-in and
documented at the definition, so the honest default is the one you get by doing nothing.

The stats strip (80+ delivered, 50K+ users impacted, 8 countries, 99.9% uptime, 100%
commitment) is hand-authored career-wide claim, not derived. Those legitimately cover work
that has no entry on this page.

## Section 1 — hero

Left column: yellow-tick eyebrow, "Systems that create impact." with the accent full stop,
lead paragraph, and the `80+ Projects Delivered` glass card. Right: the category deck.
Full-width stats strip along the bottom. A yellow hairline with lit end-caps runs behind
the deck, tying the two halves of the composition together.

The deck is five glass cards on one perspective scene, receding to the right with
decreasing scale, each carrying icon, label, and count. The active card is lit yellow and
pulled forward. Cards are `<button>` elements with `aria-pressed`, never divs: clicking
one filters the grid and scrolls to it; clicking the active one clears the filter.

Below `lg` the canvas is abandoned (as every stage section does) and the deck flattens
into a horizontal scroll-snap row of the same cards without perspective.

## Section 2 — grid

Two columns at `lg`, one below. Each card: screenshot left, then ghost index number, title,
category pills, description, and "View Case Study →". A yellow ↗ badge sits top-right when
the project has a `liveUrl`.

The card is an `<article>`, not a link. Wrapping it in an anchor would nest the ↗ badge
and the "View Case Study" link inside another anchor — invalid HTML that breaks keyboard
navigation. The title and footer link carry the case-study destination; the badge is a
separate sibling link.

Six cards show initially; "LOAD MORE PROJECTS" reveals the next six and is absent when
everything is already visible. Changing category resets the batch and announces the new
result count through an `aria-live` region. An empty filter result shows a short empty
state with a clear-filter action rather than a blank column.

The CTA band closes the section: yellow calendar badge, "Have a project in mind?", the
sub-line, and the yellow `LET'S TALK` pill to `/contact`.

## Motion

This pass is static. Every element that will animate gets its class handle now — `ph-*`
for the hero, `pg-*` for the grid — so the follow-up is a new `src/animations/projects.ts`
with a `PHASE` table and almost no markup churn.

The repo's rule holds: the server renders the finished state, and GSAP hides-then-reveals
only at `lg` with no reduced-motion preference. A visitor with JS disabled, a narrow
viewport, or reduced motion sees a complete, correct page.

## Verification

The repo has no test framework, so verification is:

- `npx tsc --noEmit`
- `npm run lint` (Biome)
- `npm run build`
- manual pass at 1440 / 1024 / 768 / 390
- reduced-motion pass

## Out of scope

The animation sequence itself, `/systems/[slug]` detail pages, and the other legacy pages
(`/services`, `/experience`, `/contact`, `/how-i-build-systems`, `/about`).
