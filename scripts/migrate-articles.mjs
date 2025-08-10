import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "../contentful-data/export.json" with { type: "json" };
import { toSlatejsDocument } from "@contentful/contentful-slatejs-adapter";

const articleEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "article",
);

console.log(`Found ${articleEntries.length} article entries to migrate`);

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

async function run() {
  const payload = await getPayload({ config });

  console.log("Starting article migration...");

  for (const articleEntry of articleEntries) {
    const { sys, fields } = articleEntry;
    const contentfulId = sys.id;

    console.log(`\n--- Migrating article: ${fields.title?.["en-US"]} ---`);

    // Check if article already exists
    const existingArticles = await payload.find({
      collection: "articles",
      where: {
        contentfulId: {
          equals: contentfulId,
        },
      },
      limit: 1,
    });

    if (existingArticles.docs.length > 0) {
      console.log(`Article already exists, skipping: ${fields.title?.["en-US"]}`);
      continue;
    }

    // Find the related city
    let cityId = null;
    if (fields.city && fields.city["en-US"]?.sys?.id) {
      const cityContentfulId = fields.city["en-US"].sys.id;
      console.log(`Looking for city with contentfulId: ${cityContentfulId}`);
      
      const existingCity = await payload.find({
        collection: "city",
        where: {
          contentfulId: {
            equals: cityContentfulId,
          },
        },
        limit: 1,
      });

      if (existingCity.docs.length > 0) {
        cityId = existingCity.docs[0].id;
        console.log(`Found city: ${existingCity.docs[0].name}`);
      } else {
        console.warn(`City not found for contentfulId: ${cityContentfulId}`);
      }
    }

    // Find the related author
    let authorId = null;
    if (fields.author && fields.author["en-US"]?.sys?.id) {
      const authorContentfulId = fields.author["en-US"].sys.id;
      console.log(`Looking for author with contentfulId: ${authorContentfulId}`);
      
      const existingAuthor = await payload.find({
        collection: "author",
        where: {
          contentfulId: {
            equals: authorContentfulId,
          },
        },
        limit: 1,
      });

      if (existingAuthor.docs.length > 0) {
        authorId = existingAuthor.docs[0].id;
        console.log(`Found author: ${existingAuthor.docs[0].name}`);
      } else {
        console.warn(`Author not found for contentfulId: ${authorContentfulId}`);
      }
    }

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

    // Create the article
    try {
      const articleData = {
        title: fields.title?.["en-US"],
        slug: fields.slug?.["en-US"],
        articleType: fields.articleType?.["en-US"] || "News",
        date: fields.date?.["en-US"],
        subtitle: fields.subtitle?.["en-US"],
        coverImage: coverImageId,
        content: convertedContent,
        city: cityId,
        isFeatured: fields.isFeatured?.["en-US"] || false,
        author: authorId,
        contentfulId: contentfulId,
      };

      console.log(`Creating article with data:`, {
        ...articleData,
        content: convertedContent ? "[Rich Text Content]" : null,
      });

      const result = await payload.create({
        collection: "articles",
        data: articleData,
      });

      console.log(`✅ Created article: ${result.title} (ID: ${result.id}) with slug: ${result.slug}`);
    } catch (error) {
      console.error(`❌ Error creating article ${fields.title?.["en-US"]}:`, error.message);
      if (error.data) {
        console.error("Error details:", JSON.stringify(error.data, null, 2));
      }
    }
  }

  console.log("\n🎉 Article migration completed!");
}

run().catch(console.error);