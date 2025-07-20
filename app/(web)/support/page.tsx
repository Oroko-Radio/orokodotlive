import type { Metadata } from "next";
import React from "react";
import SinglePage from "@/views/SinglePage";
import TitleBox from "@/components/TitleBox";
import { getSupportPage } from "@/lib/contentful/pages/support";
import { renderRichTextWithImages } from "@/lib/rich-text";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Support - OROKO RADIO",
};

export default async function Support() {
  const { title, subtitle, coverImage, content } = await getSupportPage(false);

  return (
    <SinglePage
      coverImage={coverImage.url}
      coverImageAlt="View"
      repeatCover={false}
      title="Support"
    >
      <TitleBox bgColor="green" title={title} slug="support" boxText="Support">
        <div className="container max-w-5xl mx-auto">
          <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
            Support
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
