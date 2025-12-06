import { getPayload } from "payload";
import config from "@payload-config";

export async function getAllActivations() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "activations",
    depth: 2,
    limit: 100,
    sort: "-year",
    pagination: false,
  });

  return result.docs;
}

export async function getActivationBySlug(slug: string, isDraftMode: boolean) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "activations",
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    limit: 1,
    draft: isDraftMode,
    overrideAccess: isDraftMode,
  });

  if (result.docs.length === 0) {
    throw new Error(`Activation not found for slug: ${slug}`);
  }

  return result.docs[0];
}

export async function getAllActivationSlugs() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "activations",
    select: {
      slug: true,
    },
    where: {
      slug: { exists: true },
    },
    pagination: false,
    limit: 1000,
  });

  return result.docs.map((doc) => doc.slug).filter(Boolean);
}
