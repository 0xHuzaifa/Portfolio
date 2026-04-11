"use client";

import Image from "next/image";
import { VscCommentDiscussion, VscLayoutSidebarLeft } from "react-icons/vsc";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  className?: string;
  isLayoutCollapsed: boolean;
  isAssistantOpen: boolean;
  onToggleLayout: () => void;
  onToggleAssistant: () => void;
}

export function Header({
  className,
  isLayoutCollapsed,
  isAssistantOpen,
  onToggleLayout,
  onToggleAssistant,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "border-b border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))]/95 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex h-14 items-center justify-between px-3 md:px-4">
        <div className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]">
            <Image
              src="/logo.png"
              alt="Portfolio logo"
              width={22}
              height={22}
              className="h-[22px] w-[22px] object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLayout}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--vscode-border))] text-lg transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vscode-accent))]/45",
              isLayoutCollapsed
                ? "bg-[hsl(var(--vscode-active))] text-[hsl(var(--vscode-text))]"
                : "bg-[hsl(var(--vscode-sidebar-elevated))] text-[hsl(var(--vscode-text-muted))] hover:bg-[hsl(var(--vscode-hover))] hover:text-[hsl(var(--vscode-text))]",
            )}
            aria-label={
              isLayoutCollapsed
                ? "Expand workspace layout"
                : "Collapse workspace layout"
            }
            title={
              isLayoutCollapsed
                ? "Expand workspace layout"
                : "Collapse workspace layout"
            }
          >
            <VscLayoutSidebarLeft />
          </button>

          <button
            type="button"
            onClick={onToggleAssistant}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--vscode-border))] text-lg transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vscode-accent))]/45",
              isAssistantOpen
                ? "bg-[hsl(var(--vscode-active))] text-[hsl(var(--vscode-text))]"
                : "bg-[hsl(var(--vscode-sidebar-elevated))] text-[hsl(var(--vscode-text-muted))] hover:bg-[hsl(var(--vscode-hover))] hover:text-[hsl(var(--vscode-text))]",
            )}
            aria-label={
              isAssistantOpen ? "Close assistant panel" : "Open assistant panel"
            }
            title={
              isAssistantOpen ? "Close assistant panel" : "Open assistant panel"
            }
          >
            <VscCommentDiscussion />
          </button>
        </div>
      </div>
    </header>
  );
}
