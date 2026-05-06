"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { NotificationCenter } from "@/src/features/notifications";
import {
  Bell,
  Search,
  Home,
  Briefcase,
  User,
  ShieldCheck,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const SharedTopNav = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group transition-all">
              <div className="w-8 h-8 bg-primary flex items-center justify-center border border-primary group-hover:rotate-90 transition-transform">
                <span className="text-white font-black text-lg italic">H</span>
              </div>
              <span className="hidden sm:block text-xl font-black tracking-tighter uppercase italic">
                Haseri<span className="text-primary">.</span>
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 sm:gap-6 flex-1 justify-end">
            {/* Search Integrated Near Bell */}
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 w-full max-w-[320px] rounded-xl focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-full text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <NotificationCenter />
              <UserMenu />
            </div>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-slate-500 hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t-2 border-slate-900 bg-white dark:bg-slate-950 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-6">
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 rounded-xl">
                <Search className="w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-full text-slate-900 dark:text-white"
                />
              </div>
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Account Control</span>
                 <UserMenu />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
