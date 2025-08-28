import { type Metadata } from "next";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Pozabljeno geslo",
};

export default function Page() {
  return (
    <div className="mb-35 lg:mb-40">
      <ForgotPasswordForm />
    </div>
  );
}
