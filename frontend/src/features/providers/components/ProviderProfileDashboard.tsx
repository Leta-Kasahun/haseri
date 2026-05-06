"use client";

import React from "react";
import { Container, Section } from "@/src/features/shared/components";
import { useAuth } from "@/src/hooks/useAuth";
import { useProviderProfile } from "../hooks/useProviderProfile";
import { toast } from "react-hot-toast";
import { ProviderProfileCover } from "./ProviderProfileCover";
import { ProviderProfileHeader } from "./ProviderProfileHeader";
import { ProviderProfileDetails } from "./ProviderProfileDetails";

export function ProviderProfileDashboard() {
  const { update } = useProviderProfile();

  const handleSave = async (data: Record<string, string>) => {
    const result = await update(data);
    if (result) toast.success("Profile updated successfully");
    else toast.error("Failed to update profile");
  };

  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-6">
      <Container className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Single Consolidated Profile Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none shadow-xl overflow-hidden">
          <ProviderProfileCover />
          <div className="pb-6">
            <ProviderProfileHeader />
          </div>
          
          {/* Details embedded directly without separate card styling */}
          <div className="border-t border-slate-100 dark:border-slate-800">
            <ProviderProfileDetails onSave={handleSave} isEmbedded={true} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
