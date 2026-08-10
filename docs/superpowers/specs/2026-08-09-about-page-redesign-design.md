# /about redesign — design

**Date:** 2026-08-09
**Status:** approved, in implementation

## Problem

`/about` was never touched by the redesign. It still runs on the pre-redesign
tokens — blue `--primary`, `--card`/`--border`, a `max-w-6xl` centred column —
so it looks like a different site from the homepage. Its strongest material (the
two hardest-problems case notes, and the "50,000 selected from 300,000+"
credential) is buried at the bottom in small type.

Separately, `/experience` is no longer reachable: the redesigned `SiteHeader`
carries only HOME / ABOUT ME / PROJECTS / LET'S TALK. The route survives only in
the legacy `routes.ts` explorer list and links from old pages.

## Scope

`/about` becomes the full personal page: everything about the person, including
the experience history absorbed from `/experience`, the tech stack, and a new
FAQ. `/experience` is redirected here.

## Constraints

Follow the interior-page pattern already established by the in-flight `/systems`
redesign in `src/components/projects/` — do not invent a second pattern.

- Shared canvas from `src/components/portfolio/stage.ts`: `stageStyle`, `scale`,
  `sectionClass`, `stageClass`. Every section is 1620x875 design units wide at
  the same `--s` as every other section on the site.
- All geometry as reference pixels: `lg:left-[calc(60*var(--s))]`.
- Below `lg` the canvas is abandoned and every section reflows to a plain stack.
- Palette: `--beige-1/2/3`, `--ink-1/2/3`, the single `--yellow` accent. No
  second accent colour.
- `.glass-card` from `globals.css` where a panel is needed.
- Hook classes prefixed `ab-` for the animation layer.

## Structure

Nine sections. Four pin with scrubbed GSAP sequences; five scroll at canvas
width. The split is by reading behaviour, not by importance: **content people
read gets pinned, content people scan does not.** Nobody wants a scrubbed
timeline holding their job history hostage while they skim it.

| # | Section | Behaviour | Content |
|---|---------|-----------|---------|
| 01 | Who I am | pinned | Portrait, origin narrative, three credentials |
| 02 | How I work | pinned | Three credibility points as ruled columns |
| 03 | Experience | scrolls | Three roles, absorbed from `/experience` |
| 04 | The hardest things I've built | pinned | Two annotated case notes |
| 05 | Skills & stack | scrolls | 14 technologies, four category rows |
| 06 | Focus & principles | scrolls | Four specialties + four build phases |
| 07 | How I think · where I'm going | pinned | Pull quote, chess, ownership goal |
| 08 | Questions people actually ask | scrolls | Six-question FAQ (new) |
| 09 | Close | pinned | CTA, matching the homepage's final section |

Total ≈ 28 viewport-heights.

## Visual direction

**Editorial spread.** Type carries the page: oversized confident headlines on
beige, rules rather than boxes, generous negative space, credentials set bare in
the margin instead of in cards.

Chosen over a "dossier" and a "chessboard" direction on one test — which idea
still works when the content becomes a job timeline and a wall of tech chips.
Editorial absorbs both without inventing anything new; the chessboard becomes a
cage and duplicates a grid already used by How I Think on the homepage.

**Section 04 deliberately breaks the rule.** It is the only section using the
dossier's annotated-card treatment, because that content is the page's strongest
and benefits from looking like evidence rather than prose.

## Portrait

Reuse `/no-bg-profile.png` — the same cut-out used by the homepage Hero and
About section. Consistent identity sitewide, and its transparent background
drops onto beige with nothing to fight.

Differentiation comes from composition, not from swapping the photo: on `/about`
it is large, cropped tight, and bleeds off the left edge of the canvas as a
plate — nothing like the floating treatment in the Hero or the step-into-frame
in the homepage About.

`Profile.png` is the same shot on a blue backdrop; blue is precisely the token
colour the redesign dropped, so it is not used.

## Content decisions

- **Specialties and working principles are merged** into one section (06)
  rather than two thin ones.
- **The FAQ is new** — no FAQ existed anywhere in the codebase. Every answer
  traces to something already in the repo or `docs/About-me (updated).md`: the
  fixed-price preference, Q1 2027 availability, the 24-hour reply promise, the
  Cursor/Claude/Copilot positioning line, the confidentiality assurance, and the
  ICreativez e-commerce / multi-tenant CRM work. No capabilities are invented.
- **The FAQ renders as plain text, not an accordion.** All six scannable at a
  glance, nothing to click, and every word indexable — FAQ copy hidden behind
  collapsed panels is a common SEO own-goal.
- **The hourly rate is deliberately omitted.** `docs/About-me (updated).md`
  lists $10–15/hr flagged as "building Upwork profile — open to negotiation".
  That is an Upwork-specific rate; publishing it on the portfolio would anchor
  low with exactly the clients this page is written for. The pricing answer is
  scope-based instead.

## Files

```
src/data/about.ts                        credibility points, case notes, FAQ
src/components/about/AboutHero.tsx       01
src/components/about/AboutHowIWork.tsx   02
src/components/about/AboutExperience.tsx 03
src/components/about/AboutCaseNotes.tsx  04
src/components/about/AboutStack.tsx      05
src/components/about/AboutFocus.tsx      06
src/components/about/AboutThinking.tsx   07
src/components/about/AboutFaq.tsx        08
src/components/about/AboutCta.tsx        09
src/components/pages/AboutPageContent.tsx  rewritten to compose the above
src/animations/about-page/*.ts           one module per pinned section
src/app/experience/page.tsx              replaced with a redirect to /about
```

Existing `src/animations/about.ts` belongs to the **homepage** About section and
is untouched; the page's sequences live under `src/animations/about-page/` to
keep the two from being confused.

## Animation

Same recipe as every other sequence on the site, documented in
`src/animations/trust.ts` and the homepage modules:

- `gsap.matchMedia` gated on `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`.
- Deterministic start states via `gsap.set(..., { autoAlpha: 0 })` up front, then
  `to()`/`fromTo()` only — a scrubbed timeline records `from()` lazily and would
  otherwise paint content before its phase.
- Timeline with `scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true`,
  `start: "top top"`, `end: "+=NNN%"`.
- A `PHASE` table in unitless percentages as the single tuning surface, and a
  closing hold so the assembled section is seen finished before the pin releases.
- Function-based endpoints for anything measured, so resize re-measures.
- Cleanup returned from `useGSAP` — mandatory, or StrictMode's double-mount
  leaves two pinned triggers fighting over the same elements.
- **No element may have two tweens sharing a property in overlapping windows.**
  This caused the Trust drop bug: two tweens wrote `scale`/`autoAlpha` in
  opposite directions across a 1-unit overlap and the blob strobed.

Scrolling sections (03, 05, 06, 08) use reveal-on-enter, not scrubs.

## Out of scope

- `/services`, `/how-i-build-systems`, `/contact` remain on the old tokens.
- `src/components/projects/**` — owned by a concurrent session.
- The five extra projects listed in `docs/About-me` (Khidmat AI, flight booking,
  messaging, article platform) belong to `/systems`, not here.

## Verification

Typecheck, lint, and render every section in a real browser at 1496x718 —
checking that no absolutely-positioned element overflows the 875-unit canvas,
which the mockups caught twice.
