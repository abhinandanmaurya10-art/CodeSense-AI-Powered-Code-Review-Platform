import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, Code2 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { getReviewHistory, type Review } from "@/lib/api";
import { useAuthSession } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CodeSense AI" },
      {
        name: "description",
        content: "View code review activity and quality scores in CodeSense AI.",
      },
      { property: "og:title", content: "Dashboard — CodeSense AI" },
      {
        property: "og:description",
        content: "View code review activity and quality scores in CodeSense AI.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const session = useAuthSession();
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviewHistory(session!.token),
    enabled: Boolean(session),
  });
  const average = reviews.length
    ? Math.round(reviews.reduce((sum, review) => sum + review.result.score, 0) / reviews.length)
    : 0;
  const languages = new Set(reviews.map((review) => review.language.toLowerCase())).size;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const thisWeek = reviews.filter(
    (review) => new Date(review.createdAt).getTime() >= weekAgo,
  ).length;
  const trend = reviews.slice(0, 7).reverse();

  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl p-5 md:p-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Welcome back, {session?.user.name ?? "developer"}
            </p>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
          </div>
          <Button asChild variant="hero">
            <Link to="/review">
              Review Code <ArrowRight />
            </Link>
          </Button>
        </header>
        <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Metric value={String(reviews.length)} label="Reviews" tone="primary" />
          <Metric value={String(average)} label="Avg Score" tone="success" />
          <Metric value={String(languages)} label="Languages" tone="purple" />
          <Metric value={String(thisWeek)} label="This Week" tone="warning" />
        </div>
        {error && (
          <p
            role="alert"
            className="mb-5 rounded-xl border border-danger/40 bg-danger/10 p-4 text-danger"
          >
            {error instanceof Error ? error.message : "Could not load reviews"}
          </p>
        )}
        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent reviews</h2>
              <span className="text-sm text-muted-foreground">Saved in MongoDB</span>
            </div>
            <div className="space-y-3">
              {isLoading ? (
                <p className="text-muted-foreground">Loading review history...</p>
              ) : reviews.length ? (
                reviews.slice(0, 8).map((review) => <ReviewCard key={review._id} review={review} />)
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-panel p-8 text-center text-muted-foreground">
                  No reviews yet. Submit your first code review to populate the dashboard.
                </div>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-panel p-6">
            <div className="mb-5 flex items-center gap-2">
              <Clock3 className="size-5 text-primary" />
              <h2 className="font-semibold">Quality trend</h2>
            </div>
            <div className="flex h-48 items-end gap-3">
              {trend.length ? (
                trend.map((review) => (
                  <div
                    key={review._id}
                    title={`${review.language}: ${review.result.score}`}
                    className="min-h-1 flex-1 rounded-t-md bg-primary/70"
                    style={{ height: `${Math.max(review.result.score, 4)}%` }}
                  />
                ))
              ) : (
                <div className="m-auto text-sm text-muted-foreground">
                  Trend appears after your first review
                </div>
              )}
            </div>
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span>Older</span>
              <span>Latest</span>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

function Metric({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <div className="rounded-2xl border border-border bg-panel p-5">
      <p
        className={`text-3xl font-semibold ${tone === "success" ? "text-success" : tone === "purple" ? "text-code-purple" : tone === "warning" ? "text-warning" : "text-primary"}`}
      >
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const findingCount = Object.values(review.result.issues).reduce(
    (sum, issues) => sum + issues.length,
    0,
  );
  const tone =
    review.result.score >= 80 ? "success" : review.result.score >= 60 ? "warning" : "danger";

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-panel p-4">
      <Code2 className="size-5 text-primary" />
      <div className="min-w-0 flex-1">
        <p className="font-medium">{review.language} review</p>
        <p className="truncate text-sm text-muted-foreground">
          {new Date(review.createdAt).toLocaleString()} · {findingCount} findings ·{" "}
          {review.result.summary}
        </p>
      </div>
      <span
        className={`rounded-lg px-3 py-1 text-sm ${tone === "danger" ? "bg-danger/15 text-danger" : tone === "success" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}
      >
        {review.result.score}
      </span>
    </div>
  );
}
