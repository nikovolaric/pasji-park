"use client";

import Image from "next/image";
import Link from "next/link";
import LinkBtn from "./LinkBtn";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Button from "./Button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { refreshHomepage } from "@/lib/userActions";

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
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/admin") ||
    pathname === "/zakljuci-profil"
  ) {
    return <></>;
  }

  async function logout() {
    try {
      setIsLoading(true);

      const supabase = createClient();

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      await refreshHomepage();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        <div className="hidden items-center gap-2 lg:flex">
          <LinkBtn variant="secondary" href="/moj-profil">
            Moj profil
          </LinkBtn>
          <Button variant="secondary" onClick={logout} disabled={isLoading}>
            <LogOut className="h-6" />
          </Button>
        </div>
      )}
    </nav>
  );
}

export default NavMenu;
