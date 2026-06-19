export type User = {
  id: string;
  name: string;
  email: string;
};

export type ReviewIssue = {
  line: number | string | null;
  message: string;
  severity?: string;
};

export type ReviewResult = {
  score: number;
  issues: {
    syntax: ReviewIssue[];
    logic: ReviewIssue[];
    performance: ReviewIssue[];
    security: ReviewIssue[];
    bestPractices: ReviewIssue[];
  };
  fixedCode: string;
  summary: string;
};

export type Review = {
  _id: string;
  code: string;
  language: string;
  result: ReviewResult;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

const configuredApiUrl = import.meta.env.VITE_API_URL;
const API_BASE_URL = (
  configuredApiUrl ||
  (import.meta.env.DEV ? "http://localhost:5000/api" : "")
).replace(/\/$/, "");

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error(
      "The production API URL is not configured. Add VITE_API_URL in Vercel and redeploy.",
    );
  }

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  } catch {
    throw new Error("Cannot reach the CodeSense API. Make sure the backend is running.");
  }

  const body = (await response.json().catch(() => null)) as { message?: string } | null;

  if (!response.ok) {
    throw new Error(body?.message || `Request failed with status ${response.status}`);
  }

  return body as T;
}

export function login(email: string, password: string) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function signup(name: string, email: string, password: string) {
  return request<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function analyzeCode(token: string, code: string, language: string) {
  return request<Review>(
    "/review/analyze",
    {
      method: "POST",
      body: JSON.stringify({ code, language }),
    },
    token,
  );
}

export function getReviewHistory(token: string) {
  return request<Review[]>("/review/history", {}, token);
}

export function deleteReview(token: string, id: string) {
  return request<{ message: string }>(`/review/history/${id}`, { method: "DELETE" }, token);
}
