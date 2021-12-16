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

const Menu = () => {
  return (
    <div className="absolute top-0 w-full h-96 bg-yellow-300 text-black z-30">
      <nav className="mt-20">
        <ul className="flex justify-center space-x-2">
          {links.map(({ name, url }, idx) => (
            <li key={idx}>
              <Link href={url} passHref>
                <DotButton>{name}</DotButton>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
