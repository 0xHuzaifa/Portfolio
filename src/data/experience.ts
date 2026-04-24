export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyContext?: string;
  period: string;
  duration?: string;
  description: string;
  highlights: string[];
  current?: boolean;
  relatedSystems?: {
    slug: string;
    label: string;
  }[];
}

export const experience: ExperienceItem[] = [
  {
    id: "solvevare",
    role: "Full-Stack Developer",
    company: "Solvevare",
    companyContext: "Software agency — SaaS & business systems",
    period: "July 2025 – Present",
    duration: "Current",
    description:
      "Building and shipping production SaaS platforms and business systems for real estate and operations clients. Own full-stack architecture and delivery — from data modelling and API design through to frontend implementation and cloud deployment.",
    highlights: [
      "Architected a campaign automation engine capable of processing 10 emails/sec — roughly 30,000+ per hour — with queue-based scheduling, retry logic, and per-user SMTP configs built on BullMQ and Redis",
      "Built a multi-tenant CRM platform for real estate workflows: workspace-isolated tenancy, DocuSign contract signing, real-time chat, and automated follow-up pipelines — all in production",
      "Engineered a rule-based inventory system managing 8,000+ products across configurable multi-portal architecture with hierarchical allotment logic across user groups and individuals",
      "Designed REST and GraphQL APIs consumed by web and mobile clients; managed AWS deployments with Docker containerisation across production environments",
    ],
    relatedSystems: [
      { slug: "crm-system", label: "CRM System" },
      { slug: "inventory-system", label: "Inventory System" },
    ],
    current: true,
  },
  {
    id: "icreativez",
    role: "MERN Stack Developer",
    company: "ICreativez Technologies",
    companyContext:
      "Award-winning global IT firm (201–500 people) — clients across North America, Europe & Asia",
    period: "Oct 2024 – Jul 2025",
    duration: "9 months",
    description:
      "Joined as an intern and converted to a full-time MERN Stack Developer after 6 months — based on project output, not tenure. Shipped production work on a live e-commerce platform and multiple client projects across the full stack.",
    highlights: [
      "Promoted from intern to full-time developer in 6 months — conversion based on delivery quality on real client projects, not time served",
      "Built and shipped product pages, checkout flows, filtering systems, and an admin dashboard for a live e-commerce platform used by real customers",
      "Resolved page load and rendering performance issues across product listing views — identified bottlenecks in image handling and component rendering that were causing lag at scale",
      "Converted Figma designs into responsive, production-ready interfaces and integrated REST APIs connecting frontend to backend services and third-party providers",
    ],
    current: false,
  },
  {
    id: "hbl",
    role: "Research Intern",
    company: "HBL Center for Blockchain & Applied Research",
    companyContext:
      "Research division of HBL — Pakistan's largest commercial bank · Conducted at GIKI",
    period: "Sep 2024",
    duration: "1 month",
    description:
      "Short-term research internship at GIKI within the applied research arm of Pakistan's largest commercial bank. Focused on blockchain integration patterns in financial systems and contributed to prototype development alongside domain researchers and engineers.",
    highlights: [
      "Researched transaction transparency and smart contract use cases for banking workflows — contributed findings to internal research documentation",
      "Built proof-of-concept applications on Ethereum and Hyperledger Fabric to validate integration approaches",
      "Presented technical research to cross-functional teams of engineers and domain researchers at one of Pakistan's leading engineering institutions",
      "Contributed to a research environment backed by HBL — Pakistan's largest bank by assets",
    ],
    current: false,
  },
];
