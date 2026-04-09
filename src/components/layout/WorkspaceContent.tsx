"use client";

import { useEffect, useState } from "react";
import { useNavigation } from "@/contexts/NavigationContext";
import { routes } from "@/config/routes";
import { SystemPageContent } from "@/components/pages/SystemPageContent";
import { systemMap } from "@/data/systemMap";

export function WorkspaceContent({
  serverContent,
}: {
  serverContent: React.ReactNode;
}) {
  const { pathname } = useNavigation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Always render server content initially to avoid hydration mismatch
  if (!isClient) {
    return <>{serverContent}</>;
  }

  // 2. Static routes
  const RouteComponent = routes[pathname as keyof typeof routes];
  if (RouteComponent) {
    return <RouteComponent />;
  }

  // 3. Dynamic routes
  if (pathname.startsWith("/systems/")) {
    const slug = pathname.replace("/systems/", "");
    const system = systemMap[slug];

    if (system) {
      return <SystemPageContent system={system} />;
    }
  }

  // 4. Fallback
  return <>{serverContent}</>;
}
