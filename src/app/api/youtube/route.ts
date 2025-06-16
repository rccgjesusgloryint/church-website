import { prisma } from "@/lib/db";
import { YOUTUBE_playlistItem } from "@/lib/types";

type SermonDetailsType = {
  videoTitle: string;
  videoUrl: string;
};

export async function GET(req: Request) {
  try {
    let playlistId;
    let sermonsToStoreFromYT = [] as any;
    let streaming = false as boolean;

    // Get Channel by Handle
    await getRequest(
      "channels?forHandle=@rccgjesusgloryinternationa5350",
      process.env.YOUTUBE_API_KEY as string,
      "contentDetails"
    )
      .then(async (data) => {
        let dataJson = await data.json();
        playlistId = dataJson.items[0].contentDetails.relatedPlaylists
          .uploads as string;
      })
      .catch((err) => console.log("🔴🔴🔴🔴WHOOPS!!!: ", err));

    if (!playlistId)
      return new Response(
        JSON.stringify({
          message: "🔴🔴 Didnt get PLAYLISTID from CHANNEL DATA!! 🔴🔴",
        }),
        {
          status: 505,
        }
      );

    // Get List of Videos via playlistId from channelDetails
    await getRequest(
      `playlistItems?playlistId=${playlistId}&maxResults=50`,
      process.env.YOUTUBE_API_KEY as string,
      "contentDetails,id,snippet"
    )
      .then(async (data) => {
        // TO DO : Make this recursive to get videos from other pages of this result
        let dataJson = await data.json();

        let snippetsArray = dataJson.items as YOUTUBE_playlistItem[];

        const sermonsInDb = await prisma.sermon.findMany({});
        const sermonTitles = new Set();
        sermonsInDb.forEach((sermon) => {
          sermonTitles.add(sermon.sermonTitle);
        });

        snippetsArray.forEach(({ snippet }) => {
          //FIRST CHECK IF THE SERMON EXISTS IN DB
          if (
            snippet.title.includes("Study") ||
            snippet.title.includes("Sermon")
          ) {
            if (!sermonTitles.has(snippet.title)) {
              // Youtube Vid URL format:
              // sermon db requirements : videoTitle, videoUrl
              let vidId = snippet.resourceId.videoId;
              let sermonDetails = {
                videoTitle: snippet.title,
                videoUrl: `https://www.youtube.com/watch?v=${vidId}`,
              };
              sermonsToStoreFromYT.push(sermonDetails);
            }
          }
        });
      })
      .catch((err) => console.log("🔴🔴🔴🔴WHOOPS!!!: ", err));

    // Attempt to add new sermons found in the channel to the db

    sermonsToStoreFromYT.forEach(
      async ({ videoTitle, videoUrl }: SermonDetailsType) => {
        await prisma.sermon.create({
          data: {
            sermonTitle: videoTitle,
            videoUrl,
          },
        });
      }
    );

    //get channels video[liveStream] details
    await getRequest(
      "search?channelId=UCYeJhXbX98xvE1uHU5T9dXA&type=video&eventType=live",
      process.env.YOUTUBE_API_KEY as string,
      "snippet"
    )
      .then(async (data) => {
        let dataJson = await data.json();
        if (dataJson.items.length < 1) {
          streaming = false;
          return;
        }
        streaming = true;
      })
      .catch((err) =>
        console.log("❌❌❌❌WHOOPS SOMETHING WENT WRONG❌❌❌❌: ", err)
      );

    return new Response(
      JSON.stringify({
        message: "SUCCESS YOUTUBE API CALLS!",
        isLivstreaming: streaming,
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
  let fullYoutubeUrl = `${process.env.NEXT_PUBLIC_YOUTUBE_API_BASE_URL}/${params}&part=${part}&key=${key}`;
  const response = await fetch(fullYoutubeUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
