import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "../contentful-data/export.json" with { type: "json" };

const productEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "product",
);

console.log(`Found ${productEntries.length} product entries to migrate`);

async function run() {
  const payload = await getPayload({ config });

  console.log("Starting product migration...");

  for (const productEntry of productEntries) {
    const { sys, fields } = productEntry;
    const contentfulId = sys.id;

    console.log(`\n--- Migrating product: ${fields.title?.["en-US"]} ---`);

    // Check if product already exists
    const existingProducts = await payload.find({
      collection: "products",
      where: {
        contentfulId: {
          equals: contentfulId,
        },
      },
      limit: 1,
    });

    if (existingProducts.docs.length > 0) {
      console.log(`Product already exists, skipping: ${fields.title?.["en-US"]}`);
      continue;
    }

    // Find the related media/image
    let imageId = null;
    if (fields.image && fields.image["en-US"]?.sys?.id) {
      const assetId = fields.image["en-US"].sys.id;
      console.log(`Looking for image with contentfulId: ${assetId}`);
      
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
        imageId = existingMedia.docs[0].id;
        console.log(`Found image: ${existingMedia.docs[0].title || existingMedia.docs[0].filename}`);
      } else {
        console.warn(`Image not found for contentfulId: ${assetId}`);
      }
    }

    // Create the product
    try {
      const productData = {
        title: fields.title?.["en-US"],
        price: fields.price?.["en-US"],
        link: fields.link?.["en-US"],
        image: imageId,
        contentfulId: contentfulId,
      };

      console.log(`Creating product with data:`, productData);

      const result = await payload.create({
        collection: "products",
        data: productData,
      });

      console.log(`✅ Created product: ${result.title} (ID: ${result.id})`);
    } catch (error) {
      console.error(`❌ Error creating product ${fields.title?.["en-US"]}:`, error.message);
    }
  }

  console.log("\n🎉 Product migration completed!");
}

run().catch(console.error);