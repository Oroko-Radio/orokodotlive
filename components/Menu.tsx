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
    <div className="absolute top-0 w-full h-96 bg-yellow-300 text-black z-30">
      <nav className="mt-20">
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
    </div>
  );
};

export default Menu;
