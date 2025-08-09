import type { Metadata } from "next";
import React from "react";
import FeaturedArticles from "@/views/FeaturedArticles";
import AllNews from "@/views/AllNews";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "News",
};

export default async function NewsPage() {
  // TODO: Convert this page to use Payload CMS
  const articles: any[] = [];
  const featuredArticles: any[] = [];

  return (
    <>
      <FeaturedArticles featuredArticles={featuredArticles} />
      <AllNews articles={articles} />
    </>
  );
}
