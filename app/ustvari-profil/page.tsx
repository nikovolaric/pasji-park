import CreateProfileForm from "@/components/ustvari-profil-form";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ustvari profil",
};

async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", data.user?.id)
    .single();

  if (profileData?.name) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <CreateProfileForm user={data.user} />
      </div>
    </div>
  );
}

export default Page;
