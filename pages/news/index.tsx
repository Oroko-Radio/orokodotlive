import React from "react";

import { InferGetStaticPropsType } from "next";
import { getNewsPage } from "../../lib/contentful/pages/news";
import FeaturedArticles from "../../views/FeaturedArticles";
import AllNews from "../../views/AllNews";
import Meta from "../../components/Meta";

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
      <Meta title="News" />
      <FeaturedArticles featuredArticles={featuredArticles} />
      <AllNews articles={articles} />
    </>
  );
}
