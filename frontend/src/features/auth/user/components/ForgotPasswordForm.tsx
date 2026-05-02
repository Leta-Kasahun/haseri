"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight, Shield, Loader2 } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { emailSchema, phoneSchema } from "@/src/utils/validators";
import { getRequiredSchemaError } from "@/src/utils/validators/form";
import { useRouter } from "next/navigation";

export const ForgotPasswordForm = () => {
  const { forgotPassword, loading, error, success, userId } = useForgotPassword();
  const router = useRouter();
  const [identity, setIdentity] = useState("");
  const [usePhone, setUsePhone] = useState(false);
  const [touched, setTouched] = useState(false);
  const [identityError, setIdentityError] = useState<string | null>(null);

  useEffect(() => {
    if (success && userId) {
      router.push(`/reset-password?user_id=${userId}`);
    }
  }, [success, userId, router]);

  const validateIdentity = (value: string) =>
    usePhone
      ? getRequiredSchemaError(phoneSchema, value, "Phone number is required")
      : getRequiredSchemaError(emailSchema, value, "Email address is required");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMessage = validateIdentity(identity);
    setTouched(true);
    setIdentityError(errorMessage);
    if (errorMessage) return;

    const payload = usePhone ? { phone: identity } : { email: identity };
    await forgotPassword(payload);
  };

  const handleIdentityChange = (value: string) => {
    setIdentity(value);
    if (touched) {
      setIdentityError(validateIdentity(value));
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-border/50 p-6 sm:p-10 shadow-2xl shadow-primary/5 rounded-none"
      >
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/5 border border-primary/20 rounded-none mb-6">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-3">Reset Access</h1>
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            Verify your identity to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">
                {usePhone ? "Phone Number" : "Email Address"}
              </label>
              <button
                type="button"
                onClick={() => {
                  setUsePhone(!usePhone);
                  setIdentity("");
                  setIdentityError(null);
                  setTouched(false);
                }}
                className="text-[10px] font-bold uppercase tracking-[0.1em] text-primary hover:text-primary/80 transition-colors"
              >
                Use {usePhone ? "Email" : "Phone"}
              </button>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                {usePhone ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
              </div>
              <Input
                type={usePhone ? "tel" : "email"}
                placeholder={usePhone ? "+251..." : "alex@example.com"}
                value={identity}
                onChange={(e) => handleIdentityChange(e.target.value)}
                onBlur={() => setTouched(true)}
                className="rounded-none border border-border h-14 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
              />
            </div>
            {touched && identityError && (
              <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                {identityError}
              </p>
            )}
          </div>

          {error && (
            <div className="p-4 bg-destructive/5 border-l-4 border-destructive text-destructive text-[10px] font-bold uppercase tracking-widest">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-16 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-950/20 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
            {!loading && <ArrowRight className="ml-3 w-4 h-4" />}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
