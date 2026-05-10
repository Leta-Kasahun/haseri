import React from "react";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("./sections").then(m => m.HeroSection));
const FeaturesSection = dynamic(() => import("./sections").then(m => m.FeaturesSection));
const CategoriesSection = dynamic(() => import("./sections").then(m => m.CategoriesSection));
const HowItWorksSection = dynamic(() => import("./sections").then(m => m.HowItWorksSection));
const ExploreJobsSection = dynamic(() => import("./sections").then(m => m.ExploreJobsSection));
const TopProvidersSection = dynamic(() => import("./sections").then(m => m.TopProvidersSection));
const TestimonialSection = dynamic(() => import("./sections").then(m => m.TestimonialSection));
const FaqSection = dynamic(() => import("./sections").then(m => m.FaqSection));
const CtaSection = dynamic(() => import("./sections").then(m => m.CtaSection));



export const HomeTemplate = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <HowItWorksSection />
        <ExploreJobsSection />
        <TopProvidersSection />
        <TestimonialSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};
