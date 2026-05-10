"use client";

import React, { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, Loader2, Briefcase, LayoutGrid } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { jobsApi } from "@/src/features/jobs/services/jobs.api";
import { publicApi } from "@/src/features/public/services/public.api";
import type { JobCategory } from "@/src/features/jobs/types";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";



export const CategoriesSection = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{
    categories: Array<{ id: number; name: string }>;
    jobs: Array<{ id: number; title: string }>;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


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

  // Debounced search suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const res = await publicApi.getSearchSuggestions(searchQuery);
          setSuggestions(res.data?.data || res.data || null);
          setShowSuggestions(true);
        } catch (err) {
          console.error("Suggestions error", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions(null);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleCategoryClick = (id: number) => {
    router.push(`/jobs?category_id=${id}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="mb-0">
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

          <div ref={searchRef} className="relative w-full md:w-96">
            <form onSubmit={handleSearchSubmit}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                placeholder="What are you looking for?"
                className="rounded-none border-border h-14 pl-12 bg-slate-50 dark:bg-slate-900 focus-visible:border-primary transition-all shadow-sm font-bold placeholder:font-medium"
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              )}
            </form>

            <AnimatePresence>
              {showSuggestions && suggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-border shadow-2xl z-50 overflow-hidden"
                >
                  {/* Categories Suggestions */}
                  {suggestions.categories.length > 0 && (
                    <div className="p-2 border-b border-border">
                      <div className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                         <LayoutGrid className="w-3 h-3" />
                         Categories
                      </div>
                      <div className="space-y-1 mt-1">
                        {suggestions.categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className="w-full text-left px-3 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-between group"
                          >
                            {cat.name}
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Jobs Suggestions */}
                  {suggestions.jobs.length > 0 && (
                    <div className="p-2">
                      <div className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                         <Briefcase className="w-3 h-3" />
                         Recent Jobs
                      </div>
                      <div className="space-y-1 mt-1">
                        {suggestions.jobs.map((job) => (
                          <button
                            key={job.id}
                            onClick={() => router.push(`/jobs?search=${encodeURIComponent(job.title)}`)}
                            className="w-full text-left px-3 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-between group"
                          >
                            <span className="truncate pr-4">{job.title}</span>
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {suggestions.categories.length === 0 && suggestions.jobs.length === 0 && (
                    <div className="p-6 text-center">
                       <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">No matches found</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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


