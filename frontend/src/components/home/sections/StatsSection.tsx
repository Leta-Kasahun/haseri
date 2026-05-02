"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "15,000+", label: "Completed Repairs", desc: "Successfully finished jobs across Ethiopia" },
  { value: "4.9/5", label: "Average Rating", desc: "High satisfaction from our customers" },
  { value: "3,500+", label: "Verified Experts", desc: "Plumbers, electricians, and technicians" },
  { value: "24/7", label: "Support Available", desc: "Always here for your emergency needs" },
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 divide-y md:divide-y-0 md:divide-x divide-background/20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center pt-8 md:pt-0 px-4"
            >
              <div className="text-5xl lg:text-6xl font-black tracking-tighter text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-bold uppercase tracking-widest mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-background/60 font-medium max-w-[200px]">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
