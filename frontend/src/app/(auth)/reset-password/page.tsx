import { Metadata } from "next";
import { ResetPasswordForm } from "@/src/features/auth/user/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | Haseri",
  description: "Set a new password for your Haseri account",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
