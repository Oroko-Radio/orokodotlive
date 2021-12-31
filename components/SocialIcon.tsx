import Link from "next/link";
import Image from "next/image";
import facebook from "../images/socials/Facebook.svg";
import instagram from "../images/socials/Instagram.svg";
import tiktok from "../images/socials/TikTok.svg";
import twitter from "../images/socials/Twitter.svg";
import discord from "../images/socials/Discord.svg";

const socialsMap: socialsMapType = {
  Facebook: { icon: facebook, link: "https://www.facebook.com/OrokoRadio" },
  Instagram: { icon: instagram, link: "https://www.instagram.com/orokoradio/" },
  TikTok: { icon: tiktok, link: "https://www.tiktok.com/@orokoradio" },
  Twitter: { icon: twitter, link: "https://twitter.com/orokoradio" },
  Discord: { icon: discord, link: "https://discord.gg/BDSBE6Ey4w" },
};

type socialType = {
  icon: StaticImageData;
  link: string;
};

type socialsMapType = {
  Facebook: socialType;
  Instagram: socialType;
  TikTok: socialType;
  Twitter: socialType;
  Discord: socialType;
};

type SocialIconProps = {
  social: "Facebook" | "Instagram" | "TikTok" | "Twitter" | "Discord";
};

const SocialIcon = ({ social }: SocialIconProps) => {
  return (
    <Link href={socialsMap[social].link}>
      <a target="_blank">
        <div className="w-8 h-8 hover:scale-110 transition-transform">
          <Image
            src={socialsMap[social].icon}
            alt={social}
            layout="responsive"
          />
        </div>
      </a>
    </Link>
  );
};

export default SocialIcon;
