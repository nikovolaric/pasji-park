import { type Metadata } from "next";
import PageHero from "@/components/PageHero";
import img from "@/public/storitve.jpg";
import Providers from "@/components/storitve-in-trgovina/Providers";
import Filter from "@/components/storitve-in-trgovina/Filter";

export const metadata: Metadata = {
  title: "Storitve in trgovina",
};

async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string;
    city?: string;
    category?: string;
  }>;
}) {
  const data = await searchParams;

  return (
    <>
      <PageHero
        title="Vse storitve, ki jih potrebuje vaš kuža, na enem mestu."
        href="/postani-ponudnik"
        btn="Postani ponudnik"
        img={img}
      >
        Izberite bolje in podprite lokalne ponudnike Obsotelja in Kozjanskega.
      </PageHero>
      <div className="mt-14 mb-35 flex flex-col gap-10 lg:mt-20 lg:mb-40 lg:gap-14">
        <Filter />
        <Providers filters={data} />
      </div>
    </>
  );
}

export default Page;
