import AddProviderForm from "@/components/admin/ponudniki-storitev/AddProviderForm";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dodaj ponudnika storitev",
};

function Page() {
  return (
    <div className="flex flex-col gap-16">
      <p className="font-zilla text-2xl font-semibold">
        Dodaj profil novega ponudnika
      </p>
      <Link
        href={"/admin/ponudniki-storitev"}
        className="bg-accent2 hover:bg-accent2/80 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300"
      >
        <ArrowLeft height={20} className="text-white" />
      </Link>
      <AddProviderForm />
    </div>
  );
}

export default Page;
