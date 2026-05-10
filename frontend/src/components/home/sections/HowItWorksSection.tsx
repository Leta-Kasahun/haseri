"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Create Account",
    desc: "Sign up as a customer or provider in seconds. Verify your identity and set up your profile.",
    icon: UserPlus,
  },
  {
    title: "Post or Find Jobs",
    desc: "Post a task and get offers from experts, or browse thousands of open opportunities.",
    icon: Search,
  },
  {
    title: "Secure Payment",
    desc: "Funds are held securely and only released when you're 100% satisfied with the work.",
    icon: CheckCircle,
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-3"
          >
            Simple Process
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase leading-tight mb-6">
            How <span className="text-primary">Haseri</span> Works.
          </h2>
          <div className="h-1.5 w-16 bg-primary" />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-border -translate-y-1/2 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >

              <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-slate-950 border-2 border-border group-hover:border-primary flex items-center justify-center mb-6 md:mb-8 transition-all duration-500 transform group-hover:rotate-12">
                <step.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-6 h-6 md:w-8 md:h-8 bg-foreground text-background flex items-center justify-center font-black text-[10px] md:text-xs">
                  0{idx + 1}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-3 md:mb-4">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
