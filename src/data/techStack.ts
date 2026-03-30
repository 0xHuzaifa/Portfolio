export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "other";
}

export const techStack: TechItem[] = [
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Socket.io", category: "backend" },

  // Databases
  { name: "MongoDB", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "Redis", category: "database" },

  // DevOps / Cloud
  { name: "Docker", category: "devops" },
  { name: "AWS", category: "devops" },
  { name: "CI/CD", category: "devops" },
];

export const categoryLabels: Record<TechItem["category"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Databases",
  devops: "DevOps & Cloud",
  other: "Other",
};
