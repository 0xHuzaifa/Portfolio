"use client";

import { useTabs } from "@/contexts/TabContext";
import { cn } from "@/lib/utils";
import { TabItem } from "./TabItem";

export interface TabBarProps {
  className?: string;
}

export const TabBar = ({ className }: TabBarProps) => {
  const { tabs } = useTabs();

  return (
    <div
      className={cn(
        "flex items-stretch overflow-x-auto border-b border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar))] hover:cursor-pointer",
        className,
      )}
      role="tablist"
      aria-label="Open tabs"
    >
      {tabs.map((tab) => (
        <TabItem key={tab.id} tab={tab} />
      ))}
    </div>
  );
};
