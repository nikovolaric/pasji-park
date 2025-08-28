import { getAllProviders, getProviderImage } from "@/lib/providerActions";
import Image from "next/image";
import LinkBtn from "../LinkBtn";

async function Providers({
  filters,
}: {
  filters: { name?: string; city?: string; category?: string };
}) {
  const data = await getAllProviders({ filters });

  return (
    <div className="grid gap-x-5 gap-y-8 md:grid-cols-2 md:gap-y-10 xl:grid-cols-3">
      {data?.map((el) => (
        <ProviderCard provider={el} key={el.name} />
      ))}
    </div>
  );
}

async function ProviderCard({
  provider,
}: {
  provider: {
    coverImg: string;
    name: string;
    category: string[];
    location: string;
    slug: string;
  };
}) {
  const src = await getProviderImage(provider.coverImg);

  return (
    <div className="relative flex w-full flex-col gap-6 rounded-3xl bg-white px-5 py-6 shadow-[1px_1px_10px_rgba(0,0,0,0.25)]">
      <div className="absolute top-8 left-8 z-20">
        {provider.category.map((el) => (
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
        alt={provider.name}
        width={370}
        height={272}
        className="h-68 w-full rounded-3xl object-cover"
      />
      <div className="flex flex-col gap-4">
        <p className="font-ibm text-xl font-medium text-black">
          {provider.name}
        </p>
        <p className="font-light text-black">{provider.location}</p>
      </div>
      <LinkBtn
        variant="secondary"
        href={`/storitve-in-trgovine/${provider.slug}`}
        className="flex items-center justify-center"
      >
        Preveri več o ponudniku
      </LinkBtn>
    </div>
  );
}

export default Providers;
