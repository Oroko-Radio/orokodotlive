import { InferGetStaticPropsType } from "next";
import Meta from "../../components/Meta";
import { getArtistsPage } from "../../lib/contentful/pages/artists";
import AllArtists from "../../views/AllArtists";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, allArtists: await getArtistsPage() },
    revalidate: 60 * 5,
  };
}

export default function ArtistsPage({
  preview,
  allArtists,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title="Artists" />
      <AllArtists allArtists={allArtists} />
    </>
  );
}
