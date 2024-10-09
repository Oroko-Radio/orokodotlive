import Image from "next/legacy/image";
import newsletterBG from "/public/static/newsletter-bg.svg";
import NewsletterWidget from "./NewsletterWidget";

const NewsletterSection = () => {
  return (
    <div className="relative py-20 flex items-center justify-center border-t-2 border-black">
      <Image
        src={newsletterBG}
        alt=""
        layout="fill"
        className="-z-10"
        objectFit="cover"
      />
      <div className="z-10 flex flex-col items-center text-center justify-center">
        <h3 className="font-bold text-2xl xl:text-3xl mb-8">Newsletter</h3>
        <h2 className="font-serif text-5xl xl:text-6xl mb-8 px-4">
          Join the Oroko community!
        </h2>
        <p className="mb-8 max-w-sm xl:max-w-2xl">
          Sign up to the Oroko newsletter to stay up to date with all our
          upcoming events, projects, announcements, residencies and more.
        </p>
        <div className="w-full flex justify-center">
          <div className="md:w-96">
            <NewsletterWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
