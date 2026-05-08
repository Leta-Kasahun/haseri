"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { 
  MapPin, 
  Star,
  Info
} from "lucide-react";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";
import { cn } from "@/src/lib/utils";

interface TechnicianDetailsModalProps {
  application: any;
  isOpen: boolean;
  onClose: () => void;
}

export function TechnicianDetailsModal({ application, isOpen, onClose }: TechnicianDetailsModalProps) {
  if (!application) return null;

  const provider = application.provider;
  if (!provider) return null;

  const rating = provider.average_rating || "0.0";
  const address = provider.address;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-xl p-0 border-4 border-slate-900 rounded-none shadow-[12px_12px_0px_0px_rgba(15,23,42,0.1)] overflow-hidden">
        {/* Header - Matching PostJobModal exactly */}
        <div className="bg-slate-900 p-5 md:p-6 text-white relative shrink-0">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter italic leading-none">
              View <span className="text-primary">Technician Details</span>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-5 md:p-6 space-y-6 bg-white overflow-y-auto max-h-[80vh]">
          {/* Profile Basic Info */}
          <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-6">
            <Avatar className="h-16 w-16 border-2 border-slate-900 rounded-none">
              <AvatarImage src={resolveAssetUrl(provider.avatar)} alt={provider.name} className="object-cover" />
              <AvatarFallback className="bg-slate-100 text-slate-900 font-black text-xl uppercase">
                {provider.name?.charAt(0) || "T"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 italic leading-none">
                {provider.name}
              </h3>
              <div className="flex items-center gap-1.5 text-amber-500">
                <Star size={14} fill="currentColor" />
                <span className="text-[11px] font-black uppercase tracking-widest">{rating} Rating</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 border-l border-slate-200 ml-1">
                  {provider.review_count || 0} Reviews
                </span>
              </div>
            </div>
          </div>

          {/* Application Message / Description */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Application Message</Label>
            <div className="bg-slate-50 p-4 border-2 border-slate-200 italic">
              <p className="text-sm font-bold text-slate-700 leading-relaxed">
                {application.message || "No specific message provided with this application."}
              </p>
            </div>
          </div>

          {/* Location Details - Simply laid out like the PostJob form */}
          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Service Area Details</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-1">
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">City / Sub-City</span>
                 <div className="h-12 flex items-center px-4 bg-slate-50 border-2 border-slate-200 font-black uppercase text-[11px] text-slate-900">
                   {address?.city || "N/A"}
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Woreda</span>
                    <div className="h-12 flex items-center px-4 bg-slate-50 border-2 border-slate-200 font-black uppercase text-[11px] text-slate-900">
                      {address?.woreda || "-"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Kebele</span>
                    <div className="h-12 flex items-center px-4 bg-slate-50 border-2 border-slate-200 font-black uppercase text-[11px] text-slate-900">
                      {address?.kebele || "-"}
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Specific Location</span>
              <div className="h-12 flex items-center px-4 bg-slate-50 border-2 border-slate-200 font-black uppercase text-[11px] text-slate-900">
                {address?.specific_location || "No landmark specified"}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Utility Label component if not imported
const Label = ({ children, className }: any) => (
  <span className={cn("block", className)}>
    {children}
  </span>
);
