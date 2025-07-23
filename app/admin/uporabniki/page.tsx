import UserList from "@/components/admin/users/UserList";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uporabniki",
};

export const dynamic = "force-dynamic";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; page?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  const { name, page } = params;

  const pageSize = 30;
  const pageNumber = isNaN(Number(page)) ? 1 : Number(page);
  const from = (pageNumber - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("profiles").select("*").range(from, to);

  if (name) {
    query = query.ilike("name", `%${name}%`);
  }

  const { data, error } = await query;

  if (error) {
    return <></>;
  }

  return (
    <div>
      <UserList users={data} />
    </div>
  );
}

export default Page;
