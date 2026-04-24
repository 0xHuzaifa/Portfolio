// ─── NOTE: image imports are preserved as-is from your original file ──────────
// import crmMain from "..."; etc. — keep your existing image imports above this.

import type { StaticImageData } from "next/image";

export interface SystemMetric {
  value: string;
  label: string;
}

export interface System {
  slug: string;
  title: string;
  category: string;
  type: string;
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
      "Multi-Tenant CRM System with Automation, Campaign Engine & Real-Time Communication",
    category: "Business System",
    type: "Professional Experience",
    systemType: "Multi-tenant CRM with automation and real-time communication",
    role: "Full-stack developer — authentication, campaign engine, real-time features",

    shortDescription:
      "A production CRM platform built for real estate workflows. Multi-tenant architecture keeps each agency's data isolated. A queue-based campaign engine handles high-volume email scheduling. Real-time chat and notifications are built in from day one.",

    metrics: [
      { value: "36,000+", label: "Emails/hour (theoretical throughput)" },
      { value: "10/sec", label: "Campaign worker send rate" },
      { value: "Zero blocking", label: "Async queue — main app unaffected" },
      { value: "Multi-tenant", label: "Workspace + subdomain isolation" },
    ],

    problem:
      "Real estate teams juggle leads, clients, realtors, and transactions across too many disconnected tools — emails get missed, follow-ups fall through, and there's no single place to see where a deal actually stands.\n\nFor agencies running multiple business units, there's also no clean way to keep each team's data separate without building an entirely different system for each one.",

    solution:
      "Built core modules of a scalable CRM with workspace-based multi-tenancy, a queue-driven campaign engine, and real-time communication. Owned authentication flows, campaign automation, and real-time chat — from architecture decisions through to production delivery.\n\nThe campaign engine is built on BullMQ and Redis: jobs are processed asynchronously at up to 10 emails/second per worker, with scheduling, retry logic, and per-user SMTP configuration — without touching the main application thread.",

    features: [
      "Multi-tenant architecture with workspace-based subdomains",
      "Authentication system with access & refresh tokens",
      "Role-based permission system with strict workspace isolation",
      "Lead, client, realtor, and property management modules",
      "Automated and manual email campaign engine with dynamic templates",
      "Real-time chat and notification system",
      "Transaction workflow management with contract handling",
      "Document storage with secure AWS S3 integration",
      "DocuSign integration for digital contract signing",
      "Follow-up system (email, SMS-ready architecture)",
      "Bulk data import for efficient lead and client onboarding",
      "Analytics and activity tracking dashboards",
    ],

    architecture: {
      frontend:
        "React (Redux for complex state management, shadcn UI, Framer Motion)",
      backend: "Node.js (modular APIs, background job processing)",
      database: "MongoDB",
      jobs: "BullMQ (queue-based processing with Redis)",
      realtime: "Redis (ioredis) for chat, notifications, and caching",
      infrastructure: "Docker (Redis container setup)",
      storage: "AWS S3 (encrypted document storage)",
      auth: "Secure authentication with session management",
      tenancy: "Subdomain-based multi-tenancy (workspace isolation)",
    },

    technologies: [
      "React",
      "Redux",
      "Node.js",
      "MongoDB",
      "BullMQ",
      "AWS S3",
      "JWT",
      "DocuSign",
      "Framer Motion",
      "shadcn/ui",
    ],

    contributions: [
      "Designed and implemented authentication system with access/refresh token flow",
      "Solved local multi-tenant subdomain architecture using lvh.me for development",
      "Built invite-based onboarding system for leads and clients",
      "Developed campaign engine with scheduling, tagging, and dynamic template variables",
      "Implemented SMTP-based email sending for user-controlled communication",
      "Integrated DocuSign for contract signing workflows",
      "Worked on real-time chat and notification systems",
      "Developed UI components and converted Figma designs into production-ready interfaces",
    ],

    engineeringChallenges: [
      {
        title: "Subdomain-Based Authentication & Cookie Isolation",
        problem:
          "The application uses a multi-tenant architecture where users log in from a root domain (e.g., abc.com) and are redirected to workspace-specific subdomains (e.g., xyz.abc.com). Authentication tokens stored in cookies were not accessible across subdomains during local development — causing session loss immediately after login.",
        solution:
          "Identified that cookies require a shared domain scope and that localhost does not support subdomain-level testing. Solved this by using lvh.me, which maps to localhost and supports wildcard subdomains — enabling accurate simulation of production multi-tenant cookie behaviour during development without any infrastructure changes.",
        impact:
          "Unblocked the entire multi-tenant development workflow. The same session management pattern now runs cleanly in both development and production without separate auth logic for each environment.",
      },
      {
        title: "Scalable Campaign Processing with Queue Workers",
        problem:
          "Campaigns required scheduled, high-volume email processing with dynamic templates, configurable delays and intervals, and per-user SMTP configurations. Running this synchronously would block the main application and make retries unreliable.",
        solution:
          "Implemented a queue-based architecture using BullMQ with Redis. Workers process scheduled jobs asynchronously at up to 10 emails/second, handle retries on failure, respect per-user SMTP settings, and enforce the constraint that no recipient receives the same campaign twice — all without touching the main request thread.",
        impact:
          "The campaign pipeline can process 30,000+ emails per hour in sustained operation. Failures retry automatically. The main application remains fully responsive regardless of campaign queue depth.",
      },
    ],

    scalability: [
      "Campaign engine uses BullMQ + Redis queue — processes up to 10 emails/sec per worker, ~36,000/hour theoretical throughput",
      "Multi-tenant workspace isolation built into the data model — adding new agencies requires no schema changes",
      "Redis used for both real-time pub/sub and campaign queue — single infrastructure layer handles both concerns",
      "Modular backend API structure allows new CRM modules to be added without touching existing ones",
      "Per-user SMTP configuration distributes email sending load across client-controlled providers",
    ],

    highlights: [
      "Campaign engine: up to 10 emails/sec, ~36,000/hour throughput via BullMQ + Redis",
      "Multi-tenant architecture with workspace + subdomain isolation",
      "Real-time chat and notifications without blocking the main application",
    ],

    impact: [
      "Campaign processing at 10 emails/second — handles hundreds per campaign run, thousands per day without infrastructure changes",
      "Multi-tenant isolation means one platform serves multiple agencies with zero data bleed between workspaces",
      "Async queue architecture keeps the main application responsive regardless of campaign volume",
    ],
  },

  // ─── INVENTORY SYSTEM ──────────────────────────────────────────────────────
  {
    slug: "inventory-system",
    title:
      "Rule-Based Inventory & Allocation System with Multi-Portal Architecture",
    category: "Business System",
    type: "Professional Experience",
    role: "Full-stack developer — allocation logic, complex UI workflows, bulk operations",

    shortDescription:
      "A configurable inventory platform managing 8,000+ products across rule-driven portals. Vendors define exactly which groups can access which products and how much they can spend — the system enforces it automatically across every transaction.",

    metrics: [
      { value: "8,000+", label: "Products in the system" },
      { value: "3 levels", label: "Allotment hierarchy depth" },
      { value: "Multi-portal", label: "Isolated config per vendor" },
      { value: "Runtime", label: "Allocation computed dynamically" },
    ],

    problem:
      "Organizations distributing products across departments or user groups face a control problem: without allocation rules, some users take more than their share while others get nothing. Admins end up manually enforcing limits that should be automatic.\n\nThe harder problem: different groups need different rules — and those rules need to work at category level, subcategory level, and individual product level simultaneously, without one group's usage bleeding into another's.",

    solution:
      "Built a flexible inventory platform where vendors configure portals with group-scoped product visibility and hierarchical allotment rules. The allotment engine — designed at the service layer rather than the schema layer — computes inheritance and fallback behaviour at runtime, which means new rule types can be added without database migrations.\n\nThe system currently manages 8,000+ products, supports multiple configurable portals, and handles user groups of any size with isolated allocation tracking per group.",

    features: [
      "Multi-portal system with isolated configurations per vendor",
      "Dynamic portal creation with multi-step workflow",
      "User grouping and role-based access control per portal",
      "Rule-based product allocation (category, subcategory, product-level)",
      "Allotment system (unit or monetary limits)",
      "Configurable approval workflows (admin approval / open access)",
      "Renewal logic (monthly, yearly, custom, joining date-based)",
      "Bulk product management and editing",
      "CSV-based data import and API-based product ingestion",
      "Pagination for scalable data handling",
      "Draft and publish system for controlled rollout",
    ],

    architecture: {
      frontend: "React (TypeScript, complex multi-step form handling)",
      backend: "Node.js + Express (monolithic architecture, TypeScript)",
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
      "Designed and implemented a complex multi-step portal creation workflow",
      "Handled dynamic state management for rule-based configurations",
      "Built bulk product editing functionality for efficient data operations",
      "Worked on frontend architecture for scalable and reusable form logic",
      "Collaborated on API integrations for CSV and external data ingestion",
    ],

    engineeringChallenges: [
      {
        title: "Hierarchical Allotment System with Inheritance Logic",
        problem:
          "Product limits needed to work at three levels simultaneously — category, subcategory, and individual product — while ensuring that one group's deductions never affect another group's allocation, and that child-level limits fall back to parent limits correctly when exhausted.",
        solution:
          "Designed a parent-child allotment structure where child-level limits (product or subcategory) are consumed first, with automatic fallback to the parent when exhausted. Sibling categories are structurally isolated — deducting from one cannot affect another. The inheritance logic lives entirely at the service layer, not in the schema.",
        impact:
          "The system manages 8,000+ products with allocation rules that previously required manual admin enforcement. Adding a new hierarchy level or rule type requires no schema migration — only a service layer update.",
      },
      {
        title: "Dynamic Product Visibility & Allocation Constraints",
        problem:
          "Users should only see products assigned to their group, while vendors need to configure access and allotments dynamically across multiple hierarchy levels — without invalid assignments being possible.",
        solution:
          "Implemented rule-based filtering that restricts product visibility at query time based on group membership. The allotment configuration UI surfaces only eligible categories and products for a given group, making invalid assignments structurally impossible rather than validated after the fact.",
        impact:
          "Vendors can configure portals with confidence that users will only ever see what they're supposed to see — no accidental over-allocation, no manual access audits required.",
      },
      {
        title: "Mandatory Product Attachments Without Allotment Impact",
        problem:
          "Certain products required mandatory add-ons that must be included in every purchase automatically — but including them in allotment calculations would cause users to exhaust their limits faster than intended.",
        solution:
          "Designed an attachment system where products carry optional or mandatory linked items. Mandatory attachments are included in the transaction record but explicitly excluded from allotment deduction logic — allocation tracking remains accurate regardless of how many attachments are bundled.",
        impact:
          "Purchasing workflows that previously required manual attachment handling now run automatically, without distorting the allocation data that admins rely on.",
      },
      {
        title: "Flexible Allotment Data Modeling with Runtime Computation",
        problem:
          "Supporting multiple hierarchy levels with dynamic rules and inheritance in a rigid schema would make future changes expensive — any new rule type would require a migration across a large product dataset.",
        solution:
          "Designed a unified credit schema where all allotment types (category, subcategory, product) are stored in a single structured array. Relationships and inheritance are computed at the service layer at runtime rather than encoded in the database structure.",
        impact:
          "New allocation rules and hierarchy levels can be introduced with a service layer change only. The 8,000+ product dataset requires no migration when business rules evolve.",
      },
    ],

    highlights: [
      "8,000+ products managed with rule-driven allocation across groups",
      "3-level allotment hierarchy: category → subcategory → product",
      "Runtime allocation computation — new rules need no schema migration",
    ],

    impact: [
      "Manages 8,000+ products across configurable multi-portal architecture",
      "Allotment rules that previously required manual admin enforcement are now fully automatic",
      "Schema-free allocation logic means the business can change distribution rules without a development cycle",
    ],
  },

  // ─── REAL-TIME COMMUNICATION ───────────────────────────────────────────────
  {
    slug: "realtime-communication",
    title: "Real-Time Messaging System with Presence & Session Handling",
    category: "Infrastructure System",
    type: "Personal Project",

    shortDescription:
      "A WebSocket-based messaging system built to handle the reliability problems that basic real-time implementations ignore — presence drift, missed messages on reconnect, and inconsistent state across multiple sessions.",

    metrics: [
      { value: "WebSocket", label: "Bidirectional via Socket.io" },
      { value: "Persistent", label: "Chat history survives reconnects" },
      { value: "Room-based", label: "Scalable multi-channel architecture" },
      { value: "Lifecycle", label: "Full connect/disconnect state handling" },
    ],

    problem:
      "Adding real-time messaging is straightforward until it isn't — users go offline, reconnect, and miss messages; presence indicators show people as online when they've already left; and a single dropped connection can leave the entire chat state inconsistent. These reliability gaps make real-time features feel broken even when the core message delivery works.",

    solution:
      "Built a WebSocket-based system that manages the full connection lifecycle — not just message delivery. Presence state is tied to socket events, not just login state. Reconnection logic restores room subscriptions and fetches missed messages from persisted history. The result is a messaging system that stays consistent whether a user has been connected for an hour or just rejoined after a dropout.",

    features: [
      "Real-time messaging with persistent chat history",
      "User presence tracking (online/offline with sync)",
      "Typing indicators for active conversations",
      "Room-based communication architecture",
      "Reconnection handling for session recovery",
      "Authentication for secure messaging access",
    ],

    architecture: {
      frontend: "React",
      backend: "Node.js (event-driven WebSocket handling)",
      database: "MongoDB (message persistence)",
      realtime: "Socket.io (bidirectional communication)",
    },

    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],

    engineeringChallenges: [
      {
        title: "Reliable Presence & Session Synchronization",
        problem:
          "Maintaining accurate presence state is difficult when users disconnect unexpectedly, open multiple tabs, or experience network instability — naive implementations leave ghost users marked online indefinitely.",
        solution:
          "Implemented presence tracking tied to the full socket connection lifecycle — connect, disconnect, and reconnect events all update presence state atomically. Multiple tabs are handled by tracking socket IDs per user, so a user is only marked offline when all their connections close.",
        impact:
          "Presence indicators reflect actual connection state rather than last-known state — the reliability gap that makes most real-time implementations feel broken is eliminated.",
      },
      {
        title: "Reconnection & Message Consistency",
        problem:
          "Users who disconnect and reconnect miss messages sent during their absence, and naive reconnection leaves the client with a stale view of the chat room.",
        solution:
          "Designed reconnection handling that re-subscribes to rooms on socket restoration and fetches the message delta from persisted MongoDB history since the last known message. The client UI is patched with missed messages without requiring a full page reload.",
        impact:
          "Reconnecting users see a consistent chat history immediately — no missed messages, no manual refresh required.",
      },
    ],

    images: [],

    highlights: [
      "Full connection lifecycle management — not just message delivery",
      "Presence state tied to socket events, not login state",
      "Reconnection restores room state and fetches missed messages",
    ],
  },

  // ─── ARTICLE PLATFORM ──────────────────────────────────────────────────────
  {
    slug: "article-platform",
    title:
      "Full-Stack Article Publishing Platform with Rich Editing & Role Control",
    category: "SaaS / CMS System",
    type: "Personal Project",

    shortDescription:
      "A full-stack CMS demonstrating end-to-end MERN delivery on a content-heavy platform — rich text editing with Meta's Lexical framework, role-based access control, draft-to-publish workflows, and Cloudinary media management.",

    metrics: [
      { value: "Lexical", label: "Meta's editor framework" },
      { value: "RBAC", label: "Admin / User role separation" },
      { value: "Draft→Publish", label: "Full content lifecycle" },
      { value: "SEO slugs", label: "Slug-based article routing" },
    ],

    problem:
      "Growing content teams outgrow basic blog tools quickly — writers need drafts, editors need approval control, and admins need to manage who can publish what. Without structured workflows, content gets published inconsistently and managing contributors becomes manual and error-prone.",

    solution:
      "Built a full-stack CMS covering the complete surface area of a content platform: role-based access (Admin/User), draft-to-publish lifecycle, rich text editing via Meta's Lexical framework, Cloudinary media management, slug-based SEO routing, and an admin moderation dashboard. Built as a personal project to demonstrate MERN stack delivery depth on a non-trivial domain.",

    features: [
      "Secure user authentication and session management",
      "Role-based access control (Admin / User)",
      "Rich text editor with headings, lists, embeds, and formatting",
      "Draft and publishing workflow for content lifecycle",
      "Slug-based routing for SEO-friendly article URLs",
      "Search and filtering for content discovery",
      "Pagination for scalable content loading",
      "Image upload and management via Cloudinary",
      "Admin dashboard to manage and moderate articles",
      "RESTful API architecture for scalability",
    ],

    architecture: {
      frontend: "React (component-driven UI)",
      backend: "Node.js + Express (modular REST API)",
      database: "MongoDB (schema-based modeling)",
      auth: "JWT Authentication",
      media: "Cloudinary (image storage and delivery)",
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

    images: [],

    highlights: [
      "Rich text editing via Meta's Lexical — headings, lists, embeds, formatting",
      "Draft-to-publish content lifecycle with role-based access control",
      "Full MERN stack delivery: auth, media, search, pagination, admin dashboard",
    ],
  },
];
