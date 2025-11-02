import { saveEventImages, saveImage } from "@/lib/queries";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { NextRequest, NextResponse } from "next/server";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFARE_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFARE_SECRET_KEY!,
  },
});

const bucket = process.env.R2_BUCKET!;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const event = formData.get("event") as string;
    const date = formData.get("date") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const uploadedUrls = [] as string[];

    // upload all files sequentially (simpler debugging)
    for (const file of files) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await S3.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: file.name,
            Body: buffer,
            ContentType: file.type,
            CacheControl: "public, max-age=31536000, immutable",
          })
        );

        const url = `${process.env.CLOUDFARE_IMAGE_URL}/${file.name}`;
        uploadedUrls.push(url);
      } catch (err) {
        console.error("R2 upload error:", err);
        return NextResponse.json(
          {
            error: `Failed to upload "${file.name}" to R2.`,
            details: err instanceof Error ? err.message : err,
          },
          { status: 500 }
        );
      }
    }

    // if uploads worked, save to DB
    try {
      await saveEventImages({
        event,
        date: new Date(date),
        description,
        location,
        images: uploadedUrls,
      });

      return NextResponse.json(
        { message: "Event and images saved successfully!" },
        { status: 200 }
      );
    } catch (err) {
      console.error("DB error:", err);
      return NextResponse.json(
        {
          error: "Failed to save event data to the database.",
          details: err instanceof Error ? err.message : err,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        error: "Unexpected error while processing upload.",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
