import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { type Metadata } from "next";
import LoginInfo from "@/components/moj-profil/LoginInfo";
import UserInfo from "@/components/moj-profil/UserInfo";
import MyAds from "@/components/moj-profil/MyAds";

export const metadata: Metadata = {
  title: "Moj profil",
};

async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!error && data.user) {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user?.id)
      .single();

    if (!profileData?.name) {
      redirect("/zakljuci-profil");
    }
  } else {
    redirect("/auth/login");
  }

  return (
    <div className="mt-10 mb-35 flex flex-col gap-16 lg:mt-14 lg:mb-40">
      <p className="font-ibm text-primary text-2xl font-semibold">Moj profil</p>
      <div className="flex flex-col gap-16 xl:mx-auto xl:w-5/6">
        <LoginInfo email={data.user.email} />
        <UserInfo id={data.user.id} />
        <MyAds id={data.user.id} />
      </div>
    </div>
  );
}

export default Page;
