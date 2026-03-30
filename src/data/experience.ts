export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  current?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    id: "solvevare",
    role: "Full-Stack Developer",
    company: "Solvevare",
    period: "2025 - Present",
    description:
      "Building scalable SaaS applications and admin dashboards for business clients. Leading backend architecture decisions and full-stack feature delivery.",
    highlights: [
      "Designed and built multi-tenant SaaS platforms from scratch",
      "Implemented CRM systems and inventory management tools",
      "Built REST and GraphQL APIs consumed by web and mobile clients",
      "Managed cloud deployments on AWS with Docker containerization",
    ],
    current: true,
  },
  {
    id: "hbl",
    role: "Research Intern",
    company: "HBL Center for Blockchain & Applied Research",
    period: "2024",
    description:
      "Conducted applied research on blockchain technology and its integration with financial systems. Contributed to research publications and prototype development.",
    highlights: [
      "Researched blockchain use cases in banking and financial services",
      "Built proof-of-concept applications on Ethereum and Hyperledger",
      "Contributed to technical research documentation and presentations",
      "Collaborated with cross-functional teams of researchers and engineers",
    ],
    current: false,
  },
];
