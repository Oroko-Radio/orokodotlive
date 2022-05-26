import React, { useState } from "react";
import cx from "classnames";
import Link from "next/link";
import Menu from "./Menu";
import Logo from "../icons/Logo";
import MenuIcon from "../icons/MenuIcon";
import CloseIcon from "../icons/CloseIcon";
import SearchIcon from "../icons/SearchIcon";
import MenuButton from "./ui/MenuButton";
import { useRouter } from "next/router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="grid grid-cols-5 py-2 xl:py-1 z-50 bg-black">
      <Link href="/" passHref>
        <div
          className="flex ml-4 md:ml-8 h-10 w-10 z-50 cursor-pointer self-center"
          onClick={() => isMenuOpen && setIsMenuOpen(false)}
        >
          <Logo
            className={cx(
              "stroke-current stroke-2 self-center w-8 h-8 md:w-10 md:h-10",
              {
                "text-black": isMenuOpen,
                "text-white": !isMenuOpen,
              }
            )}
          />
        </div>
      </Link>
      <div className="col-span-3 flex justify-center">
        <Link href="/" passHref>
          <h1
            onClick={() => isMenuOpen && setIsMenuOpen(false)}
            className={cx(
              "mb-0 cursor-pointer inline font-heading text-4xl md:text-5xl xl:text-6xl z-50",
              {
                "text-black": isMenuOpen,
                "text-white": !isMenuOpen,
              }
            )}
          >
            Oroko Radio
          </h1>
        </Link>
      </div>
      <div className="flex z-50 text-black self-center justify-self-end mr-4">
        <div className="hidden sm:block mt-1 md:mt-0.5 mr-2">
          {router.pathname !== "/search" && (
            <Link href="/search" passHref>
              <div
                className={cx("cursor-pointer fill-current", {
                  "text-white": !isMenuOpen,
                })}
              >
                <SearchIcon />
              </div>
            </Link>
          )}
        </div>
        <div
          className="hidden md:block"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuButton isMenuOpen={isMenuOpen}>Menu</MenuButton>
        </div>
        <div
          className={cx(
            "h-full w-7 mb-0.5 md:hidden cursor-pointer fill-current",
            {
              "text-white": !isMenuOpen,
              "text-black": isMenuOpen,
            }
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Header;
