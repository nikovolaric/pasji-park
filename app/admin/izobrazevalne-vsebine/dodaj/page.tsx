import BlogEditor from "@/components/admin/blog/editor/BlogEditor";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dodaj nov članek",
};

function Page() {
  return (
    <div className="flex flex-col gap-16">
      <p className="font-zilla text-2xl font-semibold">Dodaj nov članek</p>
      <Link
        href={"/admin/izobrazevalne-vsebine"}
        className="bg-accent2 hover:bg-accent2/80 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300"
      >
        <ArrowLeft height={20} className="text-white" />
      </Link>
      <BlogEditor />
    </div>
  );
}

export default Page;
