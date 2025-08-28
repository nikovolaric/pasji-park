import type { Metadata } from "next";
import Image from "next/image";
import LinkBtn from "@/components/LinkBtn";

export const metadata: Metadata = {
  title: "Registriracija uspešna",
};

export default function Page() {
  return (
    <div className="mb-35 flex flex-col gap-14 lg:mb-40">
      <LinkBtn href="/" variant="terciary" className="self-start">
        Nazaj na domačo stran
      </LinkBtn>
      <div className="grid gap-10 md:mx-auto md:w-2/3 lg:w-full lg:grid-cols-2 lg:gap-5">
        <div className="bg-secondary/25 flex flex-col items-start gap-12 rounded-3xl px-7 py-12 shadow-[1px_1px_4px_rgba(0,0,0,0.25)] xl:py-16">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={153}
            height={50}
            className="h-auto w-38 self-center"
          />
          <p className="font-ibm text-primary text-2xl font-semibold xl:mx-auto xl:w-2/3">
            Hvala za registracijo!
          </p>
          <p className="xl:mx-auto xl:w-2/3">
            Preverite elektronski predal za potrditveno kodo.
          </p>
          <p className="xl:mx-auto xl:w-2/3">
            Uspešno ste se registrirali. Na elektronski naslov ste prejeli
            potrditveno kodo, ki jo je potrebno potrditi pred začetkom uporabe
            platforme.
          </p>
        </div>
        <Image
          src="/signup.jpg"
          alt="Placholder slika"
          height={950}
          width={1730}
          className="h-full min-h-135 w-full rounded-3xl object-cover opacity-65"
        />
      </div>
    </div>
  );
}
