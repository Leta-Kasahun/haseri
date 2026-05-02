"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";

const CONSENT_KEY = "haseri:cookie-consent";

export const CookieConsentBanner = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const stored = localStorage.getItem(CONSENT_KEY);
		setVisible(!stored);
	}, []);

	const handleAccept = () => {
		localStorage.setItem(CONSENT_KEY, "accepted");
		setVisible(false);
	};

	const handleReject = () => {
		localStorage.setItem(CONSENT_KEY, "rejected");
		setVisible(false);
	};

	if (!visible) return null;

	return (
		<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[720px]">
			<div className="border-2 border-foreground bg-white dark:bg-slate-950 p-5 sm:p-6 shadow-2xl">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
					<p className="text-xs sm:text-sm text-muted-foreground">
						We use cookies to improve performance, personalize content, and keep the marketplace secure.
					</p>
					<div className="flex gap-3">
						<Button
							variant="outline"
							className="rounded-none h-10 px-5 border-2 border-foreground font-black uppercase text-[10px] tracking-[0.2em]"
							onClick={handleReject}
						>
							Decline
						</Button>
						<Button
							className="rounded-none h-10 px-5 bg-primary text-white font-black uppercase text-[10px] tracking-[0.2em] border-2 border-primary"
							onClick={handleAccept}
						>
							قبول
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
