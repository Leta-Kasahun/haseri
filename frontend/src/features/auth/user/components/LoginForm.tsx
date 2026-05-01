"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { motion } from "framer-motion";
import { useLogin } from "../hooks/useLogin";
import { Mail, Phone, Lock, ArrowRight, Globe } from "lucide-react";
import { toast } from "sonner";

export const LoginForm = () => {
  const { login, loading, error } = useLogin();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [usePhone, setUsePhone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const loginData = usePhone 
      ? { phone: identity, password } 
      : { email: identity, password };

    await login(loginData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-border/50 p-10 shadow-2xl shadow-primary/5 rounded-none"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-3">Welcome Back</h1>
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            Enter your credentials to continue
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
                onChange={(e) => setIdentity(e.target.value)}
                className="rounded-none border border-border h-14 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors"
              >
                Reset?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-none border border-border h-14 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-destructive/5 border-l-4 border-destructive text-destructive text-[10px] font-bold uppercase tracking-widest">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-16 rounded-none bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/10 transition-all active:scale-[0.98]"
          >
            {loading ? "Authenticating..." : "Login to Account"}
            {!loading && <ArrowRight className="ml-3 w-4 h-4" />}
          </Button>
        </form>

        <div className="mt-12">
          <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.3em]">
              <span className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm px-6 text-muted-foreground">Security Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="rounded-none h-14 border border-border font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-foreground hover:text-background transition-all">
              <Globe className="w-4 h-4 mr-3 text-primary" />
              Sign in with Google
            </Button>
          </div>
        </div>

        <p className="mt-10 text-center text-xs font-medium text-muted-foreground tracking-tight">
          New to Haseri?{" "}
          <Link href="/register/customer" className="text-primary font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">
            Join the Marketplace
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
