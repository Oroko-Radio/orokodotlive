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
    >
      <TitleBox bgColor="light-orange" title="Apply" slug="apply">
        <div className="container max-w-4xl mx-auto">
          <h1 className="mt-6 md:mt-0 text-5xl md:text-6xl lg:text-7xl mb-4 font-heading md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            Radio Residencies
          </h1>
          <h2 className="font-serif text-4xl lg:text-6xl">
            Applications are now open!
          </h2>
        </div>
      </TitleBox>
      <div className="bg-orokoYellow py-10">
        <section className="container max-w-4xl mx-auto">
          <p className="mb-8 text-2xl font-sans">
            We are currently accepting applications to become an Oroko Radio
            resident - fill in the forms below to apply. Applications are
            accepted in English and French.
          </p>
          <div className="flex gap-4">
            <Link href="https://forms.gle/a4RTQhGMNDZvXgma9">
              <a target="_blank">
                <DotButton size="large">Apply Now (EN)</DotButton>
              </a>
            </Link>
            <Link href="https://forms.gle/nwS9GJ8wcBaYaMZn9">
              <a target="_blank">
                <DotButton size="large">Apply Now (FR)</DotButton>
              </a>
            </Link>
          </div>
        </section>
      </div>
    </SinglePage>
  );
};

export default Apply;
