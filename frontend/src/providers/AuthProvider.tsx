"use client";

import { type ReactNode, useEffect, useState } from "react";
import { clientApi, getAccessToken } from "../lib/api/client";
import { useAuthStore } from "../stores/authStore";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
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
  }, []);

  if (loading) return null;

  return <>{children}</>;
};