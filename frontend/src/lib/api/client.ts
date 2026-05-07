import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";
import { env } from "@/src/config/env";

const TOKEN_KEY = "haseri_auth";

interface StoredAuth {
  accessToken: string | null;
}

const getStoredAuth = (): StoredAuth => {
  if (typeof window === "undefined") return { accessToken: null };
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : { accessToken: null };
  } catch {
    return { accessToken: null };
  }
};

const setStoredAuth = (token: string | null): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ accessToken: token }));
};

export const setAccessToken = (token: string | null): void => {
  setStoredAuth(token);
};

export const getAccessToken = (): string | null => {
  return getStoredAuth().accessToken;
};

const extractAccessToken = (data: unknown): string | null => {
  if (!data || typeof data !== "object") return null;
  const payload = data as Record<string, unknown>;
  return (
    (payload.access_token as string) ||
    (payload.token as string) ||
    ((payload.tokens as Record<string, string>)?.access_token) ||
    ((payload.data as Record<string, unknown>)?.access_token as string) ||
    null
  );
};

interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const clientApi = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: env.API_TIMEOUT_MS,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

clientApi.interceptors.request.use((config) => {
  const token = getStoredAuth().accessToken;
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

clientApi.interceptors.response.use(
  (response) => {
    const token = extractAccessToken(response.data);
    if (token) setStoredAuth(token);
    return response;
  },
  async (error: AxiosError) => {
    if (!error.config) return Promise.reject(new Error("An unexpected error occurred"));

    const config = error.config as CustomAxiosConfig;
    const url = config.url || "";
    const isRefreshRequest = url.includes("/refresh");
    const isLoginRequest = url.includes("/login");
    const isAdminRequest = url.startsWith("/admin") || url.startsWith("admin");
    const isAdminPage =
      typeof window !== "undefined" && window.location.pathname.startsWith("/admin");
    const isAdminContext = isAdminRequest || isAdminPage;

    if (error.response?.status === 401 && !config._retry && !isRefreshRequest && !isLoginRequest) {
      config._retry = true;
      try {
        const refreshResponse = await clientApi.post(
          isAdminContext ? "/admin/refresh" : "/auth/refresh"
        );
        const newToken = extractAccessToken(refreshResponse.data);
        if (newToken) {
          setStoredAuth(newToken);
          config.headers.Authorization = `Bearer ${newToken}`;
        }
        return clientApi(config);
      } catch {
        setStoredAuth(null);
        if (typeof window !== "undefined") {
          window.location.href = isAdminContext ? "/admin/login" : "/login";
        }
        return Promise.reject(new Error("Session expired"));
      }
    }

    const payload = error.response?.data as {
      error?: string;
      errors?: Record<string, string>;
    };

    const message = payload?.error || error.message || "Something went wrong";

    const apiError = Object.assign(new Error(message), {
      errors: payload?.errors ?? null,
      status: error.response?.status ?? null,
    });

    return Promise.reject(apiError);
  }
);