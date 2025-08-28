import { createClient } from "@/lib/supabase/server";
import UserInfoForm from "./UserInfoForm";
import { getUserImage } from "@/lib/userActions";

async function UserInfo({ id }: { id: string }) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .single();

  const imgUrl = await getUserImage(data.img);

  return (
    <div className="flex flex-col gap-10">
      <p className="text-primary font-ibm text-xl font-semibold">
        Osebni podatki
      </p>
      <div className="grid gap-8 md:mx-auto md:w-2/3 lg:w-full lg:grid-cols-[2fr_3fr] lg:gap-x-5">
        <UserInfoForm me={data} imgUrl={imgUrl} />
      </div>
    </div>
  );
}

export default UserInfo;
