"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export const GoogleQuickLogin = () => {
	return (
		<div className="w-full border-2 border-border bg-white/80 dark:bg-slate-950/70 backdrop-blur-xl p-6 sm:p-8">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
				<div>
					<p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Quick Access</p>
					<h3 className="text-2xl font-black tracking-tighter uppercase">
						Sign in faster with Google
					</h3>
					<p className="text-sm text-muted-foreground max-w-md mt-3">
						Jump back into your projects in one click. Secure and verified by Haseri.
					</p>
				</div>
				<Button
					className="rounded-none h-12 px-8 bg-primary text-white font-black uppercase text-xs tracking-[0.2em] border-2 border-primary"
					asChild
				>
					<Link href="/login">Continue with Google</Link>
				</Button>
			</div>
		</div>
	);
};
