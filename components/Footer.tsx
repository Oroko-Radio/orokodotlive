import Link from "next/link";
import Image from "next/image";
import logoSmall from "../images/logo-small-outline.svg";
import vercelLogo from "../images/vercel-logotype-light.png";

const Footer = () => {
  return (
    <div className="bg-black text-white text-center p-8">
      <div className="mx-auto w-1/3">
        <ul className="flex font-bold justify-between mb-8">
          <li>Patreon</li>
          <li>Residency</li>
          <li>Contact</li>
        </ul>
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
            <Image
              src={vercelLogo}
              alt="Vercel logo"
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
