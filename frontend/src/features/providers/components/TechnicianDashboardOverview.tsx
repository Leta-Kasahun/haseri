"use client";

import React, { useEffect, useState } from "react";
import { Heading } from "@/src/features/shared/components";
import {
  Briefcase,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Star,
  Plus,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { useProviderVerification } from "@/src/features/providers/hooks/useProviderVerification";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { useJobs } from "@/src/features/jobs/hooks";
import { providersApi } from "@/src/features/providers/services/providers.api";
import { JobApplyModal } from "@/src/features/jobs/components";
import { formatDistanceToNow } from "date-fns";
import { jobsApi } from "@/src/features/jobs/services";
import type { JobApplication } from "@/src/features/jobs/types";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export function TechnicianDashboardOverview() {
  const { user } = useAuth();
  const { checkStatus } = useProviderVerification();
  const { jobs, loading: jobsLoading, getJobs } = useJobs();
  
  const [status, setStatus] = useState<{ status: string; verified_at: string | null } | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [derivedActive, setDerivedActive] = useState<number | null>(null);
  const [derivedSuccessRate, setDerivedSuccessRate] = useState<number | null>(null);

  const normalizeStats = (raw: any) => {
    const data = raw?.data ?? raw;
    const toNumber = (value: unknown) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    return {
      completed_jobs: toNumber(data?.completed_jobs ?? data?.completedJobs),
      active_requests: toNumber(
        data?.active_requests ?? data?.activeRequests ?? data?.active_jobs ?? data?.activeJobs
      ),
      success_rate: toNumber(data?.success_rate ?? data?.successRate),
      rating: toNumber(data?.rating ?? data?.average_rating ?? data?.averageRating),
      review_count: toNumber(data?.review_count ?? data?.reviewCount ?? data?.total_reviews),
    };
  };

  const deriveActiveFromApplications = (applications: JobApplication[]) =>
    applications.filter((app) => {
      if (app.status !== "accepted") return false;
      const jobStatus = app.job?.status;
      if (!jobStatus) return true;
      return jobStatus === "assigned" || jobStatus === "in_progress";
    }).length;

  useEffect(() => {
    let ignore = false;
    const init = async () => {
      setStatsLoading(true);
      try {
        const [statusResult, statsResult, applicationsResult] = await Promise.allSettled([
          checkStatus(),
          providersApi.getStats(),
          jobsApi.getMyApplications()
        ]);

        if (!ignore) {
          if (statusResult.status === "fulfilled") {
            setStatus(statusResult.value);
          }
          if (statsResult.status === "fulfilled") {
            setStats(normalizeStats(statsResult.value.data));
          }
          if (applicationsResult.status === "fulfilled") {
            const applications = applicationsResult.value.data?.data ?? [];
            const activeCount = deriveActiveFromApplications(applications);
            setDerivedActive(activeCount);

            const normalized = normalizeStats(statsResult.status === "fulfilled" ? statsResult.value.data : null);
            const completedCount = normalized.completed_jobs;
            const total = completedCount + activeCount;
            const rate = total > 0 ? Math.round((completedCount / total) * 100) : 0;
            setDerivedSuccessRate(rate);
          }
        }
      } finally {
        if (!ignore) {
          setStatsLoading(false);
        }
      }

      getJobs({ limit: 4 });
    };

    init();
    return () => {
      ignore = true;
    };
  }, [checkStatus, getJobs]);

  const isVerified = status?.status === "approved";
  const isPending = status?.status === "pending";

  const dashboardStats = [
    {
      title: "Completed Jobs",
      value: stats?.completed_jobs ?? 0,
      change: "Lifetime total",
      icon: <CheckCircle2 size={18} />,
      positive: true
    },
    {
      title: "Active Requests",
      value: derivedActive ?? stats?.active_requests ?? 0,
      change: "Jobs in progress",
      icon: <Briefcase size={18} />,
      positive: true
    },
    {
      title: "Success Rate",
      value: `${derivedSuccessRate ?? stats?.success_rate ?? 0}%`,
      change: "Excellent",
      icon: <TrendingUp size={18} />,
      positive: true
    },
    {
      title: "Client Rating",
      value: `${(stats?.rating ?? 0).toFixed(1)}/5`,
      change: `${stats?.review_count ?? 0} Reviews`,
      icon: <Star size={18} />,
      positive: true
    },
  ];

  return (
    <div className="space-y-12">

      {/* Refined Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-primary" />
            <Heading level={1} className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter italic leading-tight text-slate-900 dark:text-white">
              Welcome, <span className="text-primary">{user?.first_name}</span>
            </Heading>
          </div>
          <p className="text-slate-500 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] max-w-xl pl-4">
            Connecting you with top opportunities across the Haseri marketplace.
          </p>
        </div>

        <Link href="/technician/jobs">
          <Button className="h-12 md:h-14 px-8 md:px-10 bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-primary hover:text-white rounded-none font-black uppercase tracking-widest text-[9px] md:text-[10px] transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(225,29,72,1)] active:scale-95">
            <Plus className="w-4 h-4 mr-2" />
            Find New Jobs
          </Button>
        </Link>
      </div>

      {/* Verification Alert */}
      {!isVerified && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "p-6 border border-slate-200 dark:border-slate-800 rounded-none flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm",
            isPending ? "bg-amber-50/50 dark:bg-amber-950/10 text-amber-900 dark:text-amber-200" : "bg-rose-50/50 dark:bg-rose-950/10 text-rose-900 dark:text-rose-200"
          )}
        >
          <div className="flex items-center gap-5">
            <div className={cn("p-4 border border-current opacity-20")}>
              {isPending ? <ShieldAlert className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-[11px] md:text-xs font-black uppercase tracking-widest">
                {isPending ? "Verification Pending Review" : "Account Verification Required"}
              </h3>
              <p className="text-[9px] md:text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1 leading-relaxed max-w-lg">
                {isPending
                  ? "We are validating your documents. You'll receive an update within 3 business days."
                  : "Submit your national ID to unlock premium professional job listings and increase your trust score."}
              </p>
            </div>
          </div>
          {!isPending && (
            <Link href="/technician/verify">
              <Button className="h-10 px-8 bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-primary hover:text-white rounded-none font-black uppercase tracking-widest text-[9px]">
                Verify Profile
              </Button>
            </Link>
          )}
        </motion.div>
      )}

      {/* Admin-Style Status Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-none p-6 flex flex-col justify-between shadow-sm transition-all duration-300 relative group"
          >
            <div className="flex items-center justify-between pb-6 relative z-10">
              <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {stat.title}
              </h3>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-none text-slate-400 group-hover:text-primary transition-colors">
                {stat.icon}
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1 italic">
                {statsLoading ? "..." : stat.value}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <ArrowUpRight size={10} className="text-primary" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.change}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Jobs Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-primary flex items-center justify-center">
               <Briefcase size={10} className="text-white" />
            </div>
            <Heading level={2} className="text-lg md:text-xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
              Recent Job Listings
            </Heading>
          </div>
          <Link href="/technician/jobs" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
            Explore All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {jobsLoading ? (
             <div className="py-20 flex flex-col items-center justify-center text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scanning for new opportunities...</p>
             </div>
          ) : jobs.length > 0 ? (
            jobs.slice(0, 4).map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/40 shadow-sm"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 border border-primary/10">
                      {typeof job.category === 'object' ? (job.category as any).name : (job.category || 'General Service')}
                    </span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                       <Clock size={10} /> {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors italic">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.address?.city || 'Addis Ababa'}{job.address?.sub_city ? `, ${job.address.sub_city}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-200">
                      <span className="font-black">ETB {job.price?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <JobApplyModal 
                  job={job}
                  onSuccess={() => getJobs({ limit: 4 })}
                  trigger={
                    <Button className="w-full md:w-auto h-11 px-8 rounded-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all font-black text-[9px] tracking-widest uppercase">
                      View & Apply
                    </Button>
                  }
                />
              </motion.div>
            ))
          ) : (
            <div className="py-20 border-2 border-dashed border-slate-100 dark:border-slate-800 text-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">No new jobs found in your area. Check back later!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
