import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** Legacy prop from the tab-based IDE shell — ignored. */
  tabTitle?: string;
};

export function AppLink({ href, tabTitle: _tabTitle, ...props }: AppLinkProps) {
  const isInternal = href.startsWith("/");

  if (!isInternal) {
    return <a href={href} {...props} />;
  }

  return <Link href={href} {...props} />;
}
