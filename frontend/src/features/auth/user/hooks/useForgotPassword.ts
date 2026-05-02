"use client";

import { useState } from "react";
import { userAuthApi } from "../services";
import type { ForgotPasswordInput } from "../types";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState<string | number | null>(null);

  const forgotPassword = async (data: ForgotPasswordInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await userAuthApi.forgotPassword(data);
      setUserId(res.data.data.user_id);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send reset link";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error, success, userId };
};