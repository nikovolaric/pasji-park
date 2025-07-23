import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import EditBlogEditor from "@/components/admin/blog/editor/EditBlogEditor";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const supabase = await createClient();
  const { slug } = await params;

  const { data } = await supabase
    .from("posts")
    .select()
    .eq("slug", slug)
    .single();

  return {
    title: data.title,
  };
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient();
  const { slug } = await params;

  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("slug", slug)
    .single();

  if (error) {
    return <></>;
  }

  return (
    <div>
      <EditBlogEditor post={data} />
    </div>
  );
}

export default Page;
