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
import { Textarea } from "@/src/components/ui/textarea";
import { Star, Send, MessageSquare, AlertCircle } from "lucide-react";
import { useCreateReview } from "../hooks/useCreateReview";
import { toast } from "react-hot-toast";
import { cn } from "@/src/lib/utils";

interface ReviewModalProps {
  jobId: number;
  reviewedUserId: number;
  reviewedUserName: string;
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

export function ReviewModal({
  jobId,
  reviewedUserId,
  reviewedUserName,
  trigger,
  onSuccess,
}: ReviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const { create, loading } = useCreateReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    const result = await create({
      job_id: jobId,
      reviewed_user_id: reviewedUserId,
      rating,
      comment: comment.trim() || undefined,
    });

    if (result) {
      toast.success("Review submitted successfully!");
      setIsOpen(false);
      setRating(0);
      setComment("");
      onSuccess?.();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] p-0 gap-0 border-none bg-white dark:bg-slate-950 rounded-none overflow-hidden">
        <DialogHeader className="p-8 bg-slate-900 text-white space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-none border border-white/20">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </div>
            <DialogTitle className="text-xl font-black uppercase tracking-tighter italic">
              Submit <span className="text-primary">Review</span>
            </DialogTitle>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Share your experience with <span className="text-white">{reviewedUserName}</span>
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Rating Stars */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Star className="w-3 h-3" />
              Professional Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-all duration-200 transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "w-10 h-10 transition-colors",
                      (hoveredRating || rating) >= star
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-slate-200 dark:text-slate-800"
                    )}
                  />
                </button>
              ))}
            </div>
            <p className="text-[9px] font-bold text-slate-400 italic">
              {rating > 0 ? `You selected ${rating} star${rating > 1 ? 's' : ''}` : "Select a rating to continue"}
            </p>
          </div>

          {/* Comment Field */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <MessageSquare className="w-3 h-3" />
              Additional Comments (Optional)
            </label>
            <Textarea
              placeholder="Tell us more about the service quality, communication, and professionalism..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[120px] rounded-none border-2 border-slate-100 dark:border-slate-800 focus:border-primary focus:ring-0 text-[11px] font-bold p-4 bg-slate-50/50 dark:bg-slate-900/50 transition-all"
            />
          </div>

          {/* Guidelines */}
          <div className="p-4 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 flex gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-[9px] font-bold text-amber-700/80 leading-relaxed uppercase tracking-tight">
              Reviews help maintain marketplace integrity. Please be honest and professional in your feedback.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="flex-1 h-14 rounded-none border border-slate-200 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || rating === 0}
              className="flex-[2] h-14 rounded-none bg-slate-900 text-white hover:bg-primary font-black uppercase tracking-widest text-[11px] shadow-xl shadow-slate-900/20 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
