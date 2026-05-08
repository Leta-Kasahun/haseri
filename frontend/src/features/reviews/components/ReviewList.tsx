"use client";

import React from "react";
import { Star, MessageSquare, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";
import type { Review } from "../types";

interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
}

export function ReviewList({ reviews, loading }: ReviewListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-none border border-slate-200 dark:border-slate-700" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800">
        <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div 
          key={review.id} 
          className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-6 transition-all hover:border-primary/30"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 rounded-none border border-slate-200 dark:border-slate-700">
                <AvatarImage src={resolveAssetUrl(review.reviewer?.avatar)} />
                <AvatarFallback className="bg-slate-900 text-white text-[10px] font-black uppercase">
                  {review.reviewer?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  {review.reviewer?.name}
                </h4>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      className={cn(
                        "w-2.5 h-2.5",
                        review.rating >= s ? "text-yellow-400 fill-yellow-400" : "text-slate-200 dark:text-slate-800"
                      )} 
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3 h-3" />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                {format(new Date(review.created_at), "MMM dd, yyyy")}
              </span>
            </div>
          </div>

          {review.comment && (
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-950/50 border-l-2 border-primary/20">
              <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
