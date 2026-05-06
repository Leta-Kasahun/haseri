"use client";

import { usePathname } from "next/navigation";
import {
  SharedTopNav,
  DashboardFooter,
  DashboardSidebar
} from "@/src/features/shared/components";
import { cn } from "@/src/lib/utils";

export default function TechnicianDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isVerifyPage = pathname === "/technician/verify";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {!isVerifyPage && <SharedTopNav />}

      <div className="flex flex-1">
        {!isVerifyPage && <DashboardSidebar />}
        
        <main className={cn(
          "flex-1 transition-all duration-300",
          !isVerifyPage && "px-4 sm:px-6 lg:px-8"
        )}>
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>

      {!isVerifyPage && <DashboardFooter />}
    </div>
  );
}
