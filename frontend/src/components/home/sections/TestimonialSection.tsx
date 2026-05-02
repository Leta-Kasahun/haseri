"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    text: "I needed an urgent dish installation before a big game. The technician arrived in 30 minutes and did a flawless job. Highly recommended platform for anyone in Addis!",
    author: "Ermias T.",
    role: "Homeowner, Bole",
  },
  {
    text: "Finding a reliable electrician used to be a nightmare. Haseri changed everything. The expert who fixed my house wiring was professional, affordable, and fully verified.",
    author: "Mahlet A.",
    role: "Business Owner, Piassa",
  },
  {
    text: "My TV broke down suddenly. I found an electronics repair expert here who not only fixed it but explained the issue clearly. The enterprise-like booking experience is seamless.",
    author: "Yonas B.",
    role: "Resident, CMC",
  }
];

export const TestimonialSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
          >
            Customer Stories
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter uppercase leading-none">
            Trusted by <span className="text-primary">Thousands</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50 dark:bg-slate-900 p-10 border border-border hover:border-primary transition-all group relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex items-center gap-1 mb-6 text-primary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-lg text-foreground font-medium leading-relaxed mb-8 relative z-10">
                "{test.text}"
              </p>
              <div>
                <div className="font-black uppercase tracking-tight text-foreground">{test.author}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{test.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
