"use client";

import { Github, Linkedin, LoaderCircle, Mail, Send } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
import type {
  ContactApiResponse,
  ContactFieldErrors,
  ContactFormData,
} from "@/lib/contact/contact.types";
import { cn } from "@/lib/utils";

const initialFormState: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export function ContactPageContent() {
  const [formState, setFormState] = useState(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange =
    (field: keyof ContactFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;

      setFormState((state) => ({
        ...state,
        [field]: value,
      }));

      setFieldErrors((current) => {
        if (!current[field]) {
          return current;
        }

        const next = { ...current };
        delete next[field];
        return next;
      });

      if (errorMessage) {
        setErrorMessage("");
      }
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const result =
        ((await response
          .json()
          .catch(() => null)) as ContactApiResponse | null) ?? null;

      if (!response.ok || !result?.success) {
        const message =
          result?.message ||
          "The message could not be sent right now. Please try again.";

        setErrorMessage(message);
        setFieldErrors(
          result?.success === false ? (result.fieldErrors ?? {}) : {},
        );
        toast.error(message);
        return;
      }

      setFormState(initialFormState);
      setSubmitted(true);
      toast.success(result.message);
    } catch {
      const message =
        "Something went wrong while sending your message. Please try again.";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
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
                Thanks, your message is on its way.
              </h3>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--vscode-text-muted))]">
                I&apos;ve sent a confirmation email to your inbox, and I&apos;ll
                review your message and respond as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-text))] transition-colors hover:border-[hsl(var(--vscode-accent))]/35"
              >
                Send another message
              </button>
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
                    disabled={isSubmitting}
                    value={formState.name}
                    onChange={handleFieldChange("name")}
                    placeholder="Your name"
                    className={cn(
                      "w-full rounded-2xl border bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm text-[hsl(var(--vscode-text))] outline-none transition-colors placeholder:text-[hsl(var(--vscode-text-muted))]/60 focus:border-[hsl(var(--vscode-accent))] disabled:cursor-not-allowed disabled:opacity-70",
                      fieldErrors.name
                        ? "border-[hsl(var(--destructive))]"
                        : "border-[hsl(var(--vscode-border))]",
                    )}
                  />
                  {fieldErrors.name ? (
                    <span className="mt-2 block text-sm text-[hsl(var(--destructive))]">
                      {fieldErrors.name}
                    </span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formState.email}
                    onChange={handleFieldChange("email")}
                    placeholder="you@example.com"
                    className={cn(
                      "w-full rounded-2xl border bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm text-[hsl(var(--vscode-text))] outline-none transition-colors placeholder:text-[hsl(var(--vscode-text-muted))]/60 focus:border-[hsl(var(--vscode-accent))] disabled:cursor-not-allowed disabled:opacity-70",
                      fieldErrors.email
                        ? "border-[hsl(var(--destructive))]"
                        : "border-[hsl(var(--vscode-border))]",
                    )}
                  />
                  {fieldErrors.email ? (
                    <span className="mt-2 block text-sm text-[hsl(var(--destructive))]">
                      {fieldErrors.email}
                    </span>
                  ) : null}
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))]">
                  What are you building?
                </span>
                <textarea
                  required
                  rows={7}
                  disabled={isSubmitting}
                  value={formState.message}
                  onChange={handleFieldChange("message")}
                  placeholder="Tell me about the product, workflows, users, or technical constraints."
                  className={cn(
                    "w-full resize-none rounded-2xl border bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm leading-7 text-[hsl(var(--vscode-text))] outline-none transition-colors placeholder:text-[hsl(var(--vscode-text-muted))]/60 focus:border-[hsl(var(--vscode-accent))] disabled:cursor-not-allowed disabled:opacity-70",
                    fieldErrors.message
                      ? "border-[hsl(var(--destructive))]"
                      : "border-[hsl(var(--vscode-border))]",
                  )}
                />
                {fieldErrors.message ? (
                  <span className="mt-2 block text-sm text-[hsl(var(--destructive))]">
                    {fieldErrors.message}
                  </span>
                ) : null}
              </label>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--vscode-accent))] px-5 py-3 text-sm font-semibold text-[hsl(var(--vscode-bg))] transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>

                {errorMessage ? (
                  <p
                    role="alert"
                    className="text-sm leading-7 text-[hsl(var(--destructive))]"
                  >
                    {errorMessage}
                  </p>
                ) : null}
              </div>
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
                href="mailto:huzaifa.rb00@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm text-[hsl(var(--vscode-text))] transition-colors hover:border-[hsl(var(--vscode-accent))]/35"
              >
                <Mail className="h-4 w-4 text-[hsl(var(--vscode-accent))]" />
                huzaifa.rb00@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/0xhuzaifa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-4 py-3 text-sm text-[hsl(var(--vscode-text))] transition-colors hover:border-[hsl(var(--vscode-accent))]/35"
              >
                <Linkedin className="h-4 w-4 text-[hsl(var(--vscode-accent))]" />
                LinkedIn profile
              </a>
              <a
                href="https://github.com/0xhuzaifa"
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
