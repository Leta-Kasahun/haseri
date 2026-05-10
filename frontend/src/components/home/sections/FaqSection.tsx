"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

const faqs = [
  {
    value: "item-1",
    question: "How are technicians verified?",
    answer: "Every technician must upload their National ID before they can apply for jobs. Our admin team reviews each submission manually, checking that the name matches and the document is clear and genuine. Professional certificates like COC or TVET diploma can also be uploaded for extra credibility."
  },
  {
    value: "item-2",
    question: "How can I trust a technician?",
    answer: "Each technician profile shows their verification badge, star rating, number of completed jobs, skills, and reviews from real customers. Only verified customers who completed a job can leave a review, so ratings are genuine."
  },
  {
    value: "item-3",
    question: "How do customers get verified?",
    answer: "Customers can verify through a one-time payment. Once verified, they get four free job posts instead of two and can leave reviews for technicians they hire."
  },
  {
    value: "item-4",
    question: "What does verification give me as a customer?",
    answer: "Verified customers get four free job posts, a verified badge on their profile, and the ability to leave reviews after job completion. Unverified customers are limited to two free posts and cannot leave reviews."
  },
  {
    value: "item-5",
    question: "How many free job posts do I get?",
    answer: "Two free posts if unverified, four after verification. After your free posts are used, a small fee applies for each additional job."
  },
  {
    value: "item-6",
    question: "How do reviews work?",
    answer: "After a job is marked complete, both the customer and technician can rate and review each other. Only verified customers can leave reviews, which prevents fake ratings and builds real trust."
  },
  {
    value: "item-7",
    question: "How do technicians get jobs?",
    answer: "Verified technicians browse open jobs by category and location, apply with a message and proposed price, and get assigned by customers. Notifications alert them when accepted."
  }
];

export const FaqSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-3"
          >
            Got Questions?
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase leading-tight mb-6 whitespace-nowrap overflow-hidden text-ellipsis">
            Frequently Asked <span className="text-primary">Questions</span>.
          </h2>
          <div className="h-1.5 w-16 bg-primary" />
        </div>



        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
            >
              <AccordionItem 
                value={faq.value} 
                className="border border-border bg-slate-50 dark:bg-slate-900 px-6 rounded-none data-[state=open]:border-primary transition-colors"
              >
                <AccordionTrigger className="hover:no-underline font-bold text-lg py-5 group">
                  <span className="group-data-[state=open]:text-primary text-left transition-colors">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}

        </Accordion>
      </div>
    </section>
  );
};
