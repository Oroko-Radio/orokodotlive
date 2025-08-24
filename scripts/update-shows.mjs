import { getPayload } from "payload";
import config from "@payload-config";
import fs from "fs";

const BATCH_SIZE = 1000;
const PROGRESS_FILE = "./progress-shows-update.json";

function loadProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
    }
  } catch (error) {
    console.log("No progress file found, starting from beginning");
  }
  return { processedCount: 0, successful: 0, failed: 0, failedIds: [] };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

const migrateVersions = async () => {
  const payload = await getPayload({ config: config });
  const progress = loadProgress();

  // Get total count first
  const totalResult = await payload.find({
    collection: "shows",
    limit: 1,
    depth: 0,
  });
  const totalShows = totalResult.totalDocs;
  
  const startIndex = progress.processedCount;
  const endIndex = Math.min(startIndex + BATCH_SIZE, totalShows);

  console.log(`Processing shows ${startIndex + 1}-${endIndex} of ${totalShows}`);
  console.log(`Previous progress: ${progress.successful} successful, ${progress.failed} failed`);

  // Get current batch
  const docs = await payload.find({
    collection: "shows",
    limit: BATCH_SIZE,
    page: Math.floor(startIndex / BATCH_SIZE) + 1,
    depth: 0, // Only need id, title, and contentfulId
    select: {
      id: true,
      title: true,
      contentfulId: true,
    },
  });

  for (let i = 0; i < docs.docs.length; i++) {
    const doc = docs.docs[i];
    const globalIndex = startIndex + i + 1;
    
    console.log(`[${globalIndex}/${totalShows}] Updating show: ${doc.title} (ID: ${doc.id})`);
    
    try {
      await payload.update({
        collection: "shows",
        id: doc.id,
        data: {
          _status: "published",
        },
      });
      
      progress.successful++;
      console.log(`✅ Successfully updated: ${doc.title}`);
    } catch (error) {
      progress.failed++;
      if (doc.contentfulId) {
        progress.failedIds.push(doc.contentfulId);
      }
      console.error(`❌ Failed to update ${doc.title}:`, error.message);
    }

    progress.processedCount = startIndex + i + 1;
  }

  saveProgress(progress);

  const isComplete = progress.processedCount >= totalShows;
  console.log(`\nBatch complete! Processed: ${progress.processedCount}/${totalShows}`);
  console.log(`Total: ${progress.successful} successful, ${progress.failed} failed`);

  if (isComplete) {
    console.log("🎉 Migration complete!");
    if (progress.failedIds.length > 0) {
      console.log(`Failed show Contentful IDs: ${progress.failedIds.join(", ")}`);
    }
    process.exit(0);
  } else {
    console.log("Run the script again to continue with the next batch.");
    process.exit(0);
  }
};

migrateVersions().catch(console.error);