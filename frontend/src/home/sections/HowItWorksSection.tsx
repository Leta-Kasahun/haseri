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
    <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4"
          >
            Simple Process
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter uppercase mb-6">
            How <span className="text-primary">Haseri</span> Works.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-medium">
            Experience a seamless connection between Ethiopian talent and global standards. 
            Three steps to get your task done.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-border -translate-y-1/2 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-white dark:bg-slate-950 border-2 border-border group-hover:border-primary flex items-center justify-center mb-8 transition-all duration-500 transform group-hover:rotate-12">
                <step.icon className="w-8 h-8 text-primary" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-foreground text-background flex items-center justify-center font-black text-xs">
                  0{idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-4">{step.title}</h3>
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
