import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as Brand } from "./button-DoGmHRBs.mjs";
import { u as useAuthSession, c as clearAuthSession } from "./api-0HE1e1tw.mjs";
import { b as ChartColumn, F as FilePlusCorner, L as LogOut } from "../_libs/lucide-react.mjs";
function DashboardShell({ children }) {
  const navigate = useNavigate();
  const session = useAuthSession();
  reactExports.useEffect(() => {
    if (!session) {
      void navigate({ to: "/login" });
    }
  }, [navigate, session]);
  if (!session) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "grid min-h-screen place-items-center bg-background text-muted-foreground", children: "Checking your session..." });
  }
  const initials = session.user.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  function logout() {
    clearAuthSession();
    void navigate({ to: "/login" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background lg:grid lg:grid-cols-[17rem_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden min-h-screen border-r border-border bg-panel-deep lg:flex lg:flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brand, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-2 p-4 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pb-2 text-xs font-semibold uppercase tracking-widest", children: "Navigation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/dashboard", icon: ChartColumn, children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/review", icon: FilePlusCorner, children: "New Review" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center gap-3 border-t border-border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid size-11 place-items-center rounded-full bg-gradient-to-br from-primary to-code-purple font-semibold", children: initials }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: session.user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-muted-foreground", children: session.user.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: logout, "aria-label": "Log out", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4 text-muted-foreground transition-colors hover:text-danger" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children })
  ] });
}
function NavLink({
  to,
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      activeProps: { className: "bg-primary/15 text-primary" },
      className: "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-secondary hover:text-foreground",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" }),
        children
      ]
    }
  );
}
export {
  DashboardShell as D
};
