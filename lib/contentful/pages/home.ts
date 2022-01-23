import dayjs from "dayjs";
import { graphql } from "..";
import { ArticleInterface, ShowInterface } from "../../../types/shared";
import { extractCollection, sort } from "../../../util";
import {
  ArticlePreviewFragment,
  FeaturedArticleFragment,
  ShowPreviewFragment,
} from "../fragments";

export async function getHomePage() {
  const HomePageQuery = /* GraphQL */ `
    query HomePageQuery {
      featuredArticles: articleCollection(
        order: date_DESC
        where: { isFeatured: true }
        limit: 3
      ) {
        items {
          ...FeaturedArticleFragment
        }
      }

      featuredShows: showCollection(where: { isFeatured: true }) {
        items {
          ...ShowPreviewFragment
        }
      }

      allShows: showCollection(limit: 8) {
        items {
          ...ShowPreviewFragment
        }
      }

      latestArticles: articleCollection(
        order: date_DESC
        where: { isFeatured: false }
        limit: 3
      ) {
        items {
          ...ArticlePreviewFragment
        }
      }
    }

    ${ShowPreviewFragment}
    ${FeaturedArticleFragment}
    ${ArticlePreviewFragment}
  `;

  const data = await graphql(HomePageQuery);

  const today = dayjs();

  const shows = extractCollection<ShowInterface>(data, "allShows");

  const latestShows = shows
    .sort(sort.date_DESC)
    .filter((show) => dayjs(show.date).isBefore(today))
    .filter((show) => show.mixcloudLink);

  return {
    featuredArticles: extractCollection<ArticleInterface>(
      data,
      "featuredArticles"
    ),
    featuredShows: extractCollection<ShowInterface>(data, "featuredShows"),
    latestShows,
    latestArticles: extractCollection<ArticleInterface>(data, "latestArticles"),
  };
}
