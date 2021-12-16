import Image from "next/image";
import hero from "../images/Hero-Banner-BG-Nico2b.png";
import logo from "../images/logo-full-color-notext.svg";
import SocialSection from "./SocialSection";

const Hero = () => {
  return (
    <div className="relative h-hero border-b-2 border-black">
      <Image
        className="w-full -z-10"
        src={hero}
        placeholder="blur"
        alt="Street"
        layout="fill"
        objectFit="cover"
      />
      <div className="w-full h-full flex p-20 justify-center z-10">
        <Image src={logo} alt="Oroko Radio logo" height="200" width="200" />
      </div>
      <div className="absolute right-4 bottom-4">
        <SocialSection />
      </div>
    </div>
  );
};

export default Hero;
