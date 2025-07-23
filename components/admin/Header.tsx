import Link from "next/link";
import { LogoutButton } from "../logout-button";
import NavMenu from "./NavMenu";
import { HouseIcon } from "lucide-react";

function Header() {
  return (
    <div className="flex items-center justify-between">
      <p className="text-4xl">Logo</p>
      <div className="flex items-center gap-4">
        <Link
          className="bg-accent text-secondary hover:bg-accent/80 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-200"
          href={"/admin"}
        >
          <HouseIcon height={24} />
        </Link>
        <NavMenu />
        <LogoutButton />
      </div>
    </div>
  );
}

export default Header;
