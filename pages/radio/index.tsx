import Image from "next/image";
import Link from "next/link";

import { InferGetStaticPropsType } from "next";
import { getRadioPage } from "../../lib/contentful/pages/radio";
import AllShows from "../../views/AllShows";
import FeaturedShows from "../../views/FeaturedShows";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getRadioPage(preview)) },
    revalidate: 60 * 5,
  };
}

export default function RadioPage({
  genres,
  pastShows,
  preview,
  upcomingShows,
  featuredShows,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <FeaturedShows shows={featuredShows} />
      <AllShows shows={pastShows} />
    </>
  );
}
