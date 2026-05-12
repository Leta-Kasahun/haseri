"use client";

import React from "react";
import { RegisterForm } from "@/src/features/auth/user/components/RegisterForm";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const registerDataKey = "haseri:register:data";

  const handleDetailsSubmit = async (data: { [key: string]: string }) => {
    sessionStorage.setItem(registerDataKey, JSON.stringify(data));
    router.push("/register/role");
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-0">
      <RegisterForm mode="details" submitLabel="Continue" onSubmit={handleDetailsSubmit} />
    </div>
  );
}
