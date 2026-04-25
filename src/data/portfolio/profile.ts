export const portfolioProfile = {
  name: "Huzaifa Ahmed",
  title: "Full-Stack Developer",
  summary:
    "Full-stack developer focused on SaaS platforms, internal tools, dashboards, and operations software with strong architecture underneath and intuitive UX on top.",
  specialties: [
    "Building scalable SaaS platforms and admin dashboards",
    "Designing backend architecture for business workflows",
    "Turning product and operational requirements into production-ready systems",
    "Balancing technical depth with clear communication for clients and teams",
  ],
  positioning: [
    "Business-first systems for real workflows",
    "Scalable architecture built for maintainability from day one",
    "Reliable delivery with thoughtful UX and production-ready implementation",
  ],
  availability:
    "Open to new builds and product collaborations, especially systems that need both solid engineering and thoughtful user experience.",
  contact: {
    email: "huzaifa.rb00@gmail.com",
    linkedin: "https://linkedin.com/in/0xhuzaifa",
    github: "https://github.com/0xhuzaifa",
    preferredCallToAction:
      "If the conversation turns into a real project discussion, invite the visitor to use the contact page or reach out by email.",
  },
  suggestedQuestions: [
    "I have a SaaS idea — can you build it?", // Client entry point
    "What's the hardest system you've built?", // Developer / recruiter entry point
    "Are you available for new projects right now?", // Recruiter / client entry point
  ],
} as const;

export type PortfolioProfile = typeof portfolioProfile;
