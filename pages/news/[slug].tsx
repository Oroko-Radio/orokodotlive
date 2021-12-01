import React from "react";
import Image from "next/image";
import { getNewsPageSingle } from "../../lib/contentful/pages/news";
import { getArticlePathsToPreRender } from "../../lib/contentful/paths";
import { renderRichTextWithImages } from "../../lib/rich-text";
import { ArticleInterface } from "../../types/shared";

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
  return (
    <div>
      <Image
        src={article.coverImage.url}
        alt={article.coverImage.title}
        objectFit="cover"
        width="200"
        height="200"
      />
      <h1>{article.title}</h1>
      <p>{renderRichTextWithImages(article.content)}</p>
    </div>
  );
}

export async function getStaticProps({ params, preview = false }) {
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
