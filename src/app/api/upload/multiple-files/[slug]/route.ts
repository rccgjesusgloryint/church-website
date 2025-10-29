// app/api/r2/sign-put/route.ts
import { prisma } from "@/lib/db";
import { saveImage } from "@/lib/queries";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import {
  getSignedUrl,
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { comma } from "postcss/lib/list";
import { g } from "vitest/dist/chunks/suite.d.FvehnV49.js";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFARE_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFARE_SECRET_KEY!,
  },
});

const bucket = "images";

export async function GET(req: NextRequest) {}

// export async function POST(req: NextRequest) {
//   const res = await getSignedUrl(
//     S3,
//     new PutObjectCommand({ Bucket: "images", Key: 'Temp',Body: req.body }),
//     { expiresIn: 3600 }
//   );

//   return new Response(
//     JSON.stringify({ greet: "Congrats You uploaded your first File!" }),
//     {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     }
//   );
// }

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { headers } = req;

  const { slug } = await params;
  const type = headers.get("Content-Type");
  const filenameFromHeaders = headers.get("X-Filename");
  const filename = decodeURIComponent(filenameFromHeaders!);

  if (!type) {
    return new Response(JSON.stringify({ error: "Type is invalid!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  await S3.send(
    new PutObjectCommand({
      Bucket: "images",
      Key: filename,
      Body: Buffer.from(new Uint8Array(await req.arrayBuffer())),
      ContentType: type,
    })
  );
  const url = await getSignedUrl(
    S3,
    new GetObjectCommand({
      Bucket: "images",
      Key: filename,
    }),
    { expiresIn: undefined }
  );

  await saveImage({ type, filename, event: slug, bucket, url });

  // Browser won’t need special CORS when calling your same-origin API route
  return new Response(
    JSON.stringify({
      status: 200,
    })
  );
}
