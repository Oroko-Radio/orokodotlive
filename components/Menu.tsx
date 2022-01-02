import Link from "next/link";
import { links } from "../menuPaths";
import DotButton from "./ui/DotButton";

type MenuProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ setIsMenuOpen }: MenuProps) => {
  return (
    <div className="absolute top-0 p-4 pt-20 xl:p-20 xl:pt-28 w-full max-h-full bg-orokoYellow text-black border-b-2 border-black z-40 shadow-2xl">
      <nav className="mb-10">
        <ul className="flex flex-col xl:flex-row justify-center items-center xl:space-x-2 space-y-4 xl:space-y-0">
          {links.map(({ name, url }, idx) => (
            <Link key={idx} href={url} passHref>
              <li onClick={() => setIsMenuOpen(false)}>
                <DotButton transparent>{name}</DotButton>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <p className="block text-xl md:text-3xl text-center">
        Oroko is a not-for-profit independent internet radio station based in
        Accra, Ghana. We aim to connect, inspire and empower through
        conversation, collaboration and community.
      </p>
    </div>
  );
};

export default Menu;
