import { graphql } from "..";
import { ArticleInterface } from "../../../types/shared";
import { extractCollection } from "../../../util";
import {
  ArticlePreviewFragment,
  FeaturedArticleFragment,
} from "../../fragment";

export async function getNewsPage(preview: boolean) {
  const NewsPageQuery = /* GraphQL */ `
    query NewsPageQuery($preview: Boolean) {
      articles: articleCollection(
        order: date_DESC
        preview: $preview
        limit: 100
      ) {
        items {
          ...ArticlePreviewFragment
        }
      }

      featuredArticles: articleCollection(
        where: { isFeatured: true }
        order: date_DESC
        limit: 3
        preview: $preview
      ) {
        items {
          ...FeaturedArticleFragment
        }
      }
    }

    ${ArticlePreviewFragment}
    ${FeaturedArticleFragment}
  `;

  const data = await graphql(NewsPageQuery, {
    variables: { preview },
    preview,
  });

  return {
    articles: extractCollection<ArticleInterface>(data, "articles"),
    featuredArticles: extractCollection<ArticleInterface>(
      data,
      "featuredArticles"
    ),
  };
}
