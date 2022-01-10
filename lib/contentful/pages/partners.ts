import { graphql } from "..";
import { SinglePageData } from "../../../types/shared";
import { extractPage } from "../../../util";

export async function getPartnersPage(preview: boolean) {
  const PartnersPageQuery = /* GraphQL */ `
    query PartnersPageQuery($preview: Boolean) {
      page(id: "RDFMDWevzlsOYgGzewbGr", preview: $preview) {
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

  const data = await graphql(PartnersPageQuery, {
    variables: { preview },
    preview,
  });

  return extractPage<SinglePageData>(data, "page");
}
