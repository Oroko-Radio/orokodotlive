import cx from "classnames";
import React from "react";

import { InferGetStaticPropsType } from "next";
import { getNewsPage } from "../../lib/contentful/pages/news";
import Card from "../../components/Card";
import FeaturedArticles from "../../views/FeaturedArticles";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getNewsPage(preview)) },
    revalidate: 60,
  };
}

export default function NewsPage({
  articles,
  featuredArticles,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <FeaturedArticles featuredArticles={featuredArticles} />

      <h1 className="font-serif text-6xl m-8">All News</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 m-8">
        {articles.map((article, idx) => (
          <div key={idx} className="border-black border-2">
            <Card data={article} />
          </div>
        ))}
      </div>
    </>
  );
}
