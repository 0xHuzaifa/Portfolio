import Link from "next/link";

const footerLinks = [
  { href: "/systems", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[hsl(var(--border))]/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-[hsl(var(--muted-foreground))] md:flex-row md:px-6">
        <p>© {new Date().getFullYear()} Huzaifa Ahmed — Full-Stack Developer</p>

        <nav className="flex items-center gap-4" aria-label="Footer">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[hsl(var(--foreground))]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/0xhuzaifa"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[hsl(var(--foreground))]"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/0xhuzaifa"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[hsl(var(--foreground))]"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
