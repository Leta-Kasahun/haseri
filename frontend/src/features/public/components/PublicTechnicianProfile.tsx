"use client";

import React, { useEffect, useState } from "react";
import { Container, Section, Heading, DashboardFooter } from "@/src/features/shared/components";
import { publicApi } from "@/src/features/public/services/public.api";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";
import { Shield, Star, MapPin, Phone, Mail, Loader2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { ReviewList } from "@/src/features/reviews/components";
import { useReviews } from "@/src/features/reviews/hooks";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

interface PublicTechnicianProfileProps {
  id: string;
}

export function PublicTechnicianProfile({ id }: PublicTechnicianProfileProps) {
  const [tech, setTech] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { reviews, loading: reviewsLoading, getByUser } = useReviews();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await publicApi.getTechnician(id);
        setTech(res.data.data);
        if (id) getByUser(id);
      } catch (err) {
        console.error("Failed to fetch public profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, getByUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Professional Profile...</p>
        </div>
      </div>
    );
  }

  if (!tech) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-4">Technician Not Found</h2>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">This profile may have been removed or is no longer active.</p>
        </div>
      </div>
    );
  }

  const avatarSrc = resolveAssetUrl(tech.avatar);
  const coverSrc = resolveAssetUrl(tech.cover_image);
  const skills = tech.skills || [];

  const infoGroups = [
    {
      title: "Identity",
      icon: <User className="w-4 h-4 text-primary" />,
      fields: [
        { label: "First Name", value: tech.first_name },
        { label: "Last Name", value: tech.last_name },
      ]
    },
    {
      title: "Contact",
      icon: <Phone className="w-4 h-4 text-primary" />,
      fields: [
        { label: "Email", value: tech.email },
        { label: "Phone", value: tech.phone },
      ]
    },
    {
      title: "Location",
      icon: <MapPin className="w-4 h-4 text-primary" />,
      fields: [
        { label: "City", value: tech.address?.city },
        { label: "Woreda", value: tech.address?.woreda },
        { label: "Kebele", value: tech.address?.kebele },
        { label: "Landmark", value: tech.address?.specific_location },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Section padding="none" className="flex-grow pb-20 pt-6 md:pt-10">
        <Container className="max-w-5xl mx-auto px-4 space-y-8 md:space-y-12">
          
          {/* Profile Header Block */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            {/* Cover Section */}
            <div className="relative w-full h-40 md:h-64 bg-slate-900 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 border-t-[4px] md:border-t-[6px] border-r-[4px] md:border-r-[6px] border-primary z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 border-b-[4px] md:border-b-[6px] border-l-[4px] md:border-l-[6px] border-primary z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 opacity-80" />
              {coverSrc ? (
                <Image src={coverSrc} alt="Cover" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-20 px-6">
                  <Heading level={1} weight="black" uppercase className="text-4xl md:text-6xl text-white tracking-tighter italic">HASERI</Heading>
                </div>
              )}
            </div>

            {/* Profile Header Info */}
            <div className="pb-8 px-5 md:px-10">
              <div className="flex flex-col gap-4 items-start -mt-12 md:-mt-20 relative z-30 w-full">
                <Avatar className="h-24 w-24 md:h-40 md:w-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                  {avatarSrc ? <AvatarImage src={avatarSrc} alt={tech.name} className="object-cover" /> : null}
                  <AvatarFallback className="bg-slate-900 text-white text-2xl md:text-4xl font-black uppercase">
                    {tech.first_name?.[0]}{tech.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="w-full mt-2">
                  <div className="flex items-center gap-3">
                    <Heading level={2} weight="black" uppercase className="text-lg md:text-2xl tracking-tighter break-words text-slate-900 dark:text-white leading-none italic">
                      {tech.first_name} {tech.last_name}
                    </Heading>
                    {tech.technicianVerification?.status === "approved" && (
                      <div className="bg-primary text-white p-1 md:p-1.5 rounded-full shrink-0 shadow-lg" title="Verified Technician">
                        <Shield className="w-3.5 h-3.5 md:w-5 md:h-5 fill-current" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <div className="flex items-center gap-1.5 mr-2 pr-2 border-r border-slate-200 dark:border-slate-800">
                      <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-[11px] md:text-[12px] font-black tracking-tighter text-slate-900 dark:text-white">
                        {tech.average_rating || "0.0"}
                      </span>
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 ml-1">
                        ({tech.review_count || 0} Reviews)
                      </span>
                    </div>

                    {skills.map((skill: any, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 md:px-3 py-0.5 md:py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-none text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700"
                      >
                        {skill.skill_name || skill}
                      </span>
                    ))}
                  </div>

                  {/* Header Contact Summary (Restored as requested) */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-2 gap-x-8 mt-6 border-t border-slate-100 dark:border-slate-800 pt-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-[11px] font-black uppercase tracking-widest">
                        {tech.address?.city || "Addis Ababa"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-[11px] font-black uppercase tracking-widest">{tech.phone || "Private Contact"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-[11px] font-black uppercase tracking-widest lowercase">{tech.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details (Identity, Contact, Location) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              {infoGroups.map((group, idx) => (
                <div key={idx} className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-3 pb-3 md:pb-4 border-b-4 border-slate-900 dark:border-slate-800">
                    {group.icon}
                    <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                      {group.title}
                    </h3>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    {group.fields.map((field, fIdx) => (
                      <div key={fIdx} className="flex items-baseline gap-2">
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 shrink-0">{field.label}:</span>
                        <span className="text-[11px] md:text-[13px] font-black uppercase tracking-tight text-slate-900 dark:text-white truncate">
                          {field.value || <span className="text-slate-200 italic">Not set</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 md:gap-6">
             {[
               { label: "Jobs Done", value: tech.completed_jobs_count || 0, icon: <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" /> },
               { label: "Rating", value: tech.average_rating || "0.0", icon: <Star className="w-4 h-4 md:w-5 md:h-5 text-primary" /> },
               { label: "Reviews", value: tech.review_count || 0, icon: <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" /> },
             ].map((stat, i) => (
               <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 md:p-6 flex flex-col items-center justify-center text-center space-y-1 md:space-y-2 group hover:border-primary transition-all">
                  <div className="p-2 md:p-3 bg-slate-50 dark:bg-slate-800 rounded-none group-hover:bg-primary/10 transition-colors">
                    {stat.icon}
                  </div>
                  <div className="text-lg md:text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
               </div>
             ))}
          </div>

          {/* Reviews Section (Full Width now) */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3 px-2">
              <div className="w-1.5 h-6 bg-primary" />
              <Heading level={2} className="text-lg md:text-xl font-black uppercase tracking-tighter italic">
                Client <span className="text-primary">Reviews</span>
              </Heading>
            </div>
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
              <ReviewList reviews={reviews} loading={reviewsLoading} />
            </div>
          </div>
        </Container>
      </Section>
      <DashboardFooter />
    </div>
  );
}
