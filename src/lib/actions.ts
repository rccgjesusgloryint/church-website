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
