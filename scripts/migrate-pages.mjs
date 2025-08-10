import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "../contentful-data/export.json" with { type: "json" };
import { toSlatejsDocument } from "@contentful/contentful-slatejs-adapter";
import slugify from "slugify";

const pageEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "page",
);

console.log(`Found ${pageEntries.length} page entries to migrate`);

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

function generateSlug(title) {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
}

async function run() {
  const payload = await getPayload({ config });

  console.log("Starting page migration...");

  for (const pageEntry of pageEntries) {
    const { sys, fields } = pageEntry;
    const contentfulId = sys.id;

    console.log(`\n--- Migrating page: ${fields.title?.["en-US"]} ---`);

    // Check if page already exists
    const existingPages = await payload.find({
      collection: "pages",
      where: {
        contentfulId: {
          equals: contentfulId,
        },
      },
      limit: 1,
    });

    if (existingPages.docs.length > 0) {
      console.log(`Page already exists, skipping: ${fields.title?.["en-US"]}`);
      continue;
    }

    // Generate slug from title
    const title = fields.title?.["en-US"];
    const slug = generateSlug(title || "untitled-page");

    // Find the related cover image
    let coverImageId = null;
    if (fields.coverImage && fields.coverImage["en-US"]?.sys?.id) {
      const assetId = fields.coverImage["en-US"].sys.id;
      console.log(`Looking for cover image with contentfulId: ${assetId}`);
      
      const existingMedia = await payload.find({
        collection: "media",
        where: {
          contentfulId: {
            equals: assetId,
          },
        },
        limit: 1,
      });

      if (existingMedia.docs.length > 0) {
        coverImageId = existingMedia.docs[0].id;
        console.log(`Found cover image: ${existingMedia.docs[0].title || existingMedia.docs[0].filename}`);
      } else {
        console.warn(`Cover image not found for contentfulId: ${assetId}`);
      }
    }

    // Convert rich text content
    let convertedContent = null;
    if (fields.content && fields.content["en-US"]) {
      console.log("Converting rich text content...");
      convertedContent = convertRichText(fields.content["en-US"]);
    }

    // Create the page
    try {
      const pageData = {
        title: title,
        slug: slug,
        subtitle: fields.subtitle?.["en-US"],
        coverImage: coverImageId,
        content: convertedContent,
        contentfulId: contentfulId,
      };

      console.log(`Creating page with data:`, {
        ...pageData,
        content: convertedContent ? "[Rich Text Content]" : null,
      });

      const result = await payload.create({
        collection: "pages",
        data: pageData,
      });

      console.log(`✅ Created page: ${result.title} (ID: ${result.id}) with slug: ${result.slug}`);
    } catch (error) {
      console.error(`❌ Error creating page ${title}:`, error.message);
      if (error.data) {
        console.error("Error details:", JSON.stringify(error.data, null, 2));
      }
    }
  }

  console.log("\n🎉 Page migration completed!");
}

run().catch(console.error);