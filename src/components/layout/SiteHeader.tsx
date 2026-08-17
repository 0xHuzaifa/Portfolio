"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { scale, stageStyle } from "@/components/portfolio/stage";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT ME" },
  { href: "/systems", label: "PROJECTS" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname intentionally re-runs effect to close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    // The page canvas, full bleed. The header is `fixed`, so without a ground
    // of its own every page's copy scrolled visibly behind the wordmark. Same
    // colour as the body, not a tint: it should read as the page ending at the
    // top edge, not as a bar laid over it.
    <header style={stageStyle} className="fixed inset-x-0 top-0 z-50">
      <div
        style={scale}
        className="site-nav mx-auto flex h-[88px] items-center justify-between px-6 md:px-11 lg:h-[calc(88*var(--s))] lg:w-[calc(1620*var(--s))] lg:px-[calc(44*var(--s))]"
      >
        <Link
          href="/"
          className="text-xl tracking-[-0.02em] md:text-2xl lg:text-[calc(28*var(--s))]"
          aria-label="Home"
        >
          <span className="font-medium">0x</span>
          <span className="font-bold">HUZAIFA</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-[30px] lg:gap-[calc(32*var(--s))]">
          <nav
            className="hidden items-center gap-[18px] md:flex lg:gap-[calc(20*var(--s))]"
            aria-label="Main"
          >
            {navItems.map((item, i) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <div
                  key={item.href}
                  className="flex items-center gap-[18px] lg:gap-[calc(20*var(--s))]"
                >
                  {i > 0 && (
                    <span className="h-3.5 w-px bg-[var(--ink-a12)] lg:h-[calc(15*var(--s))]" />
                  )}
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-[15px] font-semibold tracking-[0.02em] transition-opacity duration-200 lg:text-[calc(18*var(--s))]",
                      active
                        ? "text-[hsl(var(--ink-1))]"
                        : "text-[hsl(var(--ink-1))]/60 hover:text-[hsl(var(--ink-1))]",
                    )}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className="hidden items-center gap-[9px] rounded-full bg-[hsl(var(--yellow))] px-[22px] py-[13px] text-sm font-bold tracking-[0.03em] text-[hsl(var(--ink-1))] shadow-[var(--shadow-sm)] transition-[transform,background-color] duration-200 hover:-translate-y-[3px] hover:bg-[hsl(var(--yellow-deep))] md:inline-flex lg:gap-[calc(9*var(--s))] lg:px-[calc(24*var(--s))] lg:py-[calc(14*var(--s))] lg:text-[calc(16*var(--s))]"
          >
            LET&apos;S TALK
            <ArrowRight
              className="h-[15px] w-[15px] lg:h-[calc(16*var(--s))] lg:w-[calc(16*var(--s))]"
              strokeWidth={2.4}
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border-ink)] bg-[var(--glass-fill-strong)] backdrop-blur-md md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="mx-6 rounded-[24px] border border-[var(--glass-border)] bg-[var(--glass-fill-strong)] p-3 shadow-[var(--shadow)] backdrop-blur-xl md:hidden"
          aria-label="Mobile"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-sm font-semibold tracking-[0.02em] hover:bg-[var(--ink-a04)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-1 flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--yellow))] px-5 py-3 text-sm font-bold tracking-[0.03em]"
          >
            LET&apos;S TALK
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </nav>
      )}
    </header>
  );
}
