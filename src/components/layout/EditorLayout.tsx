"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { VscFileCode } from "react-icons/vsc";

import { useNavigation } from "@/contexts/NavigationContext";
import { getEditorLabel, getEditorTrail } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { TabBar } from "../tabs/TabBar";
import { ActivityBar } from "./ActivityBar";
import { AssistantPanel } from "./AssistantPanel";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { WorkspaceContent } from "./WorkspaceContent";

export interface EditorLayoutProps {
  children: ReactNode;
  className?: string;
  defaultSidebarOpen?: boolean;
}

export function EditorLayout({
  children,
  className,
  defaultSidebarOpen = true,
}: EditorLayoutProps) {
  const { pathname } = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(defaultSidebarOpen);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isLayoutCollapsed, setIsLayoutCollapsed] = useState(false);

  const editorLabel = getEditorLabel(pathname);
  const editorTrail = getEditorTrail(pathname);
  const showSidebar = !isLayoutCollapsed && isSidebarOpen;
  const showAssistant = !isLayoutCollapsed && isAssistantOpen;

  return (
    <div
      className={cn(
        "flex h-dvh w-full flex-col overflow-hidden bg-[hsl(var(--vscode-bg))] text-[hsl(var(--vscode-text))]",
        className,
      )}
    >
      <Header
        isLayoutCollapsed={isLayoutCollapsed}
        isAssistantOpen={showAssistant}
        onToggleLayout={() => setIsLayoutCollapsed((collapsed) => !collapsed)}
        onToggleAssistant={() => setIsAssistantOpen((open) => !open)}
      />

      <div className="relative flex min-h-0 flex-1">
        <div
          className={cn(
            "shrink-0 overflow-hidden border-r border-transparent transition-[width,opacity] duration-300 ease-out",
            isLayoutCollapsed ? "w-0 opacity-0" : "w-14 opacity-100",
          )}
        >
          <ActivityBar
            isExplorerOpen={showSidebar}
            onToggleExplorer={() => setIsSidebarOpen((open) => !open)}
          />
        </div>

        <Sidebar
          isOpen={showSidebar}
          onRequestClose={() => setIsSidebarOpen(false)}
        />

        <div className="relative flex min-w-0 flex-1 flex-col">
          <TabBar />

          <div className="flex h-10 items-center justify-between border-b border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))]/92 px-3 md:px-4">
            <div className="inline-flex items-center gap-2 text-sm text-[hsl(var(--vscode-text))]">
              <VscFileCode className="text-[hsl(var(--vscode-accent))]" />
              <span className="truncate">{editorLabel}</span>
            </div>
            <p className="hidden text-xs uppercase tracking-[0.24em] text-[hsl(var(--vscode-text-muted))] md:block">
              {editorTrail}
            </p>
          </div>

          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
              <WorkspaceContent serverContent={children} />
            </div>
          </main>
        </div>

        <AssistantPanel
          isOpen={showAssistant}
          onClose={() => setIsAssistantOpen(false)}
        />
      </div>
    </div>
  );
}
