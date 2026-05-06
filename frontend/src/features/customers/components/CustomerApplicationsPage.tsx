"use client";

import React, { useEffect } from "react";
import { Heading } from "@/src/features/shared/components";
import { useJobs } from "@/src/features/jobs/hooks";
import { ProfileApplicationsPanel } from "./ProfileApplicationsPanel";
import { Loader2, AlertCircle } from "lucide-react";

export function CustomerApplicationsPage() {
  const { jobs, loading, getMyJobs } = useJobs();

  useEffect(() => {
    getMyJobs();
  }, [getMyJobs]);

  return (
    <div className="space-y-8">
      <div>
        <Heading level={1} className="text-3xl font-black uppercase tracking-tighter italic mb-2">
          Job Applications
        </Heading>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
          Review and manage technicians who applied to your jobs
        </p>
      </div>

      {loading && jobs.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : jobs.length > 0 ? (
        <ProfileApplicationsPanel jobs={jobs} />
      ) : (
        <div className="bg-white border-2 border-slate-900 p-12 text-center shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)]">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-2">No applications found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You haven't received any applications yet. Make sure your job posts are descriptive and have a fair budget.
          </p>
        </div>
      )}
    </div>
  );
}
