"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { motion } from "framer-motion";
import { useRegister } from "../hooks/useRegister";
import { Mail, Phone, Lock, User, ArrowRight, UserCircle } from "lucide-react";
import { RegisterInput, UserRole } from "../types";
import { emailSchema, phoneSchema, passwordSchema } from "@/src/utils/validators";
import { getRequiredSchemaError, getSchemaError } from "@/src/utils/validators/form";
import { PasswordStrengthMeter } from "@/src/components/auth/PasswordStrengthMeter";

interface RegisterFormProps {
  role?: UserRole;
  mode?: "details" | "role";
  submitLabel?: string;
  onSubmit?: (data: Omit<RegisterInput, "role">) => Promise<void>;
}

export const RegisterForm = ({
  role,
  mode = "role",
  submitLabel,
  onSubmit,
}: RegisterFormProps) => {
  const { register, loading, error } = useRegister();
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const isExternalSubmit = typeof onSubmit === "function";
  const isLoading = isExternalSubmit ? submitting : loading;
  const formError = isExternalSubmit ? localError : error;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
    if (name === "password" && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField("confirmPassword", formData.confirmPassword),
      }));
    }
  };

  const validateField = (name: string, value: string) => {
    if (name === "first_name") return value.trim() ? null : "First name is required";
    if (name === "last_name") return value.trim() ? null : "Last name is required";
    if (name === "email") return value ? getSchemaError(emailSchema, value) : null;
    if (name === "phone") return value ? getSchemaError(phoneSchema, value) : null;
    if (name === "password") return getRequiredSchemaError(passwordSchema, value, "Password is required");
    if (name === "confirmPassword") {
      if (!value.trim()) return "Confirm password is required";
      return value === formData.password ? null : "Passwords do not match";
    }
    return null;
  };

  const credentialError = useMemo(() => {
    if (formData.email.trim() || formData.phone.trim()) return null;
    return "Email or phone is required";
  }, [formData.email, formData.phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: Record<string, string | null> = {
      first_name: validateField("first_name", formData.first_name),
      last_name: validateField("last_name", formData.last_name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      password: validateField("password", formData.password),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword),
      credential: credentialError,
    };

    setErrors(nextErrors);
    setTouched({
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    const hasError = Object.values(nextErrors).some((value) => value);
    if (hasError) return;

    const { confirmPassword, ...submitData } = formData;
    if (isExternalSubmit) {
      setSubmitting(true);
      setLocalError(null);
      try {
        await onSubmit?.(submitData);
      } catch (err: any) {
        const message = err?.message || "Registration failed";
        setLocalError(message);
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (!role) return;
    await register({ ...submitData, role });
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
            <UserCircle className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-3">
            {role ? (
              <>
                Join as <span className="text-primary">{role}</span>
              </>
            ) : (
              "Create your account"
            )}
          </h1>
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            {role ? "Begin your journey with Haseri" : "Start with your account details"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">First Name</label>
              <Input
                name="first_name"
                placeholder="John"
                value={formData.first_name}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({ ...prev, first_name: true }))}
                className="rounded-none border border-border h-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
              />
              {touched.first_name && errors.first_name && (
                <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                  {errors.first_name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">Last Name</label>
              <Input
                name="last_name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({ ...prev, last_name: true }))}
                className="rounded-none border border-border h-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
              />
              {touched.last_name && errors.last_name && (
                <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                  {errors.last_name}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">Email Address</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <Input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                className="rounded-none border border-border h-12 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
              />
            </div>
            {touched.email && errors.email && (
              <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">Phone (Optional)</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <Input
                name="phone"
                type="tel"
                placeholder="+251..."
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                className="rounded-none border border-border h-12 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
              />
            </div>
            {touched.phone && errors.phone && (
              <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                {errors.phone}
              </p>
            )}
            {touched.email && touched.phone && errors.credential && (
              <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                {errors.credential}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">Security</label>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  className="rounded-none border border-border h-12 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
                />
              </div>
              <PasswordStrengthMeter password={formData.password} />
              {touched.password && errors.password && (
                <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                  {errors.password}
                </p>
              )}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
                  className="rounded-none border border-border h-12 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {formError && (
            <div className="p-4 bg-destructive/5 border-l-4 border-destructive text-destructive text-[10px] font-bold uppercase tracking-widest">
              {formError}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-16 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-950/20 transition-all active:scale-[0.98]"
          >
            {isLoading ? "Creating Account..." : submitLabel ?? (mode === "details" ? "Continue" : "Join Haseri")}
            {!isLoading && <ArrowRight className="ml-3 w-4 h-4" />}
          </Button>
        </form>

        <p className="mt-8 text-center text-xs font-medium text-muted-foreground tracking-tight">
          Already a member?{" "}
          <Link href="/login" className="text-primary font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
