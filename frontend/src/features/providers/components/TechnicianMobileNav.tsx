"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, User, ShieldCheck } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/hooks/useAuth";

export const TechnicianMobileNav = () => {
  const pathname = usePathname();
  
  const items = [
    { label: "Home", href: "/technician", icon: LayoutDashboard },
    { label: "Jobs", href: "/technician/jobs", icon: Briefcase },
    { label: "Verify", href: "/technician/verify", icon: ShieldCheck },
    { label: "Profile", href: "/technician/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-950 border-t-2 border-slate-900 lg:hidden px-4 pb-safe z-50">
      <nav className="flex justify-between items-center h-16 max-w-md mx-auto">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn("flex flex-col items-center gap-1 transition-all group", active ? "text-primary" : "text-slate-400")}>
              <div className={cn("p-1.5 rounded-xl transition-all", active ? "bg-primary/10" : "group-hover:bg-slate-100")}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className={cn("text-[10px] font-black uppercase tracking-widest", active ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
