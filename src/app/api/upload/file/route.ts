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
  const form = await req.formData();
  const file = form.get("file") as File | null;
  // const filename = form.get("filename") as string;

  if (!file) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }
  // if (!filename) {
  //   return NextResponse.json(
  //     { error: "filename is required" },
  //     { status: 400 }
  //   );
  // }

  const arrayBuf = Buffer.from(await file.arrayBuffer());

  await S3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: file.name,
      Body: arrayBuf,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  const url = `${process.env.CLOUDFARE_IMAGE_URL}/${file.name}`;

  await saveImage({
    type: file.type,
    filename: file.name,
    event: file.name,
    bucket: bucket!,
    url,
  });

  return new Response(
    JSON.stringify({
      status: 200,
      url: url,
    })
  );
}
