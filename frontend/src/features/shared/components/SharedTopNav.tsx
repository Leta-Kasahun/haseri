"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { NotificationCenter } from "@/src/features/notifications";
import { useUiStore } from "@/src/hooks/useUiStore";
import {
  Bell,
  Search,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const SharedTopNav = () => {
  const pathname = usePathname();
  const { setSidebarOpen, sidebarOpen } = useUiStore();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Left Side: Hamburger & Mobile Branding */}
          <div className="flex items-center gap-4">
            {/* Hamburger Button on the LEFT for Mobile */}
            <button 
              className="lg:hidden p-2 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Logo Section - Clean & Minimalist */}
            {!sidebarOpen && (
              <div className="flex lg:hidden items-center gap-2">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 bg-primary flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500 shadow-sm">
                    <span className="text-white font-black text-lg italic">H</span>
                  </div>
                  <span className="text-xl font-black tracking-tighter uppercase italic text-foreground">
                    Haseri<span className="text-primary">.</span>
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Centralized Search Bar (Desktop/Tablet) */}
          <div className="hidden sm:flex flex-1 max-w-[400px] mx-4 lg:mx-0 justify-center">
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 w-full rounded-xl focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-full text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Right Side: Professional Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-5">
              <Button variant="ghost" size="icon" className="sm:hidden text-slate-500">
                <Search className="w-5 h-5" />
              </Button>
              
              <NotificationCenter />
              <div className="hidden sm:block h-5 w-px bg-slate-100 dark:bg-slate-800" />
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
