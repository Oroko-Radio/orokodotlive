import Link from "next/link";
import { InferGetStaticPropsType } from "next";
import { getArtistsPage } from "../../lib/contentful/pages/artists";
import AllArtists from "../../views/AllArtists";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, allArtists: await getArtistsPage() },
    revalidate: 60 * 5,
  };
}

export default function ResidentsPage({
  preview,
  allArtists,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <AllArtists allArtists={allArtists} />
    </>
  );
}
