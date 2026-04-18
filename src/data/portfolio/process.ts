export interface SystemBuildPhase {
  id: string;
  title: string;
  description: string;
}

export const systemBuildPhases: SystemBuildPhase[] = [
  {
    id: "discovery-and-framing",
    title: "Discovery and framing",
    description:
      "Clarify business goals, users, workflows, and success signals before architecture starts taking shape.",
  },
  {
    id: "system-design",
    title: "System design",
    description:
      "Map roles, permissions, data flow, integrations, and operational constraints so the product can grow cleanly.",
  },
  {
    id: "delivery-rhythm",
    title: "Delivery rhythm",
    description:
      "Build in small, visible milestones that make collaboration easier for both technical and non-technical stakeholders.",
  },
  {
    id: "launch-and-iteration",
    title: "Launch and iteration",
    description:
      "Ship with a stable baseline, monitor usage, then refine the product around real feedback and edge cases.",
  },
];

export const systemBuildPrinciples = [
  "The interface should be understandable without a handoff meeting.",
  "Architecture decisions should reduce future friction, not just solve the next ticket.",
  "Business systems deserve polished UX because clarity saves teams time every day.",
  "Scalability includes maintainable code, durable data models, and sensible deployment strategy.",
] as const;
