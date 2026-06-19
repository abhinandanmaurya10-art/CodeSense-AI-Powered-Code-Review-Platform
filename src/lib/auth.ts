import { useSyncExternalStore } from "react";
import type { AuthResponse } from "@/lib/api";

const AUTH_STORAGE_KEY = "codesense-auth";
const AUTH_EVENT = "codesense-auth-change";
let cachedValue: string | null | undefined;
let cachedSession: AuthSession | null = null;

export type AuthSession = AuthResponse;

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (value === cachedValue) {
      return cachedSession;
    }

    cachedValue = value;
    cachedSession = value ? (JSON.parse(value) as AuthSession) : null;
    return cachedSession;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    cachedValue = null;
    cachedSession = null;
    return null;
  }
}

export function saveAuthSession(session: AuthSession) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

export function useAuthSession() {
  return useSyncExternalStore(subscribe, getAuthSession, () => null);
}
