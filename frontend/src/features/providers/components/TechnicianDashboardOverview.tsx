"use client";

import React, { useEffect, useState } from "react";
import { Heading } from "@/src/features/shared/components";
import {
  Briefcase,
  ShieldCheck,
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
  DollarSign
} from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { useProviderVerification } from "@/src/features/providers/hooks/useProviderVerification";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

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
  const [status, setStatus] = useState<{ status: string; verified_at: string | null } | null>(null);

  useEffect(() => {
    const getStatus = async () => {
      const data = await checkStatus();
      setStatus(data);
    };
    getStatus();
  }, [checkStatus]);

  const isVerified = status?.status === "approved";
  const isPending = status?.status === "pending";

  const stats = [
    {
      title: "Completed Jobs",
      value: "12",
      change: "+2 this week",
      icon: <CheckCircle2 size={18} />,
      positive: true
    },
    {
      title: "Active Requests",
      value: "3",
      change: "On track",
      icon: <Briefcase size={18} />,
      positive: true
    },
    {
      title: "Success Rate",
      value: "98%",
      change: "Excellent",
      icon: <TrendingUp size={18} />,
      positive: true
    },
    {
      title: "Client Rating",
      value: "4.9/5",
      change: "Top Rated",
      icon: <Star size={18} />,
      positive: true
    },
  ];

  return (
    <div className="space-y-10">

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-slate-900 rounded-2xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic">
              Welcome back, <span className="text-primary">{user?.first_name}</span>!
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
              Scale your business and monitor your service metrics
            </p>
          </div>
          <Link href="/technician/jobs">
            <Button className="h-14 px-10 bg-primary hover:bg-rose-700 text-white font-black uppercase tracking-widest text-[10px] rounded-none transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <Plus className="w-5 h-5 mr-2" />
              Find New Jobs
            </Button>
          </Link>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -ml-16 -mb-16" />
      </motion.div>

      {/* Verification Alert */}
      {!isVerified && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "p-6 border border-transparent rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm",
            isPending ? "bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200" : "bg-rose-50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200"
          )}
        >
          <div className="flex items-center gap-5">
            <div className={cn("p-4 rounded-xl", isPending ? "bg-amber-100 dark:bg-amber-900/40" : "bg-rose-100 dark:bg-rose-900/40")}>
              {isPending ? <ShieldAlert className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight">
                {isPending ? "Verification Pending Review" : "Account Verification Required"}
              </h3>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">
                {isPending
                  ? "We are validating your documents. You'll receive an update soon."
                  : "Submit your national ID to unlock professional job listings."}
              </p>
            </div>
          </div>
          {!isPending && (
            <Link href="/technician/verify">
              <Button className="h-10 px-8 bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-slate-800 rounded-xl font-black uppercase tracking-widest text-[9px]">
                Verify Profile
              </Button>
            </Link>
          )}
        </motion.div>
      )}

      {/* Admin-Style Status Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all duration-300 relative group"
          >
            <div className="flex items-center justify-between pb-6 relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {stat.title}
              </h3>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {stat.icon}
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1">{stat.value}</div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800/50 rounded-md">
                  <ArrowUpRight size={10} className="text-slate-600 dark:text-slate-400" />
                  <span className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{stat.change}</span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Growth</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Jobs Section - Exact Homepage Mirror */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Heading level={2} className="text-xl font-black uppercase tracking-tighter italic">
            Recent Jobs
          </Heading>
          <Link href="/technician/jobs" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1">
            Explore All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {/* Job Item mirroring ExploreJobsSection exactly */}
          {[1, 2, 3].map((j, idx) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white dark:bg-slate-950 border border-border hover:border-primary p-6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1">
                    Home Repair
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 px-2 py-1">
                    Urgent
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  High-End Residential Maintenance
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>Addis Ababa, Bole</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    <span>ETB 5,000 - 10,000</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Button className="w-full md:w-auto rounded-none px-8 bg-background text-foreground border-2 border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all font-bold text-xs tracking-widest uppercase h-12">
                  Apply Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
