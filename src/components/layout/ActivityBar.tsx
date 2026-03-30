"use client";

import { VscFiles, VscSearch, VscSourceControl } from "react-icons/vsc";
import { cn } from "@/lib/utils";

type ActivityBarProps = {
  className?: string;
  isExplorerOpen: boolean;
  onToggleExplorer: () => void;
};

const items = [
  { id: "files", label: "Files", icon: VscFiles, active: true },
  { id: "search", label: "Search", icon: VscSearch, active: false },
  {
    id: "source-control",
    label: "Source Control",
    icon: VscSourceControl,
    active: false,
  },
] as const;

export function ActivityBar({
  className,
  isExplorerOpen,
  onToggleExplorer,
}: ActivityBarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-14 flex-col items-center border-r border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))]/95 py-3 backdrop-blur-xl",
        className,
      )}
      aria-label="Workspace activity"
    >
      <div className="flex flex-1 flex-col items-center gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === "files" && isExplorerOpen;

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.active ? onToggleExplorer : undefined}
              aria-pressed={item.active ? isActive : undefined}
              aria-label={item.label}
              title={item.active ? item.label : `${item.label} - coming soon`}
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-xl text-lg transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vscode-accent))]/45",
                item.active
                  ? isActive
                    ? "bg-[hsl(var(--vscode-active))] text-[hsl(var(--vscode-text))]"
                    : "text-[hsl(var(--vscode-text-muted))] hover:bg-[hsl(var(--vscode-hover))] hover:text-[hsl(var(--vscode-text))]"
                  : "cursor-default text-[hsl(var(--vscode-text-muted))]/70 hover:bg-[hsl(var(--vscode-hover))] hover:text-[hsl(var(--vscode-text-muted))]",
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[hsl(var(--vscode-accent))]" />
              )}
              <Icon />
            </button>
          );
        })}
      </div>

      <div className="mt-auto h-10 w-10 rounded-full border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]" />
    </aside>
  );
}
