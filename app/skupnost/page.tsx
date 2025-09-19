import PageHero from "@/components/PageHero";
import { type Metadata } from "next";
import img from "@/public/skupnost.jpg";
import { createClient } from "@/lib/supabase/server";
import Profiles from "@/components/skupnost/Profiles";
import { redirect } from "next/navigation";
import PrijaviSeText from "@/components/skupnost/PrijaviSeText";

export const metadata: Metadata = {
  title: "Skupnost",
};

async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user?.id)
      .single();

    if (!profileData?.name) {
      redirect("/zakljuci-profil");
    }
  }

  return (
    <>
      <PageHero
        title="Povežite se z drugimi pasjimi navdušenci!"
        href="/moj-profil"
        btn="Uredi svoj profil"
        img={img}
      >
        Spoznajte lastnike psov v svoji bližini, delite izkušnje, najdite družbo
        za skupne sprehode in postanite del povezane pasje skupnosti.
      </PageHero>
      <div className="mt-14 mb-35 flex flex-col gap-10 lg:mt-20 lg:mb-40 lg:gap-14">
        {(error || !data.user) && <PrijaviSeText />}
        <div className="relative">
          {(error || !data.user) && (
            <div className="bg-neutral-gray/50 absolute -top-1 -left-1 h-[105%] w-[105%] backdrop-blur-md" />
          )}
          <Profiles />
        </div>
      </div>
    </>
  );
}

export default Page;
