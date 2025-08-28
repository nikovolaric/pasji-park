import CreateProfileForm from "@/components/ustvari-profil-form";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Zakljuci profil",
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
    redirect("/skupnost");
  }

  return (
    <div className="mb-35 lg:mb-40">
      <CreateProfileForm user={data.user} />
    </div>
  );
}

export default Page;
