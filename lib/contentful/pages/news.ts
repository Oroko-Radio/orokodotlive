import { graphql } from "..";
import { ArticleInterface } from "../../../types/shared";
import { extractCollection, extractCollectionItem } from "../../../util";
import {
  ArticlePreviewFragment,
  FeaturedArticleFragment,
  RelatedArticleFragment,
} from "../fragments";

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
        limit: 6
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

export async function getNewsPageSingle(slug: string, preview: boolean) {
  const NewsPageSingleQuery = /* GraphQL */ `
    query NewsPageSingleQuery($slug: String, $preview: Boolean) {
      article: articleCollection(
        where: { slug: $slug }
        limit: 1
        preview: $preview
      ) {
        items {
          title
          subtitle
          articleType
          city {
            name
          }
          author {
            name
          }
          date
          slug
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
          content {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  contentType
                  title
                  description
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }

      relatedArticles: articleCollection(
        limit: 3
        where: { slug_not: $slug }
        order: date_DESC
        preview: $preview
      ) {
        items {
          ...RelatedArticleFragment
        }
      }
    }

    ${RelatedArticleFragment}
  `;

  const data = await graphql(NewsPageSingleQuery, {
    variables: { slug, preview },
    preview,
  });

  const article = extractCollectionItem<ArticleInterface>(data, "article");

  if (!article) {
    throw new Error(`No Article found for slug '${slug}'`);
  }

  const relatedArticles = extractCollection<ArticleInterface>(
    data,
    "relatedArticles"
  );

  return {
    article,
    relatedArticles,
  };
}
