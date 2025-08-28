import LinkBtn from "@/components/LinkBtn";
import EditAdForm from "@/components/moj-profil/dodaj-oglas/EditAdForm";
import { getOneAd } from "@/lib/adsActions";
import { createClient } from "@/lib/supabase/server";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Uredi oglas",
};

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: userData, error } = await supabase.auth.getUser();

  if (error || !userData.user) {
    redirect("/moj-profil");
  }

  const data = await getOneAd({ id });

  if (data.author_id !== userData.user.id) {
    redirect("/");
  }

  return (
    <div className="mt-10 mb-35 flex flex-col gap-16 lg:mt-14 lg:mb-40">
      <LinkBtn variant="terciary" href="/moj-profil" className="self-start">
        Prekliči urejanje oglasa
      </LinkBtn>
      <p className="font-ibm text-primary text-2xl font-semibold">
        Uredi oglas
      </p>
      <EditAdForm ad={data} />
    </div>
  );
}

export default Page;
