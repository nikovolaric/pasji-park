import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Vpišite se",
};

export default function Page() {
  return (
    <div className="mb-35 lg:mb-40">
      <LoginForm />
    </div>
  );
}
