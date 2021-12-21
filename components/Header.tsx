import React, { useState } from "react";
import cx from "classnames";
import Link from "next/link";
import Menu from "./Menu";
import DotButton from "./ui/DotButton";
import Logo from "./Logo";
import MenuIcon from "./ui/MenuIcon";
import CloseIcon from "./ui/CloseIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="grid grid-cols-4 py-1 bg-black">
      <Link href="/" passHref>
        <div
          className="p-2 ml-4 md:ml-8 h-10 w-10 z-50 cursor-pointer"
          onClick={() => isMenuOpen && setIsMenuOpen(false)}
        >
          <Logo
            className={cx("w-4 h-4 md:w-6 md:h-6", {
              "text-black": isMenuOpen,
              "text-white": !isMenuOpen,
            })}
          />
        </div>
      </Link>
      <h1
        className={cx(
          "col-span-2 font-heading text-center self-center text-3xl md:text-5xl xl:text-6xl z-50",
          {
            "text-black": isMenuOpen,
            "text-white": !isMenuOpen,
          }
        )}
      >
        Oroko Radio
      </h1>
      <div
        className="z-50 text-black self-center justify-self-end mr-4"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="hidden md:block">
          <DotButton>Menu</DotButton>
        </div>
        <div
          className={cx("md:hidden cursor-pointer fill-current", {
            "text-white": !isMenuOpen,
            "text-black": isMenuOpen,
          })}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
    </div>
  );
};

export default Header;
