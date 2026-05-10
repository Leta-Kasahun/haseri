"use client";

import React from "react";
import { ProvidersList } from "@/src/features/public/components/ProvidersList";

export default function ProvidersPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">
          Verified <span className="text-primary">Professionals</span>
        </h1>
        {/* Placeholder for list, assuming it might exist or will be built */}
        <div className="py-20 border-2 border-dashed border-border text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Browse our network of skilled technicians.
          </p>
        </div>
      </div>
    </main>
  );
}
