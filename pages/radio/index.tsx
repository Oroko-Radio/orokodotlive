import Image from "next/image";
import Link from "next/link";

import { InferGetStaticPropsType } from "next";
import { getRadioPage } from "../../lib/contentful/pages/radio";

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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      {pastShows.map((show) => (
        <div key={show.slug}>
          <Link href={`/radio/${show.slug}`} passHref>
            <Image
              className="cursor-pointer"
              src={show.coverImage.url}
              alt={show.coverImage.title}
              objectFit="cover"
              width="200"
              height="200"
            />
          </Link>
          <h1>{show.title}</h1>
          {show.artistsCollection.items.map(({ name, slug }) => (
            <h2 key={slug}>{name}</h2>
          ))}
        </div>
      ))}
    </div>
  );
}
