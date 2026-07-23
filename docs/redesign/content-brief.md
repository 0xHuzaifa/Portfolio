# Content Brief — real copy for design mockups

For Claude Design generation. Real content only, no lorem ipsum. Source: current site data files.

## Hero

Availability pill: "Available for new builds"

H1: "I build business software that your team will actually use."

Subline: "Full-stack developer specialising in SaaS platforms, CRMs, and internal tools — systems designed around real workflows, not just technical requirements."

CTA primary: "Start a project" — CTA secondary: "See the work"

Bio line (next to photo): "Huzaifa Ahmed — Full-stack developer with hands-on experience building production CRMs, inventory systems, and SaaS platforms for real clients."

## Capability cards (3)

1. **Business-first systems** — "Dashboards, CRM platforms, inventory tools, and client portals designed around real workflows."
2. **Scalable architecture** — "Frontend, backend, data, and deployment choices shaped for maintainability from day one."
3. **Reliable delivery** — "Clear communication, thoughtful UX, and production-ready implementation across the full stack."

## Systems grid (4 real projects)

1. **CRM Platform for Real Estate Teams** — Business System — "Automated Follow-Ups, Email Campaigns & Live Chat"
2. **Inventory & Spending Control Platform** — Business System — "Automatic Rules for Teams and Departments"
3. **Live Messaging System** — Infrastructure System — "Real-Time Chat with Accurate Status and Message History"
4. **Article Publishing Platform** — SaaS / CMS System — "Write, Review, Approve, and Publish with Full Team Control"

## Case study section — CRM Platform (use this one in full)

**Title:** CRM Platform for Real Estate Teams — Automated Follow-Ups, Email Campaigns & Live Chat

**Role:** Full-stack developer — built the login system, email campaign engine, live chat, and multi-agency data separation

**Description:** A fully custom CRM built for real estate agencies. Every agent, lead, and deal lives in one place. Campaigns go out automatically. Clients sign contracts digitally. Realtors can now run the entire platform just by typing what they need — the built-in AI assistant understands plain English and gets it done. And each agency's data stays completely private from every other agency on the platform.

**Metrics (use as stat callouts):**
- 36,000+ — Emails sent per hour, automatically
- Zero manual work — Campaigns run and retry on their own
- AI-powered — Any CRM task done by typing plain English
- No overlap — Each agency sees only their own data
- Multi-agency — One platform, unlimited agencies

**Key highlights (pick 3-4 for card layout):**
- Separate, private workspace for each agency — data never mixes
- Automated email campaigns — scheduled, personalized, and self-managing
- AI assistant — type any task in plain English and the system does it
- Digital contract signing — no printing, no scanning

**Stack:** React, Redux, Node.js, MongoDB, BullMQ, Redis, AWS S3, JWT, DocuSign, Gemini, Groq, OpenAI, Genkit

**Architecture (for schematic/diagram motif):**
- Frontend: React (Redux, shadcn/ui, Framer Motion)
- Backend: Node.js (modular APIs, background job processing)
- Database: MongoDB
- Jobs: BullMQ + Redis (async email queue)
- Realtime: Redis pub/sub (chat, notifications, caching)
- Auth: JWT (access + refresh tokens)
- Tenancy: Subdomain-based multi-tenancy
- AI: Gemini, Groq, OpenAI via Genkit
