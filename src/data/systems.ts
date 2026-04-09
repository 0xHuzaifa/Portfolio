export type System = {
  slug: string;
  title: string;
  category: string;
  type: "Personal Project" | "Professional Experience";
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
    media?: string;
    jobs?: string;
    infrastructure?: string;
    storage?: string;
    tenancy?: string;
  };

  contributions?: string[];

  technologies: string[];

  images: string[];

  engineeringChallenges?: {
    title: string;
    problem: string;
    solution: string;
    impact?: string;
  }[];

  impact?: string[];

  scalability?: string[];

  highlights?: string[];
};

export const systems: System[] = [
  {
    slug: "article-platform",
    title:
      "Full-Stack Article Publishing Platform with Rich Editing & Role Control",
    category: "SaaS / CMS System",
    type: "Personal Project",

    shortDescription:
      "A feature-rich MERN stack platform enabling structured article publishing with role-based access, rich text editing, and scalable content workflows.",

    problem:
      "Basic blogging systems fail to support structured workflows, multi-user collaboration, and content lifecycle management, making them unsuitable for growing platforms or teams.",

    solution:
      "Developed a full-stack CMS platform with role-based access control, a modular REST API, and a rich text editing experience using Lexical. The system enables users to create, manage, and publish content efficiently, while giving administrators control over platform content.",

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

    images: [
      "/assets/article-platform/dashboard.png",
      "/assets/article-platform/editor.png",
    ],

    highlights: [
      "Rich text editing with structured content workflows",
      "Role-based content management system",
      "Scalable content handling with search and pagination",
    ],
  },

  {
    slug: "crm-system",
    title:
      "Multi-Tenant CRM System with Automation, Campaign Engine & Real-Time Communication",
    category: "Business System",
    type: "Professional Experience",
    systemType: "Multi-tenant CRM with automation and real-time communication",
    role: "Full-stack developer (focused on authentication, campaign systems, and real-time features)",

    shortDescription:
      "A complex, multi-tenant CRM platform built for real estate workflows, featuring campaign automation, real-time communication, and workspace-based architecture.",

    problem:
      "Real estate businesses require more than basic CRMs — they need multi-tenant systems, automated follow-ups, contract workflows, and centralized communication to manage leads, clients, and transactions efficiently.",

    solution:
      "Contributed to the development of a scalable CRM platform with multi-tenant architecture (workspace + subdomain-based isolation), automation pipelines, and real-time features. Focused on building core modules, authentication flows, and campaign automation systems.",

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

    images: [],

    engineeringChallenges: [
      {
        title: "Subdomain-Based Authentication & Cookie Isolation",
        problem:
          "The application uses a multi-tenant architecture where users log in from a root domain (e.g., abc.com) and are redirected to workspace-specific subdomains (e.g., xyz.abc.com). However, authentication tokens stored in cookies were not accessible across subdomains during local development, causing session loss after login.",

        solution:
          "Identified that cookies require a shared domain scope and that localhost does not support subdomain-level testing due to the lack of a dot in the domain. Solved this by using lvh.me, which maps to localhost and supports wildcard subdomains. This enabled proper cookie sharing across dynamic subdomains and allowed accurate simulation of production multi-tenant behavior during development.",
      },

      {
        title: "Scalable Campaign Processing with Queue Workers",
        problem:
          "Campaigns required scheduled, high-volume email processing with support for dynamic templates, delays, intervals, and user-specific SMTP configurations. Running this synchronously would block the system and reduce reliability.",

        solution:
          "Implemented a queue-based architecture using BullMQ with Redis to handle campaign execution asynchronously. Designed workers to process scheduled jobs, handle retries, and ensure reliable delivery without blocking the main application.",
      },
    ],

    scalability: [
      "Designed campaign system using queue-based processing (BullMQ + Redis) to handle high-volume email scheduling without blocking the main application",
      "Implemented multi-tenant architecture with workspace isolation to support scaling across multiple business clients",
      "Used Redis (ioredis) for real-time chat and notifications to ensure low-latency communication",
      "Structured backend APIs in a modular way to support future scaling and feature expansion",
      "Integrated external SMTP configurations to distribute email sending load across user-defined providers",
    ],

    highlights: [
      "Multi-tenant architecture with workspace isolation",
      "Campaign automation with queue-based processing",
      "Real-time communication (chat + notifications)",
    ],

    impact: [
      "Enables real estate teams to automate follow-ups and manage leads efficiently",
      "Supports multiple businesses through isolated workspace architecture",
      "Improves communication through real-time messaging and notifications",
    ],
  },

  {
    slug: "inventory-system",
    title:
      "Rule-Based Inventory & Allocation System with Multi-Portal Architecture",
    category: "Business System",
    type: "Professional Experience",
    role: "Full-stack developer (complex UI workflows, allocation logic, and bulk operations)",

    shortDescription:
      "A configurable inventory and allocation platform enabling vendors to create rule-driven portals, manage product distribution, and control purchasing workflows across user groups.",

    problem:
      "Traditional inventory systems fail to handle complex allocation rules, role-based purchasing control, and multi-portal distribution, making them unsuitable for organizations with structured product distribution workflows.",

    solution:
      "Contributed to building a flexible inventory platform that allows vendors to configure custom portals with rule-based product allocation, user grouping, and controlled purchasing flows. Focused on building complex UI workflows and bulk data operations.",

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

    images: [],

    engineeringChallenges: [
      {
        title: "Hierarchical Allotment System with Inheritance Logic",
        problem:
          "The system required a flexible allotment mechanism where product limits could be assigned at multiple levels (category, subcategory, and individual product), while ensuring consistent deduction logic and visibility control across users and groups.",

        solution:
          "Designed a hierarchical credit system where allotments are structured in a parent-child relationship. Implemented logic allowing child-level allotments (e.g., specific products or subcategories) to be consumed first, with automatic fallback to parent-level allotments when limits are exceeded. Ensured that sibling categories remain unaffected, preserving independent allocation boundaries.",

        impact:
          "Enabled highly flexible and scalable product distribution rules, supporting real-world scenarios where organizations need both granular and generalized control over resource allocation.",
      },

      {
        title: "Dynamic Product Visibility & Allocation Constraints",
        problem:
          "Users should only access products assigned to their group or role, while vendors needed the ability to configure product access and allotments dynamically across multiple hierarchy levels.",

        solution:
          "Implemented a rule-based filtering system that dynamically restricts product visibility based on group assignments. Built logic to ensure that only eligible categories and products are available during allotment configuration, reducing invalid assignments and maintaining system consistency.",
      },

      {
        title: "Mandatory Product Attachments Without Allotment Impact",
        problem:
          "Certain products required mandatory add-ons (alterations) that should automatically be included in purchases without affecting the user’s allotment limits.",

        solution:
          "Designed an attachment system where products can have optional or mandatory linked items. Ensured that these attachments are included in transactions while excluding them from allotment deduction logic, maintaining accurate allocation tracking.",
      },

      {
        title: "Flexible Allotment Data Modeling with Runtime Computation",
        problem:
          "The system required a highly flexible allotment structure supporting multiple hierarchy levels (category, subcategory, product) with dynamic rules and inheritance behavior. A rigid schema would limit scalability and make future changes difficult.",

        solution:
          "Designed a unified 'credit' schema where all allotments (categories, subcategories, and products) are stored in a structured array. Instead of hardcoding relationships in the database, implemented the core logic at the service layer to dynamically compute allotment consumption, inheritance, and fallback behavior at runtime.",

        impact:
          "This approach provided high flexibility, allowing new allocation rules and hierarchy levels to be introduced without major schema changes, while keeping the database structure simple and maintainable.",
      },
    ],
  },

  {
    slug: "realtime-communication",
    title: "Real-Time Messaging System with Presence & Session Handling",
    category: "Infrastructure System",
    type: "Personal Project",

    shortDescription:
      "A real-time communication system designed to handle messaging, presence tracking, and connection reliability using WebSocket-based architecture.",

    problem:
      "Real-time systems require more than simple message delivery — they must handle user presence, connection drops, session recovery, and consistent state synchronization across clients.",

    solution:
      "Built a WebSocket-based messaging system that manages real-time communication along with presence tracking, reconnection handling, and persistent message storage. Focused on reliability and state synchronization across multiple users and sessions.",

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
          "Maintaining accurate user presence across connections is difficult due to disconnections, multiple tabs, and network instability.",

        solution:
          "Implemented presence tracking with connection lifecycle handling, ensuring users are marked online/offline correctly and state is synchronized across sessions.",
      },

      {
        title: "Reconnection & Message Consistency",
        problem:
          "Users disconnecting and reconnecting can lead to missed messages and inconsistent chat state.",

        solution:
          "Designed reconnection handling to restore sessions and ensure message continuity using persisted chat history and room-based re-subscription.",
      },
    ],

    images: ["/assets/chat-system/chat-ui.png"],

    highlights: [
      "Real-time messaging with presence synchronization",
      "Connection recovery and session consistency handling",
      "Room-based architecture for scalable communication",
    ],
  },
];
