"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight, Loader2 } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { jobsApi } from "@/src/features/jobs/services/jobs.api";
import type { JobCategory } from "@/src/features/jobs/types";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";


export const CategoriesSection = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await jobsApi.getCategories();
        setCategories(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (id: number) => {
    router.push(`/jobs?category_id=${id}`);
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-3"
          >
            Marketplace
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase leading-tight mb-6 text-slate-900 dark:text-white">
            Browse <span className="text-primary">Job</span> Categories.
          </h2>
          <div className="h-1.5 w-16 bg-primary" />
        </div>


          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="What are you looking for?"
              className="rounded-none border-border h-14 pl-12 bg-slate-50 dark:bg-slate-900 focus-visible:border-primary transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Category Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Loading categories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {displayedCategories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-start text-left p-8 border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 group min-h-[180px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <ChevronRight className="w-12 h-12 -rotate-45" />
                </div>
                
                <div className="mb-4">
                  <span className="text-xs md:text-sm font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
                  <div className="h-1 w-8 bg-primary/20 group-hover:w-16 group-hover:bg-primary transition-all duration-500 mt-1" />
                </div>

                <p className="text-[11px] md:text-xs font-medium leading-relaxed text-muted-foreground line-clamp-3 mb-6 flex-grow">
                  {cat.description || "Browse professional experts in this category."}
                </p>

                <div className="flex items-center gap-2 mt-auto">
                   <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
                     {cat.jobs_count || 0} Open Jobs
                   </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Featured Preview */}
        {!loading && categories.length > 4 && (
          <div className="flex items-center justify-center">
            <Button 
              onClick={() => setShowAll(!showAll)}
              variant="outline" 
              className="rounded-none px-10 h-14 border-2 border-foreground font-black uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-all group"
            >
              {showAll ? "Show Less" : "View All Categories"}
              <ChevronRight className={cn("ml-2 w-4 h-4 transition-transform group-hover:translate-x-1", showAll && "-rotate-90 group-hover:translate-x-0 group-hover:-translate-y-1")} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};


