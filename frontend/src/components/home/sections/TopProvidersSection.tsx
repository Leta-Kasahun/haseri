"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle, Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { publicApi } from "@/src/features/public/services/public.api";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";
import Link from "next/link";

export const TopProvidersSection = () => {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(4);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await publicApi.getTopTechnicians();
        const data = res.data?.data || res.data || [];
        setProviders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch top technicians", err);
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
            >
              Top Rated Experts
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter uppercase leading-none text-slate-900 dark:text-white">
              Meet Our <span className="text-primary">Best</span> Local Professionals.
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Syncing top professional profiles...</p>
          </div>
        ) : providers.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-16">
              {providers.slice(0, displayLimit).map((provider, idx) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group border border-border bg-slate-50 dark:bg-slate-900 overflow-hidden hover:border-primary transition-colors flex flex-col"
                >
                  <div className="relative h-48 md:h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={resolveAssetUrl(provider.avatar) || "/images/placeholders/avatar-large.png"}
                      alt={provider.name}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    {provider.verified && (
                      <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white dark:bg-slate-950 p-1 md:p-1.5 rounded-full text-primary shadow-lg border border-slate-100 dark:border-slate-800">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-6 flex-grow flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                      <h3 className="font-bold text-sm md:text-lg leading-tight group-hover:text-primary transition-colors text-slate-900 dark:text-white uppercase tracking-tight italic line-clamp-1">
                        {provider.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] md:text-sm font-bold text-slate-900 dark:text-white">
                        <Star className="w-3 h-3 md:w-4 md:h-4 fill-primary text-primary" />
                        <span>{provider.rating || "0.0"}</span>
                      </div>
                    </div>
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary mb-3 md:mb-4 bg-primary/5 px-1.5 md:px-2 py-0.5 inline-block border border-primary/10 self-start">
                      {provider.skills?.length > 0 ? provider.skills.join(" • ") : "Top Professional"}
                    </p>
                    <div className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 md:mb-6 mt-auto">
                      <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      <span className="line-clamp-1">
                         {provider.city || "Addis Ababa"}
                         {provider.specific_location ? `, ${provider.specific_location}` : ""}
                      </span>
                    </div>
                    <Link href={`/profile/${provider.id}`}>
                      <Button className="w-full rounded-none bg-background text-foreground border border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all font-black text-[8px] md:text-[10px] tracking-widest uppercase h-9 md:h-11">
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
                  className="rounded-none px-10 h-14 border-2 border-foreground font-black uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-all group dark:border-white dark:hover:bg-white dark:hover:text-slate-900"
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
                    className="rounded-none px-10 h-14 border-2 border-foreground font-black uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-all group dark:border-white dark:hover:bg-white dark:hover:text-slate-900"
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
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">No professionals found in your area yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};
