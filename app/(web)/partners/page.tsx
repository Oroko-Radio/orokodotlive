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
    const page = await getPageBySlug("our-partners-and-contributors", isDraftMode);
    return {
      title: page.title,
    };
  } catch {
    return {
      title: "Partners",
    };
  }
}

export default async function Partners() {
  const { isEnabled: isDraftMode } = await draftMode();
  try {
    const page = await getPageBySlug("our-partners-and-contributors", isDraftMode);
    
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
        <TitleBox bgColor="red" title={page.title} slug="partners" boxText="Partners">
          <div className="container max-w-5xl mx-auto">
            <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
              Partners
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
    console.error("Failed to load partners page:", error);
    // Fallback content
    return (
      <SinglePage
        coverImage={undefined}
        coverImageAlt="Partners"
        repeatCover={false}
        title="Partners"
      >
        <TitleBox bgColor="red" title="Our Partners and Contributors" slug="partners" boxText="Partners">
          <div className="container max-w-5xl mx-auto">
            <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
              Partners
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading heading-leading md:mr-36">
              Our Partners and Contributors
            </h1>
          </div>
        </TitleBox>
        <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
          <p>Partners content is currently being migrated.</p>
        </section>
      </SinglePage>
    );
  }
}
