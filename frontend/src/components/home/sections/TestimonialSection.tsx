"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const benefits = [
  {
    title: "Verified Technicians, Real Trust",
    text: "Every technician on Haseri is verified through National ID and document checks before they can work. Real ratings and reviews from completed jobs mean you know exactly who you're hiring. No fake profiles, no guesswork, just genuine skilled professionals you can trust.",
  },
  {
    title: "Fast, Simple, and Local",
    text: "Post a job in seconds, get matched with available technicians nearby, and communicate through built-in chat. Search by location, browse profiles with ratings and skills, and find the right person for the job, all in one place. No more searching through scattered social media groups.",
  },
  {
    title: "Fair and Flexible",
    text: "New customers get free job posts to try the platform. Unverified customers can post up to two jobs free, while verified customers get four free posts. After that, a small fee keeps the platform running and ensures serious job listings. Technicians build their reputation through completed work, and the review system rewards quality so the best professionals naturally rise to the top.",
  }
];

export const TestimonialSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-3"
          >
            The Haseri Advantage
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase leading-tight mb-6">
            Why People <span className="text-primary">Choose</span> Haseri.
          </h2>
          <div className="h-1.5 w-16 bg-primary" />
        </div>


        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative z-10">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50 dark:bg-slate-900 p-8 md:p-10 border border-border hover:border-primary transition-all group relative"
            >
              <Quote className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-12 md:h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 text-foreground leading-tight max-w-[85%] md:max-w-none">
                {benefit.title}
              </h3>
              <p className="text-base md:text-lg text-foreground font-medium leading-relaxed relative z-10 italic">
                "{benefit.text}"
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
