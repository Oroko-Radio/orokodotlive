import React, { useState } from "react";
import cx from "classnames";
import Link from "next/link";
import Menu from "./Menu";
import DotButton from "./ui/DotButton";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="grid grid-cols-3 py-1 bg-black">
      <Link href="/" passHref>
        <div
          className="p-2 ml-8 h-10 w-10 z-50 cursor-pointer"
          onClick={() => isMenuOpen && setIsMenuOpen(false)}
        >
          <Logo
            className={cx("w-6 h-6", {
              "text-black": isMenuOpen,
              "text-white": !isMenuOpen,
            })}
          />
        </div>
      </Link>
      <h1
        className={cx("font-heading text-center text-5xl xl:text-6xl z-50", {
          "text-black": isMenuOpen,
          "text-white": !isMenuOpen,
        })}
      >
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
