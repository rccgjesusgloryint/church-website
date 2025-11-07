import {
  createSermon,
  getAllSermons,
  getAllSermonsInServer,
} from "@/lib/queries";
import { YOUTUBE_playlistItem } from "@/lib/types";

type SermonDetailsType = {
  videoTitle: string;
  videoUrl: string;
  thumbnail: string;
};

export async function GET(req: Request) {
  try {
    let playlistId;
    const sermonsToStoreFromYT: SermonDetailsType[] = []; // ✏️ typed the array
    let streaming = false as boolean;

    // Get Channel by Handle
    // 🔁 use await instead of await + .then(), and handle errors with try/catch around the block
    try {
      const data = await getRequest(
        "channels?forHandle=@rccgjesusgloryinternationa5350",
        process.env.YOUTUBE_API_KEY as string,
        "contentDetails"
      );
      const dataJson = await data.json();
      playlistId = dataJson?.items?.[0]?.contentDetails?.relatedPlaylists
        ?.uploads as string | undefined;
    } catch (err) {
      console.log("🔴🔴🔴🔴WHOOPS!!! (channels): ", err);
    }

    if (!playlistId)
      return new Response(
        JSON.stringify({
          message: "🔴🔴 Didnt get PLAYLISTID from CHANNEL DATA!! 🔴🔴",
        }),
        {
          status: 502, // ✏️ 505 -> 502 (bad gateway) is more accurate here
        }
      );

    // Get List of Videos via playlistId from channelDetails
    try {
      const data = await getRequest(
        `playlistItems?playlistId=${playlistId}&maxResults=50`,
        process.env.YOUTUBE_API_KEY as string,
        "contentDetails,id,snippet"
      );

      const dataJson = await data.json();

      const snippetsArray = (dataJson?.items ?? []) as YOUTUBE_playlistItem[];

      const sermonsInDb = await getAllSermonsInServer();
      const sermonTitles = new Set<string>();
      sermonsInDb.forEach((sermon) => {
        sermonTitles.add(sermon.sermonTitle);
      });

      // ✏️ guard against missing snippet/private/deleted videos, build safe thumbnail fallback
      snippetsArray.forEach(({ snippet }) => {
        if (!snippet) return;

        const title = snippet.title ?? "";
        if (!(title.includes("Study") || title.includes("Sermon"))) return;

        if (sermonTitles.has(title)) return;

        const vidId = snippet.resourceId?.videoId;
        if (!vidId) return;

        const t = snippet.thumbnails ?? ({} as any);
        const thumbUrl =
          t.maxres?.url ??
          t.standard?.url ??
          t.high?.url ??
          t.medium?.url ??
          t.default?.url ??
          "";

        const sermonDetails: SermonDetailsType = {
          videoTitle: title,
          videoUrl: `https://www.youtube.com/watch?v=${vidId}`,
          thumbnail: thumbUrl,
        };
        sermonsToStoreFromYT.push(sermonDetails);
      });
    } catch (err) {
      console.log("🔴🔴🔴🔴WHOOPS!!! (playlistItems): ", err);
    }

    // Attempt to add new sermons found in the channel to the db
    // ✏️ avoid async forEach (unawaited). Collect promises and await them.
    await Promise.all(
      sermonsToStoreFromYT.map(({ videoTitle, videoUrl, thumbnail }) =>
        createSermon({
          sermonTitle: videoTitle,
          videoUrl,
          thumbnail,
        })
      )
    );

    console.log("SUCCESS YOUTUBE API CALLS! streaming:", streaming);
    return new Response(
      JSON.stringify({
        message: "SUCCESS YOUTUBE API CALLS!",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Youtube API Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

const getRequest = async (params: string, key: string, part: string) => {
  // ⚠️ NOTE: consider using a server-only base URL var (not NEXT_PUBLIC_) in the future
  const fullYoutubeUrl = `${process.env.YOUTUBE_API_BASE_URL}/${params}&part=${part}&key=${key}`;
  const response = await fetch(fullYoutubeUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // optional if you want to ensure fresh data
  });

  return response;
};
