/**
 * The yellow rule + label that opens every section on the redesigned site.
 *
 * `ui/eyebrow.tsx` still runs on the pre-redesign tokens and has no rule, so
 * the new sections carry their own — same markup the homepage uses, lifted here
 * once instead of repeated nine times down this page.
 */
export function AboutEyebrow({
  children,
  className = "",
  ruleClass = "",
}: {
  children: React.ReactNode;
  className?: string;
  ruleClass?: string;
}) {
  return (
    <div
      className={`flex items-center gap-[14px] lg:gap-[calc(14*var(--s))] ${className}`}
    >
      <span
        className={`ab-rule h-[3px] w-[38px] rounded-[2px] bg-[hsl(var(--yellow))] lg:w-[calc(38*var(--s))] ${ruleClass}`}
      />
      <span className="font-data text-[12px] font-semibold uppercase tracking-[0.18em] lg:text-[calc(13*var(--s))]">
        {children}
      </span>
    </div>
  );
}
