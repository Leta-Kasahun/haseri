"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Loader2, 
  LayoutGrid, 
  Briefcase, 
  User as UserIcon, 
  ChevronRight 
} from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { useSearchSuggestions } from "@/src/features/public/hooks/useSearchSuggestions";

interface GlobalSearchProps {
  role?: "customer" | "provider" | "admin";
  isMobile?: boolean;
  className?: string;
}

export const GlobalSearch = ({ role, isMobile, className }: GlobalSearchProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { suggestions, loading, showDropdown, setShowDropdown } = useSearchSuggestions(query);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [setShowDropdown]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(query)}`);
      setShowDropdown(false);
    }
  };

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <form onSubmit={handleSearch} className="relative flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 rounded-xl focus-within:ring-2 focus-within:ring-primary/10 transition-all">
        <Search className="w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowDropdown(true)}
          placeholder="Search..." 
          className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-full text-slate-900 dark:text-white"
        />
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />}
      </form>

      <AnimatePresence>
        {showDropdown && suggestions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden"
          >
            <div className="max-h-[400px] overflow-y-auto">
              {/* Prioritize based on role */}
              {role === "customer" && suggestions.technicians.length > 0 && (
                <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                     <UserIcon className="w-3.5 h-3.5" />
                     Recommended Technicians
                  </div>
                  {suggestions.technicians.map(tech => (
                    <button
                      key={tech.id}
                      onClick={() => {
                        router.push(`/public/technicians/${tech.id}`);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-tight hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between group"
                    >
                      {tech.first_name} {tech.last_name}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              )}

              {suggestions.categories.length > 0 && (
                <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                     <LayoutGrid className="w-3.5 h-3.5" />
                     Categories
                  </div>
                  {suggestions.categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        router.push(`/jobs?category_id=${cat.id}`);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-tight hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between group"
                    >
                      {cat.name}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              )}

              {role !== "customer" && suggestions.jobs.length > 0 && (
                <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                     <Briefcase className="w-3.5 h-3.5" />
                     Available Jobs
                  </div>
                  {suggestions.jobs.map(job => (
                    <button
                      key={job.id}
                      onClick={() => {
                        router.push(`/jobs?search=${encodeURIComponent(job.title)}`);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-tight hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between group"
                    >
                      <span className="truncate pr-4">{job.title}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              )}

              {/* Default Fallback for technicians if role was customer */}
              {role !== "customer" && suggestions.technicians.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                     <UserIcon className="w-3.5 h-3.5" />
                     Technicians
                  </div>
                  {suggestions.technicians.map(tech => (
                    <button
                      key={tech.id}
                      onClick={() => {
                        router.push(`/public/technicians/${tech.id}`);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-tight hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between group"
                    >
                      {tech.first_name} {tech.last_name}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              )}

              {suggestions.categories.length === 0 && suggestions.jobs.length === 0 && suggestions.technicians.length === 0 && (
                <div className="p-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                  No matches found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
