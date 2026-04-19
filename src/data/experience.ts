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
      "Building and shipping production SaaS platforms and business systems for client projects. Own full-stack architecture and delivery — from data modelling and API design through to frontend implementation and cloud deployment.",
    highlights: [
      "Architected and shipped a multi-tenant CRM platform for a real estate client, including campaign automation, real-time communication, and DocuSign contract workflows",
      "Built a rule-based inventory and allocation system with hierarchical portal architecture and complex allotment logic across user groups",
      "Designed and implemented REST and GraphQL APIs consumed by web and mobile clients across multiple projects",
      "Managed AWS deployments with Docker containerisation for production environments",
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
      "Joined as an intern and converted to a full-time developer within the same engagement at a Karachi-based global IT consultancy. Built and shipped full-stack web applications across multiple client projects, working the entire MERN stack from database design to production UI.",
    highlights: [
      "Promoted from intern to full-time developer based on project performance",
      "Converted Figma designs into responsive, production-ready interfaces across multiple client projects",
      "Built and integrated REST APIs connecting frontend applications to backend services and third-party providers",
      "Optimised frontend rendering performance and resolved production bottlenecks",
      "Shipped features end-to-end using Git-based team workflows on live client codebases",
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
      "Short-term research internship conducted at GIKI (Ghulam Ishaq Khan Institute of Engineering Sciences & Technology), within the applied research arm of Pakistan's largest bank. Focused on blockchain integration patterns in financial systems and contributed to prototype development.",
    highlights: [
      "Researched blockchain applications in banking — transaction transparency and smart contract use cases in financial workflows",
      "Built proof-of-concept applications on Ethereum and Hyperledger Fabric",
      "Contributed to technical research documentation and internal presentations",
      "Worked alongside engineers and domain researchers in a structured research environment",
    ],
    current: false,
  },
];
