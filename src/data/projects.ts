import type { StaticImageData } from "next/image";
import articlePlatformMain from "@/assets/article-platform/main.png";
import chatSystemMain from "@/assets/chat-system/main.png";
import crmSystemMain from "@/assets/crm-system/main.png";
import inventorySystemMain from "@/assets/inventory-system/main.png";

/**
 * The card-level project list that drives /systems.
 *
 * Deliberately NOT derived from `systems.ts`. That file is the source of truth
 * for case-study detail pages, where titles are long and SEO-weighted and the
 * copy runs to paragraphs. A grid card needs a short display title and two
 * lines — different copy for a different job. `caseStudySlug` is the join.
 */

export type ProjectCategory = "SaaS" | "CRM" | "AI" | "CMS" | "IMS";

export interface ProjectEntry {
  id: string;
  /** Short display title. Not the case study's `title`. */
  title: string;
  /** First entry is the primary and renders lit. */
  categories: ProjectCategory[];
  description: string;
  image: StaticImageData;
  /** Present → the card links to /systems/[slug]. Absent → a lite entry. */
  caseStudySlug?: string;
  /** Present → the corner badge links out. Absent → no badge. */
  liveUrl?: string;
}

export const projects: ProjectEntry[] = [
  {
    id: "real-estate-crm",
    title: "Real Estate CRM",
    categories: ["CRM", "AI", "SaaS"],
    description:
      "Multi-tenant CRM for real estate agencies — leads, deals, contracts and teams in one workspace, with an AI assistant that runs any task from plain English.",
    image: crmSystemMain,
    caseStudySlug: "crm-system",
  },
  {
    id: "inventory-ordering",
    title: "Inventory & Ordering Platform",
    categories: ["IMS", "SaaS"],
    description:
      "Product distribution platform where companies set exactly who can order what and how much they can spend. The rules apply themselves — nobody chases approvals.",
    image: inventorySystemMain,
    caseStudySlug: "inventory-system",
  },
  {
    id: "article-platform",
    title: "Article Publishing Platform",
    categories: ["CMS", "SaaS"],
    description:
      "Writers draft, editors review, admins control what goes live. Everyone gets the right level of access, and nothing publishes without clearing every step.",
    image: articlePlatformMain,
    caseStudySlug: "article-platform",
  },
  {
    id: "realtime-chat",
    title: "Realtime Chat System",
    categories: ["SaaS"],
    description:
      "Live messaging built to stay accurate when real life gets messy — dropped connections, several tabs, users coming and going. No lost messages, no refreshes.",
    image: chatSystemMain,
    caseStudySlug: "realtime-communication",
  },

  // ── Lite entries ──────────────────────────────────────────────────────────
  //
  // TODO: add the remaining projects here. A lite entry is the same shape minus
  // `caseStudySlug` — it renders an identical card whose footer link points at
  // `liveUrl` instead of a case study. Drop the screenshot in src/assets/ and
  // import it above.
  //
  // {
  //   id: "some-project",
  //   title: "Some Project",
  //   categories: ["SaaS"],
  //   description: "Two lines on what it does and who it was for.",
  //   image: someProjectMain,
  //   liveUrl: "https://example.com",
  // },
];

export interface CategoryMeta {
  id: ProjectCategory;
  label: string;
  /**
   * Authored total, for when the real figure spans client work that has no
   * entry in `projects` above. Leave it off and the count is derived from the
   * list, which is the honest default — a category can then never advertise a
   * number that filtering fails to produce.
   */
  count?: number;
}

export const categories: CategoryMeta[] = [
  { id: "SaaS", label: "SaaS" },
  { id: "CRM", label: "CRM" },
  { id: "AI", label: "AI" },
  { id: "CMS", label: "CMS" },
  { id: "IMS", label: "IMS" },
];

export function projectsInCategory(category: ProjectCategory) {
  return projects.filter((project) => project.categories.includes(category));
}

export function categoryCount(category: CategoryMeta) {
  return category.count ?? projectsInCategory(category.id).length;
}

/**
 * Career-wide claims, not derived. These cover delivery that has no entry in
 * `projects` — which is exactly why they are authored here rather than counted.
 */
export const projectsDelivered = { value: "80+", label: "Projects Delivered" };

export const impactStats: { value: string; label: string }[] = [
  { value: "50K+", label: "Users Impacted" },
  { value: "36K+", label: "Emails / hr" },
  { value: "8", label: "Countries" },
  { value: "99.9%", label: "Uptime" },
  { value: "100%", label: "Commitment to Quality" },
];
