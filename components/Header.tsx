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
    <div className="grid grid-cols-5 items-center py-2 xl:py-1 z-50 bg-black">
      <Link href="/" passHref className="z-50">
        <div
          className="flex ml-4 md:ml-8 h-10 w-10"
          onClick={() => isMenuOpen && setIsMenuOpen(false)}
        >
          <Logo
            className={cx("stroke-current stroke-2 w-8 h-8 md:w-10 md:h-10", {
              "text-black": isMenuOpen,
              "text-white": !isMenuOpen,
            })}
          />
        </div>
      </Link>
      <div className="col-span-3 flex justify-center">
        <Link href="/" passHref className="z-50">
          <h1
            onClick={() => isMenuOpen && setIsMenuOpen(false)}
            className={cx(
              "mb-0 inline font-heading text-4xl md:text-5xl xl:text-6xl",
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
      <div
        className="flex z-50 text-black justify-self-end mr-4"
        onClick={() => isMenuOpen && setIsMenuOpen(false)}
      >
        <div className="mt-1 md:mt-0.5 mr-2 lg:mr-4">
          {router.pathname !== "/search" && (
            <Link href="/search" passHref>
              <div
                className={cx("cursor-pointer fill-current", {
                  "text-white hidden sm:block": !isMenuOpen,
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
