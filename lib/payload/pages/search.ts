import { getPayload } from "payload";
import config from "@payload-config";
import { Show, Article, ArtistProfile } from "@/payload-types";

interface SearchParams {
  query: string;
  limit?: number;
}

interface SearchResults {
  shows: Show[];
  articles: Article[];
  artists: ArtistProfile[];
}

export async function searchContent({
  query,
  limit = 8,
}: SearchParams): Promise<SearchResults> {
  const payload = await getPayload({ config });
  const today = new Date().toISOString().split("T")[0];

  if (!query || query.trim().length === 0) {
    return {
      shows: [],
      articles: [],
      artists: [],
    };
  }

  const searchTerm = query.trim();

  // Search shows - title and artist names
  const showsPromise = payload.find({
    collection: "shows",
    where: {
      and: [
        { date: { less_than_equal: today } },
        { mixcloudLink: { exists: true } },
        {
          or: [
            { title: { contains: searchTerm } },
            { "artists.name": { contains: searchTerm } },
          ],
        },
      ],
    },
    depth: 2,
    limit: limit,
    sort: "-date",
  });

  // Search articles - title and subtitle
  const articlesPromise = payload.find({
    collection: "articles",
    where: {
      or: [
        { title: { contains: searchTerm } },
        { subtitle: { contains: searchTerm } },
      ],
    },
    depth: 2,
    limit: limit,
    sort: "-date",
  });

  // Search artists - name matches
  const artistsPromise = payload.find({
    collection: "artist-profiles",
    where: {
      name: { contains: searchTerm },
    },
    depth: 2,
    limit: limit,
    sort: "name",
  });

  const [showsResult, articlesResult, artistsResult] = await Promise.all([
    showsPromise,
    articlesPromise,
    artistsPromise,
  ]);

  return {
    shows: showsResult.docs,
    articles: articlesResult.docs,
    artists: artistsResult.docs,
  };
}