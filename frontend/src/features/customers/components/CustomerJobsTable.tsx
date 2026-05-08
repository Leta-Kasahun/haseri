"use client";

import React, { useEffect } from "react";
import { useJobs } from "@/src/features/jobs/hooks";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Eye, Edit2, Trash2, Calendar, Briefcase, Users, Star, CheckSquare } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { PostJobModal, JobApplicantsModal } from "@/src/features/jobs/components";
import { ReviewModal } from "@/src/features/reviews/components";
import { toast } from "react-hot-toast";
import { jobsApi } from "@/src/features/jobs/services";

export function CustomerJobsTable() {
  const { jobs, loading, getMyJobs } = useJobs();

  useEffect(() => {
    getMyJobs();
  }, [getMyJobs]);

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-600 border-green-200";
      case "cancelled":
        return "bg-rose-50 text-rose-600 border-rose-200";
      case "in_progress":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "open":
        return "bg-amber-50 text-amber-600 border-amber-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-none overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">My Posted Jobs</h2>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">Manage and track your service requests</p>
        </div>
        <PostJobModal 
          trigger={
            <Button className="h-10 px-6 bg-slate-900 text-white hover:bg-primary rounded-none font-black uppercase tracking-widest text-[9px] transition-all">
              Post New Job
            </Button>
          }
          onSuccess={getMyJobs}
        />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 dark:bg-slate-800/50">
              <TableHead className="text-[10px] font-black uppercase tracking-widest py-5 px-6">Job Details</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Posted Date</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Budget</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Loading your jobs...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-20 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  No jobs posted yet. Start by creating a new service request.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-50 dark:border-slate-800/50">
                  <TableCell className="py-5 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white">
                        {job.title}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3 text-slate-400" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                          {typeof job.category === 'object' ? (job.category as any)?.name : job.category || "Professional Service"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[10px] font-bold uppercase tracking-tight text-slate-500">
                        {format(new Date(job.created_at), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-black tracking-tight text-slate-900 dark:text-white">
                        ETB {job.price?.toLocaleString() || "Market Rate"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("rounded-none text-[9px] font-black uppercase tracking-widest border shadow-none px-2.5 py-1", getStatusStyle(job.status))}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <div className="flex items-center justify-end gap-2">
                      {job.status === "completed" && job.technician_id && (
                        <ReviewModal
                          jobId={job.id}
                          reviewedUserId={job.technician_id}
                          reviewedUserName={job.technician?.first_name || "Technician"}
                          onSuccess={getMyJobs}
                          trigger={
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none border border-green-200 bg-green-50 text-green-600 hover:border-green-600 hover:bg-green-600 hover:text-white transition-all group" title="Review Technician">
                              <Star className="w-4 h-4" />
                            </Button>
                          }
                        />
                      )}
                      {(job.status === "open" || job.status === "assigned" || job.status === "in_progress") && (
                        <Button
                          onClick={async () => {
                            if (window.confirm("Mark this job as completed?")) {
                              try {
                                await jobsApi.complete(job.id.toString());
                                toast.success("Job marked as completed");
                                getMyJobs();
                              } catch (err: any) {
                                toast.error(err.response?.data?.message || "Failed to complete job");
                              }
                            }
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-none border border-slate-200 hover:border-primary hover:bg-primary/5 text-slate-400 hover:text-primary transition-all"
                          title="Mark as Completed"
                        >
                          <CheckSquare className="w-4 h-4" />
                        </Button>
                      )}
                      <PostJobModal
                        job={job}
                        onSuccess={getMyJobs}
                        trigger={
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none border border-slate-200 hover:border-slate-900 transition-all" title="Edit Job">
                            <Edit2 className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900" />
                          </Button>
                        }
                      />
                      <Button 
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this job?")) {
                            try {
                              await jobsApi.delete(job.id.toString());
                              toast.success("Job deleted successfully");
                              getMyJobs();
                            } catch (err: any) {
                              toast.error(err.response?.data?.message || "Failed to delete job");
                            }
                          }
                        }}
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-none border border-slate-200 hover:border-rose-600 hover:bg-rose-600 hover:text-white transition-all group" 
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
