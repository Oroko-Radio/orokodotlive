import Image from "next/image";
import Link from "next/link";
import hero from "../images/Hero-Banner-BG-Nico2b.png";
import DotButton from "./ui/DotButton";
import logo from "/public/static/logo-full-color.svg";
import Lottie from "react-lottie";
import * as animationData from "../images/animations/OROKO.json";

const Hero = () => {
  return (
    <div id="hero" className="relative h-hero border-b-2 border-black">
      <Link href="https://patreon.com/">
        <a>
          <div className="absolute top-4 right-4 z-10">
            <DotButton>Find us on Patreon</DotButton>
          </div>
        </a>
      </Link>
      <Image
        className="w-full -z-10"
        src={hero}
        placeholder="blur"
        alt="Street"
        layout="fill"
        objectFit="cover"
      />
      <div className="w-full h-full flex p-20 justify-center">
        {/* <Image src={logo} alt="Oroko Radio logo" height="200" width="200" /> */}
        <Lottie options={{ autoplay: true, loop: false, animationData }} />
      </div>
    </div>
  );
};

export default Hero;
