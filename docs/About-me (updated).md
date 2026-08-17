# **Huzaifa Ahmed — Upwork Profile**

**Handle:** 0xHuzaifa **Title:** Full-Stack Developer (MERN/PERN) — SaaS, Dashboards, MVPs, AI Integration **Website:** https://www.0xhuzaifa.com **GitHub:** https://github.com/0xHuzaifa **LinkedIn:** https://www.linkedin.com/in/0xhuzaifa **Education:** Bachelor's in Information Technology

---

## **Identity & Positioning**

I build production-grade web systems — not prototypes. My focus is complex backends, clean APIs, and frontend that ships. I work fast with AI tools (Cursor, Claude, Copilot) without cutting corners on architecture.

No fluff. I come in, understand the problem, and build it right.

---

## **Core Skills & Stack**

**Languages:** TypeScript, JavaScript **Frontend:** React, Next.js, Redux, shadcn/ui, Framer Motion, Tailwind **Mobile:** React Native **Backend:** Node.js, Express **Databases:** MongoDB, PostgreSQL **Infra & DevOps:** Docker, AWS S3, Redis, BullMQ **Realtime:** Socket.io, Redis pub/sub **Auth:** JWT, session management, multi-tenant auth flows **APIs:** REST **Integrations:** DocuSign, Cloudinary, SMTP, Stripe (built and used in production) **Testing:** Playwright (E2E / UI test automation) **Tools & Collaboration:** Git, Jira, Monday.com **AI Integration:** Gemini, Groq, OpenAI, Genkit, LangGraph (natural language intent parsing, multi-agent orchestration, AI-powered features in production) **AI Dev Tools:** Claude, Cursor, GitHub Copilot (vibe coding — fast delivery)

*Note: NestJS and Supabase removed — not used in real project work, only general familiarity. GraphQL removed — not actually implemented in any project.*

---

## **Experience**

### **Full-Stack Developer — Solvevare *(July 2025 – Present)***

Software agency building SaaS and business systems for real estate and operations clients.

* Architected a campaign engine that processes 10 emails/sec (\~30,000+/hour) using BullMQ \+ Redis — with scheduling, retry logic, per-user SMTP, and zero impact on the main app thread  
* Built a multi-tenant CRM for real estate: workspace-isolated tenancy, DocuSign e-signing, real-time chat, automated follow-up pipelines — all in production  
* Designed and built a full deal/transaction management module — multi-step deal creation, multi-party negotiation, and role-scoped visibility across agents, partners, and clients  
* Wrote unit and integration tests covering the natural-language action parser and backend execution layer, catching multi-action parsing edge cases  
* Set up Playwright end-to-end test automation covering core CRM workflows  
* Contributed to Stripe billing integration for paid workspace access (shared with a teammate)  
* Engineered a rule-based inventory system managing 8,000+ products across multi-portal architecture with hierarchical allotment logic (category → subcategory → product level)  
* Designed REST APIs; managed AWS deployments with Docker containerisation; coordinated work via Jira and Monday.com

  ### **MERN Stack Developer — ICreativez Technologies *(Oct 2024 – Jul 2025, 9 months)***

Award-winning global IT firm (201–500 people) — clients across North America, Europe & Asia.

* Promoted from intern to full-time in 6 months based on delivery, not tenure  
* Built and shipped product pages, checkout flows, filtering, and admin dashboard for a live e-commerce platform  
* Fixed performance bottlenecks in product listing views — image handling and rendering issues at scale  
* Converted Figma designs to production-ready interfaces; integrated REST APIs with third-party providers

  ### **Research Intern — HBL Center for Blockchain & Applied Research *(Aug 2024, 1 month)***

Research arm of Pakistan's largest commercial bank, conducted at GIKI.

* Researched smart contract use cases for banking workflows  
* Built proof-of-concept apps on Ethereum and Hyperledger Fabric  
* Presented findings to engineers and domain researchers  
  ---

  ## **Past Projects (use in proposals)**

  ### **CRM Platform for Real Estate Teams *(Professional — Solvevare)***

**Link:** https://www.0xhuzaifa.com/systems/crm-system **What it does:** Full CRM for real estate agencies — leads, clients, realtors, properties, and deals in one place. Campaigns go out automatically. Contracts get signed digitally. Each agency on the platform gets its own completely private workspace — data never mixes between them. **My role:** Built the auth system, multi-tenant architecture, email campaign engine, DocuSign integration, real-time chat, AI assistant layer, the deal/transaction management module, and the test suite for the AI action parser. Contributed to Stripe billing integration. **AI feature:** Built-in assistant that lets realtors type tasks in plain English ("Follow up with all leads from last week") — the AI parses intent, asks for missing info, shows a confirmation preview, then executes. Role-safe throughout. **Transaction management feature:** Built a full deal lifecycle system on top of the CRM. Agents create a transaction through a guided multi-step flow (property, client, optional deal partners such as agents, lenders, and legal counsel), then move through a structured negotiation stage between all parties before the deal fully opens up. Each transaction has a dedicated workspace covering commission, contracts, mortgage details, workflow, tasks, and notes. External counterparties who aren't on the CRM get a secure, branded portal to review and act on their side of the deal without needing a full account, while role-based visibility keeps client-side, agent-side, and counterparty data properly separated throughout. **Key numbers:** 36,000+ emails/hour, zero manual sending, multi-agency on one platform with zero data bleed, end-to-end deal lifecycle from creation to close. **Stack:** React, Redux, Node.js, MongoDB, BullMQ, Redis, AWS S3, DocuSign, Socket.io, Stripe, Gemini, Groq, OpenAI, Genkit, Playwright

### **Inventory & Spending Control Platform *(Professional — Solvevare)***

**Link:** https://www.0xhuzaifa.com/systems/inventory-system **What it does:** Companies set rules once — which teams can order which products, how much they can spend — and the system enforces it automatically. 8,000+ products across configurable portals. No admin manually policing limits. **My role:** Built the multi-step portal setup workflow, the 3-level spending rules engine (category → subcategory → product), bulk product tools, and data import integrations. **Hard problem solved:** Spending limits work at 3 levels simultaneously with automatic fallback. One team's usage can never bleed into another's. Business rules update in the app — no developer or DB migration needed. **Key numbers:** 8,000+ products, automatic rule enforcement, rule changes need zero schema migration. **Stack:** React, TypeScript, Node.js, Express, MongoDB

### **Live Messaging System *(Personal Project)***

**Link:** https://www.0xhuzaifa.com/systems/realtime-communication **What it does:** Real-time chat that stays accurate when connections drop, users open multiple tabs, or someone goes offline mid-conversation. Messages don't get lost. Status is always correct. Nothing needs a page refresh. **Hard problems solved:** Online status tracks every connection per user — user only goes offline when all tabs close. Reconnect automatically fetches missed messages from MongoDB history and patches the UI silently. **Stack:** React, Node.js, MongoDB, Socket.io, JWT

### **Article Publishing Platform *(Personal Project)***

**Link:** https://www.0xhuzaifa.com/systems/article-platform **What it does:** CMS with a full editorial workflow — writers draft, admins review and approve, nothing goes live without the right steps. Role-based access, rich text editor (Meta's Lexical), Cloudinary media, SEO-friendly URLs, admin dashboard. **Stack:** React, Node.js, Express, MongoDB, JWT, Lexical Editor, Cloudinary

### **Flight Booking Backend *(Freelance Project — client discontinued before launch)***

**What it does:** Backend for a flight booking platform. **My role:** Owned the backend, including full Stripe payment integration with handling for failed payments and automatic refunds. **Note:** Project was discontinued by the client before launch — not live in production, but the backend and payment logic were fully built and working. **Stack:** Node.js, Stripe

### **Khidmat AI — Agentic Service Orchestrator *(Hackathon Project — built with Arfeen)***

**What it does:** End-to-end agentic platform that automates the full lifecycle of informal economy service requests — from natural language input to provider matching, booking, and follow-up. Targets home service providers (plumbers, electricians, AC technicians) who currently operate through WhatsApp and phone calls. Supports code-mixed Urdu, Roman Urdu, and English. **My role:** Co-built the full system with a partner — worked across the agentic pipeline, multi-step LangGraph orchestration, and LLM-as-a-judge layer for provider ranking and decision validation. **Agentic pipeline — 7 agents:**

* Intent Understanding — code-mixed NLU with complexity classification and confidence-driven clarification  
* Provider Discovery — MongoDB $near geo query \+ real Google Geocoding API  
* Provider Ranking — 6-factor weighted scoring with Gemini-generated natural language reasoning  
* Booking Execution — writes confirmed booking, generates receipt with itemised pricing breakdown, fires simulated notifications  
* Provider Agent — two-sided system; simulates accept / reject / negotiate decisions on the provider's behalf  
* Recovery — LangGraph conditional edge that auto-replans when Provider Agent rejects, modelled and exposed as a named agent  
* Follow-Up — reminders, status transitions, completion confirmation, trust score update **Stack:** Next.js (web dashboard \+ backend API), React Native (mobile app), MongoDB, LangGraph, Gemini, Google Geocoding API  
  ---

  ## **Target Jobs**

Primary: SaaS platforms, dashboards, MVP builds, AI-integrated apps, full-stack MERN/PERN projects Also strong for: real-time features, backend architecture, multi-tenant systems, automation/queue systems, agentic AI workflows, complex form/workflow UIs

---

## **Rates**

Hourly: $10–$15 (building Upwork profile — open to negotiation based on scope) Fixed-price: prefer scoped projects with clear deliverables

---

## **Proposal Tone & Style**

* Human, direct, no corporate fluff  
* Lead with understanding of their problem — not a CV dump  
* Short paragraphs, tight sentences  
* List what I'll build specifically — not generic capabilities  
* Solution-first, credentials second  
* No filler phrases ("I am excited to", "I would love to", "passionate about")  
* End with a clear next step or question — not "looking forward to hearing from you"  
  ---

  ## **Upwork Flag Criteria (for bid decisions)**

**Green — bid confidently:**

* SaaS, dashboard, MVP, full-stack MERN/PERN  
* Real-time features, queue systems, multi-tenant architecture  
* Node.js backend, React frontend, TypeScript  
* AI feature integration (OpenAI, Gemini, Groq, Genkit, LangGraph, LLM-powered workflows)  
* Automation, workflow builders, campaign/notification systems  
* Agentic AI systems, multi-agent orchestration  
* Client has clear requirements or detailed job post  
* Budget matches scope (not $50 for a full platform)

**Yellow — bid carefully:**

* Vague job description with no clear scope  
* First-time Upwork client with no history  
* Budget seems low but project could be small  
* Skills partially match (e.g. Vue instead of React — mention I can adapt)  
* Wants "rockstar developer for everything" — clarify scope first

**Red — skip:**

* PHP, Laravel, WordPress, or legacy stack  
* No budget listed \+ vague scope \+ new client \= likely time sink  
* Wants someone to "just fix a bug" for $5–10  
* Job post has unrealistic expectations ("build Amazon in 2 weeks")  
  ---

  ## **Personal Notes for Proposals**

* No Upwork reviews yet — address proactively: lead with professional experience, link to portfolio  
* **Always drop the website:** https://www.0xhuzaifa.com — it's the strongest trust signal without reviews  
* Link relevant project page when the job matches (e.g. SaaS job → link CRM or inventory system page)  
* Strongest angle: I build systems, not just features — backend thinking with frontend delivery  
* Real proof points: 36,000 emails/hour, 8,000+ product system, AI assistant in production CRM, promoted in 6 months, 7-agent agentic pipeline built end-to-end at hackathon, full Stripe payment integration (flight booking backend), full deal/transaction lifecycle system with multi-party negotiation and role-scoped access  
* Built AI features in production — not just hobby projects (Gemini/Groq/OpenAI via Genkit, natural language → CRM action execution)  
* Built full agentic orchestration system — LangGraph, multi-agent pipelines, LLM-as-a-judge, real geo APIs  
* Can work with AI tools to deliver faster — strong selling point for MVPs  
* Timezone: Pakistan (PKT, UTC+5) — good overlap with European morning and US evening clients  
* Education: Bachelor's in Information Technology from Shaheed Benazir Bhutto University, Shaheed Benazirabad (Nawabshah), 2019 \- 2022  
* 

