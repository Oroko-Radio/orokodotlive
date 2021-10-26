import Image from "next/image";
import Newsletter from "./forms/newsletter";
import newsletterBG from "/public/static/newsletter-bg.svg";

const NewsletterSection = () => {
  return (
    <div className="relative py-20 flex items-center justify-center border-b-2 border-black">
      <Image
        src={newsletterBG}
        alt=""
        layout="fill"
        className="-z-10"
        objectFit="cover"
      />
      <div className="z-10 flex flex-col items-center text-center justify-center">
        <p className="font-bold text-2xl mb-4">Newsletter</p>
        <h2 className="font-serif text-5xl mb-4">Join the Oroko community!</h2>
        <p className="font-serif mb-4 max-w-sm">
          Sign up to the Oroko newsletter to stay up to date with all our
          upcoming events, projects, announcements, residencies and more.
        </p>
        <Newsletter />
      </div>
    </div>
  );
};

export default NewsletterSection;
