import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { z } from "zod";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — CodeSense AI" }, { name: "description", content: "Log in to your CodeSense AI workspace." }, { property: "og:title", content: "Log in — CodeSense AI" }, { property: "og:description", content: "Log in to your CodeSense AI workspace." }] }),
  component: Login,
});

const schema = z.object({ email: z.string().trim().email("Enter a valid email").max(255), password: z.string().min(6, "Use at least 6 characters").max(100) });

function Login() {
  const navigate = useNavigate(); const [error,setError] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); const data = new FormData(e.currentTarget); const result = schema.safeParse({email:data.get("email"),password:data.get("password")}); if(!result.success){setError(result.error.issues[0]?.message ?? "Check your details");return;} navigate({to:"/dashboard"}); }
  return <main className="grid min-h-screen place-items-center bg-background p-5"><div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-panel shadow-2xl"><div className="border-b border-border bg-panel-deep p-6"><Brand /></div><form onSubmit={submit} className="space-y-5 p-7"><div><h1 className="text-3xl font-semibold">Welcome back</h1><p className="mt-1 text-muted-foreground">Sign in to continue your reviews</p></div><label className="block text-sm text-muted-foreground">Email<input name="email" type="email" placeholder="alex@example.com" className="mt-2 h-12 w-full rounded-xl border border-border bg-secondary px-4 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" /></label><label className="block text-sm text-muted-foreground">Password<input name="password" type="password" placeholder="••••••••" className="mt-2 h-12 w-full rounded-xl border border-border bg-secondary px-4 text-foreground outline-none focus:ring-2 focus:ring-ring" /></label>{error && <p role="alert" className="text-sm text-danger">{error}</p>}<Button type="submit" variant="hero" size="lg" className="w-full">Sign In</Button><div className="flex items-center gap-3 text-sm text-muted-foreground"><span className="h-px flex-1 bg-border"/>or continue with<span className="h-px flex-1 bg-border"/></div><Button type="button" variant="panel" size="lg" className="w-full"><Github />GitHub</Button><p className="text-center text-sm text-muted-foreground">Don&apos;t have an account? <Link to="/dashboard" className="text-primary">Try the demo</Link></p></form></div></main>;
}