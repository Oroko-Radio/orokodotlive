'use client';

import React, { useState } from "react";
import cx from "classnames";
import Link from "next/link";
import Menu from "./Menu";
import MenuIcon from "@/icons/MenuIcon";
import CloseIcon from "@/icons/CloseIcon";
import SearchIcon from "@/icons/SearchIcon";
import MenuButton from "./ui/MenuButton";
import { usePathname } from "next/navigation";
import ColorLogo from "@/icons/ColorLogo";
import Button from "./ui/Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative flex items-center justify-between py-2 xl:py-1 z-50 bg-black">
      <div className="flex items-center gap-2 md:gap-6">
        <Link href="/" passHref className="z-50">
          <div
            className="flex ml-4 md:ml-8 h-10 w-10"
            onClick={() => isMenuOpen && setIsMenuOpen(false)}
          >
            <ColorLogo className="text-black stroke-current stroke-1 mt-1 md:mt-0 w-8 h-8 md:w-10 md:h-10" />
          </div>
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:-translate-x-0">
          <Link href="/" passHref className="z-50">
            <h1
              onClick={() => isMenuOpen && setIsMenuOpen(false)}
              className={cx(
                "mb-0 whitespace-nowrap inline font-heading text-4xl md:text-5xl xl:text-6xl",
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
      </div>
      <div
        className="flex items-center gap-4 z-50 text-black justify-self-end mr-4"
        onClick={() => isMenuOpen && setIsMenuOpen(false)}
      >
        <div className="lg:mr-2">
          {pathname !== "/search" && (
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
        {!isMenuOpen && (
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/radio" passHref>
              <Button size="sm" white transparent>
                Shows
              </Button>
            </Link>
            <Link href="/artists" passHref>
              <Button size="sm" white transparent>
                Artists
              </Button>
            </Link>
            <Link href="/news" passHref>
              <Button size="sm" white transparent>
                News
              </Button>
            </Link>
            <Link href="https://shop.oroko.live" passHref>
              <Button size="sm" white transparent>
                Shop
              </Button>
            </Link>
          </div>
        )}
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
