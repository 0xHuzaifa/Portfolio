"use client";

import { Github, Linkedin, LoaderCircle, Mail, Send } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { RevealContainer } from "@/components/motion/RevealContainer";
import { Eyebrow } from "@/components/ui/eyebrow";
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

const inputClasses =
  "w-full rounded-xl border bg-[hsl(var(--background))]/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground))]/60 focus:border-[hsl(var(--primary))] disabled:cursor-not-allowed disabled:opacity-70";

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
    <RevealContainer>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 md:px-6 md:pt-20">
        <Eyebrow className="text-[hsl(var(--primary))]">Contact</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.15] tracking-[-0.02em] md:text-5xl">
          Tell me what you're building.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-[1.7] text-[hsl(var(--muted-foreground))]">
          Share the context — the workflow, the users, the problem you're
          solving. I'll come back with a clear picture of scope, approach, and
          next steps. No commitment required.
        </p>
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]/70">
          Typical response within 24 hours. Available for SaaS platforms,
          internal tools, CRMs, and custom business systems.
        </p>
      </section>

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 md:px-6 md:pb-24 xl:grid-cols-[1.15fr_0.85fr]">
        <section
          data-reveal
          className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8"
        >
          <div className="mb-6">
            <Eyebrow>Project brief</Eyebrow>
            <h2 className="mt-2 text-2xl font-semibold">
              Describe your system
            </h2>
            <p className="mt-1.5 text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
              No need for a formal spec — a clear description of the problem and
              who it affects is enough to start.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-[hsl(var(--state-success))]/30 bg-[hsl(var(--state-success))]/10 p-6">
              <Eyebrow className="text-[hsl(var(--state-success))]">
                Message received
              </Eyebrow>
              <h3 className="mt-3 text-2xl font-semibold">
                Thanks, your message is on its way.
              </h3>
              <p className="mt-3 text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
                I&apos;ve sent a confirmation email to your inbox, and I&apos;ll
                review your message and respond as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 px-5 py-3 text-sm font-semibold transition-colors hover:border-[hsl(var(--primary))]/35"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-data text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
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
                      inputClasses,
                      fieldErrors.name
                        ? "border-[hsl(var(--destructive))]"
                        : "border-[hsl(var(--border))]",
                    )}
                  />
                  {fieldErrors.name ? (
                    <span className="mt-2 block text-sm text-[hsl(var(--destructive))]">
                      {fieldErrors.name}
                    </span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-2 block font-data text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
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
                      inputClasses,
                      fieldErrors.email
                        ? "border-[hsl(var(--destructive))]"
                        : "border-[hsl(var(--border))]",
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
                <span className="mb-2 block font-data text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
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
                    inputClasses,
                    "resize-none leading-[1.7]",
                    fieldErrors.message
                      ? "border-[hsl(var(--destructive))]"
                      : "border-[hsl(var(--border))]",
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
                  className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
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
                    className="text-sm leading-[1.7] text-[hsl(var(--destructive))]"
                  >
                    {errorMessage}
                  </p>
                ) : null}
              </div>
            </form>
          )}
        </section>

        <div className="space-y-4">
          <section
            data-reveal
            className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
          >
            <Eyebrow>Direct contact</Eyebrow>
            <div className="mt-5 space-y-3">
              <a
                href="mailto:huzaifa.rb00@gmail.com"
                className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 px-4 py-3 text-sm transition-colors hover:border-[hsl(var(--primary))]/35"
              >
                <Mail className="h-4 w-4 text-[hsl(var(--primary))]" />
                huzaifa.rb00@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/0xhuzaifa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 px-4 py-3 text-sm transition-colors hover:border-[hsl(var(--primary))]/35"
              >
                <Linkedin className="h-4 w-4 text-[hsl(var(--primary))]" />
                LinkedIn profile
              </a>
              <a
                href="https://github.com/0xhuzaifa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 px-4 py-3 text-sm transition-colors hover:border-[hsl(var(--primary))]/35"
              >
                <Github className="h-4 w-4 text-[hsl(var(--primary))]" />
                GitHub profile
              </a>
            </div>
          </section>

          <section
            data-reveal
            className="rounded-2xl border border-[hsl(var(--primary))]/25 bg-[linear-gradient(135deg,hsla(227,68%,55%,0.14),transparent_42%),hsl(var(--card))] p-6"
          >
            <Eyebrow className="text-[hsl(var(--primary))]">
              What to expect
            </Eyebrow>
            <div className="mt-4 space-y-3">
              {[
                {
                  step: "01",
                  text: "You send a brief — workflow, problem, or rough idea.",
                },
                {
                  step: "02",
                  text: "I review and respond within 24 hours with questions or a clear next step.",
                },
                {
                  step: "03",
                  text: "If there's a fit, we scope the project together before any commitment.",
                },
              ].map(({ step, text }) => (
                <div
                  key={step}
                  className="flex gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/60 p-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/14 font-data text-[10px] font-semibold text-[hsl(var(--primary))]">
                    {step}
                  </span>
                  <p className="text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-[1.7] text-[hsl(var(--muted-foreground))]/60">
              Best fit: SaaS platforms, CRMs, internal tools, and custom
              business systems.
            </p>
          </section>
        </div>
      </div>
    </RevealContainer>
  );
}
