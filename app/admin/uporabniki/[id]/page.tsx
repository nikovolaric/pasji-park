import type { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DeleteUserButton from "@/components/admin/users/DeleteUserButton";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const supabase = await createClient();
  const { id } = await params;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .single();

  return { title: data.name };
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .single();

  const { data: imgData } = await supabase.storage
    .from("pasji-park-users")
    .createSignedUrl(data.img, 600);

  if (error) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-16">
      <p className="font-zilla text-2xl font-semibold">
        Pregled uporabniškega profila
      </p>
      <Link
        href={"/admin/uporabniki"}
        className="bg-accent2 hover:bg-accent2/80 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300"
      >
        <ArrowLeft height={20} className="text-white" />
      </Link>
      <div className="grid grid-cols-[1fr_2fr] gap-x-5 gap-y-10">
        {data.img && imgData ? (
          <Image
            src={imgData.signedUrl}
            alt="Profilna slika"
            height={1000}
            width={500}
            priority
            className="max-h-80 rounded-xl object-cover"
          />
        ) : (
          <div className="rounded-xl bg-gray-400" />
        )}
        <div className="grid grid-cols-2 gap-x-5 gap-y-8">
          <div className="grid gap-1">
            <Label className="text-base font-semibold">Ime in priimek</Label>
            <Input
              defaultValue={data.name}
              className="h-10 rounded-xl border border-black/40 bg-white text-black/50 disabled:opacity-100"
              disabled
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-base font-semibold">
              Elektronski naslov
            </Label>
            <Input
              defaultValue={data.email}
              className="h-10 rounded-xl border border-black/40 bg-white text-black/50 disabled:opacity-100"
              disabled
            />
          </div>{" "}
          <div className="grid gap-1">
            <Label className="text-base font-semibold">Kraj bivanja</Label>
            <Input
              defaultValue={data.city}
              className="h-10 rounded-xl border border-black/40 bg-white text-black/50 disabled:opacity-100"
              disabled
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-base font-semibold">Pasja pasma</Label>
            <Input
              defaultValue={data.dog_breed ? data.dog_breed : "/"}
              className="h-10 rounded-xl border border-black/40 bg-white text-black/50 disabled:opacity-100"
              disabled
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-base font-semibold">Aktiven profil</Label>
            <Input
              defaultValue={data.visible ? "DA" : "NE"}
              className="h-10 rounded-xl border border-black/40 bg-white text-black/50 disabled:opacity-100"
              disabled
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-base font-semibold">
              Datum registracije
            </Label>
            <Input
              defaultValue={new Date(data.created_at).toLocaleDateString(
                "sl-SI",
                { day: "2-digit", month: "2-digit", year: "2-digit" },
              )}
              className="h-10 rounded-xl border border-black/40 bg-white text-black/50 disabled:opacity-100"
              disabled
            />
          </div>
        </div>
        <div className="col-span-2 justify-self-end">
          <DeleteUserButton id={id} img={data.img} />
        </div>
      </div>
    </div>
  );
}

export default Page;
