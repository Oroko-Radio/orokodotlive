import Link from "next/link";
import DotButton from "./ui/DotButton";

const links = [
  {
    name: "Radio",
    url: "/radio",
  },
  {
    name: "Artists",
    url: "/artists",
  },
  {
    name: "News",
    url: "/news",
  },
];

type MenuProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ setIsMenuOpen }: MenuProps) => {
  return (
    <div className="absolute top-0 p-20 w-full bg-orokoYellow text-black border-b-2 border-black z-30 shadow-2xl">
      <nav className="mb-10">
        <ul className="flex justify-center space-x-2">
          {links.map(({ name, url }, idx) => (
            <Link key={idx} href={url} passHref>
              <li onClick={() => setIsMenuOpen(false)}>
                <DotButton>{name}</DotButton>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <p className="text-3xl text-center">
        Oroko is a not-for-profit independent internet radio station based in
        Accra, Ghana. We aim to connect, inspire and empower through
        conversation, collaboration and community.
      </p>
    </div>
  );
};

export default Menu;
