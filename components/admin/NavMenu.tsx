"use client";

import { ArrowLeft, Equal, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const links = [
  { text: "Uporabniki", href: "/admin/uporabniki" },
  { text: "Ponudniki storitev in trgovine", href: "/admin/ponudniki-storitev" },
  { text: "Izobraževalne vsebine", href: "/admin/izobrazevalne-vsebine" },
  { text: "Mali oglasi", href: "/admin/mali-oglasi" },
];

function NavMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(
    function () {
      setIsOpen(false);
    },
    [pathname],
  );

  return (
    <nav>
      <button
        className="bg-accent text-secondary hover:bg-accent/80 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-200"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <Equal width={24} />
      </button>
      <ul
        className={`fixed top-28 right-4 z-50 flex flex-col gap-10 rounded-xl bg-white px-14 pt-14 pb-16 shadow-[1px_1px_4px_rgba(0,0,0,0.25)] transition-transform duration-300 md:right-8 lg:right-20 2xl:right-[calc((100dvw-1280px)/2)] ${isOpen ? "translate-0" : "translate-x-200"}`}
      >
        <XIcon
          height={20}
          className="cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
        {links.map((link) => (
          <li key={link.text}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
        <Link
          href="/"
          className="bg-accent hover:bg-accent/80 flex items-center gap-4 rounded-3xl p-2 transition-colors duration-200"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <ArrowLeft height={20} />
          </span>{" "}
          Nazaj na platformo
        </Link>
      </ul>
    </nav>
  );
}

export default NavMenu;
