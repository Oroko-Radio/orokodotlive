import Link from "next/link";
import Image from "next/image";
import contactBG from "/public/static/contact-bg.svg";
import DotButton from "./ui/DotButton";

const Contact = () => {
  return (
    <div className="relative py-20 flex items-center justify-center border-b-2 border-black">
      <Image
        src={contactBG}
        alt=""
        layout="fill"
        className="-z-10"
        objectFit="cover"
      />
      <div className="z-10 flex flex-col items-center text-center justify-center">
        <h3 className="font-bold text-2xl xl:text-3xl mb-8">
          Radio Residencies
        </h3>
        <h2 className="font-serif text-5xl xl:text-6xl mb-8">
          Applications are now open
        </h2>
        <p className="mb-8 max-w-sm xl:max-w-2xl">
          We are currently accepting applications to become an Oroko Radio
          resident - fill in the forms below to apply. Applications are accepted
          in English and French.
        </p>
        <div className="flex gap-4">
          <Link href="https://forms.gle/a4RTQhGMNDZvXgma9">
            <a target="_blank">
              <DotButton>Apply Now (EN)</DotButton>
            </a>
          </Link>
          <Link href="https://forms.gle/nwS9GJ8wcBaYaMZn9">
            <a target="_blank">
              <DotButton text="Apply Now (FR)">Apply Now (FR)</DotButton>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
