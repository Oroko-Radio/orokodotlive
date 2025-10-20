import { getPayload } from "payload";
import config from "@payload-config";
import { draftMode } from "next/headers";

export async function getPageBySlug(slug: string) {
  const payload = await getPayload({ config });

  const { isEnabled: isDraftMode } = await draftMode();

  const result = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
    draft: isDraftMode,
  });

  if (result.docs.length === 0) {
    throw new Error(`Page not found for slug: ${slug}`);
  }

  return result.docs[0];
}
