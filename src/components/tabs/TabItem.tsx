"use client";

import { X } from "lucide-react";
import { useTabs } from "@/contexts/TabContext";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/contexts/NavigationContext";

interface TabItemProps {
  tab: {
    id: string;
    href: string;
    title: string;
    closeable?: boolean;
  };
}

export const TabItem = ({ tab }: TabItemProps) => {
  const { closeTab, tabs } = useTabs();
  const { pathname, navigate } = useNavigation();

  const isActive = pathname === tab.href;

  const handleActivate = () => navigate(tab.href);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (tab.closeable === false) return;
    if (tabs.length <= 1) return;
    closeTab(tab.id);
  };

  return (
    <div
      onClick={handleActivate}
      className={cn(
        "group flex min-w-fit items-center gap-2 border-r border-[hsl(var(--vscode-border))] px-3 py-2 text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vscode-accent))]/40",
        isActive
          ? "bg-[hsl(var(--vscode-bg))] text-[hsl(var(--vscode-text))]"
          : "bg-[hsl(var(--vscode-sidebar))] text-[hsl(var(--vscode-text-muted))] hover:bg-[hsl(var(--vscode-hover))] hover:text-[hsl(var(--vscode-text))]",
      )}
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
    >
      <span className="truncate max-w-[160px]">{tab.title}</span>

      {tab.closeable !== false && tabs.length > 1 && (
        <button
          type="button"
          onClick={handleClose}
          className="ml-1 rounded p-0.5 opacity-0 transition-opacity hover:bg-[hsl(var(--vscode-hover))] group-hover:opacity-100"
          aria-label={`Close ${tab.title}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};
