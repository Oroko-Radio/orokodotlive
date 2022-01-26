import React from "react";
import Marquee from "react-fast-marquee";

type BannerProps = {
  color: string;
  children: React.ReactNode;
};

const colors: any = {
  black: "bg-offBlack text-white",
  red: "bg-orokoRed text-black",
};

const Banner = ({ color, children }: BannerProps) => {
  return (
    <div className={`h-full w-full ${colors[color]}`}>
      <Marquee
        className="marquee-wrapper"
        style={{ height: "100%" }}
        gradient={false}
        speed={40}
      >
        {children}
        {children}
      </Marquee>
    </div>
  );
};

export default Banner;
