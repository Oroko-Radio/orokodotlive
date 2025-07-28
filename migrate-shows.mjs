import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "./contentful-data/export.json" with { type: "json" };
import { toSlatejsDocument } from "@contentful/contentful-slatejs-adapter";
import fs from "fs";

const BATCH_SIZE = 1000;
const PROGRESS_FILE = "./progress-shows.json";

const showEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "show",
);

console.log(`Found ${showEntries.length} show entries to migrate`);

function loadProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
    }
  } catch (error) {
    console.log("No progress file found, starting from beginning");
  }
  return { processedCount: 0, successful: 0, failed: 0, failedIds: [] };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function formatRichText(slateNodes, payload) {
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
    "embedded-asset-block": "upload",
  };

  const processedNodes = [];

  for (const node of slateNodes) {
    const formattedNode = { ...node };

    if (node.type && typeMapping[node.type]) {
      formattedNode.type = typeMapping[node.type];
    }

    // Handle embedded asset blocks
    if (node.type === "embedded-asset-block" && node.data) {
      formattedNode.relationTo = "media";
      formattedNode.fields = null;
      formattedNode.format = "";
      formattedNode.version = 3;
      const contentfulAssetId = node.data.target?.sys?.id;
      if (contentfulAssetId) {
        const media = await payload.find({
          collection: "media",
          where: { contentfulId: { equals: contentfulAssetId } },
          limit: 1,
        });
        if (media.docs.length > 0) {
          formattedNode.value = media.docs[0];
          formattedNode.id = media.docs[0].id;
        }
      }
    }

    if (node.children && Array.isArray(node.children)) {
      formattedNode.children = await formatRichText(node.children, payload);
    }

    processedNodes.push(formattedNode);
  }

  return processedNodes;
}

async function convertRichText(contentfulRichText, payload) {
  if (!contentfulRichText) return null;
  // console.log(
  //   "Original Contentful rich text:",
  //   JSON.stringify(contentfulRichText, null, 2),
  // );
  const converted = toSlatejsDocument({ document: contentfulRichText });
  // console.log(
  //   "Converted rich text (before formatting):",
  //   JSON.stringify(converted, null, 2),
  // );
  const formatted = await formatRichText(converted, payload);
  // console.log("Final formatted rich text:", JSON.stringify(formatted, null, 2));
  return formatted;
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
  const progress = loadProgress();

  const totalShows = showEntries.length;
  const startIndex = progress.processedCount;
  const endIndex = Math.min(startIndex + BATCH_SIZE, totalShows);

  console.log(
    `Processing shows ${startIndex + 1}-${endIndex} of ${totalShows}`,
  );
  console.log(
    `Previous progress: ${progress.successful} successful, ${progress.failed} failed`,
  );

  for (let i = startIndex; i < endIndex; i++) {
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
        content: await convertRichText(fields.content?.["en-US"], payload),
        artists: artistIds,
        genres: genreIds,
        contentfulId: entry.sys.id,
      };

      await payload.create({
        collection: "shows",
        data: showData,
      });

      progress.successful++;
      console.log(`✅ [${i + 1}/${totalShows}] ${showData.title}`);
    } catch (error) {
      progress.failed++;
      progress.failedIds.push(entry.sys.id);
      console.log(
        `❌ [${i + 1}/${totalShows}] Failed: ${entry.sys.id} - ${error.message}`,
      );
    }

    progress.processedCount = i + 1;
  }

  saveProgress(progress);

  const isComplete = progress.processedCount >= totalShows;
  console.log(
    `\nBatch complete! Processed: ${progress.processedCount}/${totalShows}`,
  );
  console.log(
    `Total: ${progress.successful} successful, ${progress.failed} failed`,
  );

  if (isComplete) {
    console.log("🎉 Migration complete!");
    if (progress.failedIds.length > 0) {
      console.log(`Failed show IDs: ${progress.failedIds.join(", ")}`);
    }
    process.exit(0);
  } else {
    console.log("Run the script again to continue with the next batch.");
    process.exit(0);
  }
}

await migrateShows().catch(console.error);
