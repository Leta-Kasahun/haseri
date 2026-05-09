import React from "react";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { PublicTechnicianProfile } from "@/src/features/public/components/PublicTechnicianProfile";

import { use } from "react";

interface ProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = use(params);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        <PublicTechnicianProfile id={resolvedParams.id} />
      </main>
    </div>
  );
}
