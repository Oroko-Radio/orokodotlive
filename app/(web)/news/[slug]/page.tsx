import type { Metadata } from "next";
import React from "react";
import SinglePage from "@/views/SinglePage";
import Tag from "@/components/Tag";
import dayjs from "dayjs";
import TitleBox from "@/components/TitleBox";

export const revalidate = 3600; // 1 hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: articleSlug } = await params;
  // TODO: Convert this page to use Payload CMS
  return {
    title: "Article",
  };
}

export async function generateStaticParams() {
  // TODO: Convert this page to use Payload CMS
  return [];
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: articleSlug } = await params;
  // TODO: Convert this page to use Payload CMS
  const title = "Article";
  const subtitle = "Article content";

  return (
    <SinglePage
      coverImage={undefined}
      coverImageAlt={title}
      withBackButton
      title={title}
    >
      <TitleBox
        boxText={dayjs().format("DD MMM YYYY")}
        title={title}
        slug={`news/${articleSlug}`}
      >
        <div className="container max-w-5xl mx-auto">
          <div className="mb-6 mt-6 md:mt-0">
            <div className="flex md:inline-flex mb-4 md:mb-0 mr-6">
              <Tag text="News" color="black" />
              <Tag text="Article" transparent />
            </div>
            <p className="hidden md:inline-block mb-0 font-sans font-semibold tracking-wide text-lg">
              {dayjs().format("ddd DD MMMM YYYY @ HH") + "H"}
            </p>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl lg:pt-6 mb-4 font-heading md:mr-36 lg:mr-40">
            {title}
          </h1>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
            By <span className="border-b-2 border-black">Author</span>
          </h2>
        </div>
      </TitleBox>
      <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
        <p className="font-bold">{subtitle}</p>
        <p>Article content will be restored when converted to Payload CMS.</p>
      </section>
    </SinglePage>
  );
}