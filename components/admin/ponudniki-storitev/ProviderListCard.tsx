import Link from "next/link";

function ProviderListCard({
  provider,
  i,
}: {
  provider: {
    name: string;
    location: string;
    category: string[];
    openingTime: {
      monday?: string;
      tuesday?: string;
      wednesday?: string;
      thursday?: string;
      friday?: string;
      saturday?: string;
      sunday?: string;
    };
    email: string;
    phone: string;
    website: string;
    coverImg: string;
    imgs: string[];
    description: string;
    slug: string;
  };
  i: number;
}) {
  return (
    <Link
      href={`/admin/ponudniki-storitev/${provider.slug}`}
      className={`grid grid-cols-[2fr_3fr_2fr_1fr] items-center justify-items-center px-3 py-6 ${i % 2 === 1 ? "bg-accent/20" : ""}`}
    >
      <p className="justify-self-start font-medium">{provider.name}</p>
      <p className="justify-self-start text-black/50">
        {provider.category.map((cat, i) => (
          <span key={i}>{i > 0 ? `, ${cat}` : cat}</span>
        ))}
      </p>
      <p className="justify-self-start text-black/50">{provider.email}</p>
      <p className="text-black/50">{provider.phone}</p>
    </Link>
  );
}

export default ProviderListCard;
