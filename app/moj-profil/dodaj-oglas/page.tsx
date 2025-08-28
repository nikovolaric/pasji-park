import { type Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LinkBtn from "@/components/LinkBtn";
import NewAdForm from "@/components/moj-profil/dodaj-oglas/NewAdForm";

export const metadata: Metadata = {
  title: "Dodaj nov oglas",
};

async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/");
  }

  const { data: userData, error: userError } = await supabase
    .from("profiles")
    .select("name, email, user_id, city")
    .eq("user_id", data.user.id)
    .single();

  if (userError) {
    return (
      <p className="mt-35 text-2xl font-medium text-black">
        Nekaj je šlo narobe!
      </p>
    );
  }

  return (
    <div className="mt-10 mb-35 flex flex-col gap-16 lg:mt-14 lg:mb-40">
      <LinkBtn variant="terciary" href="/moj-profil" className="self-start">
        Prekliči dodajanje oglasa
      </LinkBtn>
      <p className="font-ibm text-primary text-2xl font-semibold">
        Dodaj nov oglas
      </p>
      <NewAdForm
        name={userData.name}
        email={userData.email}
        author_id={userData.user_id}
        city={userData.city}
      />
    </div>
  );
}

export default Page;
