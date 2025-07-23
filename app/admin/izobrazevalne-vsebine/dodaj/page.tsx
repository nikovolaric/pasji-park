import BlogEditor from "@/components/admin/blog/editor/BlogEditor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dodaj nov članek",
};

function Page() {
  return (
    <div>
      <BlogEditor />
    </div>
  );
}

export default Page;
