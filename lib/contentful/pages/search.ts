import dayjs from "dayjs";
import { client } from "../";
import { ShowInterface } from "../../../types/shared";

export async function getSearchData(query: string, limit = 8) {
  const [
    showsCollection,
    showsByArtistCollection,
    articlesCollection,
    artistsCollection,
  ] = await Promise.all([
    client.getEntries({
      content_type: "show",
      limit: limit,

      "fields.date[lte]": dayjs().format("YYYY-MM-DD"),
      "fields.title[match]": query,

      select: [
        "fields.title",
        "fields.slug",
        "fields.date",
        "fields.artists",
        "fields.genres",
        "fields.coverImage",
        "fields.mixcloudLink",
        "fields.isFeatured",
        "fields.content",
      ],
    }),
    client.getEntries({
      content_type: "show",
      limit: limit,
      "fields.artists.sys.contentType.sys.id": "artist",
      "fields.artists.fields.name[match]": query,

      select: [
        "fields.title",
        "fields.slug",
        "fields.date",
        "fields.artists",
        "fields.genres",
        "fields.coverImage",
        "fields.mixcloudLink",
        "fields.isFeatured",
        "fields.content",
      ],
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
        "fields.city",
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

  const mappedShows: ShowInterface[] = shows.map((show) => {
    return {
      title: show.fields.title as string,
      slug: show.fields.slug as string,
      date: show.fields.date as string,
      artistsCollection: show.fields.artists as any,
      coverImage: show.fields.coverImage as any,
      mixcloudLink: show.fields.mixcloudLink as string,
      isFeatured: show.fields.isFeatured as boolean,
      lead: show.fields.lead as string,
      genresCollection: show.fields.genres as any,
      content: show.fields.content as any,
    };
  });

  return {
    data: { shows, articles, artists },
  };
}
