import { getMyAds } from "@/lib/adsActions";
import LinkBtn from "../LinkBtn";
import { Plus } from "lucide-react";
import MyAddCard from "./MyAddCard";

async function MyAds({ id }: { id: string }) {
  const data = await getMyAds({ id });

  return (
    <div className="flex flex-col gap-10">
      <p className="text-primary font-ibm text-xl font-semibold">Moji oglasi</p>
      {data?.length === 0 ? (
        <p className="font-medium text-black">
          Trenutno nimate dodanih oglasov.
        </p>
      ) : (
        <div>
          {data?.map((ad) => (
            <MyAddCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
      <LinkBtn
        href="/moj-profil/dodaj-oglas"
        variant="primary"
        className="flex items-center gap-4 self-start pt-1.5 pr-1.5 pb-1.5"
      >
        Objavi nov oglas
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <Plus height={20} className="text-primary" />
        </span>
      </LinkBtn>
    </div>
  );
}

export default MyAds;
