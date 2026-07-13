import { r as reactExports } from "../_libs/react.mjs";
const AUTH_STORAGE_KEY = "codesense-auth";
const AUTH_EVENT = "codesense-auth-change";
let cachedValue;
let cachedSession = null;
function getAuthSession() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const value = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (value === cachedValue) {
      return cachedSession;
    }
    cachedValue = value;
    cachedSession = value ? JSON.parse(value) : null;
    return cachedSession;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    cachedValue = null;
    cachedSession = null;
    return null;
  }
}
function saveAuthSession(session) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(AUTH_EVENT));
}
function clearAuthSession() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}
function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}
function useAuthSession() {
  return reactExports.useSyncExternalStore(subscribe, getAuthSession, () => null);
}
const API_BASE_URL = "".replace(/\/$/, "");
async function request(path, options = {}, token) {
  if (!API_BASE_URL) {
    throw new Error(
      "The production API URL is not configured. Add VITE_API_URL in Vercel and redeploy."
    );
  }
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  } catch {
    throw new Error("Cannot reach the CodeSense API. Make sure the backend is running.");
  }
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.message || `Request failed with status ${response.status}`);
  }
  return body;
}
function login(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}
function signup(name, email, password) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  });
}
function analyzeCode(token, code, language) {
  return request(
    "/review/analyze",
    {
      method: "POST",
      body: JSON.stringify({ code, language })
    },
    token
  );
}
function getReviewHistory(token) {
  return request("/review/history", {}, token);
}
export {
  analyzeCode as a,
  signup as b,
  clearAuthSession as c,
  getReviewHistory as g,
  login as l,
  saveAuthSession as s,
  useAuthSession as u
};
