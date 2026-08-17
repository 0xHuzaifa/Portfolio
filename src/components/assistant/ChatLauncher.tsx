"use client";

import { Bot, X } from "lucide-react";
import { useState } from "react";
import { PortfolioChat } from "@/components/assistant/PortfolioChat";

export function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg shadow-black/30 transition-transform hover:scale-105"
        aria-label={open ? "Close assistant" : "Ask me anything — AI assistant"}
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed bottom-21 right-5 z-50 flex h-[min(70vh,34rem)] w-[min(calc(100vw-2.5rem),24rem)] flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/15 text-[hsl(var(--primary))]">
              <Bot className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">Portfolio assistant</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Ask about systems, experience, and fit
              </p>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col p-4">
            <PortfolioChat />
          </div>
        </div>
      )}
    </>
  );
}
