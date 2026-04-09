"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigation } from "@/contexts/NavigationContext";
import { getRouteTitle } from "@/lib/routes";

export interface Tab {
  id: string;
  href: string;
  title: string;
  closeable?: boolean;
}

interface TabContextType {
  tabs: Tab[];
  openTab: (href: string, title?: string) => void;
  closeTab: (id: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

function titleFromPath(pathname: string) {
  const routeTitle = getRouteTitle(pathname);

  if (routeTitle) return routeTitle;

  if (pathname === "/") return "Home";

  const segments = pathname.split("/").filter(Boolean);
  const last = segments.length > 0 ? segments[segments.length - 1] : "Page";

  return last
    .split("-")
    .map((part) => (part ? part[0]?.toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function createTab(pathname: string): Tab {
  const href = pathname || "/";

  return {
    id: href,
    href,
    title: titleFromPath(href),
    closeable: href !== "/",
  };
}

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const { pathname, navigate } = useNavigation();

  // ONLY state: visited tabs
  const [tabs, setTabs] = useState<Tab[]>(() => [createTab(pathname)]);

  // Ensure current route exists in tabs
  const ensureTabExists = useCallback((href: string) => {
    const normalized = href || "/";

    setTabs((prev) => {
      const exists = prev.some((tab) => tab.href === normalized);
      if (exists) return prev;

      return [...prev, createTab(normalized)];
    });
  }, []);

  // Whenever navigation happens → ensure tab exists
  useEffect(() => {
    ensureTabExists(pathname);
  }, [pathname, ensureTabExists]);

  const openTab = (href: string, title?: string) => {
    const normalized = href || "/";

    setTabs((prev) => {
      const exists = prev.some((tab) => tab.href === normalized);
      if (exists) return prev;

      return [
        ...prev,
        {
          ...createTab(normalized),
          title: title ?? titleFromPath(normalized),
        },
      ];
    });

    navigate(normalized);
  };

  const closeTab = (id: string) => {
    let nextHref: string | null = null;

    setTabs((prev) => {
      const newTabs = prev.filter((tab) => tab.id !== id);

      if (pathname === id && newTabs.length > 0) {
        nextHref = newTabs[newTabs.length - 1].href;
      }

      return newTabs.length > 0 ? newTabs : [createTab("/")];
    });

    // ✅ SIDE EFFECT OUTSIDE setState
    if (nextHref) {
      navigate(nextHref);
    }
  };

  return (
    <TabContext.Provider value={{ tabs, openTab, closeTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabs must be used within TabProvider");
  }
  return context;
};
