"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { Job } from "../../jobs/types";
import { Badge } from "@/src/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  User, 
  Wrench, 
  Info,
  DollarSign,
  Clock
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobDetailsModal({ job, isOpen, onClose }: JobDetailsModalProps) {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-2 border-slate-900 dark:border-white rounded-none">
        <div className="bg-slate-900 dark:bg-white p-6">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
               <span className="bg-primary px-2 py-0.5 text-[10px] font-black text-white uppercase tracking-[0.2em]">
                 {typeof job.category === 'object' ? (job.category as any)?.name : job.category || "General"}
               </span>
               <span className="text-[10px] font-black text-white/60 dark:text-slate-400 uppercase tracking-widest">
                 Ref: #{job.id}
               </span>
            </div>
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-white dark:text-slate-900 leading-tight">
              {job.title}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-8 bg-white dark:bg-slate-900">
          {/* Status and Price Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-slate-100 dark:border-slate-800 p-4">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Current Status</span>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-primary" />
                <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
                  {job.status}
                </span>
              </div>
            </div>
            <div className="border-2 border-slate-100 dark:border-slate-800 p-4">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Budget</span>
              <div className="flex items-center gap-2">
                <DollarSign size={14} className="text-primary" />
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  ETB {job.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white flex items-center gap-2">
              <Info size={12} className="text-primary" /> Description
            </h4>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-l-4 border-primary">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                {job.description || "No detailed description provided for this requirement."}
              </p>
            </div>
          </div>

          {/* Parties Involved */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t-2 border-slate-100 dark:border-slate-800">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Customer Details</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-black text-sm">
                  {job.customer?.name?.[0] || "C"}
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-tight text-slate-900 dark:text-white">
                    {job.customer?.name || "Anonymous Customer"}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client</div>
                </div>
              </div>
            </div>

            {job.technician && (
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Assigned Technician</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border-2 border-primary flex items-center justify-center text-primary font-black text-sm">
                    {job.technician.name?.[0] || "T"}
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-tight text-slate-900 dark:text-white">
                      {job.technician.name}
                    </div>
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Service Provider</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Location and Date */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t-2 border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-2">
               <MapPin size={14} className="text-slate-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                 {job.address?.city || "Unknown"}, {job.address?.specific_location || "No Specific Address"}
               </span>
             </div>
             <div className="flex items-center gap-2">
               <Calendar size={14} className="text-slate-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                 Posted: {format(new Date(job.created_at), "MMM dd, yyyy")}
               </span>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
