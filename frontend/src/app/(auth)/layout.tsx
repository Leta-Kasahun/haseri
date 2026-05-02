"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row relative">
      {/* Left Side - Visual - Hidden on mobile to prevent overlap */}
      <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 overflow-hidden bg-slate-900 flex-col justify-end">
        <div className="absolute inset-0 z-10 bg-primary/10 mix-blend-overlay" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/auth-side.png"
            alt="Haseri Platform"
            fill
            sizes="50vw"
            className="object-cover grayscale-[0.2] transition-transform duration-700 hover:scale-105"
            priority
          />
        </div>
        
        {/* Branding on Image */}
        <div className="relative z-30 p-16 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-14 h-14 bg-primary flex items-center justify-center border-2 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              <span className="text-white font-black text-3xl italic">H</span>
            </div>
            <span className="text-4xl font-black tracking-tighter text-white uppercase italic">
              Haseri<span className="text-primary">.</span>
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-white leading-tight uppercase tracking-tighter mb-4"
          >
            Ethiopia's Local <br /> <span className="text-primary underline decoration-4 underline-offset-4">Marketplace</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 font-medium text-lg max-w-xs border-l-4 border-primary pl-4"
          >
            Connecting experts with opportunities. Secure, fast, and local.
          </motion.p>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 right-0 w-[1px] h-full bg-white/10 z-20" />
        <div className="absolute bottom-20 right-0 w-20 h-[1px] bg-primary z-20" />
      </div>

      {/* Right Side - Form Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-10 lg:p-12 relative overflow-y-auto min-h-screen lg:min-h-0">
        <div className="w-full max-w-lg lg:max-w-2xl flex flex-col items-center">
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <motion.div 
                whileHover={{ rotate: 90 }}
                className="w-12 h-12 bg-primary rounded-none flex items-center justify-center border-2 border-primary"
              >
                <span className="text-white font-black text-2xl italic">H</span>
              </motion.div>
              <span className="text-3xl font-black font-heading tracking-tighter text-foreground uppercase italic">
                Haseri<span className="text-primary">.</span>
              </span>
            </Link>
          </div>
          
          <div className="w-full mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Back to Homepage
            </Link>
          </div>

          <div className="w-full">
            {children}
          </div>
          
          <div className="mt-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Haseri Marketplace. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
