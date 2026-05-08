"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { 
  Briefcase, 
  Send, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { useJobApplications } from "../hooks/useJobApplications";
import { toast } from "react-hot-toast";

interface JobApplyModalProps {
  job: any;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function JobApplyModal({ job, trigger, onSuccess }: JobApplyModalProps) {
  const [open, setOpen] = useState(false);
  const { apply, loading } = useJobApplications();
  const [formData, setFormData] = useState({
    proposed_price: job.price?.toString() || "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await apply(job.id.toString(), {
      proposed_price: parseFloat(formData.proposed_price),
      message: formData.message,
    });

    if (result) {
      toast.success("Application submitted successfully!");
      setOpen(false);
      onSuccess?.();
    } else {
      toast.error("Failed to submit application");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="h-10 px-6 bg-primary text-white hover:bg-rose-700 rounded-none font-black uppercase tracking-widest text-[9px] transition-all">
            Apply Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white dark:bg-slate-950 rounded-none border-4 border-slate-900 dark:border-white p-0 overflow-hidden shadow-[12px_12px_0px_0px_rgba(15,23,42,0.1)]">
        <div className="bg-slate-900 p-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-tighter italic leading-none">
              Apply For <span className="text-primary">Job</span>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 bg-white dark:bg-slate-800 border-2 border-slate-900 dark:border-white flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-slate-900 dark:text-white" />
            </div>
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white">{job.title}</h3>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">
                Budget: ETB {job.price?.toLocaleString()}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="proposed_price" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Proposed Rate (ETB)</Label>
              <div className="relative">
                <Input
                  id="proposed_price"
                  type="number"
                  placeholder="0.00"
                  required
                  className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 font-bold text-xs h-12 px-4 bg-slate-50/50"
                  value={formData.proposed_price}
                  onChange={(e) => setFormData({ ...formData, proposed_price: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Proposal Message</Label>
              <Textarea
                id="message"
                placeholder="DESCRIBE WHY YOU ARE THE BEST FIT FOR THIS JOB..."
                required
                rows={4}
                className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 font-bold text-xs bg-slate-50/50 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-400 p-3 flex gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[9px] font-bold uppercase leading-relaxed text-amber-800 dark:text-amber-400">
                A professional proposal increases your chances of being selected by 70%.
              </p>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-slate-900 text-white hover:bg-primary rounded-none font-black uppercase tracking-widest text-[11px] transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
