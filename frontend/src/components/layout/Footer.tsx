"use client";

import React from "react";
import Link from "next/link";
import { Globe, MessageSquare, Camera, Users, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 border-t-8 border-primary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Section */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-white font-black text-2xl italic">H</span>
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase italic">
                Haseri<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Ethiopia's leading marketplace for professional services. 
              Connecting local talent with global opportunities through secure and transparent interactions.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageSquare, Camera, Users].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-primary">Marketplace</h4>
            <ul className="space-y-4">
              {["Find Services", "List a Service", "Categories", "Top Providers", "Success Stories"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-primary">Company</h4>
            <ul className="space-y-4">
              {["About Us", "How it Works", "Trust & Safety", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-primary">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-slate-400">Addis Ababa, Ethiopia<br />Bole District, Suite 402</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-slate-400">+251 911 22 33 44</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-slate-400">support@haseri.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            &copy; {new Date().getFullYear()} Haseri Inc. All rights reserved. Built with Passion in Ethiopia.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <Link href="#" className="hover:text-primary">Legal</Link>
            <Link href="#" className="hover:text-primary">Cookies</Link>
            <Link href="#" className="hover:text-primary">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
