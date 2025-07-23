"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BlogListCard from "./BlogListCard";

function BlogList({
  posts,
}: {
  posts: {
    title: string;
    created_at: string;
    summary: string;
    text: string;
    category: string;
    coverImg: string;
    imgs: string;
    ytLink: string;
    slug: string;
  }[];
}) {
  const router = useRouter();

  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-5 rounded-xl bg-white p-8">
      <div className="grid grid-cols-[5fr_1fr] gap-x-5">
        <div className="drop-shadow-input border-gray/75 flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search height={16} className="stroke-3" />
          <input
            placeholder="Išči po člankih"
            className="w-full outline-none"
            onChange={(e) => router.replace(`?title=${e.target.value}`)}
          />
        </div>
        <Link
          href="/admin/izobrazevalne-vsebine/dodaj"
          className="bg-accent hover:bg-accent/80 tranisiton-colors flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold shadow-xs duration-20"
        >
          <PlusCircleIcon height={20} /> Dodaj nov članek
        </Link>
      </div>
      <NameBar />
      <div>
        {posts.map(
          (
            post: {
              title: string;
              created_at: string;
              summary: string;
              text: string;
              category: string;
              coverImg: string;
              imgs: string;
              ytLink: string;
              slug: string;
            },
            i: number,
          ) => (
            <BlogListCard key={post.slug} post={post} i={i} />
          ),
        )}
      </div>
      <div className="flex items-center justify-between">
        {page === 1 ? (
          <div />
        ) : (
          <button
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-black px-4 py-2 font-semibold"
            onClick={() => {
              setPage((page) => page - 1);
              router.replace(`?page=${page - 1}`);
            }}
          >
            <ChevronLeftIcon height={16} className="stroke-3" /> Prejšna stran
          </button>
        )}
        {posts.length === 30 && (
          <button
            className="bg-accent hover:bg-accent/80 flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
            onClick={() => {
              setPage((page) => page + 1);
              router.replace(`?page=${page + 1}`);
            }}
          >
            Naslednja stran{" "}
            <ChevronRightIcon height={16} className="stroke-3" />
          </button>
        )}
      </div>
    </div>
  );
}

function NameBar() {
  return (
    <div className="bg-accent grid grid-cols-[4fr_1fr_1fr] items-center justify-items-center rounded-xl p-3 font-semibold">
      <p className="justify-self-start text-black/75">Naslov članka</p>
      <p className="text-black/75">Kategorija</p>
      <p className="text-black/75">Datum objave</p>
    </div>
  );
}

export default BlogList;
