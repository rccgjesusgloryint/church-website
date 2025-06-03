export function getYoutubeVidId(youtubeUrl: string) {
  // Define regex patterns to extract the video ID
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^&]+)/,
    /youtu\.be\/([^?&]+)/,
  ];

  let videoId = null;
  for (const pattern of patterns) {
    const match = youtubeUrl.match(pattern);
    if (match) {
      videoId = match[1];
      break;
    }
  }

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  return videoId as string;
}

export function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

export function getLastSundayOfTheMonth(
  year: number,
  month: number
): [string, string] {
  if (month < 0 || month > 11) {
    throw new Error("Month must be between 0 (January) and 11 (December).");
  }

  const lastDay = new Date(year, month + 1, 0); // last day of the month
  const dayOfWeek = lastDay.getDay(); // 0 = Sunday
  const lastSundayDate = lastDay.getDate() - dayOfWeek;

  const monthAbbr = lastDay.toLocaleString("default", { month: "short" }); // e.g., "Sep"
  return [monthAbbr, String(lastSundayDate)];
}
