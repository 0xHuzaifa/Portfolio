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
  /**
   * Shown on the hero deck card, both optional and both omitted rather than
   * guessed: `year` falls back to what the card links to, and the completion
   * meter is not drawn at all without `progress`. A progress bar is a claim
   * about the work, and one invented to fill a slot is the kind that gets
   * asked about on a call.
   */
  year?: string;
  progress?: number;
}

export const projects: ProjectEntry[] = [
  {
    id: "real-estate-crm",
    title: "Real Estate CRM",
    categories: ["CRM", "AI", "SaaS"],
    description:
      "Multi-tenant CRM for real estate agencies to manage leads, deals, contracts and teams — driven by plain English.",
    image: crmSystemMain,
    caseStudySlug: "crm-system",
  },
  {
    id: "inventory-ordering",
    title: "Inventory & Ordering Platform",
    categories: ["IMS", "SaaS"],
    description:
      "Distribution platform where companies control who can order what, and how much they can spend. The rules apply themselves.",
    image: inventorySystemMain,
    caseStudySlug: "inventory-system",
  },
  {
    id: "article-platform",
    title: "Article Publishing Platform",
    categories: ["CMS", "SaaS"],
    description:
      "Content platform where writers draft, editors review, and admins control exactly what goes live.",
    image: articlePlatformMain,
    caseStudySlug: "article-platform",
  },
  {
    id: "realtime-chat",
    title: "Realtime Chat System",
    categories: ["SaaS"],
    description:
      "Live messaging that stays accurate through dropped connections, multiple tabs and busy rooms.",
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
 * Career-wide figures, not derived. Every one traces to a real system in
 * `docs/About-me (updated).md` — which is why they are authored here rather
 * than counted off `projects`.
 */
export const projectsDelivered = { value: "6", label: "Systems Shipped" };

export const impactStats: { value: string; label: string }[] = [
  { value: "36K+", label: "Emails / hr" },
  { value: "8K+", label: "Products Managed" },
  { value: "7", label: "Agents in Pipeline" },
  { value: "2+", label: "Years in Production" },
  { value: "100%", label: "Commitment to Quality" },
];
