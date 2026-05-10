import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { NotificationCenter } from "@/src/features/notifications";
import { ChatCenter } from "@/src/features/chat";
import { useUiStore } from "@/src/hooks/useUiStore";
import { useAuth } from "@/src/hooks/useAuth";
import { GlobalSearch } from "./GlobalSearch";
import {
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
  const { user } = useAuth();
  
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

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

          <div className="hidden sm:flex flex-1 max-w-[400px] mx-4 lg:mx-0 justify-center">
            <GlobalSearch role={user?.role as any} className="w-full max-w-[400px]" />
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-5">
              <Button 
                variant="ghost" 
                size="icon" 
                className="sm:hidden text-slate-500"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              >
                <Search className="w-5 h-5" />
              </Button>
              
              <ChatCenter />
              <NotificationCenter scope="user" />
              <div className="hidden sm:block h-5 w-px bg-slate-100 dark:bg-slate-800" />
              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4"
          >
            <GlobalSearch role={user?.role as any} isMobile />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
