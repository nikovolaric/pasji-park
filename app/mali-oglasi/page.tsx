import PageHero from "@/components/PageHero";
import { type Metadata } from "next";
import img from "@/public/oglasi.jpg";
import Filter from "@/components/mali-oglasi/Filter";
import Ads from "@/components/mali-oglasi/Ads";

export const metadata: Metadata = {
  title: "Mali oglasi",
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
        title="Podarite opremi novo življenje - izberite rabljeno."
        href="/moj-profil"
        btn="Objavi svoj oglas"
        img={img}
      >
        Kupujte ali podarite pasjo opremo na odgovoren način in tako pomagajte k
        večji trajnosti.
      </PageHero>
      <div className="relative mt-14 mb-35 flex flex-col gap-10 lg:mt-20 lg:mb-40 lg:gap-14">
        <Filter />
        <Ads filters={data} />
      </div>
    </>
  );
}

export default Page;
