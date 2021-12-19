import cx from "classnames";
import React from "react";

import { InferGetStaticPropsType } from "next";
import { getNewsPage } from "../../lib/contentful/pages/news";
import Slider from "../../components/Slider";
import Card from "../../components/Card";

Slider.Card = Card;

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
      <div className="overflow-hidden">
        <h1 className="font-serif text-6xl m-8">Featured News</h1>

        <Slider>
          {featuredArticles.map((article, idx) => (
            <Slider.Card key={idx} idx={idx} data={article}>
              item1
            </Slider.Card>
          ))}
        </Slider>
      </div>
    </>
  );
}
