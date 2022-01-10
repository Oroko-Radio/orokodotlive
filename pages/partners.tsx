import React from "react";
import SinglePage from "../views/SinglePage";
import TitleBox from "../components/TitleBox";
import { InferGetStaticPropsType } from "next";
import { renderRichTextWithImages } from "../lib/rich-text";
import { getPartnersPage } from "../lib/contentful/pages/partners";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getPartnersPage(preview)) },
    revalidate: 60 * 60 * 24,
  };
}

export default function Partners({
  preview,
  title,
  subtitle,
  coverImage,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SinglePage
      coverImage={coverImage.url}
      coverImageAlt="View"
      repeatCover={false}
    >
      <TitleBox bgColor="red" title={title} slug="partners" boxText="Partners">
        <div className="container max-w-5xl mx-auto">
          <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
            Partners
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {title}
          </h1>
          <h2 className="font-serif text-4xl lg:text-6xl md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {subtitle}
          </h2>
        </div>
      </TitleBox>
      <section className="container max-w-5xl mx-auto rich-text py-10 mb-24">
        {renderRichTextWithImages(content)}
      </section>
    </SinglePage>
  );
}