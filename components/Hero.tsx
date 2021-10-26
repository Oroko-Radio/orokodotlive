import Image from "next/image";
import hero from "../images/Hero-Banner-BG-Nico2b.png";
import logo from "/public/static/logo-full-color.svg";

const Hero = () => {
  return (
    <div id="hero" className="relative h-hero border-b-2 border-black">
      <Image
        className="w-full -z-10"
        src={hero}
        placeholder="blur"
        alt="Street"
        layout="fill"
        objectFit="cover"
      />
      <div className="w-full h-full flex p-20 justify-center">
        <Image src={logo} alt="Oroko Radio logo" height="200" width="200" />
      </div>
    </div>
  );
};

export default Hero;
