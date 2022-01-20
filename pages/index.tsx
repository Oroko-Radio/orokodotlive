import type { InferGetStaticPropsType } from "next";
import Hero from "../components/Hero";
import Meta from "../components/Meta";
import NewsletterSection from "../components/NewsletterSection";
import { getHomePage } from "../lib/contentful/pages/home";
import FeaturedArticles from "../views/FeaturedArticles";
import FeaturedShows from "../views/FeaturedShows";
import LatestShows from "../views/LatestShows";

export async function getStaticProps({ preview = false }) {
  return {
    props: await getHomePage(),
    revalidate: 60 * 60,
  };
}

export default function HomePage({
  featuredArticles,
  featuredShows,
  latestShows,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <Meta title="Home" />
      <Hero />
      <LatestShows shows={latestShows} />
      <FeaturedShows shows={featuredShows} />
      <FeaturedArticles featuredArticles={featuredArticles} heading="News" />
      <NewsletterSection />
    </main>
  );
}
