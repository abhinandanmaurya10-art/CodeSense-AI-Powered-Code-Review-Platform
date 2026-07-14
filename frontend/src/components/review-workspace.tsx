import { useState } from "react";
import { AlertTriangle, CheckCircle2, Copy, Download, Play, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReviewWorkspace() {
  const [reviewed, setReviewed] = useState(false);
  const [language, setLanguage] = useState("JavaScript");
  return (
    <div className="grid min-h-[calc(100vh-1px)] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)]">
      <section className="border-r border-border bg-panel">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-11 rounded-xl border border-border bg-secondary px-4 font-semibold outline-none focus:ring-2 focus:ring-ring">
            <option>JavaScript</option><option>Python</option><option>Go</option>
          </select>
          <Button variant="hero" size="lg" onClick={() => setReviewed(true)}><Play />Review Code</Button>
        </div>
        <div className="code-grid min-h-[24rem] p-7 font-mono text-sm leading-[2.35rem] sm:text-base">
          <p><span className="mr-6 text-muted-foreground">1</span>async <span className="text-code-blue">function</span> <span className="text-success">validateUser</span>(token) &#123;</p>
          <p><span className="mr-6 text-muted-foreground">2</span>&nbsp; if (token == null) &#123;</p>
          <p className="bg-danger/10 text-danger"><span className="mr-6 text-muted-foreground">3</span>&nbsp;&nbsp;&nbsp; eval(token);</p>
          <p><span className="mr-6 text-muted-foreground">4</span>&nbsp; &#125;</p>
          <p className="bg-warning/10 text-warning"><span className="mr-6 text-muted-foreground">5</span>&nbsp; const user = await db.query(`SELECT * FROM users WHERE token='$&#123;token&#125;'`);</p>
          <p><span className="mr-6 text-muted-foreground">6</span>&nbsp; return user;</p><p>&#125;</p>
        </div>
        <div className="border-t border-border p-6">
          <div className="mb-4 flex items-center justify-between"><p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Fixed Code</p><div className="flex gap-2"><Button variant="panel" size="sm"><Copy />Copy</Button><Button variant="panel" size="sm"><Download />Download</Button></div></div>
          <pre className="overflow-x-auto rounded-xl bg-panel-deep p-5 font-mono text-sm text-success">{`async function validateUser(token) {\n  if (!token || typeof token !== 'string') {\n    throw new Error('Invalid token');\n  }\n  return db.query('SELECT * FROM users WHERE token = ?', [token]);\n}`}</pre>
        </div>
      </section>
      <aside className="bg-panel">
        <div className="flex items-center gap-6 border-b border-border p-6"><div className="grid size-24 place-items-center rounded-full bg-[conic-gradient(var(--primary)_63%,var(--secondary)_0)]"><div className="grid size-16 place-items-center rounded-full bg-panel text-2xl font-semibold">{reviewed ? 87 : 63}</div></div><div><p className="text-xl font-semibold">Quality Score</p><p className={reviewed ? "text-success" : "text-warning"}>{reviewed ? "Good work" : "Needs Work"}</p><p className="text-sm text-muted-foreground">2 critical · 1 warning</p></div></div>
        <div className="flex gap-2 border-b border-border p-4"><span className="rounded-lg bg-primary/15 px-4 py-2 text-primary">Syntax</span><span className="px-4 py-2 text-muted-foreground">Logic</span><span className="px-4 py-2 text-muted-foreground">Security</span></div>
        <div className="space-y-3 p-5">
          <Finding icon={ShieldAlert} title="SQL Injection Risk" detail="Line 5: Use parameterized statements." tone="danger" />
          <Finding icon={ShieldAlert} title="Dangerous eval() call" detail="Line 3: eval() on user input is a critical risk." tone="danger" />
          <Finding icon={AlertTriangle} title="Loose equality (==)" detail="Line 2: Use strict equality (===)." tone="warning" />
          <Finding icon={CheckCircle2} title="Add input validation" detail="Validate token type and length before processing." tone="success" />
        </div>
      </aside>
    </div>
  );
}

function Finding({ icon: Icon, title, detail, tone }: { icon: typeof ShieldAlert; title: string; detail: string; tone: "danger" | "warning" | "success" }) {
  return <div className={`flex gap-3 rounded-xl border p-4 ${tone === "danger" ? "border-danger/40 bg-danger/10" : tone === "warning" ? "border-warning/40 bg-warning/10" : "border-success/40 bg-success/10"}`}><Icon className={`size-5 shrink-0 ${tone === "danger" ? "text-danger" : tone === "warning" ? "text-warning" : "text-success"}`} /><div><p className="font-semibold">{title}</p><p className="text-sm leading-relaxed text-muted-foreground">{detail}</p></div></div>;
}