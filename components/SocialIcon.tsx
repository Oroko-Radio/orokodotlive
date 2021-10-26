import Link from "next/link";
import Image from "next/image";
import facebook from "../images/socials/facebook.png";
import instagram from "../images/socials/instagram.png";
import tiktok from "../images/socials/tiktok.png";
import twitter from "../images/socials/twitter.png";

const socialsMap: socialsMapType = {
  Facebook: { icon: facebook, link: "https://www.facebook.com/OrokoRadio" },
  Instagram: { icon: instagram, link: "https://www.instagram.com/orokoradio/" },
  TikTok: { icon: tiktok, link: "https://www.tiktok.com/@orokoradio" },
  Twitter: { icon: twitter, link: "https://twitter.com/orokoradio" },
};

type socialsMapType = {
  Facebook: { icon: StaticImageData; link: string };
  Instagram: { icon: StaticImageData; link: string };
  TikTok: { icon: StaticImageData; link: string };
  Twitter: { icon: StaticImageData; link: string };
};

type SocialIconProps = {
  social: "Facebook" | "Instagram" | "TikTok" | "Twitter";
};

const SocialIcon = ({ social }: SocialIconProps) => {
  return (
    <Link href={socialsMap[social].link}>
      <a target="_blank">
        <div className="bg-white group rounded-full h-8 w-8 border-2 border-black flex justify-center">
          <div className="relative self-center w-4 h-4 group-hover:opacity-60 transition-opacity">
            <Image
              src={socialsMap[social].icon}
              alt={social}
              layout="responsive"
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SocialIcon;
