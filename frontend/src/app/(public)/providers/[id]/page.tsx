"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/src/components/layout/Navbar";
import { PublicTechnicianProfile } from "@/src/features/public/components/PublicTechnicianProfile";

export default function PublicProviderProfilePage() {
	const params = useParams();
	const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

	if (!id) {
		return null;
	}

	return (
		<div className="flex flex-col min-h-screen bg-background">
			<Navbar />
			<div className="pt-24">
				<PublicTechnicianProfile id={id} />
			</div>
		</div>
	);
}
