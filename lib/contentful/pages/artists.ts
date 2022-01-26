import dayjs from "dayjs";
import { graphql } from "..";
import {
  AllArtistEntry,
  ArtistEntry,
  ShowInterface,
} from "../../../types/shared";
import { extractCollection, extractCollectionItem, sort } from "../../../util";
import { AllArtistFragment } from "../fragments";

export async function getArtistsPage() {
  const ArtistsPageQuery = /* GraphQL */ `
    query ArtistsPageQuery {
      artistCollection(order: name_ASC, limit: 2000) {
        items {
          ...AllArtistFragment
        }
      }
    }

    ${AllArtistFragment}
  `;

  const data = await graphql(ArtistsPageQuery);

  return extractCollection<AllArtistEntry>(data, "artistCollection");
}

export async function getArtistsPageSingle(slug: string, preview: boolean) {
  const today = dayjs();

  const ArtistsPageSingleQuery = /* GraphQL */ `
    query ArtistsPageSingleQuery($slug: String, $preview: Boolean) {
      artistCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
        items {
          sys {
            id
          }
          name
          city {
            name
          }
          slug
          photo {
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
          linkedFrom {
            showCollection(limit: 100) {
              items {
                slug
                title
                mixcloudLink
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
                date
                genresCollection(limit: 9) {
                  items {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const entry = await graphql(ArtistsPageSingleQuery, {
    variables: { slug, preview },
    preview,
  });

  const artist = extractCollectionItem<ArtistEntry>(entry, "artistCollection");

  if (!artist) {
    throw new Error(`No Artist found for slug '${slug}'`);
  }

  let relatedShows: ShowInterface[] = [];

  const date_lt_TODAY = (show: ShowInterface) =>
    dayjs(show.date).isBefore(today);

  const linkedFrom = artist.linkedFrom.showCollection.items;

  const linkedFromFiltered = linkedFrom.filter(date_lt_TODAY);

  if (linkedFromFiltered.length > 0) {
    relatedShows = linkedFromFiltered.sort(sort.date_DESC);
  }

  return {
    artist,
    relatedShows,
  };
}
