// scripts/regenerate-images.js
import payload from "payload";

const regenerateImages = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
  });

  const media = await payload.find({
    collection: "media",
    limit: 0,
  });

  console.log(`Processing ${media.totalDocs} images...`);

  for (const doc of media.docs) {
    try {
      // This will trigger regeneration of all image sizes
      await payload.update({
        collection: "media",
        id: doc.id,
        data: {
          // Trigger a minimal update to regenerate sizes
          alt: doc.alt || "",
        },
      });
      console.log(`✓ Processed: ${doc.filename}`);
    } catch (error) {
      console.error(`✗ Error processing ${doc.filename}:`, error);
    }
  }
};

regenerateImages();
