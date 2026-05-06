"use client";

import React, { useEffect } from "react";
import { Heading } from "@/src/features/shared/components";
import { 
  Briefcase, 
  Clock, 
  ArrowRight,
  Plus,
  CheckCircle2,
  Users,
  Search
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";
import { useJobs } from "@/src/features/jobs/hooks";
import { formatDate } from "@/src/utils/date-utils";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

export function CustomerDashboardOverview() {
  const { user } = useAuth();
  const { jobs, loading: jobsLoading, getMyJobs } = useJobs();

  useEffect(() => {
    getMyJobs();
  }, [getMyJobs]);

  const activeJobs = jobs.filter(j => j.status === "open").length;
  const completedJobs = jobs.filter(j => j.status === "completed").length;

  const stats = [
    { label: "Posted Jobs", value: jobs.length, icon: <Briefcase className="w-4 h-4" /> },
    { label: "Active Jobs", value: activeJobs, icon: <Clock className="w-4 h-4 text-amber-500" /> },
    { label: "Completed", value: completedJobs, icon: <CheckCircle2 className="w-4 h-4 text-green-500" /> },
    { label: "Total Spent", value: "ETB 12.5k", icon: <Users className="w-4 h-4 text-primary" /> },
  ];

  return (
    <div className="space-y-12">
      
      {/* Refined Welcome Header - Synchronized with Technician Layout */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-primary" />
            <Heading level={1} className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter italic leading-tight">
              Welcome, <span className="text-primary">{user?.first_name}</span>
            </Heading>
          </div>
          <p className="text-slate-500 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] max-w-xl pl-4">
            Find and hire the best professional talent across the Haseri marketplace.
          </p>
        </div>

        <Link href="/customer/jobs/post">
          <Button className="h-12 md:h-14 px-8 md:px-10 bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-primary hover:text-white rounded-none font-black uppercase tracking-widest text-[9px] md:text-[10px] transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(225,29,72,1)] active:scale-95">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* KPI Stats Grid - No Changes Requested Here */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between h-28 rounded-none shadow-sm group hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-none group-hover:text-primary transition-colors">
                {stat.icon}
              </div>
            </div>
            <span className="text-2xl md:text-3xl font-black tracking-tighter italic text-slate-900 dark:text-white">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Jobs Table - No Changes Requested Here */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Plus className="w-4 h-4 text-primary" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Recent Activity</h3>
            </div>
            <Link href="/customer/jobs" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Job Title</th>
                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Date</th>
                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Budget</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {jobsLoading ? (
                    Array(3).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={4} className="px-6 py-8 bg-slate-50/30" />
                      </tr>
                    ))
                  ) : jobs.length > 0 ? (
                    jobs.slice(0, 5).map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">{job.title}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{job.category || "Service"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase">{formatDate(job.created_at)}</td>
                        <td className="px-6 py-5">
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border",
                            job.status === "open" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-100"
                          )}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right text-[11px] font-black text-slate-900 dark:text-white italic">ETB {job.price?.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center text-[10px] font-bold uppercase tracking-widest text-slate-300 italic">
                        No active jobs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Actions - No Changes Requested Here */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Search className="w-4 h-4 text-primary" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Professional Actions</h3>
          </div>
          
          <div className="space-y-4">
            <Link href="/providers" className="block">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-between hover:bg-slate-50 transition-all shadow-sm group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-none border border-slate-900">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Find Technicians</p>
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tight">Hire vetted pros</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            </Link>

            <div className="bg-slate-900 text-white p-8 space-y-4 rounded-none border border-slate-900 shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Insight</h4>
              <p className="text-[11px] font-medium text-slate-300 leading-relaxed italic">
                "Verified professionals are 3x more likely to respond to job posts with clear budget ranges."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
