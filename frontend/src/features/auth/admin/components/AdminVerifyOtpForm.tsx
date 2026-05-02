"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Shield, KeyRound, Loader2 } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useAdminVerifyOtp } from "../hooks";
import { useRouter, useSearchParams } from "next/navigation";

export const AdminVerifyOtpForm = () => {
  const { verifyOtp, loading, error } = useAdminVerifyOtp();
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const adminId = useMemo(() => {
    const raw = searchParams.get("admin_id");
    const parsed = raw ? Number(raw) : NaN;
    return Number.isFinite(parsed) ? parsed : null;
  }, [searchParams]);

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId) return;
    verifyOtp({ admin_id: adminId, code: otp });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-border/50 p-10 shadow-2xl shadow-primary/5 rounded-none"
      >
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 border-2 border-primary/20 rounded-none mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-3">Admin Portal</h1>
          <p className="text-muted-foreground text-sm font-medium tracking-wide">Identity Verification</p>
        </div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleOtpSubmit}
          className="space-y-8"
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">Verification Code</label>
              <button
                type="button"
                onClick={() => router.push("/admin/login")}
                className="text-[10px] font-bold uppercase tracking-[0.1em] text-primary hover:underline"
              >
                Change Email
              </button>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <KeyRound className="w-4 h-4" />
              </div>
              <Input
                type="text"
                placeholder="000000"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
                className="rounded-none border border-border h-16 pl-12 text-center text-2xl font-black tracking-[0.5em] focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
              />
            </div>
            <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest mt-4">
              Check your administrator email for the 6-digit code.
            </p>
          </div>

          {!adminId && (
            <div className="p-4 bg-destructive/5 border-l-4 border-destructive text-destructive text-[10px] font-bold uppercase tracking-widest">
              Missing admin verification token. Please log in again.
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/5 border-l-4 border-destructive text-destructive text-[10px] font-bold uppercase tracking-widest">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || otp.length < 6 || !adminId}
            className="w-full h-16 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-950/20 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Log In"}
          </Button>
        </motion.form>

        <div className="mt-10 pt-10 border-t border-border/50 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Haseri Administrative Protocol &copy; {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
