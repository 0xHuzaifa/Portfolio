"use client";

import { useState } from "react";
import { Mail, Linkedin, Github, Send } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire this to an API route or service like Resend / EmailJS
    setSubmitted(true);
  };

  return (
    <article className="p-6 md:p-10 max-w-4xl space-y-10">
      {/* Header */}
      <header>
        <p className="text-xs font-mono text-[hsl(var(--vscode-text-muted))] uppercase tracking-widest mb-2">
          // Contact.tsx
        </p>
        <h1 className="text-3xl font-bold text-[hsl(var(--vscode-accent))] mb-3">
          Let's build your next application.
        </h1>
        <p className="text-base text-[hsl(var(--vscode-text-muted))] max-w-xl leading-relaxed">
          Have a project in mind? Need a SaaS platform, dashboard, or scalable
          API? I typically respond within 24 hours.
        </p>
      </header>

      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        {/* Contact form */}
        <section className="bg-[hsl(var(--vscode-sidebar))] border border-[hsl(var(--vscode-border))] p-6">
          <h2 className="text-sm font-mono text-[hsl(var(--vscode-text-muted))] uppercase tracking-wider mb-5">
            // Send a Message
          </h2>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
              <span className="text-4xl">✅</span>
              <h3 className="text-lg font-semibold text-[hsl(var(--vscode-text))]">
                Message Sent!
              </h3>
              <p className="text-sm text-[hsl(var(--vscode-text-muted))]">
                I'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[hsl(var(--vscode-text-muted))] mb-1.5">
                  name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  placeholder="Your name"
                  className="w-full bg-[hsl(var(--vscode-bg))] border border-[hsl(var(--vscode-border))] text-[hsl(var(--vscode-text))] text-sm px-3 py-2.5 font-mono focus:outline-none focus:border-[hsl(var(--vscode-accent))] transition-colors placeholder:text-[hsl(var(--vscode-text-muted))]/40"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[hsl(var(--vscode-text-muted))] mb-1.5">
                  email
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="w-full bg-[hsl(var(--vscode-bg))] border border-[hsl(var(--vscode-border))] text-[hsl(var(--vscode-text))] text-sm px-3 py-2.5 font-mono focus:outline-none focus:border-[hsl(var(--vscode-accent))] transition-colors placeholder:text-[hsl(var(--vscode-text-muted))]/40"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[hsl(var(--vscode-text-muted))] mb-1.5">
                  message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  placeholder="Tell me about your project..."
                  className="w-full bg-[hsl(var(--vscode-bg))] border border-[hsl(var(--vscode-border))] text-[hsl(var(--vscode-text))] text-sm px-3 py-2.5 font-mono focus:outline-none focus:border-[hsl(var(--vscode-accent))] transition-colors resize-none placeholder:text-[hsl(var(--vscode-text-muted))]/40"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-[hsl(var(--vscode-accent))] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          )}
        </section>

        {/* Contact info sidebar */}
        <div className="space-y-3">
          <section className="bg-[hsl(var(--vscode-sidebar))] border border-[hsl(var(--vscode-border))] p-5">
            <h2 className="text-xs font-mono text-[hsl(var(--vscode-text-muted))] uppercase tracking-wider mb-4">
              // Connect
            </h2>
            <div className="space-y-3">
              <a
                href="mailto:huzaifaahmed@example.com"
                className="flex items-center gap-3 text-sm text-[hsl(var(--vscode-text-muted))] hover:text-[hsl(var(--vscode-accent))] transition-colors group"
              >
                <Mail className="w-4 h-4 shrink-0 group-hover:text-[hsl(var(--vscode-accent))]" />
                <span className="font-mono text-xs truncate">
                  huzaifaahmed@example.com
                </span>
              </a>
              <a
                href="https://linkedin.com/in/huzaifaahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[hsl(var(--vscode-text-muted))] hover:text-[hsl(var(--vscode-accent))] transition-colors group"
              >
                <Linkedin className="w-4 h-4 shrink-0 group-hover:text-[hsl(var(--vscode-accent))]" />
                <span className="font-mono text-xs">LinkedIn</span>
              </a>
              <a
                href="https://github.com/huzaifaahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[hsl(var(--vscode-text-muted))] hover:text-[hsl(var(--vscode-accent))] transition-colors group"
              >
                <Github className="w-4 h-4 shrink-0 group-hover:text-[hsl(var(--vscode-accent))]" />
                <span className="font-mono text-xs">GitHub</span>
              </a>
            </div>
          </section>

          <section className="bg-[hsl(var(--vscode-sidebar))] border border-[hsl(var(--vscode-border))] p-5">
            <h2 className="text-xs font-mono text-[hsl(var(--vscode-text-muted))] uppercase tracking-wider mb-3">
              // Availability
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-[hsl(var(--vscode-text-muted))]">
                Open to new projects
              </span>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
