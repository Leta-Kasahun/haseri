"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle, Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useTopTechnicians } from "@/src/features/public/hooks";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";
import Link from "next/link";

export const TopProvidersSection = () => {
  const { technicians: providers, loading } = useTopTechnicians();
  const [displayLimit, setDisplayLimit] = useState(6);

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-3"
          >
            Verified Technicians
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase leading-tight mb-6 text-slate-900 dark:text-white">
            Find The <span className="text-primary">Perfect Expert</span> For Your Needs.
          </h2>
          <div className="h-1.5 w-16 bg-primary" />
        </div>


        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 italic">Syncing top professional profiles...</p>
          </div>
        ) : providers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {providers.slice(0, displayLimit).map((provider, idx) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group border border-border bg-slate-50 dark:bg-slate-900 overflow-hidden hover:border-primary transition-colors flex flex-col"


                >
                  <div className="relative h-56 md:h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={resolveAssetUrl(provider.avatar) || "/images/placeholders/avatar-large.png"}
                      alt={provider.name}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    {provider.verified && (
                      <div className="absolute top-4 right-4 bg-white dark:bg-slate-950 p-1.5 rounded-full text-primary shadow-lg border border-slate-100 dark:border-slate-800">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 md:p-6 flex-grow flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="font-bold text-base md:text-lg leading-tight group-hover:text-primary transition-colors text-slate-900 dark:text-white uppercase tracking-tight italic line-clamp-1">
                        {provider.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                        <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-primary text-primary" />
                        <span>{provider.rating || "0.0"}</span>
                      </div>
                    </div>
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary mb-4 bg-primary/5 px-2 py-0.5 inline-block border border-primary/10 self-start">
                      {provider.skills?.length > 0 ? provider.skills.join(" • ") : "Top Professional"}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 mt-auto">
                      <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span className="line-clamp-1">
                         {provider.city || "Addis Ababa"}
                         {provider.specific_location ? `, ${provider.specific_location}` : ""}
                      </span>
                    </div>
                    <Link href={`/providers/${provider.id}`}>
                      <Button className="w-full rounded-none bg-background text-foreground border border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all font-black text-[10px] md:text-xs tracking-widest uppercase h-11 md:h-12">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {providers.length > displayLimit ? (
              <div className="flex justify-center">
                <Button 
                  onClick={() => setDisplayLimit(prev => prev + 4)}
                  variant="outline" 
                  className="rounded-none px-8 md:px-10 h-12 md:h-14 border-2 border-foreground font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-foreground hover:text-background transition-all group dark:border-white dark:hover:bg-white dark:hover:text-slate-900"
                >
                  Show More Experts
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="rounded-none px-8 md:px-10 h-12 md:h-14 border-2 border-foreground font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-foreground hover:text-background transition-all group dark:border-white dark:hover:bg-white dark:hover:text-slate-900"
                  >
                    View All Providers
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 border-2 border-dashed border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 italic">No professionals found in your area yet.</p>
          </div>
        )}

      </div>
    </section>
  );
};
