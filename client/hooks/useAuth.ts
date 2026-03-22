import { useState, useCallback } from "react";
import type { AdminInfo } from "@shared/api";

const TOKEN_KEY = "lumina_admin_token";
const ADMIN_KEY = "lumina_admin_info";

export function useAuth() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );
  const [admin, setAdmin] = useState<AdminInfo | null>(() => {
    const stored = localStorage.getItem(ADMIN_KEY);
    return stored ? (JSON.parse(stored) as AdminInfo) : null;
  });

  const isAuthenticated = !!token;

  const login = useCallback((newToken: string, adminInfo: AdminInfo) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(adminInfo));
    setToken(newToken);
    setAdmin(adminInfo);
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    setToken(null);
    setAdmin(null);
  }, [token]);

  // Helper to make authenticated requests
  const authFetch = useCallback((url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  }, [token]);

  return { token, admin, isAuthenticated, login, logout, authFetch };
}
