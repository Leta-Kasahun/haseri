"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  ShieldCheck,
  Briefcase,
  X,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  FileText
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useUiStore } from "@/src/hooks/useUiStore";
import { useAuth } from "@/src/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleSidebarCollapsed } = useUiStore();
  const { user } = useAuth();

  const isCustomer = user?.role === "customer";
  const isProvider = user?.role === "provider";

  const menuItems = [
    { label: "Overview", href: isCustomer ? "/customer" : "/technician", icon: LayoutDashboard, show: true },
    {
      label: "Applications",
      href: isCustomer ? "/customer/applications" : "/technician/applications",
      icon: FileText,
      show: isCustomer || isProvider
    },
    {
      label: "My Jobs",
      href: isCustomer ? "/customer/jobs" : "/technician/jobs",
      icon: Briefcase,
      show: isCustomer || isProvider
    },
    {
      label: "My Profile",
      href: isCustomer ? "/customer/profile" : "/technician/profile",
      icon: User,
      show: isCustomer || isProvider
    },
    {
      label: "Verification",
      href: isCustomer ? "/customer/verify" : "/technician/verify",
      icon: ShieldCheck,
      show: isCustomer || isProvider
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -300 : 0),
          width: sidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) 
            ? (sidebarCollapsed ? 80 : 280) 
            : 0
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-slate-950 z-[70] overflow-hidden flex flex-col transition-all duration-300 border-r border-slate-200 dark:border-slate-800",
          !sidebarOpen && "lg:w-auto"
        )}
      >
        {/* Logo at the Top */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <Link href="/" className="flex items-center gap-3 group transition-all">
            <div className="w-8 h-8 bg-primary flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500 shadow-sm">
              <span className="text-white font-black text-lg italic">H</span>
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-black tracking-tighter uppercase italic text-foreground whitespace-nowrap">
                Haseri<span className="text-primary">.</span>
              </span>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Toggle & Header Area (Desktop only toggle) */}
        <div className="h-16 flex items-center justify-between px-6">
          {!sidebarCollapsed && (
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Portal</span>
          )}
          <button
            onClick={toggleSidebarCollapsed}
            className="hidden lg:flex p-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-white transition-all text-slate-400 ml-auto"
          >
            {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto pt-6 pb-8 px-3 space-y-2">
          <TooltipProvider delayDuration={0}>
            {menuItems.filter(item => item.show).map((item) => {
              const isActive = pathname === item.href;
              const content = (
                <Link
                  href={item.href}
                  onClick={() => typeof window !== 'undefined' && window.innerWidth < 1024 && setSidebarOpen(false)}
                  className={cn(
                    "flex items-center group transition-all duration-200 border-2",
                    sidebarCollapsed ? "justify-center p-3" : "justify-between px-4 py-4",
                    isActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]"
                      : "bg-transparent border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                    )} />
                    {!sidebarCollapsed && (
                      <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {isActive && !sidebarCollapsed && <ChevronRight className="w-4 h-4 text-primary" />}
                </Link>
              );

              if (sidebarCollapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{content}</TooltipTrigger>
                    <TooltipContent side="right" className="rounded-none bg-slate-900 border-none text-[10px] font-black uppercase tracking-widest px-3 py-2">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }
              return <div key={item.href}>{content}</div>;
            })}
          </TooltipProvider>
        </nav>
      </motion.aside>
    </>
  );
};
