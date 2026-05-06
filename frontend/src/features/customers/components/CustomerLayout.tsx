"use client";

import React from "react";
import {
  SharedTopNav,
  DashboardFooter,
  DashboardSidebar
} from "@/src/features/shared/components";
import { cn } from "@/src/lib/utils";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar starts at the absolute top - consistent with technician dashboard */}
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* TopNav is now part of the content column, cut by the sidebar line */}
        <SharedTopNav />
        
        <main className="flex-1 transition-all duration-300 px-4 sm:px-6 lg:px-10 py-8">
          <div className="w-full">
            {children}
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}
