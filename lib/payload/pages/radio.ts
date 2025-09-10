import { getPayload } from "payload";
import config from "@payload-config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export async function getRadioPageSingle(slug: string) {
  const payload = await getPayload({ config });
  const today = dayjs.utc();

  const showResult = await payload.find({
    collection: "shows",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    // draft: true,
  });

  if (showResult.docs.length === 0) {
    throw new Error(`No Show found for slug '${slug}'`);
  }

  const show = showResult.docs[0];

  let relatedShows: any[] = [];

  if (show.genres && Array.isArray(show.genres) && show.genres.length > 0) {
    const genreIds = show.genres.map((genre) =>
      typeof genre === "object" ? genre.id : genre,
    );

    const relatedResult = await payload.find({
      collection: "shows",
      where: {
        and: [
          { slug: { not_equals: slug } },
          { date: { less_than_equal: today.toISOString() } },
          { genres: { in: genreIds } },
        ],
      },
      depth: 2,
      limit: 8,
      sort: "-date",
    });

    relatedShows = relatedResult.docs;
  }

  return {
    show,
    relatedShows,
  };
}

export async function getAllShowSlugs() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "shows",
    select: {
      slug: true,
    },
    where: {
      or: [
        { isFeatured: { equals: true } },
        { date: { greater_than: dayjs.utc().subtract(30, "days").toISOString() } },
      ],
    },
    limit: 100,
    depth: 0,
  });

  return result.docs.map((show) => show.slug).filter(Boolean);
}
