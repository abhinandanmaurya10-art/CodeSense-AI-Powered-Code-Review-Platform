import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { D as DashboardShell } from "./dashboard-shell-DXcKe0Pc.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-DoGmHRBs.mjs";
import { u as useAuthSession, a as analyzeCode } from "./api-keepKxd-.mjs";
import { P as Play, C as Copy, D as Download, S as ShieldAlert, T as TriangleAlert, a as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const starterCode = `async function validateUser(token) {
  if (token == null) {
    eval(token);
  }
  const user = await db.query(\`SELECT * FROM users WHERE token='\${token}'\`);
  return user;
}`;
const categories = [
  { key: "syntax", label: "Syntax" },
  { key: "logic", label: "Logic" },
  { key: "performance", label: "Performance" },
  { key: "security", label: "Security" },
  { key: "bestPractices", label: "Best Practices" }
];
const languageExtensions = {
  JavaScript: "js",
  TypeScript: "ts",
  Python: "py",
  Java: "java",
  Go: "go",
  C: "c",
  "C++": "cpp"
};
function ReviewWorkspace() {
  const session = useAuthSession();
  const queryClient = useQueryClient();
  const [code, setCode] = reactExports.useState(starterCode);
  const [language, setLanguage] = reactExports.useState("JavaScript");
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  async function reviewCode() {
    if (!session || !code.trim()) {
      return;
    }
    setLoading(true);
    setError("");
    try {
      const review = await analyzeCode(session.token, code, language);
      setResult(review.result);
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to review code");
    } finally {
      setLoading(false);
    }
  }
  async function copyFixedCode() {
    if (result?.fixedCode) {
      await navigator.clipboard.writeText(result.fixedCode);
    }
  }
  function downloadFixedCode() {
    if (!result?.fixedCode) {
      return;
    }
    const extension = languageExtensions[language] || "txt";
    const url = URL.createObjectURL(new Blob([result.fixedCode], { type: "text/plain" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `codesense-fixed.${extension}`;
    anchor.click();
    URL.revokeObjectURL(url);
  }
  const findings = result ? categories.flatMap(
    ({ key, label }) => result.issues[key].map((issue) => ({ issue, category: label }))
  ) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-[calc(100vh-1px)] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "border-r border-border bg-panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 border-b border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: language,
            onChange: (event) => setLanguage(event.target.value),
            className: "h-11 rounded-xl border border-border bg-secondary px-4 font-semibold outline-none focus:ring-2 focus:ring-ring",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "JavaScript" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "TypeScript" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Python" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Java" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Go" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "C" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "C++" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "hero", size: "lg", onClick: reviewCode, disabled: loading || !code.trim(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, {}),
          loading ? "Analyzing..." : "Review Code"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: code,
          onChange: (event) => setCode(event.target.value),
          spellCheck: false,
          "aria-label": "Code to review",
          className: "code-grid min-h-[32rem] w-full resize-y border-0 bg-panel p-7 font-mono text-sm leading-7 text-foreground outline-none sm:text-base"
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          role: "alert",
          className: "mx-6 mb-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger",
          children: error
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Fixed Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "panel",
                size: "sm",
                onClick: copyFixedCode,
                disabled: !result?.fixedCode,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, {}),
                  "Copy"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "panel",
                size: "sm",
                onClick: downloadFixedCode,
                disabled: !result?.fixedCode,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, {}),
                  "Download"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "min-h-32 overflow-x-auto whitespace-pre-wrap rounded-xl bg-panel-deep p-5 font-mono text-sm text-success", children: result?.fixedCode || "The AI-generated fix will appear here after analysis." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "bg-panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 border-b border-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid size-24 place-items-center rounded-full",
            style: {
              background: `conic-gradient(var(--primary) ${result?.score ?? 0}%, var(--secondary) 0)`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid size-16 place-items-center rounded-full bg-panel text-2xl font-semibold", children: result?.score ?? "--" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold", children: "Quality Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: scoreTone(result?.score), children: result ? scoreLabel(result.score) : "Awaiting review" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            findings.length,
            " findings"
          ] })
        ] })
      ] }),
      result?.summary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 leading-relaxed", children: result.summary })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 p-5", children: findings.length ? findings.map(({ issue, category }, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Finding, { issue, category }, `${category}-${index}`)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: "Submit code to see syntax, logic, performance, security, and best-practice findings." }) })
    ] })
  ] });
}
function scoreLabel(score) {
  return score >= 80 ? "Good work" : score >= 60 ? "Needs improvement" : "Needs work";
}
function scoreTone(score) {
  if (score === void 0) return "text-muted-foreground";
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-danger";
}
function Finding({ issue, category }) {
  const severity = issue.severity?.toLowerCase() || "";
  const tone = severity.includes("critical") || severity.includes("high") ? "danger" : severity.includes("medium") || severity.includes("warning") ? "warning" : "success";
  const Icon = category === "Security" ? ShieldAlert : tone === "danger" ? ShieldAlert : tone === "warning" ? TriangleAlert : CircleCheck;
  const line = issue.line !== null && issue.line !== void 0 ? `Line ${issue.line}: ` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex gap-3 rounded-xl border p-4 ${tone === "danger" ? "border-danger/40 bg-danger/10" : tone === "warning" ? "border-warning/40 bg-warning/10" : "border-success/40 bg-success/10"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Icon,
          {
            className: `size-5 shrink-0 ${tone === "danger" ? "text-danger" : tone === "warning" ? "text-warning" : "text-success"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold", children: [
            category,
            issue.severity ? ` · ${issue.severity}` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm leading-relaxed text-muted-foreground", children: [
            line,
            issue.message
          ] })
        ] })
      ]
    }
  );
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewWorkspace, {}) });
export {
  SplitComponent as component
};
