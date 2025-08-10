// scripts/regenerate-images.js
import payload from "payload";

const regenerateImages = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
  });

  const batchSize = 10; // Process 10 at a time to avoid overwhelming S3
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const media = await payload.find({
      collection: "media",
      limit: batchSize,
      page: page,
    });

    console.log(`Processing batch ${page}: ${media.docs.length} images`);

    for (const doc of media.docs) {
      try {
        // Force regeneration by updating the document
        await payload.update({
          collection: "media",
          id: doc.id,
          data: {
            alt: doc.alt || "", // Minimal update to trigger regeneration
          },
        });
        console.log(`✓ Regenerated: ${doc.filename}`);

        // Small delay to be nice to S3
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`✗ Error processing ${doc.filename}:`, error.message);
      }
    }

    hasMore = media.hasNextPage;
    page++;

    // Longer pause between batches
    if (hasMore) {
      console.log("Pausing between batches...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.log("🎉 Image regeneration complete!");
};

regenerateImages().catch(console.error);
