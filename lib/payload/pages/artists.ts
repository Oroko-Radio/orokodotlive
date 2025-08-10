import { getPayload } from "payload";
import config from "@payload-config";
import dayjs from "dayjs";

export async function getArtistsPage() {
  const payload = await getPayload({ config });

  const allArtists = await payload.find({
    collection: "artists",
    depth: 2,
    limit: 2000,
    sort: "name",
  });

  return {
    allArtists: allArtists.docs,
    cities: [], // TODO: Update when cities collection is available
  };
}

export async function getArtistsPageSingle(slug: string) {
  const payload = await getPayload({ config });
  const today = dayjs();

  const artistResult = await payload.find({
    collection: "artists",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });

  if (artistResult.docs.length === 0) {
    throw new Error(`No Artist found for slug '${slug}'`);
  }

  const artist = artistResult.docs[0];

  let relatedShows: any[] = [];

  // Find shows where this artist is featured
  const showsResult = await payload.find({
    collection: "shows",
    where: {
      and: [
        { artists: { in: [artist.id] } },
        { date: { less_than_equal: today.toISOString() } },
      ],
    },
    depth: 2,
    limit: 20,
    sort: "-date",
  });

  relatedShows = showsResult.docs;

  return {
    artist,
    relatedShows,
  };
}
