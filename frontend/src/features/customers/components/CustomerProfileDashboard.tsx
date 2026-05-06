"use client";

import React from "react";
import { 
  ProfileCover, 
  ProfileHeader, 
  CustomerProfileDetails
} from "./";
import { Container, Section, Heading } from "@/src/features/shared/components";
import { useAuth } from "@/src/hooks/useAuth";
import { useCustomerProfile } from "@/src/features/customers/hooks/useCustomerProfile";
import { toast } from "react-hot-toast";

export function CustomerProfileDashboard() {
  const { update } = useCustomerProfile();

  const handleSave = async (data: Record<string, string>) => {
    const result = await update(data);
    if (result) {
      toast.success("Profile updated successfully");
    } else {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-10">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Profile Header Block - Standardized */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <ProfileCover />
          <div className="pb-10">
            <ProfileHeader />
          </div>
        </div>

        {/* Identity & Details Section - Label updated to 'Edit Your Profile' */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-6 bg-primary" />
            <Heading level={2} className="text-xl font-black uppercase tracking-tighter italic">
              Edit Your <span className="text-primary">Profile</span>
            </Heading>
          </div>
          <CustomerProfileDetails onSave={handleSave} />
        </div>

      </Container>
    </Section>
  );
}
