"use client";

import React, { useState } from "react";
import { Container, Section, Heading } from "@/src/features/shared/components";
import { ShieldCheck, ShieldAlert, CheckCircle2, Zap, Star, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/hooks/useAuth";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

export default function CustomerVerifyPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Verification status check (Mock logic based on user data)
  const isVerified = (user as any)?.verification_status === "approved";
  const isPending = (user as any)?.verification_status === "pending";

  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-10">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-primary shrink-0" />
            <div className="space-y-0.5">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white leading-none whitespace-nowrap">
                Account <span className="text-primary">Verification</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Professional Identity & Trust System
              </p>
            </div>
          </div>

          <div className={cn(
            "flex items-center gap-2.5 px-5 py-2.5 border-2 font-black uppercase tracking-widest text-[9px] rounded-none transition-all",
            isVerified ? "bg-emerald-50 border-emerald-500 text-emerald-700" : 
            "bg-amber-50 border-amber-400 text-amber-700"
          )}>
            {isVerified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            {isVerified ? "Status: Verified" : isPending ? "Status: Pending" : "Status: Action Required"}
          </div>
        </div>

        {/* Main Grid with Equal Heights */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
          
          {/* Main Info Column */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 h-full flex flex-col justify-between space-y-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
                    Why verify your <span className="text-primary">Identity?</span>
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                    At Haseri, trust is our core currency. Verifying your account confirms to our professional technician community that you are a genuine client posting real job opportunities. This eliminates spam and ensures that only high-quality projects are listed on the marketplace.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Extended Trial</h4>
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-tight">
                      Get an additional <span className="text-slate-900 dark:text-white font-black">+2 FREE JOB POSTINGS</span> after completing your initial 3-job trial period.
                    </p>
                  </div>
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary">
                      <Star className="w-5 h-5" />
                    </div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Verified Ratings</h4>
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-tight">
                      Only verified clients can rate technicians, helping you build a high trust score and attract the best pros.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border-l-4 border-primary p-6 space-y-2 mt-auto">
                <p className="text-[11px] font-black uppercase tracking-widest text-primary">Limited Trial Policy</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Unverified accounts are restricted after the initial 3-job free trial. To continue posting without verification, a mandatory fee of <span className="font-black text-slate-900 dark:text-white underline decoration-primary decoration-2">50 ETB PER JOB</span> applies.
                </p>
              </div>
            </div>
          </div>

          {/* Action/Payment Column - Now Equal Height & No Shadows */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 text-white p-8 h-full flex flex-col justify-between border border-slate-900">
              <div className="space-y-8">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-lg font-black uppercase tracking-tighter italic">Verification Payment</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Secure identity activation</p>
                </div>

                <div className="py-10 border-y border-white/10 flex flex-col items-center justify-center gap-2">
                  <span className="text-5xl font-black italic tracking-tighter text-primary">50 ETB</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">One-time processing fee</span>
                </div>

                <ul className="space-y-4">
                  {[
                    "Unlocks permanent free posting discounts",
                    "Enables professional rating system",
                    "Removes 'Trial' badge from profile",
                    "Priority matching with verified pros"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                      <div className="w-4 h-4 bg-primary text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6 pt-10">
                <Button 
                  disabled={isVerified || isPending}
                  className="w-full h-14 bg-primary hover:bg-rose-700 text-white font-black uppercase tracking-widest text-[10px] rounded-none shadow-none transition-all active:scale-95 disabled:opacity-50"
                >
                  {isVerified ? "Already Verified" : isPending ? "Review in Progress" : "Verify & Pay Now"}
                </Button>
                <p className="text-[9px] text-center text-slate-500 uppercase font-black tracking-widest">
                  Payments are processed securely via local partners.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Security Policy Box */}
        <div className="flex justify-center pt-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex items-center gap-4 group max-w-md w-full">
            <div className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-primary transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Security Policy</p>
              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tight">Data is encrypted and private</p>
            </div>
          </div>
        </div>

      </Container>
    </Section>
  );
}
