"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/src/hooks/useAuth";
import { UserMenu } from "@/src/features/shared/components";
import { NotificationCenter } from "@/src/features/notifications";
import { ChatCenter } from "@/src/features/chat";
import { jobsApi } from "@/src/features/jobs/services/jobs.api";
import { usePublicSkills } from "@/src/features/public/hooks";
import type { JobCategory } from "@/src/features/jobs/types";
import { ChevronDown } from "lucide-react";

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const { skills, loading: skillsLoading } = usePublicSkills();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Fetch real categories
    const fetchCategories = async () => {
      try {
        const res = await jobsApi.getCategories();
        setCategories(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories for navbar", err);
      }
    };
    fetchCategories();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Technicians", href: "/providers", dropdown: "skills" },
    { name: "Categories", href: "/categories", dropdown: "categories" },
    { name: "How it Works", href: "/#how-it-works" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "mx-auto max-w-7xl h-16 rounded-xl flex items-center justify-between px-6 transition-all duration-300 border-2",
          isScrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-primary/40 shadow-[0_0_20px_-5px_rgba(225,29,72,0.15)]"
            : "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-primary/20"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-none flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500">
            <span className="text-white font-black text-2xl">H</span>
          </div>
          <span className="text-2xl font-black font-heading tracking-tighter text-foreground uppercase">
            Haseri<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative py-4"
              onMouseEnter={() => {
                if (link.dropdown === "categories") setShowCategoryDropdown(true);
                if (link.dropdown === "skills") setShowSkillsDropdown(true);
              }}
              onMouseLeave={() => {
                if (link.dropdown === "categories") setShowCategoryDropdown(false);
                if (link.dropdown === "skills") setShowSkillsDropdown(false);
              }}
            >
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium text-foreground/70 hover:text-primary transition-colors flex items-center gap-1",
                  link.dropdown === "categories" && showCategoryDropdown && "text-primary",
                  link.dropdown === "skills" && showSkillsDropdown && "text-primary"
                )}
              >
                {link.name}
                {link.dropdown ? (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      link.dropdown === "categories" && showCategoryDropdown && "rotate-180",
                      link.dropdown === "skills" && showSkillsDropdown && "rotate-180"
                    )}
                  />
                ) : null}
              </Link>

              {link.dropdown === "categories" && (
                <AnimatePresence>
                  {showCategoryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-64 bg-white dark:bg-slate-900 border-none shadow-2xl p-2 z-50"
                    >
                      <div className="flex flex-col">
                        {categories.length > 0 ? (
                          categories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/jobs?category_id=${cat.id}`}
                              className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-border/50 last:border-0"
                            >
                              {cat.name}
                            </Link>
                          ))
                        ) : (
                          <span className="px-4 py-3 text-[10px] text-muted-foreground uppercase font-bold italic">Loading...</span>
                        )}
                        <Link 
                          href="/categories" 
                          className="px-4 py-3 text-xs font-black uppercase tracking-widest text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mt-1"
                        >
                          View All Categories
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {link.dropdown === "skills" && (
                <AnimatePresence>
                  {showSkillsDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-64 bg-white dark:bg-slate-900 border-none shadow-2xl p-2 z-50"
                    >
                      <div className="flex flex-col">
                        {skills.length > 0 ? (
                          skills.map((skill) => (
                            <Link
                              key={skill}
                              href={`/providers?skill=${encodeURIComponent(skill)}`}
                              className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-border/50 last:border-0"
                            >
                              {skill}
                            </Link>
                          ))
                        ) : (
                          <span className="px-4 py-3 text-[10px] text-muted-foreground uppercase font-bold italic">
                            {skillsLoading ? "Loading..." : "No skills yet"}
                          </span>
                        )}
                        <Link
                          href="/providers"
                          className="px-4 py-3 text-xs font-black uppercase tracking-widest text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mt-1"
                        >
                          View All Technicians
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>


        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-primary">
            <Search className="w-5 h-5" />
          </Button>
          
          <div className="h-4 w-px bg-border/60 mx-1" />

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <ChatCenter />
              <NotificationCenter scope="user" />
              <UserMenu />
            </div>
          ) : (
            <>
              <Button variant="ghost" className="rounded-none font-bold uppercase text-xs tracking-widest" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="rounded-none px-5 h-10 bg-primary hover:bg-primary/90 text-white font-bold uppercase text-xs tracking-widest shadow-none border-2 border-primary transition-all active:scale-95" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-24 left-4 right-4 bg-white dark:bg-slate-950 rounded-none p-8 shadow-2xl border-2 border-foreground md:hidden overflow-y-auto max-h-[80vh]"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className="text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors flex items-center justify-between"
                    onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown === "categories" && (
                    <div className="mt-4 ml-4 flex flex-col gap-3 border-l-2 border-primary/20 pl-4">
                      {categories.slice(0, 5).map(cat => (
                        <Link 
                          key={cat.id} 
                          href={`/jobs?category_id=${cat.id}`}
                          className="text-lg font-bold uppercase tracking-tight text-foreground/60 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      ))}
                      <Link 
                        href="/categories" 
                        className="text-sm font-black uppercase text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        More Categories +
                      </Link>
                    </div>
                  )}
                  {link.dropdown === "skills" && (
                    <div className="mt-4 ml-4 flex flex-col gap-3 border-l-2 border-primary/20 pl-4">
                      {skills.slice(0, 5).map((skill) => (
                        <Link
                          key={skill}
                          href={`/providers?skill=${encodeURIComponent(skill)}`}
                          className="text-lg font-bold uppercase tracking-tight text-foreground/60 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {skill}
                        </Link>
                      ))}
                      <Link
                        href="/providers"
                        className="text-sm font-black uppercase text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        More Technicians +
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              <div className="h-px bg-border my-2" />
              <div className="flex flex-col gap-4">
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <>
                    <Button variant="outline" className="rounded-none w-full h-14 border-2 border-foreground font-bold uppercase tracking-widest" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button className="rounded-none w-full h-14 bg-primary text-white font-bold uppercase tracking-widest" asChild>
                      <Link href="/register/customer">Join Now</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

