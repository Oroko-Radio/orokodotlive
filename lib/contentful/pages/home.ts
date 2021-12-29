import dayjs from "dayjs";
import { graphql } from "..";
import {
  ArticleInterface,
  HomePageData,
  NextUpSection,
  ShowInterface,
} from "../../../types/shared";
import { extractCollection, extractPage, sort } from "../../../util";
import {
  ArticlePreviewFragment,
  FeaturedArticleFragment,
  ShowPreviewFragment,
} from "../fragments";
import { getAllShows } from "./radio";

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

  const shows = await getAllShows(false);

  const latestShows = shows
    .sort(sort.date_DESC)
    .filter((show) => dayjs(show.date).isBefore(today));

  return {
    featuredArticles: extractCollection<ArticleInterface>(
      data,
      "featuredArticles"
    ),
    featuredShows: extractCollection<HomePageData>(data, "featuredShows"),
    latestShows,
    latestArticles: extractCollection<ArticleInterface>(data, "latestArticles"),
  };
}
