import { extractCollection } from "../../util";
import { graphql } from ".";
import dayjs from "dayjs";

export async function getArticlePathsToPreRender() {
  const data = await graphql(/* GraphQL */ `
    query ArticlePathsToPreRenderQuery {
      articleCollection(
        where: { slug_exists: true }
        limit: 50
        order: date_DESC
      ) {
        items {
          slug
        }
      }
    }
  `);

  const collection = extractCollection<{ slug: string }>(
    data,
    "articleCollection"
  );

  const paths = collection.map((el) => ({
    params: { slug: el.slug },
  }));

  return paths;
}

export async function getShowPathsToPreRender() {
  const today = dayjs().format("YYYY-MM-DD");

  const ShowPathsToPreRenderQuery = /* GraphQL */ `
    query ShowPathsToPreRenderQuery($today: DateTime) {
      showCollection(
        where: { slug_exists: true, date_lt: $today }
        limit: 100
        order: date_DESC
      ) {
        items {
          slug
        }
      }
    }
  `;

  const data = await graphql(ShowPathsToPreRenderQuery, {
    variables: { today },
  });

  const collection = extractCollection<{ slug: string }>(
    data,
    "showCollection"
  );

  const paths = collection.map((el) => ({
    params: { slug: el.slug },
  }));

  return paths;
}
