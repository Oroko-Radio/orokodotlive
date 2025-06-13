import type { InferGetStaticPropsType } from "next";
import Meta from "../components/Meta";
import NewsletterSection from "../components/NewsletterSection";
import PatreonBanner from "../components/PatreonBanner";
import { getHomePage } from "../lib/contentful/pages/home";
import AllNews from "../views/AllNews";
import FeaturedShows from "../views/FeaturedShows";
import LatestShows from "../views/LatestShows";
import Products from "../views/Products";
import UpcomingShows from "../views/UpcomingShows";
import SocialSection from "../components/SocialSection";

export async function getStaticProps({ preview = false }) {
  return {
    props: await getHomePage(),
    revalidate: 60 * 5,
  };
}

export default function HomePage({
  featuredArticles,
  featuredShows,
  latestShows,
  upcomingShows,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <Meta title="Home" />
      <FeaturedShows shows={featuredShows} />
      <PatreonBanner />
      <SocialSection className="justify-center bg-orokoGreen py-4 border-b-2 border-black lg:hidden" />
      <LatestShows shows={latestShows} />
      <Products products={products} />
      <UpcomingShows shows={upcomingShows} />
      <AllNews articles={featuredArticles} heading="News" bgColor="gray" home />
      <NewsletterSection />
    </main>
  );
}
