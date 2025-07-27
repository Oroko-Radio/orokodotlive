import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "./contentful-data/export.json" with { type: "json" };
import { toSlatejsDocument } from "@contentful/contentful-slatejs-adapter";

const showEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "show",
);

console.log(`Found ${showEntries.length} show entries to migrate`);

function convertRichText(contentfulRichText) {
  if (!contentfulRichText) return null;
  console.log(
    "Original Contentful rich text:",
    JSON.stringify(contentfulRichText, null, 2),
  );
  const converted = toSlatejsDocument({ document: contentfulRichText });
  console.log("Converted rich text:", JSON.stringify(converted, null, 2));
  return converted;
}

async function findMediaByContentfulId(payload, contentfulId) {
  if (!contentfulId) return null;
  const result = await payload.find({
    collection: "media",
    where: { contentfulId: { equals: contentfulId } },
    limit: 1,
  });
  return result.docs[0]?.id || null;
}

async function migrateShows() {
  const payload = await getPayload({ config: config });

  for (let i = 0; i < 1; i++) {
    const entry = showEntries[i];
    if (!entry || !entry.fields) {
      console.log(`❌ Entry ${i} is missing or has no fields`);
      continue;
    }
    const fields = entry.fields;

    try {
      const coverImageId = fields.coverImage?.["en-US"]?.sys?.id;
      const coverImagePayloadId = await findMediaByContentfulId(
        payload,
        coverImageId,
      );

      const showData = {
        title: fields.title?.["en-US"],
        slug: fields.slug?.["en-US"],
        date: fields.date?.["en-US"],
        isFeatured: fields.isFeatured?.["en-US"] || false,
        lead: fields.lead?.["en-US"],
        mixcloudLink: fields.mixcloudLink?.["en-US"],
        coverImage: coverImagePayloadId,
        content: convertRichText(fields.content?.["en-US"]),
        contentfulId: entry.sys.id,
      };

      await payload.create({
        collection: "shows",
        data: showData,
      });

      console.log(`✅ Migrated: ${showData.title}`);
    } catch (error) {
      console.log(`❌ Failed: ${entry.sys.id} - ${error.message}`);
    }
  }
}

await migrateShows().catch(console.error);
