import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button, a as Brand } from "./button-DoGmHRBs.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { e as ShieldCheck, A as ArrowRight, G as Github, B as Bug, f as Gauge, M as Menu, g as CircleAlert, T as TriangleAlert, a as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const findings = [
  {
    icon: CircleAlert,
    title: "Logic Error",
    detail: "Missing await — returns Promise",
    tone: "danger"
  },
  {
    icon: TriangleAlert,
    title: "Performance",
    detail: "No error handling on fetch",
    tone: "warning"
  },
  {
    icon: CircleCheck,
    title: "Best Practice",
    detail: "Add try/catch + status check",
    tone: "success"
  }
];
function CodeReviewDemo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-panel shadow-2xl shadow-panel-deep/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border bg-panel-deep px-5 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-3 rounded-full bg-danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-3 rounded-full bg-warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-3 rounded-full bg-success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-sm text-muted-foreground", children: "app.js — CodeSense AI" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden gap-2 sm:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-primary/15 px-3 py-1 text-xs text-code-blue", children: "JavaScript" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-success/15 px-3 py-1 text-xs text-success", children: "Score: 87" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "code-grid min-h-80 border-b border-border p-6 font-mono text-sm leading-[2.35rem] md:border-r md:border-b-0 sm:text-base", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-5 text-muted-foreground", children: "1" }),
          "async",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-code-blue", children: "function" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success", children: "fetchUser" }),
          "(id) {"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-5 text-muted-foreground", children: "2" }),
          "  const res = await"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-warning", children: "    fetch(`/api/users/${id}`);" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "bg-danger/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-5 text-muted-foreground", children: "3" }),
          "  const data = res.json();",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger", children: "← missing await" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-5 text-muted-foreground", children: "4" }),
          "  return data;"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-5 text-muted-foreground", children: "5" }),
          "}"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground", children: "AI Review" }),
        findings.map(({ icon: Icon, title, detail, tone }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex gap-3 rounded-xl border p-4 ${tone === "danger" ? "border-danger/40 bg-danger/10" : tone === "warning" ? "border-warning/40 bg-warning/10" : "border-success/40 bg-success/10"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  className: `mt-0.5 size-5 shrink-0 ${tone === "danger" ? "text-danger" : tone === "warning" ? "text-warning" : "text-success"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: detail })
              ] })
            ]
          },
          title
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 flex-1 overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-[63%] bg-gradient-to-r from-primary to-code-purple" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "63/100" })
        ] })
      ] })
    ] })
  ] });
}
function SiteHeader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-2xl border border-border bg-panel/90 px-5 py-4 backdrop-blur md:px-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "aria-label": "CodeSense AI home", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brand, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-8 text-sm text-muted-foreground md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", hash: "features", className: "transition-colors hover:text-foreground", children: "Features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Free" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Docs" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden gap-2 md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "nav", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Log in" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "hero", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "Get Started" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "panel", size: "icon", className: "md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", "aria-label": "Open login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, {}) }) })
  ] });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-hidden bg-background px-4 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl py-20 text-center md:py-28", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7 inline-flex items-center gap-2 rounded-full border border-code-purple/50 bg-code-purple/10 px-4 py-2 text-sm font-medium text-code-purple", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4" }),
          "Powered by advanced AI"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-balance text-4xl font-medium leading-tight tracking-tight md:text-6xl", children: [
          "Review, Debug, and Improve",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Your Code with AI" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground", children: "Instantly analyze code quality, catch security vulnerabilities, and get AI-powered fixes — in seconds, not hours." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-9 flex flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "hero", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/review", children: [
            "Start Reviewing ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "panel", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://github.com", target: "_blank", rel: "noreferrer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Github, {}),
            "View on GitHub"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CodeReviewDemo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid gap-5 py-16 sm:grid-cols-3", children: [["2.4M+", "Reviews Generated", "primary"], ["7", "Languages Supported", "purple"], ["98.2%", "Accuracy Rate", "success"]].map(([value, label, tone]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-panel p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-4xl font-medium ${tone === "success" ? "text-success" : tone === "purple" ? "text-code-purple" : "text-primary"}`, children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: label })
      ] }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "features", className: "grid gap-5 pb-16 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Bug, title: "Error Detection", children: "Catch syntax errors, logic bugs, and runtime exceptions before they reach production." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: ShieldCheck, title: "Security Scanning", children: "Identify SQL injection, XSS, insecure auth, and OWASP vulnerabilities instantly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Gauge, title: "Performance Insights", children: "Get suggestions on time complexity, memory usage, and inefficient patterns." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mx-auto max-w-7xl border-t border-border pt-7 text-center text-sm uppercase tracking-widest text-muted-foreground", children: "CodeSense AI — Smarter code reviews" })
  ] });
}
function Feature({
  icon: Icon,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-panel p-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 grid size-12 place-items-center rounded-xl bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 leading-7 text-muted-foreground", children })
  ] });
}
export {
  Index as component
};
