"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  ClipboardList,
  PanelLeftClose, 
  PanelLeftOpen,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { UserMenu } from "@/src/features/shared/components/UserMenu";

interface CustomerSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const NAV_ITEMS = [
  { name: "Dashboard", href: "/customer", icon: LayoutDashboard },
  { name: "Profile", href: "/customer/profile", icon: User },
  { name: "My Jobs", href: "/customer/jobs", icon: Briefcase },
  { name: "Job Applications", href: "/customer/applications", icon: ClipboardList },
  { name: "Verification", href: "/customer/verify", icon: ShieldCheck },
];

export function CustomerSidebar({ isOpen, toggleSidebar }: CustomerSidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      className={cn(
        "flex flex-col border-r border-slate-200/60 bg-white dark:bg-slate-950 h-screen sticky top-0 z-40 transition-all duration-300 ease-in-out",
        !isOpen && "md:w-20"
      )}
    >
      <div className="flex h-20 items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
        <Link href="/customer" className={cn("flex items-center gap-2 group transition-all", !isOpen && "scale-0 w-0 opacity-0")}>
          <div className="w-8 h-8 bg-primary flex items-center justify-center border border-primary group-hover:rotate-90 transition-transform">
            <span className="text-white font-black text-lg italic">H</span>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">
            Haseri<span className="text-primary">.</span> <span className="text-slate-500 text-[10px] ml-1 tracking-widest font-black uppercase">Client</span>
          </span>
        </Link>
        <button
          onClick={toggleSidebar}
          className={cn("p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", !isOpen && "mx-auto")}
        >
          {isOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-8 px-3 space-y-2">
        <div className={cn("px-4 mb-4 transition-opacity", !isOpen && "hidden")}>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">
            Navigation
          </span>
        </div>

        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/customer" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center group transition-all duration-200 border-2",
                  !isOpen ? "justify-center p-3" : "justify-between px-4 py-4",
                  isActive
                    ? "bg-slate-900 border-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]"
                    : "bg-transparent border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                )}
                title={!isOpen ? item.name : undefined}
              >
                <div className="flex items-center gap-4">
                  <Icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  )} />
                  {isOpen && (
                    <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
                {isActive && isOpen && <ChevronRight className="w-4 h-4 text-primary" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <UserMenu />
      </div>
    </motion.aside>
  );
}
