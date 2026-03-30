"use client";

import { Check, Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Theme, useTheme } from "@/contexts/ThemeContext";

const themes: readonly { value: Theme; label: string; color: string }[] = [
  { value: "default", label: "VS Code Dark", color: "hsl(207, 100%, 50%)" },
  { value: "ocean", label: "Ocean Blue", color: "hsl(200, 90%, 45%)" },
  { value: "sunset", label: "Sunset Orange", color: "hsl(20, 90%, 55%)" },
  { value: "forest", label: "Forest Green", color: "hsl(145, 65%, 45%)" },
];

export const SidebarSettings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center rounded px-2 py-2 text-sm transition-colors hover:bg-[hsl(var(--vscode-hover))]"
        >
          <Settings className="mr-2 h-4 w-4 text-[hsl(var(--vscode-accent))]" />
          <span className="text-[hsl(var(--vscode-text))]">Settings</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="z-50 w-56 border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar))]"
        align="end"
        side="top"
      >
        <DropdownMenuLabel className="text-[hsl(var(--vscode-text))]">
          Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[hsl(var(--vscode-border))]" />

        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className="flex cursor-pointer items-center justify-between text-[hsl(var(--vscode-text))] hover:bg-[hsl(var(--vscode-hover))]"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border border-[hsl(var(--vscode-border))]"
                style={{ backgroundColor: t.color }}
              />
              <span>{t.label}</span>
            </div>

            {theme === t.value && (
              <Check className="h-4 w-4 text-[hsl(var(--vscode-accent))]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
