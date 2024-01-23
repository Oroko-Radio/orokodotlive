import type { InferGetStaticPropsType } from "next";
import Meta from "../components/Meta";
import NewsletterSection from "../components/NewsletterSection";
import PatreonBanner from "../components/PatreonBanner";
import { getHomePage } from "../lib/contentful/pages/home";
import AllNews from "../views/AllNews";
import FeaturedShows from "../views/FeaturedShows";
import LatestShows from "../views/LatestShows";
import UpcomingShows from "../views/UpcomingShows";

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
  upcomingShows,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <Meta title="Home" />
      <FeaturedShows shows={featuredShows} />
      <LatestShows shows={latestShows} />
      <UpcomingShows shows={upcomingShows} />
      <PatreonBanner />
      <AllNews articles={featuredArticles} heading="News" bgColor="gray" home />
      <NewsletterSection />
    </main>
  );
}
