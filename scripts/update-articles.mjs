import { getPayload } from "payload";
import config from "@payload-config";

const migrateVersions = async () => {
  const payload = await getPayload({ config: config });

  const docs = await payload.find({
    collection: "articles",
    limit: 0, // 0 means no limit - get all docs
  });

  console.log(`Found ${docs.docs.length} articles to update`);

  for (const doc of docs.docs) {
    try {
      await payload.update({
        collection: "articles",
        id: doc.id,
        data: {
          _status: "published",
        },
      });
    } catch (error) {
      console.error(`❌ Failed to update article ${doc.title}:`, error.message);
    }
  }

  console.log(`Migration done. Processed ${docs.docs.length} articles.`);
};

migrateVersions();