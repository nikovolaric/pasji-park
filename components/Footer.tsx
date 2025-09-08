"use client";

import Image from "next/image";
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
      </div>
    </div>
  );
}

export default Footer;
