"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { publicApi } from "@/src/features/public/services/public.api";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

export const ExploreJobsSection = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(3);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await publicApi.getRecentJobs();
        setJobs(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch public jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApplyClick = () => {
    router.push("/login");
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
          >
            Latest Opportunities
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter uppercase leading-none mb-6 text-slate-900 dark:text-white">
            Explore <span className="text-primary">Recent</span> Jobs.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-medium">
            Find the perfect task that matches your skills. Apply, complete the work, and get paid securely.
          </p>
        </div>

        <div className="flex flex-col gap-4 max-w-4xl mx-auto mb-12">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scanning marketplace for jobs...</p>
            </div>
          ) : jobs.length > 0 ? (
            jobs.slice(0, displayLimit).map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-slate-950 border border-border hover:border-primary p-6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1">
                      {job.category || "General Service"}
                    </span>
                    {job.price > 5000 && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1">
                        Premium
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-slate-900 dark:text-white uppercase tracking-tight">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>
                        {job.city || "Addis Ababa"}
                        {job.specific_location ? `, ${job.specific_location}` : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-black tracking-tight text-slate-900 dark:text-slate-200">
                        ETB {job.price?.toLocaleString() || "Negotiable"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>
                        {(() => {
                          const date = job.created_at ? new Date(job.created_at) : null;
                          const isValid = date instanceof Date && !isNaN(date.getTime());
                          return isValid ? formatDistanceToNow(date, { addSuffix: true }) : "Recently";
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <Button 
                    onClick={handleApplyClick}
                    className="w-full md:w-auto rounded-none px-8 bg-background text-foreground border-2 border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all font-black text-[10px] tracking-widest uppercase h-12"
                  >
                    Apply Now
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 border-2 border-dashed border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">No recent jobs found. Post one today!</p>
            </div>
          )}
        </div>

        {jobs.length > displayLimit && (
          <div className="flex justify-center">
            <Button 
              onClick={() => setDisplayLimit(prev => prev + 3)}
              variant="outline" 
              className="rounded-none px-10 h-14 border-2 border-foreground font-black uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-all group dark:border-white dark:hover:bg-white dark:hover:text-slate-900"
            >
              Show More Jobs
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
        
        {jobs.length <= displayLimit && jobs.length > 0 && (
           <div className="flex justify-center">
            <Button 
              onClick={() => router.push("/login")}
              variant="outline" 
              className="rounded-none px-10 h-14 border-2 border-foreground font-black uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-all group dark:border-white dark:hover:bg-white dark:hover:text-slate-900"
            >
              Browse All Jobs
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
