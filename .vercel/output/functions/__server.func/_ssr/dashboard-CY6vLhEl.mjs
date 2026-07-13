import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { D as DashboardShell } from "./dashboard-shell-DXcKe0Pc.mjs";
import { B as Button } from "./button-DoGmHRBs.mjs";
import { u as useAuthSession, g as getReviewHistory } from "./api-keepKxd-.mjs";
import { A as ArrowRight, d as Clock3, c as CodeXml } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function Dashboard() {
  const session = useAuthSession();
  const {
    data: reviews = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviewHistory(session.token),
    enabled: Boolean(session)
  });
  const average = reviews.length ? Math.round(reviews.reduce((sum, review) => sum + review.result.score, 0) / reviews.length) : 0;
  const languages = new Set(reviews.map((review) => review.language.toLowerCase())).size;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1e3;
  const thisWeek = reviews.filter((review) => new Date(review.createdAt).getTime() >= weekAgo).length;
  const trend = reviews.slice(0, 7).reverse();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl p-5 md:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Welcome back, ",
          session?.user.name ?? "developer"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold", children: "Dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "hero", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/review", children: [
        "Review Code ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7 grid grid-cols-2 gap-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { value: String(reviews.length), label: "Reviews", tone: "primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { value: String(average), label: "Avg Score", tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { value: String(languages), label: "Languages", tone: "purple" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { value: String(thisWeek), label: "This Week", tone: "warning" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "mb-5 rounded-xl border border-danger/40 bg-danger/10 p-4 text-danger", children: error instanceof Error ? error.message : "Could not load reviews" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6 xl:grid-cols-[1.3fr_0.7fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Recent reviews" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Saved in MongoDB" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading review history..." }) : reviews.length ? reviews.slice(0, 8).map((review) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review }, review._id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-dashed border-border bg-panel p-8 text-center text-muted-foreground", children: "No reviews yet. Submit your first code review to populate the dashboard." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-panel p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "size-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Quality trend" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-48 items-end gap-3", children: trend.length ? trend.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { title: `${review.language}: ${review.result.score}`, className: "min-h-1 flex-1 rounded-t-md bg-primary/70", style: {
          height: `${Math.max(review.result.score, 4)}%`
        } }, review._id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "m-auto text-sm text-muted-foreground", children: "Trend appears after your first review" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Older" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Latest" })
        ] })
      ] })
    ] })
  ] }) });
}
function Metric({
  value,
  label,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-panel p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-3xl font-semibold ${tone === "success" ? "text-success" : tone === "purple" ? "text-code-purple" : tone === "warning" ? "text-warning" : "text-primary"}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: label })
  ] });
}
function ReviewCard({
  review
}) {
  const findingCount = Object.values(review.result.issues).reduce((sum, issues) => sum + issues.length, 0);
  const tone = review.result.score >= 80 ? "success" : review.result.score >= 60 ? "warning" : "danger";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-border bg-panel p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "size-5 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
        review.language,
        " review"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-sm text-muted-foreground", children: [
        new Date(review.createdAt).toLocaleString(),
        " · ",
        findingCount,
        " findings ·",
        " ",
        review.result.summary
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-lg px-3 py-1 text-sm ${tone === "danger" ? "bg-danger/15 text-danger" : tone === "success" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`, children: review.result.score })
  ] });
}
export {
  Dashboard as component
};
