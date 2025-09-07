import { getPayload } from "payload";
import config from "@payload-config";
import dayjs from "dayjs";

export async function getUpcomingShows() {
  const payload = await getPayload({ config });
  const today = new Date().toISOString().split("T")[0];

  const result = await payload.find({
    collection: "shows",
    where: {
      date: { greater_than: today },
    },
    depth: 2,
    limit: 30,
    sort: "date",
  });

  return result.docs
    .filter((show) => dayjs(show.date).isAfter(dayjs()))
    .slice(0, 16);
}

export async function getHomePage() {
  const payload = await getPayload({ config });
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const [featuredShows, allShows, upcomingShows, products, featuredArticles] =
    await Promise.all([
      payload.find({
        collection: "shows",
        where: { isFeatured: { equals: true } },
        depth: 2,
        limit: 8,
        sort: "-date",
      }),
      payload.find({
        collection: "shows",
        where: {
          date: { less_than_equal: todayString },
          mixcloudLink: { exists: true },
        },
        depth: 2,
        limit: 16,
        sort: "-date",
      }),
      payload.find({
        collection: "shows",
        where: {
          date: { greater_than: todayString },
        },
        depth: 2,
        limit: 30,
        sort: "date",
      }),
      payload.find({
        collection: "products",
        depth: 3,
        limit: 10,
        sort: "title",
      }),
      payload.find({
        collection: "articles",
        where: { isFeatured: { equals: true } },
        depth: 2,
        limit: 9,
        sort: "-date",
      }),
    ]);

  const latestShows = allShows.docs
    .filter((show) => dayjs(show.date).isBefore(dayjs()))
    .slice(0, 8);

  const filteredUpcomingShows = upcomingShows.docs
    .filter((show) => dayjs(show.date).isAfter(dayjs()))
    .slice(0, 16);

  return {
    featuredShows: featuredShows.docs,
    latestShows,
    upcomingShows: filteredUpcomingShows,
    products: products.docs,
    featuredArticles: featuredArticles.docs,
  };
}
