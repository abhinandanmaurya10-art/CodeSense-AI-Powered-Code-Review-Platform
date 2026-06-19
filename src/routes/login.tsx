import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { login, signup } from "@/lib/api";
import { saveAuthSession } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — CodeSense AI" },
      { name: "description", content: "Log in to your CodeSense AI workspace." },
      { property: "og:title", content: "Log in — CodeSense AI" },
      { property: "og:description", content: "Log in to your CodeSense AI workspace." },
    ],
  }),
  component: Login,
});

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Use at least 6 characters").max(100),
});

const signupSchema = loginSchema.extend({
  name: z.string().trim().min(2, "Enter your name").max(100),
});

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const data = new FormData(e.currentTarget);
    const values = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };

    let authenticate: () => ReturnType<typeof login>;

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
      await navigate({ to: "/dashboard" });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background p-5">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-panel shadow-2xl">
        <div className="border-b border-border bg-panel-deep p-6">
          <Link to="/" aria-label="CodeSense AI home">
            <Brand />
          </Link>
        </div>
        <form onSubmit={submit} className="space-y-5 p-7">
          <div>
            <h1 className="text-3xl font-semibold">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {mode === "login"
                ? "Sign in to continue your reviews"
                : "Start saving AI-powered code reviews"}
            </p>
          </div>
          {mode === "signup" && (
            <label className="block text-sm text-muted-foreground">
              Name
              <input
                name="name"
                type="text"
                autoComplete="name"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-secondary px-4 text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          )}
          <label className="block text-sm text-muted-foreground">
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@example.com"
              className="mt-2 h-12 w-full rounded-xl border border-border bg-secondary px-4 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="block text-sm text-muted-foreground">
            Password
            <input
              name="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              placeholder="At least 6 characters"
              className="mt-2 h-12 w-full rounded-xl border border-border bg-secondary px-4 text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          {error && (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="text-primary"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
              }}
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}
