import { graphql } from "..";
import { AboutPageData } from "../../../types/shared";
import { extractPage } from "../../../util";

export async function getAboutPage(preview: boolean) {
  const AboutPageQuery = /* GraphQL */ `
    query AboutPageQuery($preview: Boolean) {
      page(id: "6vUKuPtMaZBYWP7K3dMER7", preview: $preview) {
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

  const data = await graphql(AboutPageQuery, {
    variables: { preview },
    preview,
  });

  return extractPage<AboutPageData>(data, "page");
}
