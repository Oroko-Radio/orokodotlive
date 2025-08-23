/**
 * Utilities for encoding/decoding category and genre names for URLs
 * Converts spaces to underscores and makes lowercase for URL safety
 */

export function encodeNameForUrl(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '_');
}

export function decodeNameFromUrl(urlName: string): string {
  return urlName.replace(/_/g, ' ');
}

/**
 * Compare a URL parameter with a database name (case-insensitive)
 */
export function namesMatch(urlParam: string, dbName: string): boolean {
  const decodedParam = decodeNameFromUrl(urlParam);
  return decodedParam.toLowerCase() === dbName.toLowerCase();
}