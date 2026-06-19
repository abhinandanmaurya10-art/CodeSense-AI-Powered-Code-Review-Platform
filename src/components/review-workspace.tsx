import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, Copy, Download, Play, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analyzeCode, type ReviewIssue, type ReviewResult } from "@/lib/api";
import { useAuthSession } from "@/lib/auth";

const starterCode = `async function validateUser(token) {
  if (token == null) {
    eval(token);
  }
  const user = await db.query(\`SELECT * FROM users WHERE token='\${token}'\`);
  return user;
}`;

const categories: Array<{ key: keyof ReviewResult["issues"]; label: string }> = [
  { key: "syntax", label: "Syntax" },
  { key: "logic", label: "Logic" },
  { key: "performance", label: "Performance" },
  { key: "security", label: "Security" },
  { key: "bestPractices", label: "Best Practices" },
];

const languageExtensions: Record<string, string> = {
  JavaScript: "js",
  TypeScript: "ts",
  Python: "py",
  Java: "java",
  Go: "go",
  C: "c",
  "C++": "cpp",
};

export function ReviewWorkspace() {
  const session = useAuthSession();
  const queryClient = useQueryClient();
  const [code, setCode] = useState(starterCode);
  const [language, setLanguage] = useState("JavaScript");
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const findings = result
    ? categories.flatMap(({ key, label }) =>
        result.issues[key].map((issue) => ({ issue, category: label })),
      )
    : [];

  return (
    <div className="grid min-h-[calc(100vh-1px)] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)]">
      <section className="border-r border-border bg-panel">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="h-11 rounded-xl border border-border bg-secondary px-4 font-semibold outline-none focus:ring-2 focus:ring-ring"
          >
            <option>JavaScript</option>
            <option>TypeScript</option>
            <option>Python</option>
            <option>Java</option>
            <option>Go</option>
            <option>C</option>
            <option>C++</option>
          </select>
          <Button variant="hero" size="lg" onClick={reviewCode} disabled={loading || !code.trim()}>
            <Play />
            {loading ? "Analyzing..." : "Review Code"}
          </Button>
        </div>
        <textarea
          value={code}
          onChange={(event) => setCode(event.target.value)}
          spellCheck={false}
          aria-label="Code to review"
          className="code-grid min-h-[32rem] w-full resize-y border-0 bg-panel p-7 font-mono text-sm leading-7 text-foreground outline-none sm:text-base"
        />
        {error && (
          <p
            role="alert"
            className="mx-6 mb-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
          >
            {error}
          </p>
        )}
        <div className="border-t border-border p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Fixed Code
            </p>
            <div className="flex gap-2">
              <Button
                variant="panel"
                size="sm"
                onClick={copyFixedCode}
                disabled={!result?.fixedCode}
              >
                <Copy />
                Copy
              </Button>
              <Button
                variant="panel"
                size="sm"
                onClick={downloadFixedCode}
                disabled={!result?.fixedCode}
              >
                <Download />
                Download
              </Button>
            </div>
          </div>
          <pre className="min-h-32 overflow-x-auto whitespace-pre-wrap rounded-xl bg-panel-deep p-5 font-mono text-sm text-success">
            {result?.fixedCode || "The AI-generated fix will appear here after analysis."}
          </pre>
        </div>
      </section>
      <aside className="bg-panel">
        <div className="flex items-center gap-6 border-b border-border p-6">
          <div
            className="grid size-24 place-items-center rounded-full"
            style={{
              background: `conic-gradient(var(--primary) ${result?.score ?? 0}%, var(--secondary) 0)`,
            }}
          >
            <div className="grid size-16 place-items-center rounded-full bg-panel text-2xl font-semibold">
              {result?.score ?? "--"}
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold">Quality Score</p>
            <p className={scoreTone(result?.score)}>
              {result ? scoreLabel(result.score) : "Awaiting review"}
            </p>
            <p className="text-sm text-muted-foreground">{findings.length} findings</p>
          </div>
        </div>
        {result?.summary && (
          <div className="border-b border-border p-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Summary
            </p>
            <p className="mt-2 leading-relaxed">{result.summary}</p>
          </div>
        )}
        <div className="space-y-3 p-5">
          {findings.length ? (
            findings.map(({ issue, category }, index) => (
              <Finding key={`${category}-${index}`} issue={issue} category={category} />
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Submit code to see syntax, logic, performance, security, and best-practice findings.
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function scoreLabel(score: number) {
  return score >= 80 ? "Good work" : score >= 60 ? "Needs improvement" : "Needs work";
}

function scoreTone(score?: number) {
  if (score === undefined) return "text-muted-foreground";
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-danger";
}

function Finding({ issue, category }: { issue: ReviewIssue; category: string }) {
  const severity = issue.severity?.toLowerCase() || "";
  const tone =
    severity.includes("critical") || severity.includes("high")
      ? "danger"
      : severity.includes("medium") || severity.includes("warning")
        ? "warning"
        : "success";
  const Icon =
    category === "Security"
      ? ShieldAlert
      : tone === "danger"
        ? ShieldAlert
        : tone === "warning"
          ? AlertTriangle
          : CheckCircle2;
  const line = issue.line !== null && issue.line !== undefined ? `Line ${issue.line}: ` : "";

  return (
    <div
      className={`flex gap-3 rounded-xl border p-4 ${tone === "danger" ? "border-danger/40 bg-danger/10" : tone === "warning" ? "border-warning/40 bg-warning/10" : "border-success/40 bg-success/10"}`}
    >
      <Icon
        className={`size-5 shrink-0 ${tone === "danger" ? "text-danger" : tone === "warning" ? "text-warning" : "text-success"}`}
      />
      <div>
        <p className="font-semibold">
          {category}
          {issue.severity ? ` · ${issue.severity}` : ""}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {line}
          {issue.message}
        </p>
      </div>
    </div>
  );
}
