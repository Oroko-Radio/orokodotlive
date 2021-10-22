import Image from "next/image";
import hero from "../images/hero-banner-bg.png";

const Hero = () => {
  return (
    <div className="relative h-hero border-b-2 border-black">
      <Image
        className="w-full -z-10"
        src={hero}
        placeholder="blur"
        alt="Hero image"
        layout="fill"
        objectFit="cover"
      />
      <div className="w-full h-full flex p-20 justify-center">
        <Image
          src="/images/logo-full-color.svg"
          alt="Oroko Radio logo"
          height="200"
          width="200"
        />
      </div>
    </div>
  );
};

export default Hero;
