import { ArrowRight } from "lucide-react";
import Link from "next/link";

const menuPages = [
  { title: "Uporabniki", link: "uporabniki" },
  { title: "Ponudniki storitev in trgovine", link: "ponudniki-storitev" },
  { title: "Izobraževalne vsebine", link: "izobrazevalne-vsebine" },
  { title: "Mali oglasi", link: "mali-oglasi" },
];

function PageMenu() {
  return (
    <div className="grid grid-cols-2 gap-5">
      {menuPages.map((page, i) => (
        <div
          key={i}
          className="flex h-66 w-full items-end justify-between rounded-xl bg-white px-6 py-9"
        >
          <p className="font-zilla text-2xl font-semibold">{page.title}</p>
          <Link
            href={`/admin/${page.link}`}
            className="bg-accent text-secondary hover:bg-accent/80 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-200"
          >
            <ArrowRight height={20} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PageMenu;
