import { Equal } from "lucide-react";

function NavMenu() {
  return (
    <nav>
      <button className="bg-accent text-secondary hover:bg-accent/80 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-200">
        <Equal width={24} />
      </button>
    </nav>
  );
}

export default NavMenu;
