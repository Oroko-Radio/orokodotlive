import Link from "next/link";
import SocialSection from "./SocialSection";
import Logo from "../icons/Logo";
import { links } from "../menuPaths";

const Footer = () => {
  return (
    <div className="bg-black p-8">
      <div className="mx-auto text-center text-white">
        <ul className="flex flex-wrap text-lg md:text-xl xl:text-2xl justify-center gap-6 md:gap-10 mb-8">
          {links.map(({ name, url }, idx) => (
            <Link key={idx} href={url} passHref>
              <li className="font-bold cursor-pointer hover:opacity-70 transition-opacity">
                {name}
              </li>
            </Link>
          ))}
          <Link
            href="https://www.patreon.com/orokoradio"
            target="_blank"
            rel="noopener nofollow noreferrer"
            passHref
          >
            <li className="font-bold hover:opacity-70 transition-opacity">
              Patreon
            </li>
          </Link>
          <Link href="mailto:info@oroko.live" passHref>
            <li className="font-bold hover:opacity-70 transition-opacity">
              Contact
            </li>
          </Link>
        </ul>
        <div className="flex justify-center mb-8">
          <SocialSection />
        </div>
        <Logo className="stroke-current stroke-2 text-white w-10 h-10 lg:w-14 lg:h-14 inline-block mb-4" />
        <p className="mt-2 mb-8 font-sans xl:text-base">© OROKO 2025</p>
        <div className="flex flex-col md:flex-row justify-center gap-2 font-sans text-sm xl:text-base">
          <div>
            Designed by{" "}
            <Link
              href="https://www.studiopanorama.de/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              passHref
            >
              <span className="underline tracking-widest cursor-pointer">
                panorama
              </span>
            </Link>{" "}
          </div>
          <div>
            Developed by{" "}
            <Link
              href="https://github.com/je-boska"
              target="_blank"
              rel="noopener nofollow noreferrer"
              passHref
            >
              <span className="underline tracking-widest cursor-pointer">
                je boska
              </span>
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
