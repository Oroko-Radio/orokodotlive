import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "../contentful-data/export.json" with { type: "json" };
import { toSlatejsDocument } from "@contentful/contentful-slatejs-adapter";

const artistEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "artist",
);

console.log(`Found ${artistEntries.length} artist entries to migrate`);

function formatRichText(slateNodes) {
  if (!slateNodes || !Array.isArray(slateNodes)) return slateNodes;

  const typeMapping = {
    paragraph: "p",
    "heading-1": "h1",
    "heading-2": "h2",
    "heading-3": "h3",
    "heading-4": "h4",
    "heading-5": "h5",
    "heading-6": "h6",
    blockquote: "blockquote",
    "unordered-list": "ul",
    "ordered-list": "ol",
    "list-item": "li",
    hyperlink: "link",
  };

  return slateNodes.map((node) => {
    const formattedNode = { ...node };

    if (node.type && typeMapping[node.type]) {
      formattedNode.type = typeMapping[node.type];
    }

    if (node.children && Array.isArray(node.children)) {
      formattedNode.children = formatRichText(node.children);
    }

    return formattedNode;
  });
}

function convertRichText(contentfulRichText) {
  if (!contentfulRichText) return null;
  console.log(
    "Original Contentful rich text:",
    JSON.stringify(contentfulRichText, null, 2),
  );
  const converted = toSlatejsDocument({ document: contentfulRichText });
  console.log(
    "Converted rich text (before formatting):",
    JSON.stringify(converted, null, 2),
  );
  const formatted = formatRichText(converted);
  console.log("Final formatted rich text:", JSON.stringify(formatted, null, 2));
  return formatted;
}

async function findCityByContentfulId(payload, contentfulId) {
  if (!contentfulId) return null;
  const result = await payload.find({
    collection: "city",
    where: { contentfulId: { equals: contentfulId } },
    limit: 1,
  });
  return result.docs[0]?.id || null;
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

async function migrateArtists() {
  const payload = await getPayload({ config: config });

  for (let i = 1; i < artistEntries.length; i++) {
    const entry = artistEntries[i];
    if (!entry || !entry.fields) {
      console.log(`❌ Entry ${i} is missing or has no fields`);
      continue;
    }
    const fields = entry.fields;

    try {
      const cityId = fields.city?.["en-US"]?.sys?.id;
      const cityPayloadId = await findCityByContentfulId(payload, cityId);

      const photoId = fields.photo?.["en-US"]?.sys?.id;
      const photoPayloadId = await findMediaByContentfulId(payload, photoId);

      const artistData = {
        name: fields.name?.["en-US"],
        slug: fields.slug?.["en-US"],
        isResident: fields.isResident?.["en-US"] || false,
        isAlumni: fields.isAlumni?.["en-US"] || false,
        city: cityPayloadId,
        photo: photoPayloadId,
        content: convertRichText(fields.content?.["en-US"]),
        contentfulId: entry.sys.id,
      };

      await payload.create({
        collection: "artist-profiles",
        data: artistData,
      });

      console.log(`✅ Migrated: ${artistData.name}`);
    } catch (error) {
      console.log(`❌ Failed: ${entry.sys.id} - ${error.message}`);
    }
  }

  process.exit(0);
}

await migrateArtists().catch(console.error);
