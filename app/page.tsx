import type { Metadata } from "next";
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

export const revalidate = 300; // 5 minutes

export const metadata: Metadata = {
  title: "Home - OROKO RADIO",
};

export default async function HomePage() {
  const {
    featuredArticles,
    featuredShows,
    latestShows,
    upcomingShows,
    products,
  } = await getHomePage();

  return (
    <main>
      <Meta title="Home" />
      <FeaturedShows shows={featuredShows} />
      <PatreonBanner />
      <SocialSection className="justify-center bg-orokoGreen py-4 border-b-2 border-black lg:hidden" />
      <UpcomingShows shows={upcomingShows} />
      <Products products={products} />
      <LatestShows shows={latestShows} />
      <AllNews articles={featuredArticles} heading="News" bgColor="gray" home />
      <NewsletterSection />
    </main>
  );
}