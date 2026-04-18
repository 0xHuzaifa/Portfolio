import { experience } from "@/data/experience";
import {
  portfolioProfile,
  systemBuildPhases,
  systemBuildPrinciples,
} from "@/data/portfolio";
import { systems } from "@/data/systems";
import { categoryLabels, techStack } from "@/data/techStack";
import type {
  PortfolioKnowledgeDocument,
  RetrievalResult,
  RetrievedPortfolioDocument,
} from "./chat.types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "about",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "me",
  "my",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
  "what",
  "who",
  "you",
]);

const DEFAULT_DOCUMENT_IDS = [
  "profile-overview",
  "skills-overview",
  "process-overview",
  systems[0]?.slug ? `system-${systems[0].slug}` : undefined,
].filter((value): value is string => Boolean(value));

const portfolioKnowledgeBase = buildPortfolioKnowledgeBase();

export function retrievePortfolioContext(
  query: string,
  maxResults = 4,
): RetrievalResult {
  const normalizedQuery = query.trim().toLowerCase();
  const queryTokens = tokenize(normalizedQuery);

  const rankedMatches = portfolioKnowledgeBase
    .map((document) => ({
      ...document,
      score: scoreDocument(document, normalizedQuery, queryTokens),
    }))
    .filter((document) => document.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, maxResults);

  const matches =
    rankedMatches.length > 0
      ? rankedMatches
      : portfolioKnowledgeBase
          .filter((document) => DEFAULT_DOCUMENT_IDS.includes(document.id))
          .map((document) => ({
            ...document,
            score: 1,
          }));

  return {
    matches,
    contextText: matches.map(formatDocumentForPrompt).join("\n\n"),
  };
}

function buildPortfolioKnowledgeBase(): PortfolioKnowledgeDocument[] {
  const skillsByCategory = techStack.reduce(
    (accumulator, item) => {
      if (!accumulator[item.category]) {
        accumulator[item.category] = [];
      }

      accumulator[item.category].push(item.name);
      return accumulator;
    },
    {} as Record<string, string[]>,
  );

  const profileDocument: PortfolioKnowledgeDocument = {
    id: "profile-overview",
    title: "Huzaifa Ahmed profile",
    section: "profile",
    route: "/",
    keywords: [
      portfolioProfile.name,
      portfolioProfile.title,
      "portfolio",
      "hire",
      "developer",
      "availability",
    ],
    content: [
      `${portfolioProfile.name} is a ${portfolioProfile.title}.`,
      portfolioProfile.summary,
      `Specialties: ${portfolioProfile.specialties.join("; ")}.`,
      `Positioning: ${portfolioProfile.positioning.join("; ")}.`,
      `Availability: ${portfolioProfile.availability}`,
      `Contact: email ${portfolioProfile.contact.email}, LinkedIn ${portfolioProfile.contact.linkedin}, GitHub ${portfolioProfile.contact.github}.`,
    ].join(" "),
  };

  const skillsDocument: PortfolioKnowledgeDocument = {
    id: "skills-overview",
    title: "Core skills and stack",
    section: "skills",
    route: "/",
    keywords: [
      "skills",
      "stack",
      "tech stack",
      "technologies",
      ...techStack.map((item) => item.name),
    ],
    content: [
      "Primary technical capabilities grouped by category.",
      ...Object.entries(skillsByCategory).map(
        ([category, items]) =>
          `${categoryLabels[category as keyof typeof categoryLabels]}: ${items.join(", ")}.`,
      ),
    ].join(" "),
  };

  const processOverviewDocument: PortfolioKnowledgeDocument = {
    id: "process-overview",
    title: "How Huzaifa builds systems",
    section: "process",
    route: "/how-i-build-systems",
    keywords: [
      "process",
      "approach",
      "workflow",
      "delivery",
      "system design",
      "scalable",
    ],
    content: [
      "Huzaifa treats system building as product design, architecture, and delivery working together.",
      `Phases: ${systemBuildPhases
        .map((phase) => `${phase.title}: ${phase.description}`)
        .join(" | ")}.`,
      `Core principles: ${systemBuildPrinciples.join(" | ")}.`,
    ].join(" "),
  };

  const systemDocuments = systems.map<PortfolioKnowledgeDocument>((system) => ({
    id: `system-${system.slug}`,
    title: system.title,
    section: "system",
    route: `/systems/${system.slug}`,
    keywords: [
      system.slug,
      system.title,
      system.category,
      system.type,
      ...(system.systemType ? [system.systemType] : []),
      ...(system.role ? [system.role] : []),
      ...system.technologies,
      ...system.features,
      ...(system.highlights ?? []),
    ],
    content: [
      `Category: ${system.category}. Type: ${system.type}.`,
      system.shortDescription,
      `Problem: ${system.problem}`,
      `Approach: ${system.solution}`,
      `Key features: ${system.features.join("; ")}.`,
      `Architecture: ${Object.entries(system.architecture)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ")}.`,
      `Technologies: ${system.technologies.join(", ")}.`,
      ...(system.contributions?.length
        ? [`Contributions: ${system.contributions.join("; ")}.`]
        : []),
      ...(system.engineeringChallenges?.length
        ? [
            `Engineering challenges: ${system.engineeringChallenges
              .map(
                (challenge) =>
                  `${challenge.title}. Problem: ${challenge.problem} Solution: ${challenge.solution}${challenge.impact ? ` Impact: ${challenge.impact}` : ""}`,
              )
              .join(" | ")}.`,
          ]
        : []),
      ...(system.scalability?.length
        ? [`Scalability notes: ${system.scalability.join("; ")}.`]
        : []),
      ...(system.impact?.length
        ? [`Impact: ${system.impact.join("; ")}.`]
        : []),
    ].join(" "),
  }));

  const experienceDocuments = experience.map<PortfolioKnowledgeDocument>(
    (item) => ({
      id: `experience-${item.id}`,
      title: `${item.role} at ${item.company}`,
      section: "experience",
      route: "/experience",
      keywords: [
        item.id,
        item.role,
        item.company,
        item.period,
        ...(item.current ? ["current"] : []),
        ...item.highlights,
      ],
      content: [
        `Role: ${item.role}. Company: ${item.company}. Period: ${item.period}.`,
        item.description,
        `Highlights: ${item.highlights.join("; ")}.`,
      ].join(" "),
    }),
  );

  return [
    profileDocument,
    skillsDocument,
    processOverviewDocument,
    ...systemDocuments,
    ...experienceDocuments,
  ];
}

function scoreDocument(
  document: PortfolioKnowledgeDocument,
  normalizedQuery: string,
  queryTokens: string[],
) {
  const title = document.title.toLowerCase();
  const content = document.content.toLowerCase();
  const keywords = document.keywords.map((keyword) => keyword.toLowerCase());

  let score = 0;

  if (normalizedQuery && title.includes(normalizedQuery)) {
    score += 10;
  }

  if (
    normalizedQuery &&
    keywords.some((keyword) => keyword.includes(normalizedQuery))
  ) {
    score += 8;
  }

  for (const token of queryTokens) {
    if (title.includes(token)) {
      score += 5;
    }

    if (keywords.some((keyword) => keyword.includes(token))) {
      score += 4;
    }

    if (content.includes(token)) {
      score += 2;
    }
  }

  return score;
}

function tokenize(value: string) {
  const matches = value.match(/[a-z0-9][a-z0-9.+/-]*/g) ?? [];

  return [...new Set(matches)].filter(
    (token) => token.length > 1 && !STOP_WORDS.has(token),
  );
}

function formatDocumentForPrompt(document: RetrievedPortfolioDocument) {
  return [
    `[${document.section.toUpperCase()}] ${document.title}`,
    `Route: ${document.route}`,
    document.content,
  ].join("\n");
}
