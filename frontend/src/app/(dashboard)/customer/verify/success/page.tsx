"use client";

import React, { useEffect, useState } from "react";
import { Container, Section } from "@/src/features/shared/components";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCustomerVerification } from "@/src/features/customers/hooks/useCustomerVerification";
import { useAuth } from "@/src/hooks/useAuth";

export default function VerificationSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confirm } = useCustomerVerification();
  const { user, setUser } = useAuth();
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await confirm();
        if (response?.verified) {
          if (user) {
            setUser({ ...user, verification_status: "verified" });
          }
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification confirmation failed", error);
        setStatus("error");
      }
    };

    confirmPayment();
  }, [confirm, user, setUser]);

  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <Container className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 text-center space-y-8">
          
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full text-primary">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
                  Confirming Payment
                </h2>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                  Please wait while we verify your transaction...
                </p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-full border-2 border-emerald-500">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
                  Payment Successful!
                </h2>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                  Your account is now verified.
                </p>
              </div>
              <Button 
                onClick={() => router.push("/customer/profile")}
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] rounded-none mt-4"
              >
                Return to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 bg-red-50 text-red-600 flex items-center justify-center rounded-full border-2 border-red-500">
                <Loader2 className="w-8 h-8" /> {/* Wait, maybe an X icon or just nothing special */}
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
                  Verification Error
                </h2>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                  We could not verify your payment. Please contact support.
                </p>
              </div>
              <Button 
                onClick={() => router.push("/customer/verify")}
                variant="outline"
                className="w-full h-14 font-black uppercase tracking-widest text-[10px] rounded-none mt-4"
              >
                Try Again
              </Button>
            </div>
          )}

        </div>
      </Container>
    </Section>
  );
}
