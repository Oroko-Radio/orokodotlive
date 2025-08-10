import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "../contentful-data/export.json" with { type: "json" };
import { toSlatejsDocument } from "@contentful/contentful-slatejs-adapter";
import slugify from "slugify";

const pageEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "page",
);

console.log(`Found ${pageEntries.length} page entries to migrate`);

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
    horizontalrule: "hr",
  };

  const processedNodes = [];

  for (const node of slateNodes) {
    const formattedNode = { ...node };

    if (node.type && typeMapping[node.type]) {
      formattedNode.type = typeMapping[node.type];
    }

    // Special handling for horizontal rules
    if (node.type === "horizontalrule") {
      formattedNode.type = "hr";
      formattedNode.children = [{ text: "" }]; // Ensure it has children
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
        } else {
          console.warn(`Media not found for contentfulId: ${contentfulAssetId}`);
        }
      }
    }

    // Handle links
    if (node.type === "hyperlink" && node.data?.uri) {
      formattedNode.url = node.data.uri;
      formattedNode.newTab = false;
      formattedNode.linkType = "custom";
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
  
  console.log(
    "Original Contentful rich text:",
    JSON.stringify(contentfulRichText, null, 2),
  );

  try {
    const slateDocument = toSlatejsDocument(contentfulRichText);
    console.log("Converted to Slate:", JSON.stringify(slateDocument, null, 2));

    const formattedDocument = await formatRichText(slateDocument.children, payload);
    console.log("Formatted document:", JSON.stringify(formattedDocument, null, 2));

    return {
      root: {
        type: "root",
        children: formattedDocument,
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
      },
    };
  } catch (error) {
    console.error("Error converting rich text:", error);
    console.log("Problematic rich text:", JSON.stringify(contentfulRichText, null, 2));
    return null;
  }
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
      convertedContent = await convertRichText(fields.content["en-US"], payload);
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