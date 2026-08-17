# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: non-technical business owners and clients on Upwork/freelance channels, evaluating Huzaifa via a pasted portfolio or case-study link before replying to a proposal or hiring. They skim on desktop or phone, often cold, deciding "can I trust this person with my system?"

Secondary: technical evaluators (CTOs, agency leads, recruiters) assessing engineering depth. When priorities conflict, the non-technical client wins.

## Product Purpose

Personal portfolio for Huzaifa Ahmed (full-stack MERN/PERN developer, Pakistan, UTC+5). Success order:

1. **Trust artifact for proposals (primary):** visitor trusts Huzaifa enough to reply on Upwork/DM. Case-study pages are pasted directly into proposals — each must stand alone.
2. **Form conversion (secondary):** visitor uses the contact form / "Start a project" CTA.

## Positioning

"I build systems, not just features" — production-grade business systems (CRMs, inventory platforms, real-time infrastructure) with backend architecture thinking plus frontend delivery. Proof is real shipped work with real numbers, not claims.

## Operating Context

- Site URL is dropped into every Upwork proposal as the main trust signal (no Upwork reviews yet).
- Matching case-study links are pasted per job (SaaS job → CRM or inventory system page).
- Cold clients open shared links on phones — case-study pages must load fast and read well on mobile.

## Capabilities and Constraints

- Next.js 16 App Router, TypeScript, Tailwind v4, shadcn/Radix, GSAP, React Three Fiber, Resend contact email. Deployed on Vercel.
- Routes: home, about, experience, services, systems (list + [slug] case studies), how-i-build-systems, contact.
- Four real case studies: CRM Platform (real estate), Inventory & Spending Control, Live Messaging System, Article Publishing Platform. Additional proof projects (Khidmat AI agentic pipeline, flight booking backend) exist in `About-me (updated).md` but have no site pages yet.
- Redesign in progress ("Precision Dark"): visual authority lives in `docs/redesign/` (01-audit → 04-progress) plus real copy in `docs/redesign/content-brief.md`.

## Brand Commitments

- Name/identity fixed: **Huzaifa Ahmed**, handle **0xHuzaifa**, domain **0xhuzaifa.com**, GitHub/LinkedIn under same handle.
- Voice: human, direct, no corporate fluff, no filler phrases — same register as the proposal tone in `About-me (updated).md`.
- Headshots: `public/Profile.png` and `public/no-bg-profile.png` are the intended profile photo assets.

## Evidence on Hand

- Real metrics, all traceable to shipped work: 36,000+ emails/hour campaign engine, 8,000+ product inventory system, AI assistant in production CRM, 7-agent agentic pipeline, full deal-lifecycle module, promoted intern→full-time in 6 months.
- Full experience/project record: `About-me (updated).md`. Per-page copy: `docs/redesign/content-brief.md`.
- **Absences that must never be fabricated:** no client testimonials, no client logos with permission, no Upwork reviews, no press. Do not invent any of these.

## Product Principles

1. Every claim traces to real shipped work — numbers over adjectives, never fabricate proof.
2. Case-study pages are standalone sales artifacts — each must work as a cold first impression.
3. Non-technical readability first; technical depth available but never required to understand the value.
4. Fast on a cold phone — a pasted link opened on mobile data is the real first-load scenario.
5. The craft of the site itself is a proof point — it demonstrates the quality clients are buying.

## Accessibility & Inclusion

`prefers-reduced-motion` honored throughout (static fallbacks for 3D/GSAP scenes); low-power/mobile devices get reduced or static variants. Baseline WCAG contrast on the dark theme.
