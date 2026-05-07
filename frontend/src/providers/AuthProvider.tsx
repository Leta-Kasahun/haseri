"use client";

import { type ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { clientApi, getAccessToken, setAccessToken } from "../lib/api/client";
import { useAuthStore } from "../stores/authStore";
import { adminAuthApi } from "../features/auth/admin/services/admin-auth.api";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname();
  const { setUser, setAdmin } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdminRoute = pathname.startsWith("/admin");
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    if (isAdminRoute) {
      adminAuthApi
        .refresh()
        .then(({ data }) => {
          const payload = data?.data;
          if (payload?.access_token) setAccessToken(payload.access_token);
          if (payload?.admin) setAdmin(payload.admin);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
      return;
    }

    clientApi
      .get("/customer/profile")
      .then(({ data }) => {
        if (data.data) setUser(data.data);
      })
      .catch(() => {
        clientApi
          .get("/technician/profile")
          .then(({ data }) => {
            if (data.data) setUser(data.data);
          })
          .catch(() => {});
      })
      .finally(() => setLoading(false));
  }, [pathname, setAdmin, setUser]);

  if (loading) return null;

  return <>{children}</>;
};