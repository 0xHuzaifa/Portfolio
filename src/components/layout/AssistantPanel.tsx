"use client";

import { Bot, Sparkles, X } from "lucide-react";
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
                Assistant
              </p>
              <p className="text-xs text-[hsl(var(--vscode-text-muted))]">
                Client-friendly support panel
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

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
              Chat Preview
            </p>
            <div className="mt-4 space-y-3">
              <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm text-[hsl(var(--vscode-text-muted))]">
                Can we turn this portfolio into a guided product walkthrough?
              </div>
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[hsl(var(--vscode-accent))]/18 px-4 py-3 text-sm text-[hsl(var(--vscode-text))]">
                Coming Soon
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar))]/70 p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/12 text-[hsl(var(--vscode-accent))]">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--vscode-text))]">
              Coming Soon
            </h3>
            <p className="mt-2 text-sm leading-6 text-[hsl(var(--vscode-text-muted))]">
              This space is reserved for a lightweight chatbot experience that
              will guide visitors through systems, experience, and contact
              steps.
            </p>
          </div>

          <div className="mt-auto rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))] p-3">
            <div className="flex items-center gap-2 rounded-xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-3 py-2.5">
              <span className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--vscode-text-muted))]">
                Input Disabled
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
