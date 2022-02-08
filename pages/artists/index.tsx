import { InferGetStaticPropsType } from "next";
import Meta from "../../components/Meta";
import { getArtistsPage } from "../../lib/contentful/pages/artists";
import AllArtists from "../../views/AllArtists";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getArtistsPage()) },
    revalidate: 60 * 5,
  };
}

export default function ArtistsPage({
  preview,
  allArtists,
  cities,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title="Artists" />
      <AllArtists allArtists={allArtists} cities={cities} />
    </>
  );
}
