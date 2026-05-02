import { Metadata } from "next";
import { AdminVerifyOtpForm } from "@/src/features/auth/admin/components/AdminVerifyOtpForm";

export const metadata: Metadata = {
  title: "Verify OTP | Haseri",
  description: "Verify admin login with OTP",
};

export default function AdminVerifyOtpPage() {
  return <AdminVerifyOtpForm />;
}
