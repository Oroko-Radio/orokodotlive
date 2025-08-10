import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "../contentful-data/export.json" with { type: "json" };

const authorEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "author",
);

console.log(`Found ${authorEntries.length} author entries to migrate`);

async function run() {
  const payload = await getPayload({ config });

  console.log("Starting author migration...");

  for (const authorEntry of authorEntries) {
    const { sys, fields } = authorEntry;
    const contentfulId = sys.id;

    console.log(`\n--- Migrating author: ${fields.name?.["en-US"]} ---`);

    // Check if author already exists
    const existingAuthors = await payload.find({
      collection: "author",
      where: {
        contentfulId: {
          equals: contentfulId,
        },
      },
      limit: 1,
    });

    if (existingAuthors.docs.length > 0) {
      console.log(`Author already exists, skipping: ${fields.name?.["en-US"]}`);
      continue;
    }

    // Create the author
    try {
      const authorData = {
        name: fields.name?.["en-US"],
        contentfulId: contentfulId,
      };

      console.log(`Creating author with data:`, authorData);

      const result = await payload.create({
        collection: "author",
        data: authorData,
      });

      console.log(`✅ Created author: ${result.name} (ID: ${result.id})`);
    } catch (error) {
      console.error(`❌ Error creating author ${fields.name?.["en-US"]}:`, error.message);
    }
  }

  console.log("\n🎉 Author migration completed!");
}

run().catch(console.error);