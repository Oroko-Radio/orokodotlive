import dayjs from "dayjs";
import { graphql, LIMITS } from "@/lib/contentful";
import { ArticleInterface, ShowInterface } from "@/types/shared";
import { extractCollection, sort } from "@/util";
import {
  ArticlePreviewFragment,
  FeaturedArticleFragment,
  ShowPreviewFragment,
} from "@/lib/contentful/fragments";
import { getProducts } from "./products";

export async function getHomePage(limit = LIMITS.SHOWS) {
  const HomePageQuery = /* GraphQL */ `
    query HomePageQuery($limit: Int) {
      featuredArticles: articleCollection(
        order: date_DESC
        where: { isFeatured: true }
        limit: 6
      ) {
        items {
          ...FeaturedArticleFragment
        }
      }

      featuredShows: showCollection(
        where: { isFeatured: true }
        order: date_DESC
        limit: 8
      ) {
        items {
          ...ShowPreviewFragment
        }
      }

      allShows: showCollection(
        order: date_DESC
        limit: $limit
      ) {
        items {
          ...ShowPreviewFragment
        }
      }

      upcomingShows: showCollection(
        limit: 30, 
        where: { 
          date_gt: "${dayjs().format("YYYY-MM-DD")}"
        },
        order: date_DESC
      ) {
        items {
          title
          date
          slug
          mixcloudLink
          isFeatured
          coverImage {
            sys {
              id
            }
            title
            description
            url
            width
            height
          }
          artistsCollection(limit: 4) {
            items {
              name
              slug
              city {
                name
              }
            }
          }
          genresCollection(limit: 5) {
            items {
              name
            }
          }
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

  const latestShows = extractCollection<ShowInterface>(data, "allShows")
    .sort(sort.date_DESC)
    .filter((show) => dayjs(show.date).isBefore(today))
    .filter((show) => show.mixcloudLink)
    .splice(0, 8);

  const upcomingShows = extractCollection<ShowInterface>(data, "upcomingShows")
    .sort(sort.date_ASC)
    .filter((show) => dayjs(show.date).isAfter(today))
    .splice(0, 16);

  const [products] = await Promise.all([
    getProducts(3),
  ]);

  return {
    featuredArticles: extractCollection<ArticleInterface>(
      data,
      "featuredArticles"
    ),
    featuredShows: extractCollection<ShowInterface>(data, "featuredShows"),
    latestShows,
    upcomingShows,
    latestArticles: extractCollection<ArticleInterface>(data, "latestArticles"),
    products,
  };
}
