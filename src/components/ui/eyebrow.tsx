import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-data text-[11px] font-medium uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]",
        className,
      )}
    >
      {children}
    </p>
  );
}
