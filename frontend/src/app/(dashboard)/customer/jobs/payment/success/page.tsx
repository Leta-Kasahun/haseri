"use client";

import React, { useEffect, useState } from "react";
import { Container, Section } from "@/src/features/shared/components";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useJobPayment } from "@/src/features/payments/hooks/useJobPayment";
import { toast } from "react-hot-toast";

export default function JobPaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confirmJobPayment, error } = useJobPayment();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const hasAttempted = React.useRef(false);

  useEffect(() => {
    if (hasAttempted.current) return;
    
    const txRef = searchParams.get("tx_ref") || searchParams.get("trx_ref");
    const jobId = searchParams.get("job_id");

    if (!txRef && !jobId) {
      setStatus("error");
      return;
    }

    hasAttempted.current = true;

    const confirm = async () => {
      try {
        const result = await confirmJobPayment(txRef, jobId);
        if (result?.verified) {
          setStatus("success");
          toast.success("Job posted successfully!");
        } else {
          setStatus("error");
          toast.error("Could not verify payment status.");
        }
      } catch (err: any) {
        console.error("Confirmation failed", err);
        setStatus("error");
        toast.error(err.message || "An unexpected error occurred during confirmation.");
      }
    };

    confirm();
  }, [confirmJobPayment, searchParams]);

  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <Container className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 text-center space-y-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
          
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full text-primary">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
                  Verifying Payment
                </h2>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                  Please wait while we confirm your job payment...
                </p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-full border-2 border-emerald-500">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
                  Success!
                </h2>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                  Your job has been posted successfully.
                </p>
              </div>
              <Button 
                onClick={() => router.push("/dashboard")}
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] rounded-none mt-4 shadow-none transition-all active:scale-95"
              >
                Cancel
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 bg-red-50 text-red-600 flex items-center justify-center rounded-full border-2 border-red-500 text-red-600">
                <Loader2 className="w-8 h-8 rotate-45" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
                  Payment Error
                </h2>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                  {error || "We could not verify your job payment. Please contact support."}
                </p>
              </div>
              <Button 
                onClick={() => router.push("/dashboard")}
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] rounded-none mt-4 shadow-none transition-all active:scale-95"
              >
                Cancel
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

        </div>
      </Container>
    </Section>
  );
}
