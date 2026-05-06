"use client";

import React from "react";
import { Container, Section, Heading } from "@/src/features/shared/components";
import { CustomerApplicationsTable } from "@/src/features/customers/components/CustomerApplicationsTable";
import { Users } from "lucide-react";

export default function ApplicationsPage() {
  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-10">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Refined Page Header - Red bar instead of icon, aligned style */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
          <div className="flex items-center gap-4">
            {/* Red Vertical Bar Style */}
            <div className="w-1.5 h-10 bg-primary shrink-0" />
            
            <div className="space-y-0.5">
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white leading-none whitespace-nowrap">
                Review <span className="text-primary">Applicants</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Manage technician proposals and hire professionals
              </p>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="animate-in fade-in duration-700">
          <CustomerApplicationsTable />
        </div>

      </Container>
    </Section>
  );
}
