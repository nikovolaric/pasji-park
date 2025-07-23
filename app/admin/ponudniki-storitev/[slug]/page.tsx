import type { Metadata } from "next";
import EditProviderForm from "@/components/admin/ponudniki-storitev/EditProviderForm";
import { createClient } from "@/lib/supabase/server";
import DeleteProviderButton from "@/components/admin/ponudniki-storitev/DeleteProviderButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const supabase = await createClient();

  const { slug } = await params;

  const { data } = await supabase
    .from("ponudniki")
    .select()
    .eq("slug", slug)
    .single();

  return { title: data.name };
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient();

  const { slug } = await params;

  const { data, error } = await supabase
    .from("ponudniki")
    .select()
    .eq("slug", slug)
    .single();

  if (error) return <></>;

  const { data: imgData } = await supabase.storage
    .from("pasji-park-users")
    .createSignedUrl(data.coverImg, 600);

  const imgsUrl = data.imgs
    ? await Promise.all(
        data.imgs.map(async (img: string) => {
          const { data: imgData } = await supabase.storage
            .from("pasji-park-users")
            .createSignedUrl(img, 600);

          return imgData?.signedUrl;
        }),
      )
    : [];

  return (
    <div className="flex flex-col gap-8">
      <EditProviderForm
        provider={data}
        imgData={imgData?.signedUrl}
        imgsUrl={imgsUrl}
      />
      <div className="col-span-2 self-end">
        <DeleteProviderButton slug={slug} />
      </div>
    </div>
  );
}

export default Page;
