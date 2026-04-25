"use client";

import { ArrowUp, LoaderCircle, Sparkles, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { portfolioProfile } from "@/data/portfolio";
import type { ChatApiResponse, ChatMessage } from "@/lib/ai/chat.types";
import { cn } from "@/lib/utils";

type LocalMessage = ChatMessage & {
  id: string;
  persist?: boolean;
};

const initialMessages: LocalMessage[] = [
  {
    id: "assistant-welcome",
    role: "assistant",
    content:
      "I can tell you about the systems I've built, how I work, or whether I'm the right fit for what you're planning. What would you like to know?",
    persist: false,
  },
];

export function PortfolioChat() {
  const [messages, setMessages] = useState<LocalMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollAreaRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  });

  const submitMessage = async (rawMessage: string) => {
    const message = rawMessage.trim();

    if (!message || isSubmitting) {
      return;
    }

    const history = messages
      .filter((item) => item.persist !== false)
      .map<ChatMessage>(({ role, content }) => ({
        role,
        content,
      }))
      .slice(-8);

    const userMessage: LocalMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
      persist: true,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          messages: history,
        }),
      });

      const result =
        ((await response.json().catch(() => null)) as ChatApiResponse | null) ??
        null;
      const failureMessage =
        result && !result.success ? result.message : undefined;

      if (!response.ok || !result?.success) {
        setErrorMessage(
          failureMessage ||
            "The assistant could not respond right now. Please try again.",
        );
        return;
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: result.reply,
          persist: true,
        },
      ]);
    } catch {
      setErrorMessage(
        "Something went wrong while contacting the assistant. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[linear-gradient(135deg,hsla(194,100%,56%,0.12),transparent_58%),hsl(var(--vscode-sidebar-elevated))] p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--vscode-accent))]/15 text-[hsl(var(--vscode-accent))]">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-accent))]">
              Live assistant
            </p>
            <p className="mt-2 text-sm leading-6 text-[hsl(var(--vscode-text-muted))]">
              Ask about projects, architecture, experience, or how{" "}
              {portfolioProfile.name.split(" ")[0]} approaches delivery.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={scrollAreaRef}
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm",
              message.role === "assistant"
                ? "rounded-bl-md border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))] text-[hsl(var(--vscode-text-muted))]"
                : "ml-auto rounded-br-md bg-[hsl(var(--vscode-accent))]/18 text-[hsl(var(--vscode-text))]",
            )}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}

        {messages.length <= 2 ? (
          <div className="flex flex-wrap gap-2">
            {portfolioProfile.suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => submitMessage(question)}
                disabled={isSubmitting}
                className="rounded-full border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-3 py-2 text-left text-xs leading-5 text-[hsl(var(--vscode-text-muted))] transition-colors hover:border-[hsl(var(--vscode-accent))]/35 hover:text-[hsl(var(--vscode-text))] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {question}
              </button>
            ))}
          </div>
        ) : null}

        {isSubmitting ? (
          <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))] px-4 py-3 text-sm text-[hsl(var(--vscode-text-muted))]">
            <span className="inline-flex items-center gap-2">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Thinking through the best answer...
            </span>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void submitMessage(input);
        }}
        className="space-y-3"
      >
        {errorMessage ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-2xl border border-[hsl(var(--destructive))]/30 bg-[hsl(var(--destructive))]/10 px-4 py-3 text-sm leading-6 text-[hsl(var(--destructive-foreground))]"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--destructive))]" />
            <p className="text-[hsl(var(--vscode-text))]">{errorMessage}</p>
          </div>
        ) : null}

        <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))] p-3">
          <label className="sr-only" htmlFor="assistant-chat-input">
            Ask the portfolio assistant a question
          </label>
          <textarea
            id="assistant-chat-input"
            value={input}
            rows={3}
            disabled={isSubmitting}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void submitMessage(input);
              }
            }}
            placeholder="Ask about projects, experience, architecture, or your product idea..."
            className="w-full resize-none bg-transparent px-1 py-1 text-sm leading-6 text-[hsl(var(--vscode-text))] outline-none placeholder:text-[hsl(var(--vscode-text-muted))]/65 disabled:cursor-not-allowed disabled:opacity-70"
          />

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-[hsl(var(--vscode-border))] pt-3">
            <p className="text-xs leading-5 text-[hsl(var(--vscode-text-muted))]">
              Server-side AI with portfolio-aware context
            </p>

            <button
              type="submit"
              disabled={isSubmitting || !input.trim()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--vscode-accent))] text-[hsl(var(--vscode-bg))] transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
