"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProviderListCard from "./ProviderListCard";
import Link from "next/link";

function ProvidersList({
  providers,
}: {
  providers: {
    name: string;
    location: string;
    category: string;
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
            placeholder="Išči po ponudnikih"
            className="w-full outline-none"
            onChange={(e) => router.replace(`?name=${e.target.value}`)}
          />
        </div>
        <Link
          href="/admin/ponudniki-storitev/dodaj"
          className="bg-accent hover:bg-accent/80 tranisiton-colors flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold shadow-xs duration-20"
        >
          <PlusCircleIcon height={20} /> Dodaj ponudnika
        </Link>
      </div>
      <NameBar />
      <div>
        {providers.map(
          (
            provider: {
              name: string;
              location: string;
              category: string;
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
            },
            i: number,
          ) => (
            <ProviderListCard key={provider.slug} provider={provider} i={i} />
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
        {providers.length === 30 && (
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
    <div className="bg-accent grid grid-cols-[2fr_3fr_2fr_1fr] items-center justify-items-center rounded-xl p-3 font-semibold">
      <p className="justify-self-start text-black/75">Ime ponudnika</p>
      <p className="justify-self-start text-black/75">Kategorija storitev</p>
      <p className="justify-self-start text-black/75">Elektronski naslov</p>
      <p className="text-black/75">Telefonska števika</p>
    </div>
  );
}

export default ProvidersList;
