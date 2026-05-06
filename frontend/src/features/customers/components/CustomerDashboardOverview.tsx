"use client";

import React, { useEffect } from "react";
import { Heading } from "@/src/features/shared/components";
import { 
  Briefcase, 
  ClipboardList, 
  Clock, 
  ArrowRight,
  Plus,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";
import { useJobs } from "@/src/features/jobs/hooks";
import { formatDate } from "@/src/utils/date-utils";
import { cn } from "@/src/lib/utils";

export function CustomerDashboardOverview() {
  const { user } = useAuth();
  const { jobs, loading: jobsLoading, getMyJobs } = useJobs();

  useEffect(() => {
    getMyJobs();
  }, [getMyJobs]);

  const activeJobs = jobs.filter(j => j.status === "open").length;
  const completedJobs = jobs.filter(j => j.status === "completed").length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-slate-900 rounded-none p-8 md:p-12 border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic">
              Welcome back, <span className="text-primary">{user?.first_name}</span>!
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
              Manage your jobs and track applications in real-time
            </p>
          </div>
          <Link href="/customer/jobs/post">
            <Button className="h-14 px-8 bg-primary hover:bg-rose-700 text-white font-black uppercase tracking-widest text-xs rounded-none transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <Plus className="w-5 h-5 mr-2" />
              Post a New Job
            </Button>
          </Link>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -ml-16 -mb-16" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Jobs", value: jobs.length, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Active Jobs", value: activeJobs, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Completed", value: completedJobs, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border-2 border-slate-900 p-6 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-black italic tracking-tighter text-slate-900">{stat.value}</p>
            </div>
            <div className={cn("w-12 h-12 flex items-center justify-center border-2 border-slate-900", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Jobs Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <Heading level={2} className="text-xl font-black uppercase tracking-tighter italic">
              Recent Activity
            </Heading>
            <Link href="/customer/jobs" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {jobsLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-24 bg-white border-2 border-slate-100 animate-pulse" />
              ))
            ) : jobs.length > 0 ? (
              jobs.slice(0, 5).map((job) => (
                <div key={job.id} className="group bg-white border-2 border-slate-900 p-5 transition-all hover:shadow-[6px_6px_0px_0px_rgba(225,29,72,1)] hover:-translate-x-1 hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-slate-50 border-2 border-slate-900 group-hover:bg-primary/5 transition-colors">
                        <Briefcase className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">
                          {job.title}
                        </h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          Posted {formatDate(job.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-2 py-1 border-2 border-slate-900",
                        job.status === "open" ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-500"
                      )}>
                        {job.status}
                      </span>
                      <p className="text-xs font-black text-slate-900 italic">ETB {job.budget}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 p-12 text-center">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-4" />
                <p className="text-sm font-black uppercase tracking-widest text-slate-500">No jobs posted yet</p>
                <Link href="/customer/jobs/post" className="text-primary text-[10px] font-black uppercase tracking-widest mt-2 block hover:underline">
                  Create your first job post
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions / Tips */}
        <div className="space-y-6">
          <Heading level={2} className="text-xl font-black uppercase tracking-tighter italic">
            Quick Actions
          </Heading>
          
          <div className="grid grid-cols-1 gap-4">
            <Link href="/customer/profile">
              <div className="bg-white border-2 border-slate-900 p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <div className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">Update Profile</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tight">Personal info</p>
                </div>
              </div>
            </Link>

            <Link href="/customer/applications">
              <div className="bg-white border-2 border-slate-900 p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <div className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">Applications</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tight">Review technicians</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-primary/5 border-2 border-primary/20 p-6 space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Need Help?</h4>
            <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
              If you're having trouble finding the right technician, try adding more details to your job post or increasing the budget range.
            </p>
            <Button variant="outline" className="w-full h-10 rounded-none border-2 border-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
