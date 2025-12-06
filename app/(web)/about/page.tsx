import type { Metadata } from "next";
import React from "react";
import SinglePage from "@/views/SinglePage";
import TitleBox from "@/components/TitleBox";
import { getPageBySlug } from "@/lib/payload/pages/pages";
import { renderPayloadRichText } from "@/lib/rich-text";
import { draftMode } from "next/headers";

export const revalidate = 3600; // 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: isDraftMode } = await draftMode();
  try {
    const page = await getPageBySlug("about-oroko-radio", isDraftMode);
    return {
      title: page.title,
    };
  } catch {
    return {
      title: "About",
    };
  }
}

export default async function About() {
  const { isEnabled: isDraftMode } = await draftMode();
  try {
    const page = await getPageBySlug("about-oroko-radio", isDraftMode);
    
    return (
      <SinglePage
        coverImage={
          typeof page.coverImage === "object" && page.coverImage?.sizes?.["large-full"]?.url
            ? page.coverImage.sizes["large-full"].url
            : (typeof page.coverImage === "object" && page.coverImage?.url ? page.coverImage.url : undefined)
        }
        coverImageAlt={page.title}
        repeatCover={false}
        title={page.title}
      >
        <TitleBox bgColor="red" title={page.title} slug="about" boxText="About">
          <div className="container max-w-5xl mx-auto">
            <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
              About
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading heading-leading md:mr-36">
              {page.title}
            </h1>
            {page.subtitle && (
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl md:mr-36">
                {page.subtitle}
              </h2>
            )}
          </div>
        </TitleBox>
        <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
          {page.content && renderPayloadRichText(page.content)}
        </section>
      </SinglePage>
    );
  } catch (error) {
    console.error("Failed to load about page:", error);
    // Fallback content
    return (
      <SinglePage
        coverImage={undefined}
        coverImageAlt="About"
        repeatCover={false}
        title="About"
      >
        <TitleBox bgColor="red" title="About Oroko Radio" slug="about" boxText="About">
          <div className="container max-w-5xl mx-auto">
            <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
              About
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading heading-leading md:mr-36">
              About Oroko Radio
            </h1>
          </div>
        </TitleBox>
        <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
          <p>Page content is currently being migrated.</p>
        </section>
      </SinglePage>
    );
  }
}
