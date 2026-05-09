"use client";

import React, { useState, useEffect } from "react";
import { Container, Section, LoadingSpinner } from "@/src/features/shared/components";
import { ShieldCheck, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useAuth } from "@/src/hooks/useAuth";
import { useCustomerProfile } from "../hooks/useCustomerProfile";
import { useCustomerVerification } from "../hooks/useCustomerVerification";
import { toast } from "react-hot-toast";
import { cn } from "@/src/lib/utils";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function CustomerOnboarding() {
  const { user } = useAuth();
  const router = useRouter();
  const { update: updateProfile, loading: profileLoading } = useCustomerProfile();
  const { initiate, checkStatus, loading: verificationLoading } = useCustomerVerification();
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const init = async () => {
      const status = await checkStatus();
      if (status?.verified) {
        router.push("/dashboard");
      } else {
        setCheckingStatus(false);
      }
    };
    init();
  }, [checkStatus, router]);

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    city: "",
    woreda: "",
    kebele: "",
    specific_location: "",
  });

  useEffect(() => {
    if ((user as any)?.address) {
      setAddress(prev => ({ ...prev, ...(user as any).address }));
    }
  }, [user]);

  const handleNext = async () => {
    if (step === 1) {
      if (!address.city || !address.woreda) return toast.error("City and Woreda are required");
      const success = await updateProfile(address);
      if (success) setStep(2);
    }
  };

  const handleVerify = async () => {
    const data = await initiate();
    const checkoutUrl =
      (data as any)?.checkout_url ||
      (data as any)?.checkoutUrl ||
      (data as any)?.url ||
      (data as any)?.data?.checkout_url ||
      (data as any)?.data?.checkoutUrl ||
      null;

    if (checkoutUrl) {
      toast.loading("Redirecting to Chapa...", { duration: 2000 });
      window.location.href = checkoutUrl;
    } else {
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative">
      <Section className="w-full flex-grow flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6">
        <Container className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-border/50 p-6 sm:p-10 shadow-2xl shadow-primary/5 rounded-none space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Onboarding Flow</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{step}/2</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-3">
                Setup <span className="text-primary">Profile</span>
              </h1>
              <div className="flex gap-2">
                {[1, 2].map(s => (
                  <div key={s} className={cn("h-1 flex-1 transition-all duration-500",
                    step >= s ? "bg-primary" : "bg-slate-100 dark:bg-slate-800"
                  )} />
                ))}
              </div>
            </div>

            <div className="min-h-[280px]">
              {step === 1 ? (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-4 bg-primary/5 border border-primary/20 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Address Details</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} placeholder="City *" className="rounded-none border border-border h-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50 font-bold" />
                    <Input value={address.woreda} onChange={e => setAddress({ ...address, woreda: e.target.value })} placeholder="Woreda *" className="rounded-none border border-border h-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50 font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input value={address.kebele} onChange={e => setAddress({ ...address, kebele: e.target.value })} placeholder="Kebele" className="rounded-none border border-border h-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50 font-bold" />
                    <Input value={address.specific_location} onChange={e => setAddress({ ...address, specific_location: e.target.value })} placeholder="Specific Location" className="rounded-none border border-border h-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50 font-bold" />
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-4 bg-primary/5 border border-primary/20 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Account Verification</p>
                  </div>
                  
                  <div className="border border-border p-6 bg-background/50 text-sm font-medium leading-relaxed text-muted-foreground">
                    If you are verified, you receive an additional <strong>2 job posts for your trial</strong>, giving you a total of <strong>4 free jobs</strong> before you are required to pay. 
                    <br/><br/>
                    If you skip verification now, you only get <strong>2 free trial posts</strong>, and you will have to pay per job post afterwards. 
                    <br/><br/>
                    Verification ensures your trustworthiness, helps us avoid spam job postings, and allows you to leave reviews.
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button
                      onClick={handleVerify}
                      disabled={verificationLoading}
                      className="w-full h-14 rounded-none bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-[11px] shadow-xl transition-all"
                    >
                      {verificationLoading ? <LoadingSpinner size="sm" /> : "Verify and Pay on Chapa"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/dashboard")}
                      className="w-full h-14 rounded-none border-border hover:bg-slate-100 dark:hover:bg-slate-800 font-black uppercase tracking-widest text-[11px] transition-all"
                    >
                      Skip Now
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-10">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(s => s - 1)}
                  className="flex-1 h-16 rounded-none border border-border font-black uppercase tracking-[0.2em] text-[10px] hover:border-primary/50 transition-all"
                >
                  <ArrowLeft className="w-4 h-4 mr-3" /> Back
                </Button>
              )}
              {step === 1 && (
                <Button
                  onClick={handleNext}
                  disabled={profileLoading}
                  className="flex-[2] h-16 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-950/20 transition-all active:scale-[0.98]"
                >
                  {profileLoading ? <LoadingSpinner size="sm" /> : (
                    <><span>Continue</span><ArrowRight className="ml-3 w-4 h-4" /></>
                  )}
                </Button>
              )}
            </div>
          </motion.div>

          <div className="mt-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Haseri Marketplace. All rights reserved.
          </div>
        </Container>
      </Section>
    </div>
  );
}
