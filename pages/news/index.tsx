import cx from "classnames";
import React from "react";

import { InferGetStaticPropsType } from "next";
import { getNewsPage } from "../../lib/contentful/pages/news";
import Slider from "../../components/Slider";
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
    </>
  );
}
