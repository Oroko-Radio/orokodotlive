import React from "react";
import Link from "next/link";
import TitleBox from "../components/TitleBox";
import SinglePage from "../views/SinglePage";
import DotButton from "../components/ui/DotButton";
import { InferGetStaticPropsType } from "next";
import { getApplyPage } from "../lib/contentful/pages/apply";
import { renderRichTextWithImages } from "../lib/rich-text";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getApplyPage(preview)) },
    revalidate: 60 * 60,
  };
}

const Apply = ({
  title,
  subtitle,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
            {title}
          </h1>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
            {subtitle}
          </h2>
        </div>
      </TitleBox>
      <div className="bg-orokoYellow pt-6 md:pt-8 pb-16">
        <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8">
          {renderRichTextWithImages(content)}
        </section>
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
      </div>
    </SinglePage>
  );
};

export default Apply;
