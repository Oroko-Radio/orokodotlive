import { getPayload } from "payload";
import config from "@payload-config";

export async function getFeaturedArticles() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "articles",
    where: {
      isFeatured: {
        equals: true,
      },
    },
    depth: 2,
    limit: 8,
    sort: "-date",
  });

  return result.docs;
}

export async function getAllArticles() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "articles",
    depth: 2,
    limit: 50,
    sort: "-date",
  });

  return result.docs;
}

export async function getArticleBySlug(slug: string) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "articles",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
    draft: true,
  });

  if (result.docs.length === 0) {
    throw new Error(`Article not found for slug: ${slug}`);
  }

  return result.docs[0];
}

export async function getAllArticleSlugs() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "articles",
    select: {
      slug: true,
    },
    limit: 1000,
  });

  return result.docs.map((doc) => doc.slug);
}
