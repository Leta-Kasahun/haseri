import { Metadata } from "next";
import { ForgotPasswordForm } from "@/src/features/auth/user/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | Haseri",
  description: "Recover your Haseri account",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
