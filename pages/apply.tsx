import React from "react";
import Link from "next/link";
import TitleBox from "../components/TitleBox";
import SinglePage from "../views/SinglePage";
import DotButton from "../components/ui/DotButton";

const Apply = () => {
  return (
    <SinglePage
      coverImage="/static/contact-bg.svg"
      coverImageAlt="Contact Oroko"
      repeatCover={false}
      title="Apply"
    >
      <TitleBox
        bgColor="light-orange"
        title="Apply"
        slug="apply"
        boxText="Apply"
      >
        <div className="container max-w-5xl mx-auto">
          <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
            Apply
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading heading-leading md:mr-36">
            Radio Residencies
          </h1>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
            Applications are now open!
          </h2>
        </div>
      </TitleBox>
      <div className="bg-orokoYellow pt-6 md:pt-8 pb-16">
        <section className="container max-w-5xl mx-auto">
          <p className="mb-8 text-lg md:text-xl xl:text-2xl font-sans">
            We are currently accepting applications to become an Oroko Radio
            resident - fill in the forms below to apply. Applications are
            accepted in English and French.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://forms.gle/a4RTQhGMNDZvXgma9"
              target="_blank"
              rel="noopener nofollow noreferrer"
              passHref
            >
              <DotButton size="large">Apply Now (EN)</DotButton>
            </Link>
            <Link
              href="https://forms.gle/nwS9GJ8wcBaYaMZn9"
              target="_blank"
              rel="noopener nofollow noreferrer"
              passHref
            >
              <DotButton size="large">Apply Now (FR)</DotButton>
            </Link>
          </div>
        </section>
      </div>
    </SinglePage>
  );
};

export default Apply;
