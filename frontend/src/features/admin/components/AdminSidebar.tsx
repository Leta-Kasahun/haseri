"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Settings, 
  PanelLeftClose, 
  PanelLeftOpen,
  ChevronRight,
  Briefcase,
  X
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AdminUserMenu } from "./AdminUserMenu";
import { useUiStore } from "@/src/hooks/useUiStore";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Jobs & Categories", href: "/admin/jobs", icon: Briefcase },
  { name: "Verifications", href: "/admin/verifications", icon: CheckSquare },
  { name: "Fee Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleSidebarCollapsed } = useUiStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-white/10 z-60 lg:hidden"
          />
        )}
      </AnimatePresence>
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : (isMobile ? -300 : 0),
          width: sidebarOpen || !isMobile ? (sidebarCollapsed ? 80 : 280) : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-slate-950 z-70 overflow-hidden flex flex-col transition-all duration-300 border-r border-slate-200 dark:border-slate-800 shadow-2xl lg:shadow-none",
          !sidebarOpen && "lg:w-auto"
        )}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group transition-all">
            <div className="w-8 h-8 bg-primary flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500 shadow-sm">
              <span className="text-white font-black text-lg italic">H</span>
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-black tracking-tighter uppercase italic text-foreground whitespace-nowrap">
                Haseri<span className="text-primary">.</span> <span className="text-slate-500 text-[10px] ml-1 tracking-widest font-black uppercase">Admin</span>
              </span>
            )}
          </Link>
          <button
            onClick={toggleSidebarCollapsed}
            className="hidden lg:flex p-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-white transition-all text-slate-400"
            aria-label="Toggle Sidebar Width"
          >
            {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-3 space-y-2">
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={cn(
                    "flex items-center group transition-all duration-200 border-2",
                    sidebarCollapsed ? "justify-center p-3" : "justify-between px-4 py-4",
                    isActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]"
                      : "bg-transparent border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                    )} />
                    {!sidebarCollapsed && (
                      <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {isActive && !sidebarCollapsed && <ChevronRight className="w-4 h-4 text-primary" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <AdminUserMenu showFullOnOpen={!sidebarCollapsed} side="right" align="end" />
        </div>
      </motion.aside>
    </>
  );
}
