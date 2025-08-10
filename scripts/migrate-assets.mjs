import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "../contentful-data/export.json";
import fs from "fs";
import path from "path";
import { makeS3SafeFilename, convertTiffToJpeg } from "./utils.js";

const BATCH_SIZE = 5000;
const PROGRESS_FILE = "./progress.json";

const CDN_MAPPING = {
  "image/jpeg": "images.ctfassets.net",
  "image/png": "images.ctfassets.net",
  "image/gif": "images.ctfassets.net",
  "image/webp": "images.ctfassets.net",
  "image/svg+xml": "images.ctfassets.net",
  "image/tiff": "images.ctfassets.net",
  "video/mp4": "videos.ctfassets.net",
  "application/pdf": "downloads.ctfassets.net",
  default: "assets.ctfassets.net",
};

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

function getAssetBuffer(asset) {
  const assetId = asset.sys.id;
  const fileData = asset.fields.file?.["en-US"];

  if (!fileData) return null;

  const { contentType, fileName } = fileData;

  // Try the expected CDN folder first
  const expectedCdnFolder = CDN_MAPPING[contentType] || CDN_MAPPING.default;
  const cdnFoldersToTry = [
    expectedCdnFolder,
    "images.ctfassets.net",
    "assets.ctfassets.net",
    "downloads.ctfassets.net",
    "videos.ctfassets.net",
  ];

  // Remove duplicates
  const uniqueFolders = [...new Set(cdnFoldersToTry)];

  for (const cdnFolder of uniqueFolders) {
    const assetDir = `./contentful-data/${cdnFolder}/snuaa94o04yj/${assetId}`;

    try {
      if (!fs.existsSync(assetDir)) continue;

      const subdirs = fs.readdirSync(assetDir);
      if (subdirs.length === 0) continue;

      const hashDir = path.join(assetDir, subdirs[0]);
      const files = fs.readdirSync(hashDir);
      if (files.length === 0) continue;

      const filePath = path.join(hashDir, files[0]);
      const buffer = fs.readFileSync(filePath);

      return {
        id: assetId,
        fileName,
        contentType,
        buffer,
        size: buffer.length,
      };
    } catch (error) {
      continue;
    }
  }

  return null;
}

async function migrateAssets() {
  const payload = await getPayload({ config: config });
  const progress = loadProgress();

  const totalAssets = exportData.assets.length;
  const startIndex = progress.processedCount;
  const endIndex = Math.min(startIndex + BATCH_SIZE, totalAssets);

  console.log(
    `Processing assets ${startIndex + 1}-${endIndex} of ${totalAssets}`,
  );
  console.log(
    `Previous progress: ${progress.successful} successful, ${progress.failed} failed`,
  );

  for (let i = startIndex; i < endIndex; i++) {
    const asset = exportData.assets[i];
    const assetData = getAssetBuffer(asset);

    if (assetData) {
      try {
        let fileBuffer = assetData.buffer;
        let contentType = assetData.contentType;

        // Convert TIFF to JPEG
        if (assetData.contentType === "image/tiff") {
          fileBuffer = await convertTiffToJpeg(assetData.buffer);
          contentType = "image/jpeg";
        }

        await payload.create({
          collection: "media",
          file: {
            data: fileBuffer,
            name: makeS3SafeFilename(assetData.fileName),
            size: fileBuffer.length,
            mimetype: contentType,
          },
          data: {
            title: makeS3SafeFilename(assetData.fileName),
            contentfulId: asset.sys.id,
          },
        });

        progress.successful++;
        console.log(`✅ [${i + 1}/${totalAssets}] ${assetData.fileName}`);
      } catch (error) {
        progress.failed++;
        progress.failedIds.push(asset.sys.id);
        console.log(
          `❌ [${i + 1}/${totalAssets}] Upload failed: ${asset.sys.id} - ${error.message}`,
        );
      }
    } else {
      progress.failed++;
      progress.failedIds.push(asset.sys.id);
      console.log(
        `❌ [${i + 1}/${totalAssets}] File not found: ${asset.sys.id}`,
      );
    }

    progress.processedCount = i + 1;
  }

  saveProgress(progress);

  const isComplete = progress.processedCount >= totalAssets;
  console.log(
    `\nBatch complete! Processed: ${progress.processedCount}/${totalAssets}`,
  );
  console.log(
    `Total: ${progress.successful} successful, ${progress.failed} failed`,
  );

  if (isComplete) {
    console.log("🎉 Migration complete!");
    if (progress.failedIds.length > 0) {
      console.log(`Failed asset IDs: ${progress.failedIds.join(", ")}`);
    }
  } else {
    console.log("Run the script again to continue with the next batch.");
  }
}

await migrateAssets().catch(console.error);
