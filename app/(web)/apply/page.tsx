import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import TitleBox from "@/components/TitleBox";
import SinglePage from "@/views/SinglePage";
import DotButton from "@/components/ui/DotButton";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Apply",
};

export default async function Apply() {
  // TODO: Convert this page to use Payload CMS
  const applicationsOpen = false;

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
            {applicationsOpen
              ? "Applications are now open!"
              : "Applications are closed"}
          </h2>
        </div>
      </TitleBox>
      <div className="bg-orokoYellow pt-6 md:pt-8 pb-16">
        <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8">
          <p className="mb-8 text-lg md:text-xl xl:text-2xl font-sans">
            {applicationsOpen
              ? "We are currently accepting applications to become an Oroko Radio resident - fill in the forms below to apply. Applications are accepted in English and French."
              : "We are currently not accepting applications to become an Oroko Radio resident."}
          </p>
        </section>
        {applicationsOpen && (
          <section className="container max-w-5xl mx-auto">
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
        )}
      </div>
    </SinglePage>
  );
}
