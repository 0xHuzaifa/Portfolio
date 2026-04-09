"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { systems } from "@/data/systems";
import { getRouteTitle } from "@/lib/routes";

interface NavigationContextType {
  navigate: (href: string, options?: { replace?: boolean }) => void;
  pathname: string;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname || "/" : "/",
  );

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname || "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const system = pathname.startsWith("/systems/")
      ? systems.find((item) => item.slug === pathname.replace("/systems/", ""))
      : undefined;

    const pageTitle =
      system?.title ??
      getRouteTitle(pathname) ??
      "Huzaifa Ahmed - Full-Stack Developer";

    document.title = pageTitle.includes("Huzaifa Ahmed")
      ? pageTitle
      : `${pageTitle} | Huzaifa Ahmed`;
  }, [pathname]);

  const navigate = useCallback(
    (href: string, options?: { replace?: boolean }) => {
      const normalized = href || "/";

      const current = window.location.pathname || "/";
      const method = options?.replace ? "replaceState" : "pushState";

      if (current !== normalized) {
        window.history[method](window.history.state, "", normalized);
        setPathname(normalized);
      }

      window.scrollTo({ top: 0, behavior: "auto" });
    },
    [],
  );

  const value = useMemo(
    () => ({
      navigate,
      pathname,
    }),
    [navigate, pathname],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }

  return context;
}
