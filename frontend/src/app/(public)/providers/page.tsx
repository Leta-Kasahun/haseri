"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { ProvidersList } from "@/src/features/public/components/ProvidersList";

function ProvidersListContent() {
  const searchParams = useSearchParams();
  const skill = searchParams.get("skill");

  return <ProvidersList skill={skill} />;
}

export default function ProvidersPage() {
  const searchParams = useSearchParams();
  const skill = searchParams.get("skill");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-3"
            >
              Professionals
            </motion.div>
            <h1 className="text-2xl md:text-5xl font-black font-heading tracking-tight uppercase leading-tight mb-6 text-slate-900 dark:text-white">
              Technicians For
              <span className="text-primary block md:inline md:ml-3">
                {skill || "All Skills"}
              </span>
            </h1>
            <div className="h-1.5 w-16 bg-primary" />
          </div>

          <Suspense
            fallback={
              <div className="py-24 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            }
          >
            <ProvidersListContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
