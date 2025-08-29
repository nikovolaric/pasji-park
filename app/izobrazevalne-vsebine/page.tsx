import PostsList from "@/components/izobrazevalne-vsebine/PostsList";
import { H1 } from "@/components/Text";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Izobraževalne vsebine",
};

function Page() {
  return (
    <>
      <H1 className="mt-14 md:text-center lg:mt-30 xl:mx-auto xl:w-3/4">
        Odkrijte uporabne članke, nasvete in video vsebine, ki vam bodo pomagale
        bolje razumeti vašega kosmatinca.
      </H1>
      <div className="relative mt-14 mb-35 flex flex-col gap-10 lg:mt-20 lg:mb-40 lg:gap-14">
        <PostsList />
      </div>
    </>
  );
}

export default Page;
