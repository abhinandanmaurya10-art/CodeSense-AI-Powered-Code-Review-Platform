import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as Brand, B as Button } from "./button-DoGmHRBs.mjs";
import { s as saveAuthSession, b as signup, l as login } from "./api-keepKxd-.mjs";
import { s as stringType, o as objectType } from "../_libs/zod.mjs";
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
import "../_libs/lucide-react.mjs";
const loginSchema = objectType({
  email: stringType().trim().email("Enter a valid email").max(255),
  password: stringType().min(6, "Use at least 6 characters").max(100)
});
const signupSchema = loginSchema.extend({
  name: stringType().trim().min(2, "Enter your name").max(100)
});
function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("login");
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  async function submit(e) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const values = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password")
    };
    let authenticate;
    if (mode === "signup") {
      const result = signupSchema.safeParse(values);
      if (!result.success) {
        setError(result.error.issues[0]?.message ?? "Check your details");
        return;
      }
      authenticate = () => signup(result.data.name, result.data.email, result.data.password);
    } else {
      const result = loginSchema.safeParse(values);
      if (!result.success) {
        setError(result.error.issues[0]?.message ?? "Check your details");
        return;
      }
      authenticate = () => login(result.data.email, result.data.password);
    }
    setLoading(true);
    try {
      const session = await authenticate();
      saveAuthSession(session);
      await navigate({
        to: "/dashboard"
      });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "grid min-h-screen place-items-center bg-background p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md overflow-hidden rounded-3xl border border-border bg-panel shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-panel-deep p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "aria-label": "CodeSense AI home", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brand, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-5 p-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold", children: mode === "login" ? "Welcome back" : "Create your account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: mode === "login" ? "Sign in to continue your reviews" : "Start saving AI-powered code reviews" })
      ] }),
      mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm text-muted-foreground", children: [
        "Name",
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "name", type: "text", autoComplete: "name", className: "mt-2 h-12 w-full rounded-xl border border-border bg-secondary px-4 text-foreground outline-none focus:ring-2 focus:ring-ring" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm text-muted-foreground", children: [
        "Email",
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "email", type: "email", autoComplete: "email", placeholder: "alex@example.com", className: "mt-2 h-12 w-full rounded-xl border border-border bg-secondary px-4 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm text-muted-foreground", children: [
        "Password",
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "password", type: "password", autoComplete: mode === "login" ? "current-password" : "new-password", placeholder: "At least 6 characters", className: "mt-2 h-12 w-full rounded-xl border border-border bg-secondary px-4 text-foreground outline-none focus:ring-2 focus:ring-ring" })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "text-sm text-danger", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "hero", size: "lg", className: "w-full", disabled: loading, children: loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        mode === "login" ? "Don't have an account? " : "Already have an account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "text-primary", onClick: () => {
          setMode(mode === "login" ? "signup" : "login");
          setError("");
        }, children: mode === "login" ? "Sign up" : "Sign in" })
      ] })
    ] })
  ] }) });
}
export {
  Login as component
};
