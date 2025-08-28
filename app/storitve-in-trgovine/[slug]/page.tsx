import { type Metadata } from "next";
import { getOneProvider } from "@/lib/providerActions";
import LinkBtn from "@/components/LinkBtn";
import ContactForm from "@/components/storitve-in-trgovina/ContactForm";
import ProviderInfo from "@/components/storitve-in-trgovina/ProviderInfo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const data = await getOneProvider({ slug });

  return { title: data.name };
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data = await getOneProvider({ slug });

  return (
    <div className="mt-14 flex flex-col gap-20 lg:mt-20 lg:gap-35">
      <LinkBtn
        variant="terciary"
        className="self-start"
        href="/storitve-in-trgovine"
      >
        Nazaj na seznam ponudnikov
      </LinkBtn>
      <ProviderInfo provider={data} />
      <ContactForm email={data.email} name={data.name} />
    </div>
  );
}

export default Page;
