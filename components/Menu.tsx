import cn from "classnames";
import Link from "next/link";
import { links } from "../menuPaths";
import DotButton from "./ui/DotButton";

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ({ isMenuOpen, setIsMenuOpen }: MenuProps) => {
  return (
    <div
      className={cn(
        "absolute top-0 p-4 pt-20 xl:p-20 xl:pt-28 w-full min-h-screen sm:min-h-0 bg-orokoYellow text-black border-b-2 border-black z-40 shadow-3xl transition-transform",
        {
          "-translate-y-full": !isMenuOpen,
          "translate-y-0": isMenuOpen,
        }
      )}
    >
      <nav className="mt-4 mb-10 md:flex md:justify-center">
        <ul className="hidden sm:flex flex-wrap justify-center max-w-[1000px] 2xl:max-w-none gap-4 xl:gap-6">
          {links.map(({ name, url }, idx) => (
            <Link key={idx} href={url} passHref>
              <li
                className="flex-shrink-0 pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <DotButton size="large" transparent>
                  {name}
                </DotButton>
              </li>
            </Link>
          ))}
        </ul>
        <ul className="sm:hidden">
          {links.map(({ name, url }, idx) => (
            <Link key={idx} href={url} passHref>
              <li
                className="text-black text-2xl underline mb-2 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <p className="font-serif block text-xl md:text-3xl xl:text-4xl sm:text-center max-w-md sm:max-w-none">
        Oroko is a not-for-profit independent internet radio station based in
        Accra, Ghana. We aim to connect, inspire and empower through
        conversation, collaboration and community.
      </p>
    </div>
  );
};

export default Menu;
