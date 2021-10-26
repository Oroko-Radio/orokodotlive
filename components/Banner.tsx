import Image from "next/image";
import logoSmall from "/public/static/logo-small-outline.svg";
import Marquee from "react-fast-marquee";

type BannerProps = {
  color: string;
};

const colors: any = {
  black: "bg-black text-white",
};

const Banner = ({ color }: BannerProps) => {
  return (
    <div className={`py-2 ${colors[color]}`}>
      <Marquee gradient={false} speed={30}>
        {[...Array(3)].map(() => (
          <>
            <h1 className="font-heading inline text-6xl ml-3 mr-4">
              Oroko will launch December 2021
            </h1>
            <div className="mb-0.5">
              <Image
                src={logoSmall}
                alt="Oroko logo small"
                height="45"
                width="45"
              />
            </div>
            <p className="font-serif inline text-5xl ml-3 mr-4">Stay Tuned</p>
            <div className="mb-0.5">
              <Image
                src={logoSmall}
                alt="Oroko logo small"
                height="45"
                width="45"
              />
            </div>
          </>
        ))}
      </Marquee>
    </div>
  );
};

export default Banner;
