"use client";

import React, { useState, useEffect } from "react";
import { Container, Section, Heading } from "@/src/features/shared/components";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, CheckCircle2, Star, TrendingUp, Search } from "lucide-react";
import { useProviderVerification } from "@/src/features/providers/hooks/useProviderVerification";
import { cn } from "@/src/lib/utils";

const TechnicianVerifyPage = () => {
  const { checkStatus } = useProviderVerification();
  const [status, setStatus] = useState<{ status: string; verified_at: string | null } | null>(null);

  useEffect(() => {
    const getStatus = async () => {
      const data = await checkStatus();
      setStatus(data);
    };
    getStatus();
  }, [checkStatus]);

  const isPending = status?.status === "pending";
  const isApproved = status?.status === "approved";

  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-10">
      <Container className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Verification Success / Status Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-xl rounded-none space-y-10"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">
                Verification <span className="text-primary">Submitted</span> Successfully.
              </h1>
            </div>
            
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed max-w-2xl">
              Thank you for providing your professional identity documents. Your verification request is currently being processed by our enterprise review team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6 border-t border-slate-100 dark:border-slate-800">
            {/* Timeline & Status */}
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <Heading level={3} className="text-[10px] font-black uppercase tracking-[0.3em]">Processing Timeline</Heading>
               </div>
               <div className="space-y-4">
                  <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest leading-loose">
                    Our standard review cycle typically takes up to <span className="text-slate-900 dark:text-white font-black italic">3 business days</span>. 
                    You will receive a real-time notification once your professional status has been updated.
                  </p>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                     <span className="text-[9px] font-black uppercase tracking-widest">Current Status:</span>
                     <span className={cn(
                       "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                       isPending ? "bg-amber-100 text-amber-700" : isApproved ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"
                     )}>
                       {status?.status || "Processing"}
                     </span>
                  </div>
               </div>
            </div>

            {/* Next Steps & Benefits */}
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <Heading level={3} className="text-[10px] font-black uppercase tracking-[0.3em]">Verified Privileges</Heading>
               </div>
               <ul className="space-y-4">
                  {[
                    { icon: <Search className="w-3.5 h-3.5" />, text: "Priority Search Placement" },
                    { icon: <Star className="w-3.5 h-3.5" />, text: "Trust-Badge for Profile" },
                    { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Higher Trust Score & Ratings" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                       <div className="text-primary">{item.icon}</div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{item.text}</span>
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
             <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em] leading-relaxed italic">
               While you wait, you can continue to refine your profile details and explore the latest available jobs on the marketplace. Once approved, you can start applying for professional service requests immediately.
             </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default TechnicianVerifyPage;
