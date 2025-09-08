"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return <></>;

  return (
    <div className="bg-secondary/35 flex flex-col gap-12 rounded-3xl px-8 py-12">
      <Image
        src="/logo.svg"
        alt="logo"
        height={50}
        width={150}
        className="h-auto w-38"
      />
      <div className="flex flex-col gap-6 lg:gap-12">
        <a href="https://www.inkubator-rs.si" className="font-ibm">
          Upravitelj platforme e-kosmatinec je
          <br />
          <span className="font-medium">MPI Vrelec d.o.o.</span>
          <br />
          Prvomajska ulica 35,
          <br />
          3250 Rogaška Slatina
        </a>
        <a
          href="https://www.inkubator-rs.si/pametni-pasji-park-skupnost-ucenje-in-trajnost/"
          className="flex items-center"
        >
          <Image
            src="/eu-fund.png"
            alt="Sofinanciranje EU"
            height={50}
            width={200}
            className="h-auto w-44 lg:w-50"
          />
          <Image
            src="/ifeel.png"
            alt="I FEEL SLOVENIA"
            height={50}
            width={80}
            className="h-auto w-18 lg:w-20"
          />
          <Image
            src="/las.png"
            alt="LAS"
            height={50}
            width={52}
            className="h-auto w-12"
          />
        </a>
      </div>
      <div>
        <Link href="/storitve-in-trgovine"></Link>
      </div>
    </div>
  );
}

export default Footer;
