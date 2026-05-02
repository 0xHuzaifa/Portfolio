// ─── NOTE: image imports are preserved as-is from your original file ──────────
// import crmMain from "..."; etc. — keep your existing image imports above this.

import crmMain from "@/assets/crm-system/main.png";
import crm1 from "@/assets/crm-system/1.png";
import crm2 from "@/assets/crm-system/2.png";
import crm3 from "@/assets/crm-system/3.png";
import inventoryMain from "@/assets/inventory-system/main.png";
import realtimeMain from "@/assets/chat-system/main.png";
import realtime1 from "@/assets/chat-system/1.png";
import realtime2 from "@/assets/chat-system/2.png";
import realtime3 from "@/assets/chat-system/3.png";
import articleMain from "@/assets/article-platform/main.png";
import article1 from "@/assets/article-platform/1.png";
import article2 from "@/assets/article-platform/2.png";
import article3 from "@/assets/article-platform/3.png";

import type { StaticImageData } from "next/image";

export interface SystemMetric {
  value: string;
  label: string;
}

export type SystemType = "Personal Project" | "Professional Experience";

export interface System {
  slug: string;
  title: string;
  category: string;
  type: SystemType;
  systemType?: string;
  role?: string;
  shortDescription: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    auth?: string;
    realtime?: string;
    jobs?: string;
    infrastructure?: string;
    storage?: string;
    tenancy?: string;
    media?: string;
    ai?: string;
  };
  technologies: string[];
  contributions?: string[];
  images?: (string | StaticImageData)[];
  engineeringChallenges?: {
    title: string;
    problem: string;
    solution: string;
    impact?: string;
  }[];
  scalability?: string[];
  highlights: string[];
  impact?: string[];
  metrics?: SystemMetric[];
}

export const systems: System[] = [
  // ─── CRM SYSTEM ────────────────────────────────────────────────────────────
  {
    slug: "crm-system",
    title:
      "CRM Platform for Real Estate Teams — Automated Follow-Ups, Email Campaigns & Live Chat",
    category: "Business System",
    type: "Professional Experience",
    systemType:
      "Client management platform with email automation and real-time communication",
    role: "Full-stack developer — built the login system, email campaign engine, live chat, and multi-agency data separation",

    shortDescription:
      "A fully custom CRM built for real estate agencies. Every agent, lead, and deal lives in one place. Campaigns go out automatically. Clients sign contracts digitally. Realtors can now run the entire platform just by typing what they need — the built-in AI assistant understands plain English and gets it done. And each agency's data stays completely private from every other agency on the platform.",

    metrics: [
      { value: "36,000+", label: "Emails sent per hour, automatically" },
      {
        value: "Zero manual work",
        label: "Campaigns run and retry on their own",
      },
      {
        value: "AI-powered",
        label: "Any CRM task done by typing plain English",
      },
      { value: "No overlap", label: "Each agency sees only their own data" },
      { value: "Multi-agency", label: "One platform, unlimited agencies" },
    ],

    problem:
      "Real estate teams lose deals in the gaps between tools. A follow-up email that never got sent. A contract sitting in someone's inbox. A lead that went cold because nobody noticed.\n\nFor companies running more than one agency or brand, it gets worse — there's no easy way to keep each team's clients and deals separate without building an entirely different system for each one.",

    solution:
      "Built a CRM that keeps everything in one place and automates the repetitive work. Agents manage leads, clients, properties, and transactions from a single dashboard. Email campaigns go out on a schedule without anyone pressing send. Contracts get signed digitally without printing a thing.\n\nThe platform also includes a built-in AI assistant. Realtors, admins, and team members can type anything they need in plain English — 'Send a follow-up to all leads from last week who haven't responded' or 'Create a new client and assign them to Sarah' — and the AI figures out what needs to happen. If any detail is missing, it asks. Once everything looks right, it shows a preview in a popup before doing anything. When confirmed, it carries out the action — respecting each user's role and access level throughout.\n\nEach agency on the platform gets its own private workspace — completely separated from every other agency. One platform runs all of them, cleanly.",

    features: [
      "Separate, private workspace for each agency — data never mixes",
      "Secure login with user roles and access levels",
      "Lead, client, realtor, and property management in one dashboard",
      "Automated email campaigns — scheduled, personalized, and self-managing",
      "Live chat and real-time notifications built in",
      "Digital contract signing — no printing, no scanning",
      "Secure document storage",
      "Transaction tracking from first contact to closed deal",
      "Automatic follow-up system via email",
      "Bulk import for adding hundreds of leads or clients at once",
      "Activity and performance dashboards",
      "AI assistant — type any task in plain English and the system does it",
      "Smart follow-up: AI fills in missing details before acting, then previews the action for confirmation",
      "Role-aware AI — the assistant only performs actions the user is permitted to do",
    ],

    architecture: {
      frontend: "React (Redux, shadcn/ui, Framer Motion)",
      backend: "Node.js (modular APIs, background job processing)",
      database: "MongoDB",
      jobs: "BullMQ + Redis (async email queue)",
      realtime: "Redis pub/sub (chat, notifications, caching)",
      infrastructure: "Docker",
      storage: "AWS S3",
      auth: "JWT (access + refresh tokens)",
      tenancy: "Subdomain-based multi-tenancy",
      ai: "Gemini, Groq, OpenAI via Genkit (natural language intent parsing and CRM action execution)",
    },

    technologies: [
      "React",
      "Redux",
      "Node.js",
      "MongoDB",
      "BullMQ",
      "Redis",
      "AWS S3",
      "JWT",
      "DocuSign",
      "Framer Motion",
      "shadcn/ui",
      "Gemini",
      "Groq",
      "OpenAI",
      "Genkit",
    ],

    contributions: [
      "Built the login and account security system from scratch",
      "Solved a complex technical problem that lets multiple agencies share one platform without their data ever crossing",
      "Built the invite system so agencies can onboard new leads and clients without manual data entry",
      "Built the campaign engine — emails go out on schedule, personalize themselves, and retry automatically if something fails",
      "Connected DocuSign so contracts can be sent and signed without leaving the platform",
      "Built the live chat and notification system",
      "Turned design mockups into the finished, working product interface",
      "Built the AI assistant layer — natural language intent parsing, missing field collection, action preview, and role-safe execution across all CRM actions",
    ],

    images: [crmMain, crm1, crm2, crm3],

    engineeringChallenges: [
      {
        title: "Keeping Every Agency's Data Completely Private",
        problem:
          "The platform hosts multiple agencies at once. One agency's clients, leads, and deals must be completely invisible to every other agency — always. This can't be something that's just filtered or hidden behind a setting. It has to be structurally impossible for data to cross between agencies.",
        solution:
          "Built the platform so each agency lives in its own isolated environment with its own web address. The separation isn't a filter — it's built into the foundation of how the system works. Solving this during development required some creative problem-solving, since the standard local testing setup doesn't support this kind of structure.",
        impact:
          "Every agency on the platform can be confident their client data is private. New agencies can be added instantly — no risk of data crossing over, and nothing needs to be rebuilt.",
      },
      {
        title: "Sending Thousands of Emails Without Slowing Anything Down",
        problem:
          "When an agency launches an email campaign, it might need to send hundreds or thousands of emails — each personalized, each going to the right person, none duplicated. Doing this the obvious way would slow or freeze the whole platform while emails were being sent.",
        solution:
          "Built a separate background system that handles all email sending on its own, completely disconnected from the main platform. It sends up to 10 emails per second, automatically retries if something fails, and makes sure no one ever gets the same campaign email twice.",
        impact:
          "Agencies can send large campaigns without the platform slowing down at all. Emails go out reliably, failures fix themselves, and nothing needs manual attention.",
      },
      {
        title:
          "An AI Assistant That Understands What You Mean — Not Just What You Type",
        problem:
          "Realtors don't think in menus and forms. They think in tasks: 'Follow up with the leads I haven't heard from this week' or 'Start a campaign for everyone who looked at the downtown listings.' The challenge was building something that understands that kind of natural, unstructured language — figures out exactly what action is needed, asks for anything missing, and then does it safely without guessing or skipping steps.",
        solution:
          "Built an AI layer that sits on top of the entire CRM. A realtor types what they need in plain English. The AI reads the intent, maps it to the right CRM action, and checks whether all the required information is there. If anything is missing, it asks — in plain English, not a form. Once everything is in order, it shows a clear preview in a popup before touching any data. When the user confirms, it performs the action — and only the actions that user's role allows.",
        impact:
          "Realtors who used to navigate through multiple screens and forms to complete a task can now just describe what they need. The AI handles the rest — accurately, safely, and only after the user has seen exactly what's about to happen. New team members get productive faster, and experienced realtors save time on tasks they've done hundreds of times.",
      },
    ],

    scalability: [
      "Email campaigns run in the background — sending 36,000+ emails per hour without affecting platform speed",
      "New agencies can be added to the platform instantly — no rebuilding, no reconfiguring",
      "Chat and notifications run on their own layer — real-time features don't slow down anything else",
      "New features can be added to the CRM without touching what's already working",
      "Each agency controls its own email sending — no shared limits, no bottlenecks",
      "AI assistant connects to all existing CRM actions — new action types can be added to its capabilities without reworking the intent layer",
    ],

    highlights: [
      "Automated campaigns send 36,000+ emails per hour — no manual work required",
      "Full data privacy between agencies — built into the structure, not bolted on as a setting",
      "Live chat and notifications without slowing the platform down",
      "AI assistant lets realtors run any CRM task in plain English — with a confirmation preview before anything happens",
    ],

    impact: [
      "Agencies run email campaigns at scale with zero manual sending — the system handles scheduling, personalization, and retries",
      "Multiple agencies share one platform with complete data separation — no per-agency deployments, no data risk",
      "The platform stays fast and responsive no matter how many emails are going out in the background",
      "Realtors complete tasks in seconds by typing what they need — no menus, no forms, no training required to get things done",
    ],
  },

  // ─── INVENTORY SYSTEM ──────────────────────────────────────────────────────
  {
    slug: "inventory-system",
    title:
      "Inventory & Spending Control Platform — Automatic Rules for Teams and Departments",
    category: "Business System",
    type: "Professional Experience",
    role: "Full-stack developer — built the access rules engine, portal setup workflow, and bulk product tools",

    shortDescription:
      "A product distribution platform where companies decide exactly who can order what — and how much they can spend. The rules apply automatically. No admin has to check, approve, or chase anything manually.",

    metrics: [
      { value: "8,000+", label: "Products managed across the platform" },
      {
        value: "3 levels",
        label: "Spending rules by category, subcategory, or individual item",
      },
      {
        value: "Per-group limits",
        label: "Every team gets its own budget and product access",
      },
      {
        value: "Automatic",
        label: "Rules enforce themselves — no manual admin work",
      },
    ],

    problem:
      "When a company shares products or a budget across multiple teams, someone always takes more than their share. Other teams get less than they need. Managers spend time policing what should be automatic.\n\nThe harder version: different teams need different rules. One department gets a higher budget. Another can only order from certain categories. These rules have to work at the same time, for every team, without anyone managing them day to day.",

    solution:
      "Built a platform where the company sets the rules once — which teams can order which products, and how much they can spend — and the system enforces everything from that point on. No team can exceed their limit. No team can see products they're not allowed to order. Nothing crosses between groups.\n\nVendors can set up multiple portals, each with its own rules and product catalog. Spending limits can apply broadly across a category or drill down to a specific item. When the business wants to change the rules, they update them in the platform — not in a database.",

    features: [
      "Multiple portals — each vendor or department gets its own configured environment",
      "Spending limits by team, category, subcategory, or individual product",
      "Each team only sees the products they're allowed to order",
      "Automatic enforcement — limits apply without any admin involvement",
      "Approval workflows — set orders to require sign-off, or allow open access",
      "Flexible budget resets — monthly, yearly, or based on joining date",
      "Required add-ons auto-bundle with products at checkout",
      "Bulk product upload and editing for large catalogs",
      "CSV import and external data connections",
      "Draft and publish — test a portal before going live",
    ],

    architecture: {
      frontend: "React (TypeScript, complex multi-step form handling)",
      backend: "Node.js + Express (TypeScript)",
      database: "MongoDB",
    },

    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "REST API",
    ],

    contributions: [
      "Built the multi-step portal setup flow that lets vendors configure access rules without needing technical help",
      "Built the spending rules engine — limits apply at category, subcategory, and product level simultaneously",
      "Developed bulk product editing tools for managing large catalogs efficiently",
      "Built the frontend architecture so complex rule configurations stay manageable as the product grows",
      "Worked on data import integrations for CSV and external product feeds",
    ],

    images: [inventoryMain],

    engineeringChallenges: [
      {
        title: "Spending Rules That Work at Three Levels at Once",
        problem:
          "A team might have an overall budget for a category, a smaller sub-budget within it, and a specific limit on one particular item. All three need to apply at the same time — and when a team hits a lower limit, it should automatically fall back to the next level up. One team's spending can never affect another team's budget.",
        solution:
          "Built the rules engine so all three levels check in order — specific item first, then subcategory, then overall category — with automatic fallback built in. Every team's budget is completely isolated. One team's orders have no path to affect another's limit.",
        impact:
          "8,000+ products now enforce spending rules automatically. What used to require manual admin oversight now runs on its own. Changing or adding a rule type doesn't require touching the product database.",
      },
      {
        title: "Teams Only Ever See What They're Allowed to Order",
        problem:
          "If a team can see a product they're not allowed to order, trust is already broken — even if the order eventually gets blocked. Access control can't just be a warning at checkout. It has to happen before the product ever appears on screen.",
        solution:
          "Built the product display so it filters based on the team's access rules before anything reaches the screen. The configuration interface also only shows valid options when vendors are setting up rules — so invalid setups can't be created in the first place.",
        impact:
          "Teams only see products available to them. Vendors configure with confidence. No accidental access, no cleanup needed after rollout.",
      },
      {
        title: "Required Add-Ons That Don't Throw Off the Budget",
        problem:
          "Some products must include a mandatory accessory — it can't be ordered without it. But if the accessory counts against the team's spending limit, people hit their budget faster than expected and the numbers stop making sense to anyone looking at reports.",
        solution:
          "Built add-ons so they automatically bundle with the main product at checkout, but are excluded from the spending limit calculation. The budget tracks what the business actually cares about — the main product — not the system-required extras.",
        impact:
          "Orders include required items automatically. Budget numbers stay accurate and trustworthy. No one hits their limit unexpectedly because of a system-required attachment.",
      },
      {
        title: "Changing the Rules Without Calling a Developer",
        problem:
          "Business rules change. A team gets a bigger budget. A new product category gets added. If every rule change requires a technical database update, the business is always waiting on a developer to make simple adjustments.",
        solution:
          "Built the rules engine so all the logic lives in the application layer, not the database. Changing a rule means updating the platform — not running a database operation. The 8,000+ product catalog doesn't need to be touched when business rules change.",
        impact:
          "The business updates spending rules, access levels, and category structures without a developer involved. Changes go live immediately.",
      },
    ],

    highlights: [
      "8,000+ products with automatic spending and access rules per team",
      "Three-level budget enforcement — category, subcategory, and individual product",
      "Business rules update in the platform — no developer needed for rule changes",
    ],

    impact: [
      "Manual admin enforcement of product limits is gone — the platform handles it automatically across 8,000+ products",
      "Every team works within their budget and access permissions without oversight",
      "Business rules change without a development or database cycle",
    ],
  },

  // ─── REAL-TIME COMMUNICATION ───────────────────────────────────────────────
  {
    slug: "realtime-communication",
    title:
      "Live Messaging System — Real-Time Chat with Accurate Status and Message History",
    category: "Infrastructure System",
    type: "Personal Project",

    shortDescription:
      "A live messaging system built to stay accurate when real life gets messy — bad connections, multiple tabs open, users coming and going. Messages don't get lost. Online status is always correct. Nothing requires a page refresh.",

    metrics: [
      { value: "Instant", label: "Messages appear the moment they're sent" },
      {
        value: "No missed messages",
        label: "History loads automatically after reconnecting",
      },
      {
        value: "Always accurate",
        label: "Online status reflects actual connection",
      },
      {
        value: "Multi-tab",
        label: "Works correctly with multiple browser tabs open",
      },
    ],

    problem:
      "Live chat looks easy until users start behaving like real people. Someone's laptop goes to sleep and comes back — but the chat still shows them as online. A user loses their connection for 30 seconds and misses three messages with no way to know. Someone has the app open in two tabs, closes one, and disappears from the active users list even though they're still there.\n\nThese aren't edge cases. They happen constantly, and each one makes the product feel unreliable.",

    solution:
      "Built a messaging system that tracks the full picture — not just whether a message was sent, but whether the user is actually connected, across how many devices, and what they may have missed. When someone reconnects, their missed messages load automatically. When they close one tab out of two, they stay marked as online. The experience stays consistent without anyone needing to refresh.",

    features: [
      "Instant messaging — messages appear the moment they're sent",
      "Accurate online/offline status that updates in real time",
      "Missed messages load automatically when a user reconnects",
      "Typing indicators so users know when someone is responding",
      "Chat rooms for group conversations",
      "Works correctly across multiple browser tabs",
      "Secure — login required to access any conversation",
      "Full message history stored and retrievable",
    ],

    architecture: {
      frontend: "React",
      backend: "Node.js (event-driven WebSocket handling)",
      database: "MongoDB (message persistence and history)",
      realtime: "Socket.io (bidirectional communication with lifecycle events)",
    },

    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],

    images: [realtimeMain, realtime1, realtime2, realtime3],

    engineeringChallenges: [
      {
        title: "Online Status That's Actually Accurate",
        problem:
          "Most chat systems mark you as offline the moment your connection drops — even if you have the app open in another tab. Or they keep you marked as online long after you've left. Users notice both, and neither feels right.",
        solution:
          "Built the system to track every active connection per user individually. A user is only marked offline when every single one of their connections closes — not just one. Status updates the moment that last connection drops, not on a timer.",
        impact:
          "Online indicators are accurate. Users aren't shown as offline when they're still there, and they're not shown as online after they've left. It's a small thing that makes the whole product feel more trustworthy.",
      },
      {
        title: "No Missing Messages After a Dropped Connection",
        problem:
          "If a user loses their internet for 30 seconds and reconnects, they have no idea what they missed. A system that doesn't handle this just shows the chat as it is now — with a silent gap no one warned them about.",
        solution:
          "When a user reconnects, the system automatically figures out what messages arrived while they were gone and loads them in. The chat catches up on its own. No refresh, no manual reload, no visible gap.",
        impact:
          "Users reconnect and see everything — in order, with nothing missing. The experience feels seamless even after a dropped connection.",
      },
    ],

    highlights: [
      "Online status is always accurate — even across multiple open tabs",
      "Missed messages load automatically after reconnecting — no refresh needed",
      "Built to handle real-world connection problems, not just the ideal case",
    ],
  },

  // ─── ARTICLE PLATFORM ──────────────────────────────────────────────────────
  {
    slug: "article-platform",
    title:
      "Article Publishing Platform — Write, Review, Approve, and Publish with Full Team Control",
    category: "SaaS / CMS System",
    type: "Personal Project",

    shortDescription:
      "A content management platform where writers draft, editors review, and admins control what goes live. Everyone has the right level of access — and nothing gets published without going through the right steps.",

    metrics: [
      {
        value: "Role-based",
        label: "Admins and writers with separate permissions",
      },
      {
        value: "Draft→Publish",
        label: "Content goes through review before going live",
      },
      {
        value: "SEO-ready",
        label: "Clean URLs built for search engine visibility",
      },
      {
        value: "Media included",
        label: "Image uploads managed and delivered automatically",
      },
    ],

    problem:
      "Growing content teams outgrow basic blog tools fast. Writers save drafts in one place, editors leave notes somewhere else, and nobody's sure what's actually live. Without a proper workflow, something half-finished ends up published — or a finished piece sits forgotten in a folder.",

    solution:
      "Built a publishing platform where every piece of content follows a clear path: written, reviewed, approved, published. Writers get a proper editor with real formatting tools. Admins can see everything, manage every article, and control who can publish. Images upload and store automatically. Article URLs are clean and built for search engines from day one.",

    features: [
      "Secure login with separate Admin and Writer access levels",
      "Rich text editor — headings, lists, images, links, and formatting",
      "Drafts save automatically — nothing gets lost mid-write",
      "Admin review and approval before anything goes live",
      "Clean, readable article URLs — good for sharing and search engines",
      "Search and filter to find any article instantly",
      "Image upload and management built in",
      "Admin dashboard showing all articles, authors, and status at a glance",
      "Pagination so the platform stays fast with hundreds of articles",
    ],

    architecture: {
      frontend: "React (component-driven UI, rich editor integration)",
      backend: "Node.js + Express (modular REST API structure)",
      database: "MongoDB (schema-based content modeling)",
      auth: "JWT authentication with role-based middleware",
      media: "Cloudinary (image storage, transformation, and delivery)",
    },

    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Lexical Editor",
      "Cloudinary",
      "REST API",
    ],

    images: [articleMain, article1, article2, article3],

    highlights: [
      "Draft-to-publish workflow — nothing goes live without going through the right steps",
      "Separate access levels for writers and admins — everyone sees only what they need",
      "Built-in image management, search, and SEO-ready article URLs",
    ],
  },
];
