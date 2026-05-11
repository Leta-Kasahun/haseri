"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, CheckCircle2 } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-48 md:pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left mt-8 lg:mt-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 text-primary font-bold tracking-widest uppercase text-[10px] md:text-xs"
            >
              <div className="w-6 md:w-8 h-[2px] bg-primary" />
              <span>Premium Marketplace</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-7xl font-black font-heading tracking-tighter uppercase leading-[0.9] text-foreground mb-10"
            >
              Find <span className="text-primary">Trusted</span> <br className="hidden sm:block" /> Technician
            </motion.h1>


            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-lg text-muted-foreground mb-10 md:mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Haseri connects customers with verified technicians for local services.
              Find trusted help for repairs, maintenance, and on-demand support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-24 md:mt-28 lg:mt-32 flex flex-col sm:flex-row items-center gap-4 md:gap-16 justify-center lg:justify-start"
            >
              <Button size="lg" className="w-full sm:w-auto rounded-none px-8 md:px-10 h-12 md:h-14 text-base md:text-lg bg-primary hover:bg-primary/90 text-white font-bold transition-all active:scale-95 border-2 border-primary" asChild>
                <Link href="/jobs">
                  EXPLORE SERVICES
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto sm:min-w-[220px] rounded-none px-8 md:px-10 h-12 md:h-14 text-base md:text-lg border-2 border-foreground hover:bg-foreground hover:text-background transition-all active:scale-95" asChild>
                <Link href="/register/provider">JOIN AS PRO</Link>
              </Button>
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 relative w-full max-w-3xl lg:max-w-none"
          >
            <div className="relative z-10 rounded-none overflow-hidden border-8 md:border-[16px] border-white dark:border-slate-800 shadow-2xl">
              <Image
                src="/images/hero.png"
                alt="Haseri Marketplace"
                width={800}
                height={800}
                className="w-full h-auto object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary -z-10 hidden lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

