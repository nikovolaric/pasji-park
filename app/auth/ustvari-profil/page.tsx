import type { Metadata } from "next";
import { SignUpForm } from "@/components/sign-up-form";

export const metadata: Metadata = {
  title: "Ustvari profil",
};

export default function Page() {
  return (
    <div className="mb-35 lg:mb-40">
      <SignUpForm />
    </div>
  );
}
