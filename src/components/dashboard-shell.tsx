import { Link, useNavigate } from "@tanstack/react-router";
import { BarChart3, FilePlus2, LogOut, UserRound } from "lucide-react";
import { useEffect } from "react";
import { Brand } from "@/components/brand";
import { clearAuthSession, useAuthSession } from "@/lib/auth";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const session = useAuthSession();

  useEffect(() => {
    if (!session) {
      void navigate({ to: "/login" });
    }
  }, [navigate, session]);

  if (!session) {
    return (
      <main className="grid min-h-screen place-items-center bg-background text-muted-foreground">
        Checking your session...
      </main>
    );
  }

  const initials = session.user.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function logout() {
    clearAuthSession();
    void navigate({ to: "/login" });
  }

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="hidden min-h-screen border-r border-border bg-panel-deep lg:flex lg:flex-col">
        <div className="border-b border-border p-6">
          <Brand />
        </div>
        <nav className="space-y-2 p-4 text-muted-foreground">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest">Navigation</p>
          <NavLink to="/dashboard" icon={BarChart3}>
            Dashboard
          </NavLink>
          <NavLink to="/review" icon={FilePlus2}>
            New Review
          </NavLink>
        </nav>
        <div className="mt-auto flex items-center gap-3 border-t border-border p-5">
          <div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-primary to-code-purple font-semibold">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{session.user.name}</p>
            <p className="truncate text-sm text-muted-foreground">{session.user.email}</p>
          </div>
          <button type="button" onClick={logout} aria-label="Log out">
            <LogOut className="size-4 text-muted-foreground transition-colors hover:text-danger" />
          </button>
        </div>
      </aside>
      <main>{children}</main>
    </div>
  );
}

function NavLink({
  to,
  icon: Icon,
  children,
}: {
  to: "/dashboard" | "/review";
  icon: typeof UserRound;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      activeProps={{ className: "bg-primary/15 text-primary" }}
      className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-secondary hover:text-foreground"
    >
      <Icon className="size-5" />
      {children}
    </Link>
  );
}
