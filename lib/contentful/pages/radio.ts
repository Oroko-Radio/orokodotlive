import dayjs from "dayjs";
import { LIMITS, graphql } from "..";
import { GenreCategoryInterface, ShowInterface } from "../../../types/shared";
import { extractCollection, extractCollectionItem, sort } from "../../../util";

export async function getRadioPage(preview: boolean) {
  // const shows = await getAllShows(preview);

  // const upcomingShows = await getUpcomingShows(preview);
  // const featuredShows = await getFeaturedShows(preview);

  const [shows, genreCategories, upcomingShows, featuredShows] =
    await Promise.all([
      getAllShows(preview),
      getGenreCategories(preview),
      getUpcomingShows(preview),
      getFeaturedShows(preview),
    ]).then((values) => values);

  return {
    shows,
    upcomingShows,
    featuredShows,
    genreCategories,
  };
}

export async function getAllShows(
  preview: boolean,
  limit = LIMITS.SHOWS,
  skip?: number
) {
  const AllShowsQuery = /* GraphQL */ `
    query AllShowsQuery($preview: Boolean, $limit: Int, $skip: Int) {
      showCollection(
        order: date_DESC
        where: { 
          artistsCollection_exists: true, 
          date_lte: "${dayjs().format("YYYY-MM-DD")}" 
        }
        preview: $preview
        limit: $limit
        skip: $skip
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
          artistsCollection(limit: 4) {
            items {
              name
              slug
              city {
                name
              }
            }
          }
          genresCollection(limit: 5) {
            items {
              name
              genreCategory {
                name
              }
            }
          }
          content {
            json
          }
        }
      }
    }
  `;

  const shows = await graphql(AllShowsQuery, {
    variables: { preview, limit, skip },
    preview,
  });

  return extractCollection<ShowInterface>(shows, "showCollection");
}

export async function getGenreCategories(preview: boolean) {
  const GenreCategoriesQuery = /* GraphQL */ `
    query AllGenreCategoriesQuery {
      genreCategoryCollection {
        items {
          name
        }
      }
    }
  `;

  const genreCategories = await graphql(GenreCategoriesQuery, {
    preview,
  });

  return extractCollection<GenreCategoryInterface>(
    genreCategories,
    "genreCategoryCollection"
  );
}

export async function getFeaturedShows(preview: boolean) {
  const query = /* GraphQL */ `
    query FeaturedShowsQuery {
      showCollection(limit: 16, order: date_DESC) {
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
          artistsCollection(limit: 4) {
            items {
              name
              slug
              city {
                name
              }
            }
          }
          genresCollection(limit: 5) {
            items {
              name
            }
          }
        }
      }
    }
  `;

  const shows = await graphql(query, { preview });

  return extractCollection<ShowInterface>(shows, "showCollection");
}

export async function getUpcomingShows(preview: boolean) {
  const query = /* GraphQL */ `
    query UpcomingShowsQuery {
      showCollection(
        limit: 30, 
        where: { 
          isFeatured: true,
          date_gt: "${dayjs().format("YYYY-MM-DD")}"
        },
        order: date_DESC) {
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
          artistsCollection(limit: 4) {
            items {
              name
              slug
              city {
                name
              }
            }
          }
          genresCollection(limit: 5) {
            items {
              name
            }
          }
        }
      }
    }
  `;

  const shows = await graphql(query, { preview });

  const extractedShows = extractCollection<ShowInterface>(
    shows,
    "showCollection"
  );

  const today = dayjs();

  const upcomingShows = extractedShows
    .sort(sort.date_ASC)
    .filter((show) => dayjs(show.date).isAfter(today))
    .splice(0, 16);

  return upcomingShows;
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
              city {
                name
              }
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
