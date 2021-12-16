import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "./Menu";
import DotButton from "./ui/DotButton";
import logo from "../images/logo-small-outline.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="grid grid-cols-3 py-1 bg-black text-white">
      <Link href="/" passHref>
        <div
          className="p-2 ml-8 h-10 w-10 z-50 cursor-pointer"
          onClick={() => isMenuOpen && setIsMenuOpen(false)}
        >
          <Image
            src={logo}
            alt="Oroko Radio Logo"
            layout="intrinsic"
            objectFit="cover"
          />
        </div>
      </Link>
      <h1 className="font-heading text-center text-5xl xl:text-6xl">
        Oroko Radio
      </h1>
      <div
        className="z-50 text-black self-center text-right mr-4"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <DotButton>Menu</DotButton>
      </div>
      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
    </div>
  );
};

export default Header;
