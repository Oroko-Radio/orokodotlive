import Link from "next/link";
import Image from "next/image";
import logoSmall from "/public/static/logo-small-outline.svg";
import vercelLogo from "/public/static/vercel-logotype-light.png";
import SocialSection from "./SocialSection";

const Footer = () => {
  return (
    <div className="bg-black p-8">
      <div className="max-w-sm mx-auto text-center text-white">
        <ul className="flex font-bold justify-center gap-20 mb-8">
          <li>Patreon</li>
          <li>Residency</li>
          <li>Contact</li>
        </ul>
        <div className="flex justify-center mb-8">
          <SocialSection />
        </div>
        <Image src={logoSmall} alt="Oroko logo small" height="50" width="50" />
        <p className="my-8">©OROKO 2021</p>
        <p className="mb-6">
          <span className="mr-4">
            <Link href="/">Imprint</Link>
          </span>
          <Link href="/">Legal</Link>
        </p>
        <p className="inline">Powered by</p>
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
