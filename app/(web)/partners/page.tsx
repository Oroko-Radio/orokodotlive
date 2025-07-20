import type { Metadata } from "next";
import React from "react";
import SinglePage from "@/views/SinglePage";
import TitleBox from "@/components/TitleBox";
import { renderRichTextWithImages } from "@/lib/rich-text";
import { getPartnersPage } from "@/lib/contentful/pages/partners";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Partners - OROKO RADIO",
};

export default async function Partners() {
  const { title, subtitle, coverImage, content } = await getPartnersPage(false);

  return (
    <SinglePage
      coverImage={coverImage.url}
      coverImageAlt="View"
      repeatCover={false}
      title="Partners"
    >
      <TitleBox bgColor="red" title={title} slug="partners" boxText="Partners">
        <div className="container max-w-5xl mx-auto">
          <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
            Partners
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading heading-leading md:mr-36">
            {title}
          </h1>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl md:mr-36">
            {subtitle}
          </h2>
        </div>
      </TitleBox>
      <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
        {renderRichTextWithImages(content)}
      </section>
    </SinglePage>
  );
}
