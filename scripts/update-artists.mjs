import { getPayload } from "payload";
import config from "@payload-config";

const migrateVersions = async () => {
  const payload = await getPayload({ config: config });

  const limit = 1;
  let page = 1;

  while (true) {
    const docs = await payload.find({
      collection: "artist-profiles",
      limit,
      page,
    });

    if (!docs.docs.length) break;

    for (const doc of docs.docs) {
      console.log(`Updating artist: ${doc.name} (ID: ${doc.id})`);
      
      try {
        await payload.update({
          collection: "artist-profiles",
          id: doc.id,
          data: {
            _status: "published",
          },
        });
        console.log(`✅ Successfully updated: ${doc.name}`);
      } catch (error) {
        console.error(`❌ Failed to update ${doc.name}:`, error.message);
      }
    }

    page++;
  }

  console.log("Migration done.");
};

migrateVersions();
