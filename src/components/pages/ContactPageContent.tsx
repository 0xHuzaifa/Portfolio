"use client";

import {
  ArrowRight,
  Check,
  Github,
  Linkedin,
  LoaderCircle,
  Mail,
  Send,
} from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { RevealContainer } from "@/components/motion/RevealContainer";
import type {
  ContactApiResponse,
  ContactFieldErrors,
  ContactFormData,
} from "@/lib/contact/contact.types";
import { cn } from "@/lib/utils";

/**
 * /contact — the brief form.
 *
 * Brought onto the site's own material: beige canvas, frosted bands, the one
 * yellow accent. It was still wearing the pre-redesign card styling, which on
 * this background meant near-invisible eyebrows, inputs the same colour as the
 * page behind them, and a success panel painted with `--state-success` — a
 * token that does not exist, so every rule using it was thrown away and the
 * confirmation rendered unstyled.
 *
 * The submit logic is untouched; this is presentation, the header offset, and
 * contrast.
 */

const initialFormState: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

const CONTENT = "mx-auto w-full max-w-[1400px] px-6 md:px-10";

/** The frosted band every panel on this page sits in — the same surface the
 *  case study uses, so the two pages read as one site. */
const BAND =
  "rounded-[26px] border border-white/45 bg-white/[0.30] shadow-[var(--shadow-sm)] backdrop-blur-[20px]";

/** Fields sit ON the band, so they need a lighter fill than it and a real ink
 *  border. At `--background`/60 they were the same value as the panel and read
 *  as flat areas rather than as things to type into. */
const inputClasses =
  "w-full rounded-xl border bg-white/70 px-4 py-3 text-[15px] text-[hsl(var(--ink-1))] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[hsl(var(--ink-3))] focus:border-[hsl(var(--yellow-deep))] focus:shadow-[0_0_0_3px_rgba(246,242,60,0.35)] disabled:cursor-not-allowed disabled:opacity-70";

const LABEL =
  "mb-2 block font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-3))]";

const LINK_ROW =
  "flex items-center gap-3 rounded-xl border border-[var(--ink-a12)] bg-white/60 px-4 py-3 text-[15px] transition-[border-color,transform] duration-200 ease-[var(--ease)] hover:-translate-y-[2px] hover:border-[hsl(var(--yellow-deep))]";

const steps = [
  { step: "01", text: "You send a brief — workflow, problem, or rough idea." },
  {
    step: "02",
    text: "I review and respond within 24 hours with questions or a clear next step.",
  },
  {
    step: "03",
    text: "If there's a fit, we scope the project together before any commitment.",
  },
];

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
      <main className="bg-[hsl(var(--beige-1))] pb-20 pt-[124px] text-[hsl(var(--ink-1))] lg:pb-28 lg:pt-[140px]">
        {/* ---------- hero ---------- */}
        <section className={CONTENT}>
          <div className="flex items-center gap-[14px]">
            <span className="h-[3px] w-[38px] rounded-[2px] bg-[hsl(var(--yellow))]" />
            <span className="font-data text-[12px] font-semibold uppercase tracking-[0.18em]">
              Contact
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,6vw,60px)] font-extrabold leading-[1.06] tracking-[-0.035em]">
            Tell me what you&rsquo;re building
            <span className="text-[hsl(var(--yellow-deep))]">.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[17px] leading-[1.65] text-[hsl(var(--ink-2))] md:text-[18px]">
            Share the context — the workflow, the users, the problem
            you&rsquo;re solving. I&rsquo;ll come back with a clear picture of
            scope, approach, and next steps. No commitment required.
          </p>

          <p className="mt-3 max-w-2xl text-[14px] leading-[1.6] text-[hsl(var(--ink-3))]">
            Typical response within 24 hours. Available for SaaS platforms,
            internal tools, CRMs, and custom business systems.
          </p>
        </section>

        {/* ---------- form + aside ---------- */}
        <div
          className={`${CONTENT} mt-12 grid gap-6 lg:mt-14 xl:grid-cols-[1.15fr_0.85fr]`}
        >
          <section data-reveal className={`${BAND} p-6 md:p-9`}>
            <div className="mb-8">
              <p className="font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-3))]">
                Project brief
              </p>
              <h2 className="mt-3 text-[26px] font-extrabold tracking-[-0.03em] md:text-[30px]">
                Describe your system
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-[1.7] text-[hsl(var(--ink-2))]">
                No need for a formal spec — a clear description of the problem
                and who it affects is enough to start.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-[20px] border border-[hsl(var(--yellow-deep))]/40 bg-[rgba(250,240,150,0.4)] p-7">
                <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[hsl(var(--yellow))]">
                  <Check className="h-[22px] w-[22px]" strokeWidth={2.6} />
                </span>
                <h3 className="mt-5 text-[24px] font-extrabold tracking-[-0.02em]">
                  Thanks — your message is on its way.
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-[hsl(var(--ink-2))]">
                  I&apos;ve sent a confirmation email to your inbox, and
                  I&apos;ll review your message and respond as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--ink-a12)] bg-white/70 px-6 py-3 text-[14px] font-bold transition-transform duration-200 ease-[var(--ease)] hover:-translate-y-[2px]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className={LABEL}>Name</span>
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
                          : "border-[var(--ink-a12)]",
                      )}
                    />
                    {fieldErrors.name ? (
                      <span className="mt-2 block text-[13px] text-[hsl(var(--destructive))]">
                        {fieldErrors.name}
                      </span>
                    ) : null}
                  </label>

                  <label className="block">
                    <span className={LABEL}>Email</span>
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
                          : "border-[var(--ink-a12)]",
                      )}
                    />
                    {fieldErrors.email ? (
                      <span className="mt-2 block text-[13px] text-[hsl(var(--destructive))]">
                        {fieldErrors.email}
                      </span>
                    ) : null}
                  </label>
                </div>

                <label className="block">
                  <span className={LABEL}>What are you building?</span>
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
                        : "border-[var(--ink-a12)]",
                    )}
                  />
                  {fieldErrors.message ? (
                    <span className="mt-2 block text-[13px] text-[hsl(var(--destructive))]">
                      {fieldErrors.message}
                    </span>
                  ) : null}
                </label>

                <div className="space-y-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-[10px] rounded-full bg-[hsl(var(--yellow))] px-[26px] py-[14px] text-[15px] font-bold shadow-[var(--shadow-sm)] transition-[transform,background-color] duration-200 ease-[var(--ease)] hover:-translate-y-[3px] hover:bg-[hsl(var(--yellow-deep))] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <LoaderCircle className="h-[17px] w-[17px] animate-spin" />
                    ) : (
                      <Send className="h-[17px] w-[17px]" strokeWidth={2.2} />
                    )}
                    {isSubmitting ? "Sending…" : "Send message"}
                  </button>

                  {errorMessage ? (
                    <p
                      role="alert"
                      className="text-[14px] leading-[1.7] text-[hsl(var(--destructive))]"
                    >
                      {errorMessage}
                    </p>
                  ) : null}
                </div>
              </form>
            )}
          </section>

          <div className="space-y-6">
            <section data-reveal className={`${BAND} p-6 md:p-7`}>
              <p className="font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--ink-3))]">
                Direct contact
              </p>
              <div className="mt-5 space-y-3">
                <a href="mailto:huzaifa.rb00@gmail.com" className={LINK_ROW}>
                  <Mail
                    className="h-[17px] w-[17px] flex-none"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  huzaifa.rb00@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/0xhuzaifa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_ROW}
                >
                  <Linkedin
                    className="h-[17px] w-[17px] flex-none"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  LinkedIn profile
                </a>
                <a
                  href="https://github.com/0xhuzaifa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_ROW}
                >
                  <Github
                    className="h-[17px] w-[17px] flex-none"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  GitHub profile
                </a>
              </div>
            </section>

            <section data-reveal className={`${BAND} p-6 md:p-7`}>
              <p className="font-data text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--yellow-deep))]">
                What to expect
              </p>
              <ol className="mt-5 space-y-4">
                {steps.map(({ step, text }) => (
                  <li key={step} className="flex gap-[14px]">
                    <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[9px] bg-[hsl(var(--yellow))] font-data text-[11px] font-bold">
                      {step}
                    </span>
                    <p className="pt-[5px] text-[14px] leading-[1.65] text-[hsl(var(--ink-2))]">
                      {text}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-[var(--ink-a08)] pt-5 text-[13px] leading-[1.65] text-[hsl(var(--ink-3))]">
                Best fit: SaaS platforms, CRMs, internal tools, and custom
                business systems.
              </p>
            </section>

            <section
              data-reveal
              className={`${BAND} flex items-center gap-4 p-6`}
            >
              <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full bg-[hsl(var(--yellow))]">
                <ArrowRight
                  className="h-[20px] w-[20px]"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </span>
              <p className="text-[14px] leading-[1.6] text-[hsl(var(--ink-2))]">
                Prefer to see the work first?{" "}
                <a
                  href="/systems"
                  className="font-bold text-[hsl(var(--ink-1))] underline decoration-[hsl(var(--yellow-deep))] decoration-2 underline-offset-4"
                >
                  Browse the projects
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </RevealContainer>
  );
}
