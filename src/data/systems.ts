export type System = {
  slug: string;
  title: string;
  category: string;
  type: "Personal Project" | "Professional Experience";

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
  };

  technologies: string[];

  images: string[];
};

export const systems: System[] = [
  {
    slug: "article-platform",
    title: "Article Publishing & Content Management Platform",
    category: "SaaS / CMS System",
    type: "Personal Project",

    shortDescription:
      "A full-stack content management platform that allows users to create, manage, and publish articles through a role-based system with an administrative dashboard.",

    problem:
      "Content creators and teams needed a centralized platform to manage article creation, editing, and publishing workflows.",

    solution:
      "Built a full-stack CMS platform with user authentication, role-based permissions, an administrative dashboard, and a scalable backend API.",

    features: [
      "User authentication and authorization",
      "Role-based access control (Admin / User)",
      "Article creation and editing",
      "Draft and publishing workflow",
      "Administrative dashboard",
      "REST API backend",
    ],

    architecture: {
      frontend: "React",
      backend: "Node.js + Express",
      database: "MongoDB",
      auth: "JWT Authentication",
    },

    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "REST API"],

    images: [
      "/assets/article-platform/dashboard.png",
      "/assets/article-platform/editor.png",
    ],
  },

  {
    slug: "crm-system",
    title: "Customer Relationship Management (CRM) System",
    category: "Business System",
    type: "Professional Experience",

    shortDescription:
      "A business CRM system designed to manage customer interactions, sales pipelines, and business analytics.",

    problem:
      "Businesses needed a centralized system to manage customer relationships, track sales pipelines, and monitor business performance.",

    solution:
      "Contributed to the development of a scalable CRM platform with dashboards, API integrations, and data-driven reporting.",

    features: [
      "Customer management",
      "Sales pipeline tracking",
      "Analytics dashboard",
      "Role-based access control",
      "API integrations",
    ],

    architecture: {
      frontend: "React",
      backend: "Node.js",
      database: "PostgreSQL",
    },

    technologies: ["React", "Node.js", "PostgreSQL", "REST APIs"],

    images: ["/assets/crm-system/dashboard.png"],
  },

  {
    slug: "inventory-system",
    title: "Inventory Management System",
    category: "Business System",
    type: "Professional Experience",

    shortDescription:
      "A system designed to help businesses track inventory, manage stock levels, and generate reports.",

    problem:
      "Businesses needed an efficient way to monitor inventory levels and manage product data across operations.",

    solution:
      "Contributed to building an inventory management platform with tracking, reporting, and dashboard features.",

    features: [
      "Inventory tracking",
      "Product management",
      "Stock level monitoring",
      "Analytics dashboard",
      "Reporting tools",
    ],

    architecture: {
      frontend: "React",
      backend: "Node.js",
      database: "PostgreSQL",
    },

    technologies: ["React", "Node.js", "PostgreSQL", "REST APIs"],

    images: ["/assets/inventory-system/dashboard.png"],
  },

  {
    slug: "realtime-communication",
    title: "Real-Time Communication System",
    category: "Infrastructure System",
    type: "Personal Project",

    shortDescription:
      "A real-time communication platform enabling instant messaging between users using WebSocket technology.",

    problem:
      "Teams and users require real-time communication systems that allow instant message delivery and presence tracking.",

    solution:
      "Built a real-time messaging system using WebSockets to support instant communication and user presence tracking.",

    features: [
      "Real-time messaging",
      "User presence tracking",
      "Instant message delivery",
      "Authentication system",
    ],

    architecture: {
      frontend: "React",
      backend: "Node.js",
      database: "MongoDB",
      realtime: "Socket.io",
    },

    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],

    images: ["/assets/chat-system/chat-ui.png"],
  },
];
