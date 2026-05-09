"use client";

import React, { useEffect } from "react";
import { useTechnicianApplications } from "@/src/features/jobs/hooks/useTechnicianApplications";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Eye, Edit2, Trash2, Calendar, Briefcase, Star } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { ReviewModal } from "@/src/features/reviews/components";
import { JobApplyModal } from "@/src/features/jobs/components";
import { toast } from "react-hot-toast";
import { ChatDialog } from "@/src/features/chat";
import { MessageSquare } from "lucide-react";

export function TechnicianApplicationsTable() {
  const { applications, loading, fetchMyApplications, withdrawApplication } = useTechnicianApplications();
  const [selectedApp, setSelectedApp] = React.useState<any>(null);

  useEffect(() => {
    fetchMyApplications();
  }, [fetchMyApplications]);

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-50 text-green-600 border-green-200";
      case "rejected":
        return "bg-rose-50 text-rose-600 border-rose-200";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Job Applications</h2>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">Track and manage your professional service requests</p>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full">
          {applications.length} Total Applications
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 dark:bg-slate-800/50">
              <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Job Details</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Date Applied</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Proposed Rate</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-20 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    Syncing applications...
                  </div>
                </TableCell>
              </TableRow>
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-20 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  No applications found. Explore jobs to get started.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-50 dark:border-slate-800/50">
                  <TableCell className="py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                        {app.job?.title || "Professional Service"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3 text-slate-400" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                          {app.job?.category?.name || "Maintenance"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[10px] font-bold uppercase tracking-tight text-slate-500">
                        {format(new Date(app.created_at), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-black tracking-tight text-slate-900 dark:text-white">
                        {app.proposed_price ? `ETB ${app.proposed_price.toLocaleString()}` : "Market Rate"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("rounded-none text-[9px] font-black uppercase tracking-widest border shadow-none px-2.5 py-1", getStatusStyle(app.status))}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-2">
                      {app.job?.status === "completed" && (
                        <ReviewModal
                          jobId={app.job_id}
                          reviewedUserId={app.job.customer_id}
                          reviewedUserName={app.job.customer?.first_name || "Customer"}
                          onSuccess={fetchMyApplications}
                          trigger={
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border border-green-200 bg-green-50 text-green-600 hover:border-green-600 hover:bg-green-600 hover:text-white transition-all group" title="Review Customer">
                              <Star className="w-4 h-4" />
                            </Button>
                          }
                        />
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-none border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all group" 
                        title="Chat with Customer"
                        onClick={() => setSelectedApp(app)}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </Button>
                      <JobApplyModal
                        application={app}
                        isEdit={true}
                        onSuccess={fetchMyApplications}
                        trigger={
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none border border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all group" 
                            title="Edit Application"
                            disabled={app.status !== 'pending'}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                        }
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none border border-slate-200 hover:border-rose-600 hover:bg-rose-600 hover:text-white transition-all group"
                        title="Withdraw Application"
                        disabled={app.status === 'accepted'}
                        onClick={async () => {
                          if (confirm("Are you sure you want to withdraw this application?")) {
                            const success = await withdrawApplication(app.id.toString());
                            if (success) toast.success("Application withdrawn");
                          }
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ChatDialog 
        isOpen={!!selectedApp} 
        onClose={() => setSelectedApp(null)} 
        jobId={selectedApp?.job_id} 
        otherUser={selectedApp?.job?.customer} 
      />
    </div>
  );
}
