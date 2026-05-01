"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Mail, Lock, ArrowRight, KeyRound, Loader2 } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useAdminLogin } from "../hooks/useAdminLogin";

export const AdminLoginForm = () => {
  const { login, verifyOtp, loading, error, step, setStep } = useAdminLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyOtp(otp);
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
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            {step === "login" ? "Secure Administrative Access" : "Identity Verification"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === "login" ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleLoginSubmit}
              className="space-y-8"
            >
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">Administrator Email</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <Input
                    type="email"
                    placeholder="admin@haseri.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-none border border-border h-14 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">Master Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-none border border-border h-14 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-950/20 transition-all"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Access"}
                {!loading && <ArrowRight className="ml-3 w-4 h-4" />}
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleOtpSubmit}
              className="space-y-8"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">Verification Code</label>
                  <button
                    type="button"
                    onClick={() => setStep("login")}
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

              <Button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full h-16 rounded-none bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 transition-all"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Log In"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-10 pt-10 border-t border-border/50 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Haseri Administrative Protocol &copy; {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
