"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { AlertTriangle, ArrowRight, Loader2 } from "lucide-react";
import { useJobPayment } from "../hooks/useJobPayment";
import { toast } from "react-hot-toast";

interface JobPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobData: any;
}

export function JobPaymentModal({ open, onOpenChange, jobData }: JobPaymentModalProps) {
  const { initiateJobPayment, loading, error } = useJobPayment();

  const handlePay = async () => {
    if (!jobData) return;
    const success = await initiateJobPayment(jobData);
    if (!success) {
      toast.error(error || "Failed to initiate payment for this job.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md min-h-[320px] border-4 border-slate-900 dark:border-white bg-white dark:bg-slate-950 p-0 overflow-hidden shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)] rounded-none">
        <div className="bg-slate-900 p-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Payment Required
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-[11px] font-bold tracking-widest uppercase">
              Free trial exhausted
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
            <p className="text-[12px] font-semibold text-amber-900 leading-relaxed">
              You have finished your free trial, so you have to pay for this job on Chapa.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Job Details</p>
            <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
              {jobData?.title || "New Job"}
            </p>
            <p className="text-2xl font-black italic tracking-tighter text-primary mt-2">
              50 ETB
            </p>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 sm:justify-between flex-row items-center gap-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-none h-12 border-slate-200 font-black uppercase tracking-widest text-[10px]"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePay}
            disabled={loading}
            className="flex-[2] rounded-none h-12 bg-primary hover:bg-rose-700 text-white font-black uppercase tracking-widest text-[10px] shadow-none"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Pay on Chapa
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
