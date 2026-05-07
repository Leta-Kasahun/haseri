"use client";

import React from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { DashboardFooter } from "@/src/features/shared/components";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 transition-all duration-300 px-4 sm:px-6 lg:px-10 py-8">
          <div className="w-full">{children}</div>
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
}
