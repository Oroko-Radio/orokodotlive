import { getPayload } from "payload";
import config from "@payload-config";
import { Show, Article, ArtistProfile } from "@/payload-types";

interface SearchParams {
  query: string;
  limit?: number;
  limits?: {
    shows: number;
    articles: number;
    artists: number;
  };
}

interface SearchResults {
  shows: Show[];
  articles: Article[];
  artists: ArtistProfile[];
  totalDocs: {
    shows: number;
    articles: number;
    artists: number;
  };
}

export async function searchContent({
  query,
  limit = 8,
  limits,
}: SearchParams): Promise<SearchResults> {
  const payload = await getPayload({ config });
  const today = new Date().toISOString().split("T")[0];

  if (!query || query.trim().length === 0) {
    // Return latest content as placeholder when no query - always 4 items
    const initialLimit = 4;
    
    const [showsResult, articlesResult, artistsResult] = await Promise.all([
      payload.find({
        collection: "shows",
        where: {
          and: [
            { date: { less_than_equal: today } },
            { mixcloudLink: { exists: true } },
          ],
        },
        depth: 2,
        limit: initialLimit,
        sort: "-date",
      }),
      payload.find({
        collection: "articles",
        depth: 2,
        limit: initialLimit,
        sort: "-date",
      }),
      payload.find({
        collection: "artist-profiles",
        depth: 2,
        limit: initialLimit,
        sort: "-createdAt",
      }),
    ]);

    return {
      shows: showsResult.docs,
      articles: articlesResult.docs,
      artists: artistsResult.docs,
      totalDocs: {
        shows: showsResult.totalDocs,
        articles: articlesResult.totalDocs,
        artists: artistsResult.totalDocs,
      },
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
    limit: limits?.shows || limit,
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
    limit: limits?.articles || limit,
    sort: "-date",
  });

  // Search artists - name matches
  const artistsPromise = payload.find({
    collection: "artist-profiles",
    where: {
      name: { contains: searchTerm },
    },
    depth: 2,
    limit: limits?.artists || limit,
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
    totalDocs: {
      shows: showsResult.totalDocs,
      articles: articlesResult.totalDocs,
      artists: artistsResult.totalDocs,
    },
  };
}