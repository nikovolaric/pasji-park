import Link from "next/link";

function BlogListCard({
  post,
  i,
}: {
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
  };
  i: number;
}) {
  return (
    <Link
      href={`/admin/izobrazevalne-vsebine/${post.slug}`}
      className={`grid grid-cols-[4fr_1fr_1fr] items-center justify-items-center px-3 py-6 ${i % 2 === 1 ? "bg-accent/20" : ""}`}
    >
      <p className="justify-self-start font-medium">{post.title}</p>
      <p className="text-black/50 capitalize">{post.category}</p>
      <p className="text-black/50">
        {new Date(post.created_at).toLocaleDateString("sl-SI", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>
    </Link>
  );
}

export default BlogListCard;
