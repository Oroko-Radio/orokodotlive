import Link from "next/link";
import Image from "next/image";
import logoSmall from "/public/static/logo-small-outline.svg";
import vercelLogo from "/public/static/vercel-logotype-light.png";
import SocialSection from "./SocialSection";

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
        <Image src={logoSmall} alt="Oroko logo small" height="50" width="50" />
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
