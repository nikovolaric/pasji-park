import { UpdatePasswordForm } from "@/components/update-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spremeni geslo.",
};

export default async function Page() {


  return (
    <div className="mb-35 lg:mb-40">
      <UpdatePasswordForm />
    </div>
  );
}
