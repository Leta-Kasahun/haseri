"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Shield, Loader2 } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useResetPassword } from "../hooks/useResetPassword";
import { passwordSchema } from "@/src/utils/validators";
import { getRequiredSchemaError } from "@/src/utils/validators/form";
import { useSearchParams } from "next/navigation";
import { PasswordStrengthMeter } from "@/src/components/auth/PasswordStrengthMeter";

export const ResetPasswordForm = () => {
  const { resetPassword, loading, error } = useResetPassword();
  const searchParams = useSearchParams();
  const userId = useMemo(() => searchParams.get("user_id"), [searchParams]);

  const [formData, setFormData] = useState({
    new_password: "",
    new_password_confirmation: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const validateField = (name: string, value: string) => {
    if (name === "new_password") {
      return getRequiredSchemaError(passwordSchema, value, "Password is required");
    }
    if (name === "new_password_confirmation") {
      if (!value.trim()) return "Password confirmation is required";
      return value === formData.new_password ? null : "Passwords do not match";
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
    if (name === "new_password" && touched.new_password_confirmation) {
      setErrors((prev) => ({
        ...prev,
        new_password_confirmation: validateField(
          "new_password_confirmation",
          formData.new_password_confirmation
        ),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = {
      new_password: validateField("new_password", formData.new_password),
      new_password_confirmation: validateField(
        "new_password_confirmation",
        formData.new_password_confirmation
      ),
    };

    setErrors(nextErrors);
    setTouched({ new_password: true, new_password_confirmation: true });
    if (Object.values(nextErrors).some((value) => value)) return;
    if (!userId) return;

    await resetPassword({
      user_id: userId,
      new_password: formData.new_password,
      new_password_confirmation: formData.new_password_confirmation,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-border/50 p-10 shadow-2xl shadow-primary/5 rounded-none"
      >
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/5 border border-primary/20 rounded-none mb-6">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-3">New Password</h1>
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            Secure your account with a new password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <Input
                name="new_password"
                type="password"
                placeholder="New password"
                value={formData.new_password}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({ ...prev, new_password: true }))}
                className="rounded-none border border-border h-12 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
              />
            </div>
            <PasswordStrengthMeter password={formData.new_password} />
            {touched.new_password && errors.new_password && (
              <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                {errors.new_password}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">Confirm Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <Input
                name="new_password_confirmation"
                type="password"
                placeholder="Confirm password"
                value={formData.new_password_confirmation}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({ ...prev, new_password_confirmation: true }))}
                className="rounded-none border border-border h-12 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
              />
            </div>
            {touched.new_password_confirmation && errors.new_password_confirmation && (
              <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                {errors.new_password_confirmation}
              </p>
            )}
          </div>

          {!userId && (
            <div className="p-4 bg-destructive/5 border-l-4 border-destructive text-destructive text-[10px] font-bold uppercase tracking-widest">
              Missing reset token. Please restart the reset process.
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/5 border-l-4 border-destructive text-destructive text-[10px] font-bold uppercase tracking-widest">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !userId}
            className="w-full h-16 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-950/20 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
