import React from "react";
import SinglePage from "../views/SinglePage";
import TitleBox from "../components/TitleBox";
import { InferGetStaticPropsType } from "next";
import { getSupportPage } from "../lib/contentful/pages/support";
import { renderRichTextWithImages } from "../lib/rich-text";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getSupportPage(preview)) },
    revalidate: 60 * 60 * 24,
  };
}

export default function Support({
  preview,
  title,
  subtitle,
  coverImage,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SinglePage coverImage={coverImage.url} coverImageAlt="View">
      <TitleBox bgColor="green">
        <div className="container max-w-4xl mx-auto">
          <h1 className="mt-6 md:mt-0 text-5xl md:text-6xl lg:text-7xl mb-4 font-heading md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {title}
          </h1>
          <h2 className="font-serif text-4xl lg:text-6xl">{subtitle}</h2>
        </div>
      </TitleBox>
      <section className="container max-w-4xl mx-auto rich-text mb-24">
        {renderRichTextWithImages(content)}
      </section>
    </SinglePage>
  );
}
