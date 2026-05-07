"use client";

import React from "react";
import { Menu, Bell, Search, Maximize } from "lucide-react";
import { useUiStore } from "@/src/hooks/useUiStore";
import { UserMenu } from "./UserMenu";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/hooks/useAuth";
import { PostJobModal } from "@/src/features/jobs/components";

export const DashboardHeader = () => {
  const { toggleSidebar } = useUiStore();
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b-2 border-slate-900 sticky top-0 z-30 flex lg:hidden items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleSidebar}
          className="p-3 bg-slate-900 text-white hover:bg-slate-800 transition-all border border-slate-700"
        >
          <Menu className="w-5 h-5" />
        </button>
 
        {user?.role === "customer" && (
          <PostJobModal 
            trigger={
              <Button size="sm" className="bg-slate-900 text-white rounded-none border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(225,29,72,1)] h-9 px-3 text-[9px] font-black uppercase tracking-widest">
                Post Job
              </Button>
            }
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 dark:hover:text-white relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </Button>
        <UserMenu />
      </div>
    </header>
  );
};
