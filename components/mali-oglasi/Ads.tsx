import { getAdImage, getAllAds } from "@/lib/adsActions";
import Image from "next/image";
import LinkBtn from "../LinkBtn";

async function Ads({
  filters,
}: {
  filters: { title?: string; city?: string; category?: string };
}) {
  const data = await getAllAds({ filters });

  return (
    <div className="grid gap-x-5 gap-y-8 md:grid-cols-2 md:gap-y-10 xl:grid-cols-3">
      {data?.map((el) => (
        <AdCard ad={el} key={el.id} />
      ))}
    </div>
  );
}

async function AdCard({
  ad,
}: {
  ad: {
    coverImg: string;
    title: string;
    category: string[];
    city: string;
    price: string;
    id: string;
  };
}) {
  const src = await getAdImage(ad.coverImg);

  function formatPrice() {
    const cleaned = ad.price.replace(/[^\d,.-]/g, "").replace(",", ".");

    const num = parseFloat(cleaned);

    return isNaN(num)
      ? "Cena po dogovoru"
      : new Intl.NumberFormat("sl-SI", {
          style: "currency",
          currency: "EUR",
        }).format(num);
  }

  return (
    <div className="relative flex w-full flex-col gap-6 rounded-3xl bg-white px-5 py-6 shadow-[1px_1px_10px_rgba(0,0,0,0.25)]">
      <div className="absolute top-8 left-8 z-20">
        {ad.category.map((el) => (
          <p
            key={el}
            className="bg-neutral-gray rounded-full px-4 py-2 font-light shadow-[1px_1px_4px_rgba(0,0,0,0.25)]"
          >
            {el}
          </p>
        ))}
      </div>
      <Image
        src={src!}
        alt={ad.title}
        width={370}
        height={272}
        className="h-68 w-full rounded-3xl object-cover"
      />
      <div className="flex flex-col gap-4">
        <p className="font-ibm text-xl font-medium text-black">{ad.title}</p>
        <div className="flex items-center justify-between">
          <p className="font-semibold">{formatPrice()}</p>
          <p className="font-light text-black">{ad.city}</p>
        </div>
      </div>
      <LinkBtn
        variant="secondary"
        href={`/mali-oglasi/${ad.id}`}
        className="flex items-center justify-center"
      >
        Oglej si več
      </LinkBtn>
    </div>
  );
}

export default Ads;
