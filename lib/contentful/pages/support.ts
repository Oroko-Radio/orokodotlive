import { graphql } from "..";
import { SinglePageData } from "../../../types/shared";
import { extractPage } from "../../../util";

export async function getSupportPage(preview: boolean) {
  const SupportPageQuery = /* GraphQL */ `
    query SupportPageQuery($preview: Boolean) {
      page(id: "5byT8RSCOlOn5gy3LgyTF5", preview: $preview) {
        title
        subtitle
        coverImage {
          sys {
            id
          }
          title
          url
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
                url
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphql(SupportPageQuery, {
    variables: { preview },
    preview,
  });

  return extractPage<SinglePageData>(data, "page");
}
