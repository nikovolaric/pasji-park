"use client";

import Image from "next/image";
import Link from "next/link";
import LinkBtn from "./LinkBtn";
import { usePathname } from "next/navigation";

const paths = [
  {
    name: "Storitve in trgovina",
    href: "/storitve-in-trgovine",
  },
  {
    name: "Mali oglasi",
    href: "/mali-oglasi",
  },
  {
    name: "Izobraževalne vsebine",
    href: "/izobrazevalne-vsebine",
  },
  {
    name: "Skupnost",
    href: "/skupnost",
  },
];

function NavMenu({ data }: { data?: { user: unknown } }) {
  const pathname = usePathname();

  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/admin") ||
    pathname === "/zakljuci-profil"
  ) {
    return <></>;
  }

  return (
    <nav className="flex items-center justify-between">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          height={30}
          width={145}
          className="h-auto w-30 object-contain lg:w-36"
        />
      </Link>
      <div className="lg:hidden"></div>
      <ul className="border-secondary hidden items-center gap-4 rounded-3xl border bg-white px-8 py-2.5 lg:flex xl:gap-14">
        {paths.map((el, i) => (
          <li key={i}>
            <Link
              href={el.href}
              className={`transition-all duration-150 hover:font-semibold ${pathname === el.href ? "font-semibold" : ""}`}
            >
              {el.name}
            </Link>
          </li>
        ))}
      </ul>
      {!data?.user ? (
        <LinkBtn
          variant="secondary"
          href="/auth/login"
          className="hidden lg:block"
        >
          Prijavi se v profil
        </LinkBtn>
      ) : (
        <LinkBtn
          variant="secondary"
          href="/moj-profil"
          className="hidden lg:block"
        >
          Moj profil
        </LinkBtn>
      )}
    </nav>
  );
}

export default NavMenu;
