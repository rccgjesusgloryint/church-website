import { prisma } from "@/lib/db";
import { YOUTUBE_playlistItem } from "@/lib/types";

type SermonDetailsType = {
  videoTitle: string;
  videoUrl: string;
};

// app/api/youtube/route.ts
import { NextResponse } from "next/server";

const getRequest = async (params: string, key: string, part: string) => {
  const fullYoutubeUrl = `${process.env.NEXT_PUBLIC_YOUTUBE_API_BASE_URL}/${params}&part=${part}&key=${key}`;
  const response = await fetch(fullYoutubeUrl);
  return response;
};

export async function GET() {
  try {
    const res = await getRequest(
      // test Youtube channelId : UCiGVX87jKIHRuQid_SC3ZQg
      // church Youtube channelId : UCYeJhXbX98xvE1uHU5T9dXA
      "search?channelId=UCYeJhXbX98xvE1uHU5T9dXA&type=video&eventType=live",
      process.env.YOUTUBE_API_KEY as string,
      "snippet"
    );

    const data = await res.json();

    const isLive = data?.items?.length > 0;
    console.log("isLive: ", data.data);

    return NextResponse.json({ isLive, data }); // 👈 clean and consistent key
  } catch (err) {
    console.error("YT live check failed:", err);
    return NextResponse.json({ isLive: false });
  }
}
