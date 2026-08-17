/**
 * Content for the /about page.
 *
 * Only the material that has no home elsewhere lives here. Experience, the tech
 * stack, specialties and the build phases are read from their existing modules
 * (`experience.ts`, `techStack.ts`, `portfolio/profile.ts`, `portfolio/process.ts`)
 * so the page and the AI retrieval layer never drift apart.
 */

/** A fact set bare in the margin of section 01 — no card, no icon. */
export interface OriginFact {
  label: string;
  value: string;
}

export const originFacts: OriginFact[] = [
  { label: "Based in", value: "Karachi" },
  { label: "Studied", value: "BS IT · SBBU Nawabshah" },
  { label: "Building since", value: "2024" },
];

/** Section 02 — the three claims the rest of the page has to earn. */
export interface CredibilityPoint {
  n: string;
  title: [string, string];
  body: string;
}

export const credibilityPoints: CredibilityPoint[] = [
  {
    n: "01",
    title: ["Business-aware", "development"],
    body: "I focus on how teams actually work, so the software supports real operations rather than fighting them. Most bugs in business systems are UX decisions, not code errors.",
  },
  {
    n: "02",
    title: ["Architecture", "before code"],
    body: "Data models, permissions and growth paths get mapped on paper first. The decisions that matter most are made in the first hour, not the last sprint.",
  },
  {
    n: "03",
    title: ["Reliable", "under pressure"],
    body: "Backups before every deploy, deadline risks flagged a week early, and ownership when something breaks. Steady communication is part of the build.",
  },
];

/**
 * Section 04 — the two problems that had to be reasoned out rather than looked
 * up. This is the most convincing material on the page, which is why it gets a
 * pinned screen of its own instead of a paragraph near the bottom.
 */
export interface CaseNote {
  n: string;
  context: string;
  title: string;
  body: string;
}

export const caseNotes: CaseNote[] = [
  {
    n: "01",
    context: "Multi-tenant CRM · Solvevare",
    title: "Campaign automation engine",
    body: "The first background job system I architected from scratch. Scheduling, custom intervals, per-user SMTP configs, retry logic and failure tracking — with one hard constraint: never send the same person the same campaign twice.",
  },
  {
    n: "02",
    context: "Inventory platform · Solvevare",
    title: "Hierarchical allotment engine",
    body: "Allocation rules cascading from category to subcategory to individual product, across user groups and individuals. Deducting one person's limit could not affect anyone else's. No good tutorials exist for this — the logic came from first principles.",
  },
];

/**
 * Section 08 — the questions that come up in almost every first conversation.
 *
 * Every answer traces to something already true elsewhere in the repo or in
 * `docs/About-me (updated).md`. Nothing here claims a capability that is not
 * evidenced somewhere else.
 *
 * The hourly figure in that doc ($10–15, flagged "building Upwork profile") is
 * deliberately NOT published here: it is an Upwork-specific rate and would
 * anchor low with the clients this page is written for. Pricing is answered by
 * scope instead.
 */
export interface Faq {
  n: string;
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    n: "01",
    question: "What does a project cost?",
    answer:
      "It depends on scope, and I would rather scope it properly than quote blind. I prefer fixed-price work with clear deliverables so you know what you are paying for before anything starts.",
  },
  {
    n: "02",
    question: "Are you available right now?",
    answer:
      "Yes — taking on selected projects for Q4 2026. I keep the number deliberately small so the ones I do take get proper attention.",
  },
  {
    n: "03",
    question: "How quickly do you reply?",
    answer:
      "Within 24 hours, usually sooner. I am based in Karachi (PKT), which overlaps a full working morning with Europe and the early hours with the US East Coast.",
  },
  {
    n: "04",
    question: "Existing codebase or new build?",
    answer:
      "Both. A good deal of my work has been picking up live production systems — an e-commerce platform, a multi-tenant CRM — and extending them without breaking what already ships.",
  },
  {
    n: "05",
    question: "You use AI tools. Does that cost quality?",
    answer:
      "No — I use Cursor, Claude and Copilot to move faster on the parts that are typing, not the parts that are thinking. Architecture, data modelling and edge cases are still worked out on paper first.",
  },
  {
    n: "06",
    question: "Is what I send you confidential?",
    answer:
      "Yes. Ideas, workflows and documents stay between us, and I am happy to sign an NDA before you share anything you would rather protect.",
  },
];
