"use client";

import { Bot, X } from "lucide-react";
import { PortfolioChat } from "@/components/assistant/PortfolioChat";
import { cn } from "@/lib/utils";

type AssistantPanelProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};

export function AssistantPanel({
  className,
  isOpen,
  onClose,
}: AssistantPanelProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="absolute inset-0 z-20 bg-black/35 backdrop-blur-[1px] md:hidden"
          onClick={onClose}
          aria-label="Close assistant panel"
        />
      )}

      <aside
        className={cn(
          "absolute inset-y-0 right-0 z-30 flex flex-col overflow-hidden bg-[hsl(var(--vscode-panel))]/96 backdrop-blur-xl transition-[width,transform,opacity,border-color] duration-300 ease-out md:static md:z-0",
          isOpen
            ? "w-[min(84vw,22rem)] translate-x-0 border-l border-[hsl(var(--vscode-border))] opacity-100 md:w-[22rem]"
            : "w-0 translate-x-5 border-l border-transparent opacity-0",
          className,
        )}
        aria-label="Assistant sidebar"
      >
        <div className="flex items-center justify-between border-b border-[hsl(var(--vscode-border))] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--vscode-accent))]/14 text-[hsl(var(--vscode-accent))]">
              <Bot className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[hsl(var(--vscode-text))]">
                Portfolio assistant
              </p>
              <p className="text-xs text-[hsl(var(--vscode-text-muted))]">
                Ask about systems, experience, and fit
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[hsl(var(--vscode-text-muted))] transition-colors hover:bg-[hsl(var(--vscode-hover))] hover:text-[hsl(var(--vscode-text))]"
            aria-label="Close assistant panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-4">
          <PortfolioChat />
        </div>
      </aside>
    </>
  );
}
