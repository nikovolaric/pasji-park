import BlogList from "@/components/admin/blog/BlogList";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Izobraževalne vsebine",
};

export const dynamic = "force-dynamic";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ title?: string; page?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  const { title, page } = params;

  const pageSize = 30;
  const pageNumber = isNaN(Number(page)) ? 1 : Number(page);
  const from = (pageNumber - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("posts")
    .select("*")
    .range(from, to)
    .order("created_at", { ascending: false });

  if (title) {
    query = query.ilike("title", `%${title}%`);
  }

  const { data, error } = await query;

  if (error) {
    return <></>;
  }
  return (
    <div>
      <BlogList posts={data} />
    </div>
  );
}

export default Page;
