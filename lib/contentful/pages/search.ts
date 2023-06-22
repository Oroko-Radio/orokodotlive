import dayjs from "dayjs";
import { client } from "../";
import {
  TypeArticle,
  TypeArticleFields,
  TypeArtist,
  TypeArtistFields,
  TypeShow,
  TypeShowFields,
} from "../../../types/contentful";

export interface SearchData {
  shows: TypeShow[];
  articles: TypeArticle[];
  artists: TypeArtist[];
}

export async function getSearchData(query: string, limit = 8) {
  const [showsCollection, articlesCollection, artistsCollection] =
    await Promise.all([
      client.getEntries<TypeShowFields>({
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
      client.getEntries<TypeArticleFields>({
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
      client.getEntries<TypeArtistFields>({
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
    data: { shows, articles, artists } as SearchData,
  };
}
