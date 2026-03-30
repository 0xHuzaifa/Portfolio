"use client";

import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-accent))]">
          Contact
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[hsl(var(--vscode-text))]">
          Let&apos;s talk about the system you want to build.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[hsl(var(--vscode-text-muted))]">
          If you need a product-minded developer for a SaaS platform, internal
          tool, dashboard, or custom business system, send over the context and
          I&apos;ll take it from there.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
              Project brief
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[hsl(var(--vscode-text))]">
              Share the basics
            </h2>
          </div>

          {submitted ? (
            <div className="rounded-[26px] border border-[hsl(var(--vscode-success))]/30 bg-[hsl(var(--vscode-success))]/10 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-success))]">
                Message received
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[hsl(var(--vscode-text))]">
                Thanks, I&apos;ll follow up soon.
              </h3>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
                This is a placeholder interaction for now, but the layout is
                ready for a real contact flow whenever you want to wire it to an
                API or email service.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                    Name
                  </span>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((state) => ({
                        ...state,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm text-[hsl(var(--vscode-text))] outline-none transition-colors placeholder:text-[hsl(var(--vscode-text-muted))]/60 focus:border-[hsl(var(--vscode-accent))]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((state) => ({
                        ...state,
                        email: event.target.value,
                      }))
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm text-[hsl(var(--vscode-text))] outline-none transition-colors placeholder:text-[hsl(var(--vscode-text-muted))]/60 focus:border-[hsl(var(--vscode-accent))]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  What are you building?
                </span>
                <textarea
                  required
                  rows={7}
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((state) => ({
                      ...state,
                      message: event.target.value,
                    }))
                  }
                  placeholder="Tell me about the product, workflows, users, or technical constraints."
                  className="w-full resize-none rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm leading-7 text-[hsl(var(--vscode-text))] outline-none transition-colors placeholder:text-[hsl(var(--vscode-text-muted))]/60 focus:border-[hsl(var(--vscode-accent))]"
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-bg))] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
                Send message
              </button>
            </form>
          )}
        </section>

        <div className="space-y-4">
          <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
              Direct contact
            </p>
            <div className="mt-5 space-y-3">
              <a
                href="mailto:huzaifaahmed@example.com"
                className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm text-[hsl(var(--vscode-text))] transition-colors hover:border-[hsl(var(--vscode-accent))]/35"
              >
                <Mail className="h-4 w-4 text-[hsl(var(--vscode-accent))]" />
                huzaifaahmed@example.com
              </a>
              <a
                href="https://linkedin.com/in/huzaifaahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm text-[hsl(var(--vscode-text))] transition-colors hover:border-[hsl(var(--vscode-accent))]/35"
              >
                <Linkedin className="h-4 w-4 text-[hsl(var(--vscode-accent))]" />
                LinkedIn profile
              </a>
              <a
                href="https://github.com/huzaifaahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm text-[hsl(var(--vscode-text))] transition-colors hover:border-[hsl(var(--vscode-accent))]/35"
              >
                <Github className="h-4 w-4 text-[hsl(var(--vscode-accent))]" />
                GitHub profile
              </a>
            </div>
          </section>

          <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[linear-gradient(135deg,hsla(194,100%,56%,0.14),transparent_42%),hsl(var(--vscode-sidebar-elevated))] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--vscode-accent))]">
              Availability
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[hsl(var(--vscode-text))]">
              Open to new builds and product collaborations
            </h2>
            <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
              Best fit: systems that need both solid engineering and a more
              thoughtful user experience.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
