import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "../contentful-data/export.json" with { type: "json" };

const cityEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "city",
);

console.log(`Found ${cityEntries.length} city entries to migrate`);

async function migrateCities() {
  const payload = await getPayload({ config: config });

  for (let i = 1; i <= cityEntries.length; i++) {
    const entry = cityEntries[i];
    if (!entry || !entry.fields) {
      console.log(`❌ Entry ${i} is missing or has no fields`);
      continue;
    }
    const fields = entry.fields;

    try {
      const cityData = {
        name: fields.name?.["en-US"],
        contentfulId: entry.sys.id,
      };

      await payload.create({
        collection: "city",
        data: cityData,
      });

      console.log(`✅ Migrated: ${cityData.name}`);
    } catch (error) {
      console.log(`❌ Failed: ${entry.sys.id} - ${error.message}`);
    }
  }

  process.exit(0);
}

await migrateCities().catch(console.error);
