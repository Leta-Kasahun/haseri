"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { useRegister } from "@/src/features/auth/user/hooks/useRegister";
import { useRouter } from "next/navigation";
import type { RegisterInput, UserRole } from "@/src/features/auth/user/types";

export default function RegisterRolePage() {
  const router = useRouter();
  const { register, loading, error } = useRegister();
  const [registerData, setRegisterData] = useState<Omit<RegisterInput, "role"> | null>(null);
  const [registerDataChecked, setRegisterDataChecked] = useState(false);
  const registerDataKey = "haseri:register:data";

  useEffect(() => {
    const stored = sessionStorage.getItem(registerDataKey);
    if (stored) {
      setRegisterData(JSON.parse(stored));
    }
    setRegisterDataChecked(true);
  }, []);

  useEffect(() => {
    if (!registerDataChecked) return;
    if (!registerData) {
      router.push("/register");
    }
  }, [registerData, registerDataChecked, router]);

  const handleRoleSelect = async (role: UserRole) => {
    if (!registerData) return;
    sessionStorage.removeItem(registerDataKey);
    await register({ ...registerData, role });
  };

  const isSubmitting = loading;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-border/50 p-10 shadow-2xl shadow-primary/5 rounded-none">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-3">Choose your role</h1>
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            Select how you want to use Haseri
          </p>
        </div>

        <div className="space-y-6">
          <Button
            type="button"
            onClick={() => handleRoleSelect("provider")}
            disabled={isSubmitting}
            className="w-full h-16 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-950/20 transition-all"
          >
            Join as Technician
          </Button>
          <Button
            type="button"
            onClick={() => handleRoleSelect("customer")}
            disabled={isSubmitting}
            className="w-full h-16 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-950/20 transition-all"
          >
            Join as Customer
          </Button>

          {error && (
            <div className="p-4 bg-destructive/5 border-l-4 border-destructive text-destructive text-[10px] font-bold uppercase tracking-widest">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
