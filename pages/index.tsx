import type { InferGetStaticPropsType, NextPage } from "next";
import Hero from "../components/Hero";
import Meta from "../components/Meta";
import Newsletter from "../components/Newsletter";
import { getNewsPage } from "../lib/contentful/pages/news";
import FeaturedArticles from "../views/FeaturedArticles";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getNewsPage(preview)) },
    revalidate: 60,
  };
}

export default function HomePage({
  featuredArticles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <Meta title="Oroko Radio" />
      <Hero />
      <FeaturedArticles featuredArticles={featuredArticles} />
      <Newsletter />
    </main>
  );
}
