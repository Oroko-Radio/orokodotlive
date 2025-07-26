import type { Metadata } from "next";
import React from "react";
import { getNewsPage } from "../../lib/contentful/pages/news";
import FeaturedArticles from "../../views/FeaturedArticles";
import AllNews from "../../views/AllNews";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "News",
};

export default async function NewsPage() {
  const { articles, featuredArticles } = await getNewsPage(false);

  return (
    <>
      <FeaturedArticles featuredArticles={featuredArticles} />
      <AllNews articles={articles} />
    </>
  );
}