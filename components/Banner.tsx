import React from "react";
import Marquee from "react-fast-marquee";

type BannerProps = {
  color: string;
};

const colors: any = {
  black: "bg-offBlack text-white",
};

const Banner: React.FC<BannerProps> = ({ color, children }) => {
  return (
    <div className={`py-2 ${colors[color]}`}>
      <Marquee gradient={false} speed={30}>
        {children}
      </Marquee>
    </div>
  );
};

export default Banner;
