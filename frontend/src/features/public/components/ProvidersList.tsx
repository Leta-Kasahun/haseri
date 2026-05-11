"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, Loader2, MapPin, Star } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";
import { usePublicTechnicians } from "@/src/features/public/hooks";

interface ProvidersListProps {
  skill?: string | null;
}

export const ProvidersList = ({ skill }: ProvidersListProps) => {
  const { technicians, loading } = usePublicTechnicians(skill);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-6" />
        <p className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">
          Syncing Technician Profiles...
        </p>
      </div>
    );
  }

  if (!technicians.length) {
    return (
      <div className="py-32 border-4 border-dashed border-slate-100 dark:border-slate-900 text-center flex flex-col items-center">
        <p className="text-[12px] font-black uppercase tracking-widest text-slate-400 italic">
          No professionals found for this skill yet.
        </p>
        <Link href="/providers" className="mt-4 uppercase text-[10px] font-black text-primary">
          View All Providers
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {skill ? (
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 border border-primary/20">
            {skill}
          </span>
          <Link href="/providers" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
            Clear Filter
          </Link>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {technicians.map((provider, idx) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            className="group border border-border bg-white dark:bg-slate-900 overflow-hidden hover:border-primary transition-colors flex flex-col"
          >
            <div className="relative h-56 md:h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
              <img
                src={resolveAssetUrl(provider.avatar) || "/images/placeholders/avatar-large.png"}
                alt={provider.name}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
              {provider.verified ? (
                <div className="absolute top-4 right-4 bg-white dark:bg-slate-950 p-1.5 rounded-full text-primary shadow-lg border border-slate-100 dark:border-slate-800">
                  <CheckCircle className="w-4 h-4" />
                </div>
              ) : null}
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
    </div>
  );
};
