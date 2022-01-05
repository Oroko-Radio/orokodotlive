import React from "react";
import { getNewsPageSingle } from "../../lib/contentful/pages/news";
import { getArticlePathsToPreRender } from "../../lib/contentful/paths";
import { renderRichTextWithImages } from "../../lib/rich-text";
import { ArticleInterface } from "../../types/shared";
import SinglePage from "../../views/SinglePage";
import Tag from "../../components/Tag";
import dayjs from "dayjs";
import TitleBox from "../../components/TitleBox";

type ArticleProps = {
  article: ArticleInterface;
  preview: boolean;
  relatedArticles?: ArticleInterface[];
};

export default function Article({
  article,
  preview,
  relatedArticles,
}: ArticleProps) {
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
    >
      <TitleBox title={title} slug={`news/${slug}`}>
        <div className="container max-w-4xl mx-auto">
          <div className="mb-6 mt-6 md:mt-0">
            <div className="flex md:inline-flex mb-4 md:mb-0 mr-6">
              <Tag text={city.name} color="black" />
              <Tag text={articleType} color="white" />
            </div>
            {date && (
              <p className="mb-0 inline-block font-sans font-semibold tracking-wide text-xl lg:text-2xl">
                {dayjs(date).format("ddd DD MMMM YYYY @ HH") + "H"}
              </p>
            )}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {title}
          </h1>
          <h2 className="font-serif text-4xl lg:text-6xl">
            By <span className="border-b-2 border-black ">{author.name}</span>
          </h2>
        </div>
      </TitleBox>
      <section className="container max-w-4xl mx-auto rich-text py-10 mb-24">
        <p className="font-bold">{subtitle}</p>
        {renderRichTextWithImages(content)}
      </section>
    </SinglePage>
  );
}

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: any;
  preview: boolean;
}) {
  const data = await getNewsPageSingle(params.slug, preview);

  return {
    props: { preview, ...data },
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths() {
  const paths = await getArticlePathsToPreRender();

  return { paths, fallback: "blocking" };
}
