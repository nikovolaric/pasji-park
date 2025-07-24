import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import EditBlogEditor from "@/components/admin/blog/editor/EditBlogEditor";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    <div className="flex flex-col gap-16">
      <p className="font-zilla text-2xl font-semibold">Uredi članek</p>
      <Link
        href={"/admin/izobrazevalne-vsebine"}
        className="bg-accent2 hover:bg-accent2/80 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300"
      >
        <ArrowLeft height={20} className="text-white" />
      </Link>

      <EditBlogEditor post={data} />
    </div>
  );
}

export default Page;
