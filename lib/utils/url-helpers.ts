/**
 * Utilities for encoding/decoding category and genre names for URLs
 * Converts spaces to underscores and makes lowercase for URL safety
 */

export function encodeNameForUrl(name: string): string {
  // Convert to lowercase, replace spaces with underscores, then URL encode
  return encodeURIComponent(name.toLowerCase().replace(/\s+/g, '_'));
}

export function decodeNameFromUrl(urlName: string): string {
  // First decode any URL encoding (like %2F -> /)
  const urlDecoded = decodeURIComponent(urlName);
  // Then convert underscores to spaces
  return urlDecoded.replace(/_/g, ' ');
}

/**
 * Compare a URL parameter with a database name (case-insensitive)
 */
export function namesMatch(urlParam: string, dbName: string): boolean {
  const decodedParam = decodeNameFromUrl(urlParam);
  return decodedParam.toLowerCase() === dbName.toLowerCase();
}