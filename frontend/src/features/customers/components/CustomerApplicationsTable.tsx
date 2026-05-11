"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useJobApplications, useJobs } from "@/src/features/jobs/hooks";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Eye, Check, X as CloseIcon, Briefcase, Calendar, User, MapPin, Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";
import { TechnicianDetailsModal } from "./TechnicianDetailsModal";
import { ChatDialog } from "@/src/features/chat";
import { MessageSquare } from "lucide-react";

export function CustomerApplicationsTable() {
  const { jobs, getMyJobs } = useJobs();
  const { applications, getApplications, accept, reject, loading } = useJobApplications();
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [chatApp, setChatApp] = useState<any>(null);
  const [filters, setFilters] = useState({
    search: "",
    location: ""
  });

  useEffect(() => {
    getMyJobs();
  }, [getMyJobs]);

  useEffect(() => {
    if (jobs.length > 0 && !selectedJobId) {
      setSelectedJobId(String(jobs[0].id));
    }
  }, [jobs, selectedJobId]);

  useEffect(() => {
    if (selectedJobId) {
      getApplications(selectedJobId);
    }
  }, [selectedJobId, getApplications]);

  const skills = useMemo(() => {
    const map = new Map<string, string>();
    applications.forEach((app: any) => {
      const list = app.provider?.skills || [];
      list.forEach((item: any) => {
        const name = typeof item === "string" ? item : item?.skill_name;
        if (!name) return;
        const key = String(name).toLowerCase();
        if (!map.has(key)) map.set(key, String(name));
      });
    });
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const location = filters.location.trim().toLowerCase();
    const skill = "";

    const list = applications.filter((app: any) => {
      const provider = app.provider || {};
      const name = String(provider.name || "").toLowerCase();
      const city = String(provider.address?.city || "").toLowerCase();
      const skillList = (provider.skills || []).map((item: any) =>
        String(typeof item === "string" ? item : item?.skill_name || "").toLowerCase()
      );

      if (search && !name.includes(search)) return false;
      if (location && !city.includes(location)) return false;
      if (skill && !skillList.some((item) => item.includes(skill))) return false;
      return true;
    });

    return list;
  }, [applications, filters]);

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
    <div className="space-y-6">
      {/* Job Selector - Brutalist Styled */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Select Job Posting</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reviewing applications for specific services</p>
        </div>
        <Select value={selectedJobId} onValueChange={setSelectedJobId}>
          <SelectTrigger className="h-12 px-4 bg-slate-50/50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-none font-black text-[11px] uppercase tracking-widest focus:border-primary min-w-[280px]">
            <SelectValue placeholder="Select job" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-none shadow-2xl p-2 bg-white dark:bg-slate-900">
            {jobs.map((job) => (
              <SelectItem
                key={job.id}
                value={String(job.id)}
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-none"
              >
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Name..."
              className="h-12 pl-11 rounded-none border border-slate-200 focus:border-slate-900 font-bold bg-slate-50/50"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              placeholder="Location..."
              className="h-12 pl-11 rounded-none border border-slate-200 focus:border-slate-900 font-bold bg-slate-50/50"
            />
          </div>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/70 dark:bg-slate-800/50">
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5 px-8">Technician</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Applied Date</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Proposed Rate</TableHead>
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
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Fetching applicants...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    No applications received for this job yet.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow key={app.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-50 dark:border-slate-800/50">
                    <TableCell className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border-2 border-slate-100 dark:border-slate-800 rounded-none">
                          <AvatarImage src={resolveAssetUrl(app.provider?.avatar)} alt={app.provider?.name} className="object-cover" />
                          <AvatarFallback className="bg-slate-900 text-white font-black text-xs">
                            {app.provider?.name?.charAt(0) || "T"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white">
                            {app.provider?.name || "Professional Technician"}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <User className="w-2.5 h-2.5" /> Verified Provider
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
                          ETB {app.proposed_price?.toLocaleString() || "Quote Pending"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("rounded-none text-[9px] font-black uppercase tracking-widest border shadow-none px-2.5 py-1", getStatusStyle(app.status))}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          onClick={() => setSelectedApplication(app)}
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-none border border-slate-200 hover:border-slate-900 transition-all group" 
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                        </Button>
                        <Button 
                          onClick={() => setChatApp(app)}
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-none border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all group" 
                          title="Chat with Technician"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => accept(String(app.id))}
                          disabled={app.status !== "pending"}
                          className="h-9 px-4 bg-emerald-600 text-white hover:bg-emerald-700 rounded-none font-black uppercase tracking-widest text-[9px] transition-all disabled:opacity-50"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => reject(String(app.id))}
                          disabled={app.status !== "pending"}
                          className="h-9 px-4 bg-rose-600 text-white hover:bg-rose-700 rounded-none font-black uppercase tracking-widest text-[9px] transition-all disabled:opacity-50"
                        >
                          Reject
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

      <TechnicianDetailsModal
        application={selectedApplication}
        isOpen={!!selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />

      <ChatDialog 
        isOpen={!!chatApp} 
        onClose={() => setChatApp(null)} 
        jobId={chatApp?.job_id} 
        otherUser={chatApp?.provider} 
      />
    </div>
  );
}
