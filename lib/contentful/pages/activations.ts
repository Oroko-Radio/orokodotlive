import { graphql } from "..";
import { ActivationInterface } from "../../../types/shared";
import { extractCollection, extractCollectionItem } from "../../../util";
import {
  ActivationPreviewFragment,
  RelatedActivationFragment,
} from "../fragments";

export async function getActivationsPage(preview: boolean) {
  const ActivationsPageQuery = /* GraphQL */ `
    query ActivationsPageQuery($preview: Boolean) {
      activations: activationCollection(
        order: year_DESC
        preview: $preview
        limit: 100
      ) {
        items {
          ...ActivationPreviewFragment
        }
      }
    }

    ${ActivationPreviewFragment}
  `;

  const data = await graphql(ActivationsPageQuery, {
    variables: { preview },
    preview,
  });

  return {
    activations: extractCollection<ActivationInterface>(data, "activations"),
  };
}

export async function getActivationsPageSingle(slug: string, preview: boolean) {
  const ActivationsPageSingleQuery = /* GraphQL */ `
    query ActivationsPageSingleQuery($slug: String, $preview: Boolean) {
      activation: activationCollection(
        where: { slug: $slug }
        limit: 1
        preview: $preview
      ) {
        items {
          title
          city {
            name
          }
          year
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
              entries {
                block {
                  sys {
                    id
                  }
                  __typename
                  ... on YouTubeEmbed {
                    title
                    shareLink
                  }
                }
              }
            }
          }
        }
      }

      relatedActivations: activationCollection(
        limit: 3
        where: { slug_not: $slug }
        order: year_DESC
        preview: $preview
      ) {
        items {
          ...RelatedActivationFragment
        }
      }
    }

    ${RelatedActivationFragment}
  `;

  const data = await graphql(ActivationsPageSingleQuery, {
    variables: { slug, preview },
    preview,
  });

  const activation = extractCollectionItem<ActivationInterface>(data, "activation");

  if (!activation) {
    throw new Error(`No Activation found for slug '${slug}'`);
  }

  const relatedActivations = extractCollection<ActivationInterface>(
    data,
    "relatedActivations"
  );

  return {
    activation,
    relatedActivations,
  };
}
