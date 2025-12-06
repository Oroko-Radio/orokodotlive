import { getPayload } from "payload";
import config from "@payload-config";

const migrateVersions = async () => {
  const payload = await getPayload({ config: config });

  const docs = await payload.find({
    collection: "artist-profiles",
    limit: 0, // 0 means no limit - get all docs
  });

  console.log(`Found ${docs.docs.length} artists to update`);

  for (let i = 0; i < docs.docs.length; i++) {
    const doc = docs.docs[i];
    console.log(`[${i + 1}/${docs.docs.length}] Updating artist: ${doc.name} (ID: ${doc.id})`);
    
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

  console.log(`Migration done. Processed ${docs.docs.length} artists.`);
};

migrateVersions();
