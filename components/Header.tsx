import React, { useState } from "react";
import cx from "classnames";
import Link from "next/link";
import Menu from "./Menu";
import DotButton from "./ui/DotButton";
import Logo from "../icons/Logo";
import MenuIcon from "../icons/MenuIcon";
import CloseIcon from "../icons/CloseIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="grid grid-cols-5 py-1 bg-black">
      <Link href="/" passHref>
        <div
          className="p-1 mb-1 ml-4 md:mb-2 md:ml-8 h-10 w-10 z-50 cursor-pointer self-center"
          onClick={() => isMenuOpen && setIsMenuOpen(false)}
        >
          <Logo
            className={cx("w-6 h-6 md:w-7 md:h-7", {
              "text-black": isMenuOpen,
              "text-white": !isMenuOpen,
            })}
          />
        </div>
      </Link>
      <h1
        className={cx(
          "col-span-3 mb-0 font-heading text-center self-center text-4xl md:text-5xl xl:text-6xl z-50",
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
          className={cx(
            "h-full w-7 mb-0.5 md:hidden cursor-pointer fill-current",
            {
              "text-white": !isMenuOpen,
              "text-black": isMenuOpen,
            }
          )}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
    </div>
  );
};

export default Header;
