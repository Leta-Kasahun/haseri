"use client";

import React, { useEffect, useState } from "react";
import { useJobs } from "@/src/features/jobs/hooks/useJobs";
import { jobsApi } from "@/src/features/jobs/services";
import { useJobApplications } from "@/src/features/jobs/hooks/useJobApplications";
import { JobApplyModal } from "@/src/features/jobs/components/JobApplyModal";
import { JobDetailsModal } from "@/src/features/jobs/components/JobDetailsModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { 
  Search, 
  MapPin, 
  Clock, 
  ArrowRight,
  Briefcase,
  AlertCircle,
  Loader2,
  ChevronDown,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-hot-toast";

export function TechnicianJobBrowser() {
  const { jobs, loading, getJobs } = useJobs();
  const { apply, loading: applying } = useJobApplications();
  const [categories, setCategories] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    category_id: "",
    city: "",
    sort: "newest" as "newest" | "oldest" | "price_high" | "price_low"
  });

  useEffect(() => {
    getJobs({
      search: filters.search,
      category_id: filters.category_id ? Number(filters.category_id) : undefined,
      city: filters.city,
      sort: filters.sort
    });
  }, [filters, getJobs]);

  useEffect(() => {
    const fetchCats = async () => {
      const res = await jobsApi.getCategories();
      setCategories(res.data.data);
    };
    fetchCats();
  }, []);

  const handleApply = async (jobId: string) => {
    const success = await apply(jobId);
    if (success) {
      toast.success("Application submitted successfully!");
    } else {
      toast.error("Failed to submit application");
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Professional Filter Console - No Shadows */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              value={filters.search}
              onChange={e => setFilters({...filters, search: e.target.value})}
              placeholder="Keywords..." 
              className="h-12 pl-11 rounded-none border border-slate-200 focus:border-slate-900 font-bold bg-slate-50/50" 
            />
          </div>
          
          <select 
            value={filters.category_id}
            onChange={e => setFilters({...filters, category_id: e.target.value})}
            className="h-12 px-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-none font-bold text-xs uppercase tracking-widest outline-none focus:border-slate-900 appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              value={filters.city}
              onChange={e => setFilters({...filters, city: e.target.value})}
              placeholder="Location..." 
              className="h-12 pl-11 rounded-none border border-slate-200 focus:border-slate-900 font-bold bg-slate-50/50" 
            />
          </div>

          <select 
            value={filters.sort}
            onChange={e => setFilters({...filters, sort: e.target.value as any})}
            className="h-12 px-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-none font-bold text-xs uppercase tracking-widest outline-none focus:border-slate-900 appearance-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_high">Highest Price</option>
            <option value="price_low">Lowest Price</option>
          </select>
        </div>
      </div>

      {/* Jobs Table - No Shadows */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/70 dark:bg-slate-800/50">
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Service Details</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Location</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Budget</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Posted</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Syncing opportunities...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : jobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <AlertCircle className="w-8 h-8 text-slate-200" />
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">No matching jobs found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                jobs.map((job) => (
                  <TableRow key={job.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-50 dark:border-slate-800/50">
                    <TableCell className="py-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white">
                          {job.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 border border-primary/10">
                            {typeof job.category === 'object' ? (job.category as any)?.name : job.category || "Professional"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                          {job.address?.city || "Addis Ababa"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-black tracking-tight text-slate-900 dark:text-white">
                          ETB {job.price?.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold uppercase tracking-tight text-slate-500">
                          {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <div className="flex items-center justify-end gap-3">
                        <JobDetailsModal 
                          job={job}
                          trigger={
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none border border-slate-200 hover:border-slate-900 transition-all" title="View Details">
                              <Eye className="w-4 h-4" />
                            </Button>
                          }
                        />
                        <JobApplyModal 
                          job={job}
                          onSuccess={getJobs}
                          trigger={
                            <Button 
                              disabled={applying}
                              className="h-10 px-6 bg-primary text-white hover:bg-rose-700 rounded-none font-black uppercase tracking-widest text-[9px] transition-all"
                            >
                              {applying ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <ArrowRight className="w-3.5 h-3.5 mr-2" />}
                              Apply
                            </Button>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
