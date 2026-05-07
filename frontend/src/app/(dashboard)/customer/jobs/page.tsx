"use client";

import React from "react";
import { Container, Section } from "@/src/features/shared/components";
import { CustomerJobsTable } from "@/src/features/customers/components/CustomerJobsTable";

export default function CustomerJobsPage() {
  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-10">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Refined Page Header - Smaller text, red bar instead of icon, aligned style */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
          <div className="flex items-center gap-4">
            {/* Red Vertical Bar Style */}
            <div className="w-1.5 h-10 bg-primary shrink-0" />
            
            <div className="space-y-0.5">
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white leading-none whitespace-nowrap">
                Manage <span className="text-primary">Posted Jobs</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Professional Project & Service Console
              </p>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="animate-in fade-in duration-700">
          <CustomerJobsTable />
        </div>

      </Container>
    </Section>
  );
}
