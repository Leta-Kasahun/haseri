import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";
import { env } from "@/src/config/env";

const TOKEN_KEY = "haseri_auth";

interface StoredAuth {
  accessToken: string | null;
  role: "admin" | "user" | null;
}

const getStoredAuth = (): StoredAuth => {
  if (typeof window === "undefined") return { accessToken: null, role: null };
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : { accessToken: null, role: null };
  } catch {
    return { accessToken: null, role: null };
  }
};

const setStoredAuth = (token: string | null, role?: "admin" | "user" | null): void => {
  if (typeof window === "undefined") return;
  const current = getStoredAuth();
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({
      accessToken: token,
      role: role !== undefined ? role : current.role,
    })
  );
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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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
    if (token) {
      const url = response.config.url || "";
      // Only update role if it's an explicit auth-related path
      const isAuthPath = url.includes("/login") || url.includes("/verify-otp") || url.includes("/refresh");
      if (isAuthPath) {
        const isAdminPath = url.includes("/admin/");
        setStoredAuth(token, isAdminPath ? "admin" : "user");
      } else {
        setStoredAuth(token); // Update token but keep current role
      }
    }
    return response;
  },
  async (error: AxiosError) => {
    if (!error.config) return Promise.reject(new Error("An unexpected error occurred"));

    const config = error.config as CustomAxiosConfig;
    const url = config.url || "";
    const isRefreshRequest = url.includes("/refresh");
    const isLoginRequest = url.includes("/login");
    
    const auth = getStoredAuth();
    const isAdminRequest = url.includes("/admin/");
    const isAdminPage =
      typeof window !== "undefined" && window.location.pathname.startsWith("/admin");
    const isAdminContext = auth.role === "admin" || isAdminRequest || isAdminPage;

    if (error.response?.status === 401 && !config._retry && !isRefreshRequest && !isLoginRequest) {
      // 1. Check if token was already refreshed by another request/tab
      const currentAuth = getStoredAuth();
      const usedToken = config.headers.Authorization?.toString().replace("Bearer ", "");
      
      if (currentAuth.accessToken && currentAuth.accessToken !== usedToken) {
        config._retry = true;
        config.headers.Authorization = `Bearer ${currentAuth.accessToken}`;
        return clientApi(config);
      }

      // 2. Handle simultaneous refresh attempts in the same tab
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            config._retry = true;
            config.headers.Authorization = `Bearer ${token}`;
            return clientApi(config);
          })
          .catch((err) => Promise.reject(err));
      }

      config._retry = true;
      isRefreshing = true;

      try {
        let newToken: string | null = null;

        // 1. Try admin refresh first if on admin route
        if (typeof window !== "undefined" && window.location.pathname.includes("/admin")) {
          try {
            const adminRes = await axios.post(`${env.API_BASE_URL}/admin/refresh`, {}, { withCredentials: true });
            newToken = extractAccessToken(adminRes.data);
            if (newToken) setStoredAuth(newToken, "admin");
          } catch (e) {
            // Admin refresh failed, continue to user refresh
          }
        }

        // 2. Try user refresh if admin refresh failed or not on admin route
        if (!newToken) {
          const userRes = await axios.post(`${env.API_BASE_URL}/auth/refresh`, {}, { withCredentials: true });
          newToken = extractAccessToken(userRes.data);
          if (newToken) setStoredAuth(newToken, "user");
        }
        
        if (newToken) {
          processQueue(null, newToken);
          config.headers.Authorization = `Bearer ${newToken}`;
          return clientApi(config);
        }
        throw new Error("Token refresh failed");
      } catch (refreshError) {
        processQueue(refreshError);
        setStoredAuth(null, null);
        
        // Prevent redirect loop if already on login page
        if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
          window.location.href = isAdminContext ? "/admin/login" : "/login";
        }
        return Promise.reject(new Error("Session expired"));
      } finally {
        isRefreshing = false;
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