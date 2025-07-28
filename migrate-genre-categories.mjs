import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "./contentful-data/export.json" with { type: "json" };

const genreCategoryEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "genreCategory",
);

console.log(`Found ${genreCategoryEntries.length} genre category entries to migrate`);

async function migrateGenreCategories() {
  const payload = await getPayload({ config: config });

  for (let i = 1; i <= genreCategoryEntries.length; i++) {
    const entry = genreCategoryEntries[i];
    if (!entry || !entry.fields) {
      console.log(`❌ Entry ${i} is missing or has no fields`);
      continue;
    }
    const fields = entry.fields;

    try {
      const genreCategoryData = {
        name: fields.name?.["en-US"],
        contentfulId: entry.sys.id,
      };

      await payload.create({
        collection: "genreCategory",
        data: genreCategoryData,
      });

      console.log(`✅ Migrated: ${genreCategoryData.name}`);
    } catch (error) {
      console.log(`❌ Failed: ${entry.sys.id} - ${error.message}`);
    }
  }

  process.exit(0);
}

await migrateGenreCategories().catch(console.error);