import type { Metadata } from "next";
import React from "react";
import FeaturedArticles from "@/views/FeaturedArticles";
import AllNews from "@/views/AllNews";
import { getFeaturedArticles, getAllArticles } from "@/lib/payload/pages/articles";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "News",
};

export default async function NewsPage() {
  const [featuredArticles, articles] = await Promise.all([
    getFeaturedArticles(),
    getAllArticles(),
  ]);

  return (
    <>
      <FeaturedArticles featuredArticles={featuredArticles} />
      <AllNews articles={articles} />
    </>
  );
}
