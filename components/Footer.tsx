import Link from "next/link";
import Image from "next/image";
import vercelLogo from "../images/vercel-logotype-light.png";
import SocialSection from "./SocialSection";
import Logo from "../icons/Logo";
import { links } from "../menuPaths";

const Footer = () => {
  return (
    <div className="bg-black p-8">
      <div className="mx-auto text-center text-white">
        <ul className="flex flex-wrap font-bold text-lg md:text-xl xl:text-2xl justify-center gap-6 md:gap-10 mb-8">
          {links.map(({ name, url }, idx) => (
            <Link key={idx} href={url} passHref>
              <li className="cursor-pointer hover:opacity-70 transition-opacity">
                {name}
              </li>
            </Link>
          ))}
          <Link href="https://www.patreon.com/orokoradio">
            <a target="_blank">
              <li className="hover:opacity-70 transition-opacity">Patreon</li>
            </a>
          </Link>
          <Link href="mailto:info@oroko.live">
            <a>
              <li className="hover:opacity-70 transition-opacity">Contact</li>
            </a>
          </Link>
        </ul>
        <div className="flex justify-center mb-8">
          <SocialSection />
        </div>
        <Logo className="stroke-current stroke-2 text-white w-10 h-10 lg:w-14 lg:h-14 inline-block mb-4" />
        <p className="mt-2 mb-8 font-sans xl:text-base">©OROKO 2021</p>
        <p className="inline font-sans text-sm xl:text-base">
          Designed by{" "}
          <Link href="https://www.studiopanorama.de/" passHref>
            <a target="_blank">
              <span className="underline tracking-widest cursor-pointer">
                panorama
              </span>
            </a>
          </Link>{" "}
          Powered by
        </p>
        <div className="relative inline-block translate-y-0.5 h-3 w-16 cursor-pointer">
          <Link
            href="https://vercel.com/?utm_source=oroko&utm_campaign=oss"
            passHref={true}
          >
            <a target="_blank">
              <Image
                src={vercelLogo}
                alt="Vercel logo"
                layout="fill"
                objectFit="contain"
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
