"use client";

import React, { useState } from "react";
import { AdminJobsTable, AdminCategoriesTable } from "@/src/features/admin/components";
import { Briefcase, Tag } from "lucide-react";
import { cn } from "@/src/lib/utils";

type Tab = "jobs" | "categories";

export default function AdminJobsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("jobs");

  const tabs = [
    { id: "jobs" as Tab, label: "Active Jobs", icon: Briefcase },
    { id: "categories" as Tab, label: "Categories", icon: Tag },
  ];

  return (
    <div className="p-4 md:p-10 space-y-10 min-h-screen bg-slate-50/30 dark:bg-slate-950/20">
      {/* Refined Page Header - Smaller text, red bar instead of icon, aligned style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-10 bg-primary shrink-0" />
          <div className="space-y-0.5">
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white leading-none whitespace-nowrap">
              Job <span className="text-primary">Ecosystem</span>
            </h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Manage Service Categories & Monitor Live Requirements
            </p>
          </div>
        </div>

        {/* Brutalist Tabs - Equal Sizes */}
        <div className="flex w-full md:w-[400px] border-2 border-slate-900 dark:border-white p-1 bg-white dark:bg-slate-900">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-6 py-3 transition-all duration-200 font-black uppercase tracking-widest text-[10px]",
                  isActive 
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                    : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === "jobs" ? (
          <AdminJobsTable />
        ) : (
          <AdminCategoriesTable />
        )}
      </div>
    </div>
  );
}
