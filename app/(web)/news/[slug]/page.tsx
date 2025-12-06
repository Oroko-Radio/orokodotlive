import type { Metadata } from "next";
import React from "react";
import SinglePage from "@/views/SinglePage";
import Tag from "@/components/Tag";
import dayjs from "dayjs";
import "@/util";
import TitleBox from "@/components/TitleBox";
import {
  getArticleBySlug,
  getAllArticleSlugs,
} from "@/lib/payload/pages/articles";
import { renderPayloadRichText } from "@/lib/rich-text";
import { draftMode } from "next/headers";

export const revalidate = 3600; // 1 hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: articleSlug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  try {
    const article = await getArticleBySlug(articleSlug, isDraftMode);
    return {
      title: article.title,
    };
  } catch {
    return {
      title: "Article",
    };
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs();
    return slugs.map((slug) => ({
      slug: slug,
    }));
  } catch {
    return [];
  }
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: articleSlug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  try {
    const article = await getArticleBySlug(articleSlug, isDraftMode);

    return (
      <SinglePage
        coverImage={
          typeof article.coverImage === "object" &&
          article.coverImage?.sizes?.["large-full"]?.url
            ? article.coverImage.sizes["large-full"].url
            : typeof article.coverImage === "object" && article.coverImage?.url
              ? article.coverImage.url
              : undefined
        }
        coverImageAlt={article.title}
        withBackButton
        title={article.title}
      >
        <TitleBox
          boxText={dayjs
            .utc(article.date)
            .tz("Europe/Oslo")
            .format("DD MMM YYYY")}
          title={article.title}
          slug={`news/${articleSlug}`}
        >
          <div className="container max-w-5xl mx-auto">
            <div className="mb-6 mt-6 md:mt-0">
              <div className="flex md:inline-flex mb-4 md:mb-0 mr-6">
                {typeof article.city === "object" && article.city && (
                  <Tag text={article.city.name} color="black" />
                )}
                <Tag text={article.articleType} transparent />
              </div>
              <p className="hidden md:inline-block mb-0 font-sans font-semibold tracking-wide text-lg">
                {dayjs
                  .utc(article.date)
                  .tz("Europe/Oslo")
                  .format("ddd DD MMMM YYYY")}
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl lg:pt-6 mb-4 font-heading md:mr-36 lg:mr-40">
              {article.title}
            </h1>
            {article.subtitle && (
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                {article.subtitle}
              </h2>
            )}
            {typeof article.author === "object" && article.author && (
              <h2 className="font-serif text-xl md:text-2xl lg:text-3xl">
                By{" "}
                <span className="border-b-2 border-black">
                  {article.author.name}
                </span>
              </h2>
            )}
          </div>
        </TitleBox>
        <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
          {article.content && renderPayloadRichText(article.content)}
        </section>
      </SinglePage>
    );
  } catch (error) {
    console.error("Failed to load article:", error);
    return (
      <SinglePage
        coverImage={undefined}
        coverImageAlt="Article"
        withBackButton
        title="Article Not Found"
      >
        <TitleBox
          boxText={dayjs().format("DD MMM YYYY")}
          title="Article Not Found"
          slug={`news/${articleSlug}`}
        >
          <div className="container max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl lg:pt-6 mb-4 font-heading md:mr-36 lg:mr-40">
              Article Not Found
            </h1>
          </div>
        </TitleBox>
        <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
          <p>This article could not be found.</p>
        </section>
      </SinglePage>
    );
  }
}
