import dayjs from "dayjs";
import { graphql, LIMITS } from "..";
import { ShowInterface } from "../../../types/shared";
import {
  extractCollection,
  extractCollectionItem,
  sort,
  uniq,
} from "../../../util";

export async function getRadioPage(preview: boolean) {
  const today = dayjs();

  const shows = await getAllShows(preview);

  /**
   * Upcoming & Featured
   */
  const upcomingShows = shows
    .sort(sort.date_ASC)
    .filter((show) => dayjs(show.date).isAfter(today))
    .filter((show) => show.isFeatured);

  /**
   * All Past Shows
   */
  const pastShows = shows
    .sort(sort.date_DESC)
    .filter((show) => dayjs(show.date).isBefore(today));

  /**
   * All Past Show Genres
   */
  const pastShowGenres = pastShows
    .flatMap((show) => show.genresCollection.items)
    .filter((genre) => Boolean(genre?.name))
    .map((genre) => genre.name);

  const genres = uniq(pastShowGenres).sort(sort.alpha);

  const featuredShows = shows.filter((show) => show.isFeatured);

  return {
    upcomingShows,
    pastShows,
    genres,
    featuredShows,
  };
}

export async function getRadioPageSingle(slug: string, preview: boolean) {
  const today = dayjs();

  const RadioPageSingleQuery = /* GraphQL */ `
    query RadioPageSingleQuery($slug: String, $preview: Boolean) {
      showCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
        items {
          title
          date
          slug
          mixcloudLink
          isFeatured
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
          artistsCollection(limit: 9) {
            items {
              name
              slug
            }
          }
          genresCollection(limit: 9) {
            items {
              name
            }
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
    }
  `;

  const data = await graphql(RadioPageSingleQuery, {
    variables: { slug, preview },
    preview,
  });

  const entry = extractCollectionItem<ShowInterface>(data, "showCollection");

  if (!entry) {
    throw new Error(`No Show found for slug '${slug}'`);
  }

  const entryGenres = entry.genresCollection.items.map((genre) => genre.name);

  const allShows = await getAllShows(preview);

  const relatedShows = allShows.filter((filterShow) => {
    const currentShowGenres = filterShow.genresCollection.items.map(
      (genre) => genre.name
    );

    const isRelatedShowFilter =
      currentShowGenres.filter((genre) => entryGenres.includes(genre)).length >
      0;

    const isNotOwnShow = filterShow.slug !== slug;

    const isPastFilter = dayjs(filterShow.date).isBefore(today);

    return isNotOwnShow && isRelatedShowFilter && isPastFilter;
  });

  return {
    show: entry,
    relatedShows,
  };
}

export async function getAllShows(preview: boolean, limit = LIMITS.SHOWS) {
  const AllShowsQuery = /* GraphQL */ `
    query AllShowsQuery($preview: Boolean, $limit: Int) {
      showCollection(
        order: date_DESC
        where: { artistsCollection_exists: true }
        preview: $preview
        limit: $limit
      ) {
        items {
          title
          date
          slug
          mixcloudLink
          isFeatured
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
          artistsCollection(limit: 9) {
            items {
              name
              slug
            }
          }
          genresCollection(limit: 9) {
            items {
              name
            }
          }
          content {
            json
          }
        }
      }
    }
  `;

  const data = await graphql(AllShowsQuery, {
    variables: { preview, limit },
    preview,
  });

  return extractCollection<ShowInterface>(data, "showCollection");
}
