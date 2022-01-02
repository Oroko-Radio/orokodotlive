import { graphql } from "..";
import { SinglePageData } from "../../../types/shared";
import { extractPage } from "../../../util";

export async function getNewsletterPage(preview: boolean) {
  const NewsletterPageQuery = /* GraphQL */ `
    query NewsletterPageQuery($preview: Boolean) {
      page(id: "7v8oxc2kd55IN0YyHQINuE", preview: $preview) {
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

  const data = await graphql(NewsletterPageQuery, {
    variables: { preview },
    preview,
  });

  return extractPage<SinglePageData>(data, "page");
}
