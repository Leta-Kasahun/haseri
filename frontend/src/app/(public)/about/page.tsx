"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, MessageSquare, Smartphone, Heart } from "lucide-react";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="max-w-4xl mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
            >
              The Haseri Mission
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase leading-tight mb-8 whitespace-nowrap overflow-hidden text-ellipsis">
              About <span className="text-primary">Haseri</span> Marketplace
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl">
              Haseri is a modern local service marketplace that connects people with skilled, trusted technicians in their area. Whether you need a plumber, electrician, painter, or cleaner, Haseri makes it simple to find the right professional and get the job done.
            </p>
          </div>

          {/* Feature Cards - Using Why Haseri style */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {[
              {
                title: "Fast & Transparent",
                text: "We believe finding reliable help should be fast, transparent, and stress-free. Every technician goes through a document verification process before they can work. Browse real profiles with ratings, reviews, and job histories to make informed decisions.",
                icon: ShieldCheck
              },
              {
                title: "Built-in Trust",
                text: "Posting a job takes seconds. Verified technicians apply, you choose the right one, and communication happens right inside the platform with built-in chat. After the work is done, both sides leave reviews, helping the best professionals stand out.",
                icon: MessageSquare
              },
              {
                title: "Modern Experience",
                text: "Designed for the modern user. Simple registration, smart search by location and category, secure payments through Chapa, and a clean interface that works on any device. Haseri puts trusted service providers at your fingertips.",
                icon: Smartphone
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900 p-8 md:p-10 border border-border hover:border-primary transition-all group relative flex flex-col"
              >
                <card.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-foreground leading-tight">
                  {card.title}
                </h3>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Commitment Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-12 md:p-20 bg-foreground text-background relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 transform translate-x-20" />
            <div className="relative z-10 max-w-4xl">
              <Heart className="w-12 h-12 text-primary mb-8" />
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
                Our <span className="text-primary">Commitment</span> To You.
              </h2>
              <p className="text-xl md:text-2xl text-background/80 font-medium leading-relaxed">
                We are committed to creating a fair, transparent marketplace where skilled workers can build their reputation and customers can find quality service without the guesswork. Haseri is not just a platform—it is a community built on trust, quality, and the simple idea that finding good help should be easy.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

