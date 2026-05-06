"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  ShieldCheck,
  Briefcase,
  Settings,
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
    { label: "Settings", href: "/dashboard/settings", icon: Settings, show: true },
  ];

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -300,
          width: sidebarOpen ? (sidebarCollapsed ? 80 : 280) : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? (sidebarCollapsed ? 80 : 280) : 0)
        }}
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-slate-950 z-50 overflow-hidden flex flex-col transition-all duration-300",
          !sidebarOpen && "lg:w-0"
        )}
      >
        <div className="h-20 flex items-center justify-end px-6">
          <div className="flex items-center gap-1">
            <button
              onClick={toggleSidebarCollapsed}
              className="hidden lg:flex p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-900"
            >
              {sidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-8 px-3 space-y-2">
          <TooltipProvider delayDuration={0}>
            {menuItems.filter(item => item.show).map((item) => {
              const isActive = pathname === item.href;
              const content = (
                <Link
                  href={item.href}
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
