"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { RegisterForm } from "@/src/features/auth/user/components/RegisterForm";
import { useGoogleRegister } from "@/src/features/auth/shared";
import { env } from "@/src/config/env";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const registerDataKey = "haseri:register:data";
  const googleUserKey = "haseri:register:google";

  const { googleLoading, googleError, handleGoogleLogin } = useGoogleRegister({
    onNewUser: (userId) => {
      if (userId) {
        sessionStorage.setItem(googleUserKey, userId);
      }
      router.push("/register/role");
    },
    onExistingUser: (user) => {
      setUser(user as any);
      router.push("/dashboard");
    },
  });

  const handleDetailsSubmit = async (data: { [key: string]: string }) => {
    sessionStorage.setItem(registerDataKey, JSON.stringify(data));
    router.push("/register/role");
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-0">
      <RegisterForm mode="details" submitLabel="Continue" onSubmit={handleDetailsSubmit}>
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.3em]">
            <span className="bg-white dark:bg-slate-950 px-6 text-foreground/80">Or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full h-14 rounded-none border border-border bg-white text-slate-900 font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white/90 transition-all shadow-lg shadow-slate-200/50 dark:shadow-none"
        >
          <span className="flex items-center">
            <svg
              aria-hidden="true"
              focusable="false"
              width="18"
              height="18"
              viewBox="0 0 48 48"
              className="mr-3"
            >
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.63l6.86-6.86C35.94 2.62 30.44 0 24 0 14.62 0 6.47 5.38 2.56 13.22l8.01 6.22C12.35 13.08 17.73 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.14 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.44c-.54 2.9-2.18 5.35-4.65 7.01l7.19 5.58c4.2-3.88 6.16-9.6 6.16-16.84z" />
              <path fill="#FBBC05" d="M10.57 28.44a14.5 14.5 0 0 1-.76-4.44c0-1.54.27-3.03.76-4.44l-8.01-6.22A24 24 0 0 0 0 24c0 3.84.9 7.47 2.56 10.78l8.01-6.34z" />
              <path fill="#34A853" d="M24 48c6.44 0 11.86-2.12 15.81-5.76l-7.19-5.58c-2.01 1.35-4.58 2.15-8.62 2.15-6.27 0-11.65-3.58-14.02-8.78l-8.01 6.34C6.47 42.62 14.62 48 24 48z" />
            </svg>
            {googleLoading ? "Connecting..." : "Sign up with Google"}
          </span>
        </Button>

        {googleError && (
          <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider mt-4">
            {googleError}
          </p>
        )}
      </RegisterForm>
    </div>
  );
}
