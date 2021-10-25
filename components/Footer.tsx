import Link from "next/link";
import Image from "next/image";
import logoSmall from "/images/logo-small-outline.svg";

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
        <p>
          <span className="mr-4">
            <Link href="/">Imprint</Link>
          </span>
          <Link href="/">Legal</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
