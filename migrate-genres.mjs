import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "./contentful-data/export.json" with { type: "json" };

const genreEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "genres",
);

console.log(`Found ${genreEntries.length} genre entries to migrate`);

async function migrateGenres() {
  const payload = await getPayload({ config: config });

  for (let i = 1; i < genreEntries.length; i++) {
    const entry = genreEntries[i];
    if (!entry || !entry.fields) {
      console.log(`❌ Entry ${i} is missing or has no fields`);
      continue;
    }
    const fields = entry.fields;

    try {
      // Handle genre category relationships
      let genreCategoryIds = [];
      if (fields.genreCategory?.["en-US"]) {
        const genreCategoryRefs = Array.isArray(fields.genreCategory["en-US"])
          ? fields.genreCategory["en-US"]
          : [fields.genreCategory["en-US"]];

        for (const ref of genreCategoryRefs) {
          if (ref?.sys?.id) {
            // Find the corresponding genre category in Payload by contentfulId
            const genreCategory = await payload.find({
              collection: "genreCategory",
              where: {
                contentfulId: { equals: ref.sys.id },
              },
            });

            if (genreCategory.docs.length > 0) {
              genreCategoryIds.push(genreCategory.docs[0].id);
            }
          }
        }
      }

      const genreData = {
        name: fields.name?.["en-US"],
        genreCategory: genreCategoryIds,
        contentfulId: entry.sys.id,
      };

      await payload.create({
        collection: "genres",
        data: genreData,
      });

      console.log(`✅ Migrated: ${genreData.name}`);
    } catch (error) {
      console.log(`❌ Failed: ${entry.sys.id} - ${error.message}`);
    }
  }

  process.exit(0);
}

await migrateGenres().catch(console.error);
