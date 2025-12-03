/**
 * Utility functions for parsing YouTube timestamp URLs
 */

/**
 * Extracts timestamp in seconds from a YouTube URL
 * Supports formats:
 * - t=123s
 * - t=123
 * - t=2m15s
 * - t=1h2m15s
 *
 * @param url - YouTube URL string
 * @returns number of seconds, or null if no timestamp found
 */
export function extractTimestampFromUrl(url: string): number | null {
  try {
    const urlObj = new URL(url);
    const timeParam = urlObj.searchParams.get("t");

    if (!timeParam) return null;

    return parseTimestamp(timeParam);
  } catch (error) {
    console.error("Error parsing timestamp URL:", error);
    return null;
  }
}

/**
 * Parses a timestamp string and converts to seconds
 * Supports formats: 123s, 123, 2m15s, 1h2m15s
 *
 * @param timestamp - Timestamp string (e.g., "2m15s", "123", "1h30m45s")
 * @returns number of seconds
 */
export function parseTimestamp(timestamp: string): number {
  // Remove any whitespace
  timestamp = timestamp.trim();

  // Check for hours, minutes, seconds format (e.g., "1h2m15s")
  const hmsMatch = timestamp.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?/);
  if (hmsMatch) {
    const hours = parseInt(hmsMatch[1] || "0", 10);
    const minutes = parseInt(hmsMatch[2] || "0", 10);
    const seconds = parseInt(hmsMatch[3] || "0", 10);
    return hours * 3600 + minutes * 60 + seconds;
  }

  // Fallback: try to parse as plain number
  const plainNumber = parseInt(timestamp, 10);
  if (!isNaN(plainNumber)) {
    return plainNumber;
  }

  return 0;
}

/**
 * Checks if a URL is a YouTube URL
 *
 * @param url - URL string to check
 * @returns true if URL is a YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    return hostname.includes("youtube.com") || hostname.includes("youtu.be");
  } catch {
    return false;
  }
}

/**
 * Formats seconds into MM:SS or HH:MM:SS format
 *
 * @param seconds - Number of seconds
 * @returns Formatted timestamp string
 */
export function formatTimestamp(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}
