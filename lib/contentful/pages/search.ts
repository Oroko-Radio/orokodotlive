import dayjs from "dayjs";
import { client } from "../";

export async function getSearchData(query: string, limit = 8) {
  const [showsCollection, articlesCollection, artistsCollection] =
    await Promise.all([
      client.getEntries({
        content_type: "show",
        limit: limit,

        "fields.mixcloudLink[exists]": true,
        "fields.date[lte]": dayjs().format("YYYY-MM-DD"),

        query: query,

        // select: [
        //   "fields.title",
        //   "fields.slug",
        //   "fields.date",
        //   "fields.artists",
        //   "fields.genres",
        //   "fields.coverImage",
        // ],
      }),
      client.getEntries({
        content_type: "article",
        limit: limit,

        "fields.articleType[exists]": true,

        "fields.title[match]": query,

        select: [
          "fields.title",
          "fields.slug",
          "fields.date",
          "fields.coverImage",
          "fields.articleType",
        ],
      }),
      client.getEntries({
        content_type: "artist",
        limit: limit,

        "fields.name[match]": query,

        select: ["fields.name", "fields.slug", "fields.photo"],
      }),
    ]);

  const { items: shows } = showsCollection;
  const { items: articles } = articlesCollection;
  const { items: artists } = artistsCollection;

  return {
    data: { shows, articles, artists },
  };
}
