import cx from "classnames";
import Image from "next/image";
import useScrollListener from "../hooks/useScrollListener";
import { useEffect, useState } from "react";
import logo from "../images/logo-small-full-color.svg";

const Logo = () => {
  const scroll = useScrollListener();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (scroll.y > 30) {
      setIsScrolled(true);
    } else if (scroll.y < 1) {
      setIsScrolled(false);
    }
  }, [scroll.y]);

  return (
    <div
      onClick={() => window.scrollTo(0, 0)}
      className={cx("fixed cursor-pointer top-4 left-4 transition-opacity", {
        "opacity-0 -z-10": !isScrolled,
        "opacity-100 z-20": isScrolled,
      })}
    >
      <Image src={logo} alt="Oroko logo" height="50" width="50" />
    </div>
  );
};

export default Logo;
