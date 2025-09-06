import { getOnePost } from "@/lib/postActions";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const data = await getOnePost({ slug });

  return { title: data.title };
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data = await getOnePost({ slug });

  return (
    <div className="mt-12 flex flex-col gap-14 text-black lg:gap-16">
      <div className="relative h-54 w-full">
        <Image
          src={`https://fgyuzrieoxfpneovebta.supabase.co/storage/v1/object/public/blog-posts/${data.coverImg}`}
          alt="slika ozadja"
          className="rounded-3xl object-cover"
          fill
          sizes="100dvw"
        />
        <p className="bg-neutral-gray absolute top-8 right-8 z-20 rounded-full px-4 py-2 font-light shadow-[1px_1px_4px_rgba(0,0,0,0.25)]">
          {data.category}
        </p>
      </div>
      <p className="font-light">
        {new Date(data.created_at).toLocaleDateString("sl-SI", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>
      <div dangerouslySetInnerHTML={{ __html: data.html }} className="editor" />
    </div>
  );
}

export default Page;
