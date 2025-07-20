import type { Metadata } from "next";
import React from "react";
import { getNewsPageSingle } from "@/lib/contentful/pages/news";
import { getArticlePathsToPreRender } from "@/lib/contentful/paths";
import { renderRichTextWithImages } from "@/lib/rich-text";
import { ArticleInterface } from "@/types/shared";
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
  const { article } = await getNewsPageSingle(articleSlug, false);
  return {
    title: `${article.title} - News - OROKO RADIO`,
  };
}

export async function generateStaticParams() {
  const paths = await getArticlePathsToPreRender();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: articleSlug } = await params;
  const { article, relatedArticles } = await getNewsPageSingle(
    articleSlug,
    false,
  );
  const {
    articleType,
    subtitle,
    coverImage,
    title,
    slug,
    date,
    author,
    city,
    content,
  } = article;

  return (
    <SinglePage
      coverImage={coverImage.url}
      coverImageAlt={title}
      withBackButton
      title={title}
    >
      <TitleBox
        boxText={dayjs.utc(date).tz("Europe/Oslo").format("DD MMM YYYY")}
        title={title}
        slug={`news/${slug}`}
      >
        <div className="container max-w-5xl mx-auto">
          <div className="mb-6 mt-6 md:mt-0">
            <div className="flex md:inline-flex mb-4 md:mb-0 mr-6">
              <Tag text={city.name} color="black" />
              <Tag text={articleType} transparent />
            </div>
            {date && (
              <p className="hidden md:inline-block mb-0 font-sans font-semibold tracking-wide text-lg">
                {dayjs
                  .utc(date)
                  .tz("Europe/Oslo")
                  .format("ddd DD MMMM YYYY @ HH") + "H"}
              </p>
            )}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl lg:pt-6 mb-4 font-heading md:mr-36 lg:mr-40">
            {title}
          </h1>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
            By <span className="border-b-2 border-black ">{author.name}</span>
          </h2>
        </div>
      </TitleBox>
      <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
        <p className="font-bold">{subtitle}</p>
        {content && renderRichTextWithImages(content)}
      </section>
    </SinglePage>
  );
}
