import Link from "next/link";
import Image from "next/image";
import vercelLogo from "../images/vercel-logotype-light.png";
import SocialSection from "./SocialSection";
import Logo from "../icons/Logo";

const Footer = () => {
  return (
    <div className="bg-black p-8">
      <div className="max-w-sm mx-auto text-center text-white">
        <ul className="flex font-bold text-2xl justify-center gap-10 mb-8">
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
        <p className="inline font-sans xl:text-base">Powered by</p>
        <div className="relative inline-block h-4 w-20 cursor-pointer">
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
