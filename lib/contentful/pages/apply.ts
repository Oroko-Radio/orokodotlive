import { graphql } from "..";
import { SinglePageData } from "../../../types/shared";
import { extractPage } from "../../../util";

export async function getApplyPage(preview: boolean) {
  const ApplyPageQuery = /* GraphQL */ `
    query ApplyPageQuery($preview: Boolean) {
      page(id: "2G4JeWoZo9wEbpnJ0H3Sa9", preview: $preview) {
        title
        subtitle
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

  const data = await graphql(ApplyPageQuery, {
    variables: { preview },
    preview,
  });

  return extractPage<SinglePageData>(data, "page");
}
