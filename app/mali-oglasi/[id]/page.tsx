import LinkBtn from "@/components/LinkBtn";
import AdInfo from "@/components/mali-oglasi/oneAd/AdInfo";
import { getOneAd } from "@/lib/adsActions";
import { type Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const data = await getOneAd({ id });

  return { title: data.title };
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const data = await getOneAd({ id });

  return (
    <div className="mt-14 flex flex-col gap-20 lg:mt-20 lg:gap-35">
      <LinkBtn variant="terciary" className="self-start" href="/mali-oglasi">
        Nazaj na seznam oglasov
      </LinkBtn>
      <AdInfo ad={data} />
    </div>
  );
}

export default Page;
