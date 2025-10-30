import { saveImage } from "@/lib/queries";
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
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];
  const event = formData.get("event") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;

  files.map(async (file) => {
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

    await saveImage({
      type: file.type,
      filename: file.name,
      event,
      bucket: bucket!,
      url,
      description,
      createdAt: new Date(date),
    });
  });

  return new Response(
    JSON.stringify({
      status: 200,
    })
  );
}
