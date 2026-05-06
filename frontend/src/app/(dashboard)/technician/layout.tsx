"use client";

import { usePathname } from "next/navigation";
import {
  SharedTopNav,
  DashboardFooter
} from "@/src/features/shared/components";

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

      <main className="flex-grow">
        <div className="w-full">
          {children}
        </div>
      </main>

      {!isVerifyPage && <DashboardFooter />}
    </div>
  );
}
