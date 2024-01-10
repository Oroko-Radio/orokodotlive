import { InferGetStaticPropsType } from "next";
import Meta from "../../components/Meta";
import { getRadioPage } from "../../lib/contentful/pages/radio";
import AllShows from "../../views/AllShows";
import FeaturedShows from "../../views/FeaturedShows";
import UpcomingShows from "../../views/UpcomingShows";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getRadioPage(preview)) },
    revalidate: 60 * 5,
  };
}

export default function RadioPage({
  preview,
  shows,
  upcomingShows,
  featuredShows,
  genreCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title="Radio" />
      {upcomingShows.length > 0 && <UpcomingShows shows={upcomingShows} />}
      <FeaturedShows shows={featuredShows} />
      <AllShows initialShows={shows} genreCategories={genreCategories} />
    </>
  );
}
