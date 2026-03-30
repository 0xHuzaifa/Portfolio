"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface Tab {
  id: string;
  href: string;
  title: string;
  closeable?: boolean;
}

interface TabContextType {
  tabs: Tab[];
  activeTab: string;
  openTab: (href: string, title?: string) => void;
  activateTab: (href: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

function titleFromPath(pathname: string) {
  if (pathname === "/") return "Home";
  const segments = pathname.split("/").filter(Boolean);
  const last = segments.length > 0 ? segments[segments.length - 1] : "Page";
  return last
    .split("-")
    .map((p) => (p ? p[0]?.toUpperCase() + p.slice(1) : p))
    .join(" ");
}

function tabFromPath(pathname: string): Tab {
  const href = pathname || "/";
  return {
    id: href,
    href,
    title: titleFromPath(href),
    closeable: href !== "/",
  };
}

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [tabs, setTabs] = useState<Tab[]>(() => [tabFromPath(pathname)]);
  const [activeTab, setActiveTab] = useState(() => pathname || "/");
  const tabsRef = useRef(tabs);

  useEffect(() => {
    tabsRef.current = tabs;
  }, [tabs]);

  useEffect(() => {
    const normalized = pathname || "/";
    setTabs((prev) => {
      const existing = prev.find((t) => t.href === normalized);
      if (existing) {
        setActiveTab(existing.id);
        return prev;
      }
      const derived = tabFromPath(normalized);
      setActiveTab(derived.id);
      return [derived, ...prev];
    });
  }, [pathname]);

  const activateTab = (href: string) => {
    const normalized = href || "/";
    setActiveTab(normalized);
    router.push(normalized, { scroll: false });
  };

  const openTab = (href: string, title?: string) => {
    const normalized = href || "/";
    const existingTab = tabsRef.current.find((tab) => tab.href === normalized);

    if (existingTab) {
      setActiveTab(existingTab.id);
      router.push(normalized, { scroll: false });
      return;
    }

    router.prefetch(normalized);

    const newTab: Tab = {
      id: normalized,
      href: normalized,
      title: title ?? titleFromPath(normalized),
      closeable: normalized !== "/",
    };

    setTabs((prev) => [...prev, newTab]);
    setActiveTab(newTab.id);
    router.push(normalized, { scroll: false });
  };

  const closeTab = (id: string) => {
    const tabIndex = tabs.findIndex((tab) => tab.id === id);
    const newTabs = tabs.filter((tab) => tab.id !== id);

    setTabs(newTabs);

    if (activeTab === id && newTabs.length > 0) {
      const nextTab = newTabs[Math.max(0, tabIndex - 1)];
      setActiveTab(nextTab.id);
      router.push(nextTab.href);
    }
  };

  return (
    <TabContext.Provider
      value={{ tabs, activeTab, openTab, activateTab, closeTab, setActiveTab }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error("useTabs must be used within TabProvider");
  return context;
};
