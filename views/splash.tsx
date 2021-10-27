import cx from "classnames";
import { useEffect, useState } from "react";
import Image from "next/image";
import About from "../components/About";
import Banner from "../components/Banner";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NewsletterSection from "../components/NewsletterSection";
import logo from "../images/logo-small-full-color.svg";
import useScrollListener from "../hooks/useScrollListener";
import StayTuned from "../components/StayTuned";

const Splash = () => {
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
    <div className="relative">
      <div
        onClick={() => window.scrollTo(0, 0)}
        className={cx("fixed cursor-pointer top-4 left-4 z-20 ", {
          hidden: !isScrolled,
          block: isScrolled,
        })}
      >
        <Image src={logo} alt="Oroko logo" height="50" width="50" />
      </div>
      <Hero />
      <Banner color="black">
        <StayTuned />
      </Banner>
      <NewsletterSection />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Splash;
