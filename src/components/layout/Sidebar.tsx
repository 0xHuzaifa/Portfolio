"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  VscChevronDown,
  VscChevronRight,
  VscFileCode,
  VscFolder,
  VscFolderOpened,
} from "react-icons/vsc";

import { SidebarAvatar } from "@/components/sidebar/SidebarAvatar";
import { useTabs } from "@/contexts/TabContext";
import { rootExplorerItems, systemExplorerItems } from "@/lib/routes";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onRequestClose?: () => void;
}

export function Sidebar({
  className,
  isOpen = true,
  onRequestClose,
}: SidebarProps) {
  const pathname = usePathname();
  const { openTab } = useTabs();
  const [isSystemsOpen, setIsSystemsOpen] = useState(true);
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;

    if (
      !onRequestClose ||
      typeof window === "undefined" ||
      !window.matchMedia("(max-width: 767px)").matches
    ) {
      return;
    }

    onRequestClose();
  }, [onRequestClose, pathname]);

  const handlePageOpen = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string,
    isActive: boolean,
  ) => {
    event.preventDefault();
    openTab(href, label);

    if (
      isActive &&
      onRequestClose &&
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches
    ) {
      onRequestClose();
    }
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute inset-0 z-20 bg-black/35 backdrop-blur-[1px] md:hidden"
          aria-label="Close file explorer"
        />
      )}

      <aside
        className={cn(
          "absolute inset-y-0 left-14 z-30 flex flex-col overflow-hidden bg-[hsl(var(--vscode-sidebar))]/96 backdrop-blur-xl transition-[width,transform,opacity,border-color] duration-300 ease-out md:static md:left-auto md:z-0",
          isOpen
            ? "w-[min(82vw,19rem)] translate-x-0 border-r border-[hsl(var(--vscode-border))] opacity-100 md:w-[19rem]"
            : "w-0 -translate-x-4 border-r border-transparent opacity-0",
          className,
        )}
        aria-label="File explorer"
      >
        <SidebarAvatar />

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-4 px-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--vscode-text-muted))]">
              Explorer
            </p>
            <p className="mt-1 text-xs text-[hsl(var(--vscode-text-muted))]/80">
              PORTFOLIO
            </p>
          </div>

          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => setIsSystemsOpen((open) => !open)}
              className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm text-[hsl(var(--vscode-text))] transition-colors hover:bg-[hsl(var(--vscode-hover))]"
            >
              {isSystemsOpen ? (
                <VscChevronDown className="shrink-0 text-[hsl(var(--vscode-text-muted))]" />
              ) : (
                <VscChevronRight className="shrink-0 text-[hsl(var(--vscode-text-muted))]" />
              )}
              {isSystemsOpen ? (
                <VscFolderOpened className="shrink-0 text-[hsl(var(--vscode-warm))]" />
              ) : (
                <VscFolder className="shrink-0 text-[hsl(var(--vscode-warm))]" />
              )}
              <span className="truncate font-medium">Systems</span>
            </button>

            {isSystemsOpen && (
              <div className="space-y-1 pl-6">
                {systemExplorerItems.map((item) => {
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(event) =>
                        handlePageOpen(event, item.href, item.fileLabel, active)
                      }
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-[hsl(var(--vscode-active))] text-[hsl(var(--vscode-text))]"
                          : "text-[hsl(var(--vscode-text-muted))] hover:bg-[hsl(var(--vscode-hover))] hover:text-[hsl(var(--vscode-text))]",
                      )}
                    >
                      <VscFileCode className="shrink-0 text-[hsl(var(--vscode-accent))]" />
                      <span className="truncate">{item.fileLabel}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {rootExplorerItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) =>
                    handlePageOpen(event, item.href, item.fileLabel, active)
                  }
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm transition-colors",
                    active
                      ? "bg-[hsl(var(--vscode-active))] text-[hsl(var(--vscode-text))]"
                      : "text-[hsl(var(--vscode-text-muted))] hover:bg-[hsl(var(--vscode-hover))] hover:text-[hsl(var(--vscode-text))]",
                  )}
                >
                  <VscFileCode className="shrink-0 text-[hsl(var(--vscode-accent))]" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
