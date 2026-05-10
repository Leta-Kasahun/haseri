"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, MapPin, Loader2, Search } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { jobsApi } from "@/src/features/jobs/services/jobs.api";
import { formatDistanceToNow } from "date-fns";
import type { Job } from "@/src/features/jobs/types";

function JobsListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("category_id");
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const filters = categoryId ? { category_id: parseInt(categoryId) } : {};
        const res = await jobsApi.getAll(filters);
        setJobs(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [categoryId]);

  const handleApplyClick = (jobId: number) => {
    router.push(`/login?redirect=/jobs/${jobId}`);
  };

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto w-full">
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-6" />
          <p className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">
            Syncing Marketplace Data...
          </p>
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="group bg-white dark:bg-slate-950 border border-border hover:border-primary p-6 md:p-8 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 border border-primary/20">
                    {typeof job.category === 'object' ? job.category?.name : (job.category || "General")}
                  </span>
                  {job.price > 5000 && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/20">
                      Premium Task
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 group-hover:text-primary transition-colors text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-6 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.15em]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>
                      {job.address?.city || "Addis Ababa"}
                      {job.address?.specific_location ? `, ${job.address.specific_location}` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-black tracking-tight text-slate-900 dark:text-slate-200">
                      ETB {job.price?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>
                      {job.created_at ? formatDistanceToNow(new Date(job.created_at), { addSuffix: true }) : "Recently"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Button 
                  onClick={() => handleApplyClick(job.id)}
                  className="w-full md:w-auto rounded-none px-10 h-14 bg-background text-foreground border-2 border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all font-black text-xs tracking-widest uppercase"
                >
                  Apply Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-32 border-4 border-dashed border-slate-100 dark:border-slate-900 text-center flex flex-col items-center">
          <Search className="w-12 h-12 text-slate-200 mb-6" />
          <p className="text-[12px] font-black uppercase tracking-widest text-slate-400 italic">
            No opportunities found in this category yet.
          </p>
          <Button variant="link" onClick={() => router.push('/jobs')} className="mt-4 uppercase text-[10px] font-black">
            View All Jobs
          </Button>
        </div>
      )}
    </div>
  );
}

import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";

export default function JobsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-3"
            >
              Marketplace
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase leading-tight mb-6 text-slate-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
              Available <span className="text-primary">Jobs</span> Under This Category
            </h1>
            <div className="h-1.5 w-16 bg-primary" />
          </div>

          <Suspense fallback={
            <div className="py-24 flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          }>
            <JobsListContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

