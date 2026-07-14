import { Link } from "@tanstack/react-router";
import { BarChart3, Clock3, FilePlus2, LogOut, Settings, UserRound } from "lucide-react";
import { Brand } from "@/components/brand";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="hidden min-h-screen border-r border-border bg-panel-deep lg:flex lg:flex-col">
        <div className="border-b border-border p-6"><Brand /></div>
        <nav className="space-y-2 p-4 text-muted-foreground">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest">Navigation</p>
          <NavLink to="/dashboard" icon={BarChart3}>Dashboard</NavLink>
          <NavLink to="/review" icon={FilePlus2}>New Review</NavLink>
          <div className="flex items-center gap-3 rounded-xl px-4 py-3"><Clock3 className="size-5" />History</div>
          <div className="flex items-center gap-3 rounded-xl px-4 py-3"><Settings className="size-5" />Settings</div>
        </nav>
        <div className="mt-auto flex items-center gap-3 border-t border-border p-5"><div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-primary to-code-purple font-semibold">AK</div><div className="flex-1"><p className="font-medium">Alex K.</p><p className="text-sm text-muted-foreground">Pro Plan</p></div><LogOut className="size-4 text-muted-foreground" /></div>
      </aside>
      <main>{children}</main>
    </div>
  );
}

function NavLink({ to, icon: Icon, children }: { to: "/dashboard" | "/review"; icon: typeof UserRound; children: React.ReactNode }) {
  return <Link to={to} activeProps={{ className: "bg-primary/15 text-primary" }} className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-secondary hover:text-foreground"><Icon className="size-5" />{children}</Link>;
}