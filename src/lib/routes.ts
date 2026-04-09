export type ExplorerItem = {
  href: string;
  label: string;
  fileLabel: string;
  group: "root" | "systems";
};

export const rootExplorerItems: readonly ExplorerItem[] = [
  { href: "/", label: "Home", fileLabel: "Home", group: "root" },
  {
    href: "/how-i-build-systems",
    label: "How I Build Systems",
    fileLabel: "How I Build Systems",
    group: "root",
  },
  {
    href: "/experience",
    label: "Experience",
    fileLabel: "Experience",
    group: "root",
  },
  {
    href: "/contact",
    label: "Contact",
    fileLabel: "Contact",
    group: "root",
  },
] as const;

export const systemExplorerItems: readonly ExplorerItem[] = [
  {
    href: "/systems/article-platform",
    label: "Article Platform",
    fileLabel: "Article Platform.tsx",
    group: "systems",
  },
  {
    href: "/systems/crm-system",
    label: "CRM System",
    fileLabel: "CRM System.tsx",
    group: "systems",
  },
  {
    href: "/systems/inventory-system",
    label: "Inventory System",
    fileLabel: "Inventory System.tsx",
    group: "systems",
  },
  {
    href: "/systems/realtime-communication",
    label: "Realtime Communication",
    fileLabel: "Realtime Communication.tsx",
    group: "systems",
  },
] as const;

export const allExplorerItems: readonly ExplorerItem[] = [
  ...rootExplorerItems,
  ...systemExplorerItems,
] as const;

export function getExplorerItem(pathname: string) {
  return allExplorerItems.find((item) => item.href === pathname);
}

export function getRouteTitle(pathname: string) {
  return getExplorerItem(pathname)?.fileLabel;
}

export function getEditorLabel(pathname: string) {
  return getExplorerItem(pathname)?.fileLabel ?? "Overview";
}

export function getEditorTrail(pathname: string) {
  const item = getExplorerItem(pathname);

  if (!item) return "portfolio";
  if (item.group === "systems") return "portfolio / Systems";

  return "portfolio";
}
