"use client";

import React from "react";
import { Container, Section } from "@/src/features/shared/components";
import { TechnicianDashboardOverview } from "@/src/features/providers/components";

export default function TechnicianOverviewPage() {
  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-8">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6">
        <TechnicianDashboardOverview />
      </Container>
    </Section>
  );
}
