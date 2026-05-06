"use client";

import React from "react";
import { Container, Section, Heading } from "@/src/features/shared/components";
import { TechnicianJobBrowser } from "@/src/features/providers/components/TechnicianJobBrowser";
import { Briefcase } from "lucide-react";

export default function TechnicianJobsPage() {
  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-10">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-none border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]">
             <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-0.5">
            <Heading level={2} className="text-xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
              Explore <span className="text-primary">Opportunities</span>
            </Heading>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Available Professional Services & Service Requests
            </p>
          </div>
        </div>

        {/* Main Job Browser */}
        <div className="animate-in fade-in duration-700">
          <TechnicianJobBrowser />
        </div>

      </Container>
    </Section>
  );
}
