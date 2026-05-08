"use client";

import React from "react";
import { Container, Section, Heading } from "@/src/features/shared/components";
import { useAuth } from "@/src/hooks/useAuth";
import { useProviderProfile } from "../hooks/useProviderProfile";
import { toast } from "react-hot-toast";
import { ProviderProfileCover } from "./ProviderProfileCover";
import { ProviderProfileHeader } from "./ProviderProfileHeader";
import { ProviderProfileDetails } from "./ProviderProfileDetails";
import { ReviewList } from "@/src/features/reviews/components";
import { useReviews } from "@/src/features/reviews/hooks";

export function ProviderProfileDashboard() {
  const { user } = useAuth();
  const { update } = useProviderProfile();

  const handleSave = async (data: Record<string, string>) => {
    const result = await update(data);
    if (result) toast.success("Profile updated successfully");
    else toast.error("Failed to update profile");
  };

  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-10">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Profile Header block - Standardized */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <ProviderProfileCover />
          <div className="pb-6">
            <ProviderProfileHeader />
          </div>
        </div>

        {/* Identity & Details Section */}
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <div className="w-1.5 h-6 bg-primary" />
              <Heading level={2} className="text-xl font-black uppercase tracking-tighter italic">
                Edit Your <span className="text-primary">Profile</span>
              </Heading>
            </div>
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <ProviderProfileDetails onSave={handleSave} isEmbedded={true} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <div className="w-1.5 h-6 bg-primary" />
              <Heading level={2} className="text-xl font-black uppercase tracking-tighter italic">
                Client <span className="text-primary">Reviews</span>
              </Heading>
            </div>
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8">
              <ReviewListSection userId={user?.id?.toString() || ""} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ReviewListSection({ userId }: { userId: string }) {
  const { reviews, loading, getByUser } = useReviews();

  React.useEffect(() => {
    if (userId) getByUser(userId);
  }, [userId, getByUser]);

  return <ReviewList reviews={reviews} loading={loading} />;
}
