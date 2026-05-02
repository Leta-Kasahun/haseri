"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const providers = [
  {
    id: 1,
    name: "Abebe Kebede",
    profession: "Master Electrician",
    rating: 4.9,
    reviews: 124,
    location: "Addis Ababa, Bole",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&h=500&fit=crop",
    verified: true,
  },
  {
    id: 2,
    name: "Tigist Haile",
    profession: "Interior Designer",
    rating: 4.8,
    reviews: 89,
    location: "Addis Ababa, Kazanchis",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&h=500&fit=crop",
    verified: true,
  },
  {
    id: 3,
    name: "Dawit Tadesse",
    profession: "Plumbing Expert",
    rating: 4.7,
    reviews: 210,
    location: "Addis Ababa, Piassa",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=500&h=500&fit=crop",
    verified: true,
  },
  {
    id: 4,
    name: "Selamawit Bekele",
    profession: "Professional Cleaner",
    rating: 4.9,
    reviews: 156,
    location: "Addis Ababa, CMC",
    image: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=500&h=500&fit=crop",
    verified: true,
  },
];

export const TopProvidersSection = () => {
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
            <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter uppercase leading-none">
              Meet Our <span className="text-primary">Best</span> Local Professionals.
            </h2>
          </div>
          <Button variant="outline" className="rounded-none px-8 h-12 border-2 border-foreground font-bold uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-all">
            View All Providers
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {providers.map((provider, idx) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group border border-border bg-slate-50 dark:bg-slate-900 overflow-hidden hover:border-primary transition-colors"
            >
              <div className="relative h-64 overflow-hidden">
                {/* Fallback to regular img to avoid unconfigured host errors in next/image */}
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                {provider.verified && (
                  <div className="absolute top-4 right-4 bg-white dark:bg-slate-950 p-1.5 rounded-full text-primary shadow-lg">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{provider.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-bold">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span>{provider.rating}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-4">{provider.profession}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{provider.location}</span>
                </div>
                <Button className="w-full rounded-none bg-background text-foreground border border-border hover:bg-primary hover:text-white hover:border-primary transition-all font-bold text-xs tracking-wider uppercase">
                  View Profile
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
