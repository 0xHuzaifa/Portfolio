"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useTabs } from "@/contexts/TabContext";

type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  tabTitle?: string;
};

export function AppLink({
  href,
  onClick,
  tabTitle,
  target,
  rel,
  ...props
}: AppLinkProps) {
  const { openTab } = useTabs();
  const isInternal = href.startsWith("/");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      !isInternal ||
      target === "_blank" ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    openTab(href, tabTitle);
  };

  return (
    <a href={href} onClick={handleClick} target={target} rel={rel} {...props} />
  );
}
