import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import About from "../components/About";
import Banner from "../components/Banner";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NewsletterSection from "../components/NewsletterSection";
import DotButton from "../components/ui/DotButton";
import logo from "../images/logo-small-full-color.svg";
import useScrollListener from "../hooks/useScrollListener";

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
      {isScrolled && (
        <Link href="#hero">
          <a>
            <div className="fixed cursor-pointer top-4 left-4 z-10">
              <Image src={logo} alt="Oroko logo" height="50" width="50" />
            </div>
          </a>
        </Link>
      )}
      <Hero />
      <Banner color="black" />
      <NewsletterSection />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Splash;
