import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "./contentful-data/export.json" with { type: "json" };
import { toSlatejsDocument } from "@contentful/contentful-slatejs-adapter";

const showEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "show",
);

console.log(`Found ${showEntries.length} show entries to migrate`);

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
  // console.log(
  //   "Original Contentful rich text:",
  //   JSON.stringify(contentfulRichText, null, 2),
  // );
  const converted = toSlatejsDocument({ document: contentfulRichText });
  const formatted = formatRichText(converted.children);
  // console.log(
  //   "Converted rich text:",
  //   JSON.stringify({ ...converted, children: formatted }, null, 2),
  // );
  return { ...converted, children: formatted };
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

  for (let i = 0; i < showEntries.length; i++) {
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

      // Handle artists relationships
      let artistIds = [];
      if (fields.artists?.["en-US"]) {
        const artistRefs = Array.isArray(fields.artists["en-US"])
          ? fields.artists["en-US"]
          : [fields.artists["en-US"]];

        for (const ref of artistRefs) {
          if (ref?.sys?.id) {
            const artist = await payload.find({
              collection: "artists",
              where: {
                contentfulId: { equals: ref.sys.id },
              },
            });

            if (artist.docs.length > 0) {
              artistIds.push(artist.docs[0].id);
            }
          }
        }
      }

      // Handle genres relationships
      let genreIds = [];
      if (fields.genres?.["en-US"]) {
        const genreRefs = Array.isArray(fields.genres["en-US"])
          ? fields.genres["en-US"]
          : [fields.genres["en-US"]];

        for (const ref of genreRefs) {
          if (ref?.sys?.id) {
            const genre = await payload.find({
              collection: "genres",
              where: {
                contentfulId: { equals: ref.sys.id },
              },
            });

            if (genre.docs.length > 0) {
              genreIds.push(genre.docs[0].id);
            }
          }
        }
      }

      const showData = {
        title: fields.title?.["en-US"],
        slug: fields.slug?.["en-US"],
        date: fields.date?.["en-US"],
        isFeatured: fields.isFeatured?.["en-US"] || false,
        lead: fields.lead?.["en-US"],
        mixcloudLink: fields.mixcloudLink?.["en-US"],
        coverImage: coverImagePayloadId,
        content: convertRichText(fields.content?.["en-US"]),
        artists: artistIds,
        genres: genreIds,
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
