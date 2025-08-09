import sharp from "sharp";
import slugify from "slugify";

export function makeS3SafeFilename(fileName) {
  const baseName = fileName.replace(/\.[^.]+$/, ""); // Remove extension
  const ext = fileName.split(".").pop();
  return `${slugify(baseName, { lower: true, strict: true })}.${ext}`;
}

export async function convertTiffToJpeg(buffer) {
  return await sharp(buffer).jpeg().toBuffer();
}