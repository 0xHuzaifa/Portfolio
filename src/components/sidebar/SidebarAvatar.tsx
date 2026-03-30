import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const SidebarAvatar = () => {
  return (
    <div className="border-b border-[hsl(var(--vscode-border))] p-4">
      <div className="rounded-2xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))] p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 rounded-2xl border border-[hsl(var(--vscode-border))]">
            <AvatarImage src="/huzaifa.jpg" alt="Huzaifa Ahmed" />
            <AvatarFallback className="bg-[hsl(var(--vscode-accent))] text-[hsl(var(--vscode-bg))]">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[hsl(var(--vscode-text))]">
              Huzaifa Ahmed
            </p>
            <p className="truncate text-xs text-[hsl(var(--vscode-text-muted))]">
              Full-Stack Developer
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--vscode-success))]" />
          <span className="text-xs text-[hsl(var(--vscode-text-muted))]">
            Available for new builds
          </span>
        </div>
      </div>
    </div>
  );
};
