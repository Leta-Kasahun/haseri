"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminAuthApi } from "../services/admin-auth.api";
import { useAuthStore } from "@/src/features/auth/user/store/auth.store";
import { toast } from "sonner";

export const useAdminLogin = () => {
  const router = useRouter();
  const setAdmin = useAuthStore((state) => state.setUser); // Reusing the same store for simplicity, or we could have a separate one
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"login" | "otp">("login");
  const [adminId, setAdminId] = useState<number | null>(null);

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminAuthApi.login(data);
      setAdminId(res.data.data.admin_id);
      setStep("otp");
      toast.success("OTP sent to your email");
    } catch (err: any) {
      const message = err?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (code: string) => {
    if (!adminId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await adminAuthApi.verifyOtp({ admin_id: adminId, code });
      // Assuming res.data.data contains the admin object and tokens are in cookies
      setAdmin(res.data.data.admin as any);
      router.push("/admin/dashboard");
      toast.success("Welcome back, Admin");
    } catch (err: any) {
      const message = err?.message || "OTP verification failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    verifyOtp,
    loading,
    error,
    step,
    setStep,
  };
};