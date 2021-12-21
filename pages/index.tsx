import type { InferGetStaticPropsType } from "next";
import Hero from "../components/Hero";
import Meta from "../components/Meta";
import Newsletter from "../components/Newsletter";
import { getHomePage } from "../lib/contentful/pages/home";
import FeaturedArticles from "../views/FeaturedArticles";

export async function getStaticProps({ preview = false }) {
  return {
    props: await getHomePage(),
    revalidate: 60 * 60,
  };
}

export default function HomePage({
  featuredArticles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <Meta title="Oroko Radio" />
      <Hero />
      <FeaturedArticles featuredArticles={featuredArticles} heading="News" />
      <Newsletter />
    </main>
  );
}
