import { type Metadata } from "next";
import LinkBtn from "@/components/LinkBtn";
import UserInfo from "@/components/skupnost/UserInfo";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/userActions";
import UserProfiles from "@/components/skupnost/UserProfiles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const data = await getProfile({ id });

  return {
    title: `${data.name}${data.pet_name ? ` in ${data.pet_name}` : ""}`,
  };
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/skupnost");
  }

  const user = await getProfile({ id });

  return (
    <div className="mt-14 flex flex-col gap-20 lg:mt-20 lg:gap-35">
      <LinkBtn variant="terciary" className="self-start" href="/skupnost">
        Nazaj na seznam uporabnikov
      </LinkBtn>
      <UserInfo user={user} />
      <UserProfiles city={user.city} id={id} />
    </div>
  );
}

export default Page;
