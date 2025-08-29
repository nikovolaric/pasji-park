import { getAllPosts } from "@/lib/postActions";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../icons/ArrowRight";

async function PostsList() {
  const data = await getAllPosts();

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-x-5">
      {data?.map((post, i) => (
        <PostListCard key={post.slug} post={post} i={i} />
      ))}
    </div>
  );
}

function PostListCard({
  post,
  i,
}: {
  post: {
    title: string;
    summary: string;
    coverImg: string;
    slug: string;
    category: string;
  };
  i: number;
}) {
  return (
    <Link
      href={`/izobrazevalne-vsebine/${post.slug}`}
      className={`group relative rounded-3xl px-4 pb-4 md:px-6 md:pb-6 ${i === 0 ? "pt-35 md:pt-62 lg:row-span-2" : "pt-42"}`}
    >
      <Image
        src={`https://fgyuzrieoxfpneovebta.supabase.co/storage/v1/object/public/blog-posts/${post.coverImg}`}
        alt="slika ozadje"
        fill
        sizes="100%"
        className="rounded-3xl opacity-50"
      />
      <p className="bg-neutral-gray absolute top-6 left-6 rounded-full px-4 py-2 font-light shadow-[1px_1px_4px_rgba(0,0,0,0.25)]">
        {post.category}
      </p>
      {i > 0 && (
        <p className="bg-neutral-gray transiton-[rotate] absolute top-6 right-6 flex h-10 w-10 -rotate-45 items-center justify-center rounded-full font-light shadow-[1px_1px_4px_rgba(0,0,0,0.25)] duration-150 group-hover:rotate-0">
          <ArrowRight />
        </p>
      )}
      <div className="relative flex flex-col gap-4 text-black">
        <h2 className="font-ibm text-xl font-semibold md:text-2xl">
          {post.title}
        </h2>
        {i === 0 && (
          <>
            <p className="whitespace-pre-line">{post.summary}</p>
            <button className="bg-primary hover:bg-terciary flex cursor-pointer items-center gap-4 self-end rounded-full px-6 py-2.5 pt-1.5 pr-1.5 pb-1.5 font-medium text-white shadow-[1px_1px_10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-[inset_1px_1px_10px_rgba(0,0,0,0.25)]">
              Preberi celoten članek
              <span className="tranistion-[rotate] flex h-8 w-8 -rotate-45 items-center justify-center rounded-full bg-white duration-200 group-hover:rotate-0">
                <ArrowRight />
              </span>
            </button>
          </>
        )}
      </div>
    </Link>
  );
}

export default PostsList;
