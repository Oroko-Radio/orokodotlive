import Link from "next/link";
import { InferGetStaticPropsType } from "next";
import { getArtistsPage } from "../../lib/contentful/pages/artists";

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
    <div>
      {allArtists.map(({ name, slug }) => (
        <Link href={`/artists/${slug}`} key={slug} passHref>
          <h1 className="cursor-pointer">{name}</h1>
        </Link>
      ))}
    </div>
  );
}
