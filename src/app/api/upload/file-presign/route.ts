// app/api/upload/file/route.ts (or wherever your route lives)
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

// NOTE: your env vars are spelled "CLOUDFARE_*" here — keep as-is if that's how they're defined.
// If they’re actually "CLOUDFLARE_*", update both here and in your env.
const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFARE_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFARE_SECRET_KEY!,
  },
});

const bucket = process.env.R2_BUCKET!;

type Req = {
  name: string;
  type?: string;
  prefix?: string; // optional folder prefix (e.g., "events/my-event")
};

export async function POST(req: NextRequest) {
  try {
    const { name, type, prefix } = (await req.json()) as Req;

    if (!name) {
      return NextResponse.json(
        { error: "No file name provided" },
        { status: 400 }
      );
    }

    if (type && !type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image uploads are allowed" },
        { status: 400 }
      );
    }

    const nowPrefix = (prefix ?? new Date().toISOString().slice(0, 10)).replace(
      /\/+$/,
      ""
    ); // e.g. "2025-11-04"
    const safeName = encodeURIComponent(name);
    const key = `${nowPrefix}/${randomUUID()}-${safeName}`;

    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: type || "application/octet-stream",
      CacheControl: "public, max-age=31536000, immutable",
    });

    const uploadUrl = await getSignedUrl(S3, cmd, { expiresIn: 60 * 5 }); // 5 minutes
    const publicUrl = `${process.env.CLOUDFARE_IMAGE_URL}/${key}`;

    return NextResponse.json(
      {
        key,
        uploadUrl,
        publicUrl,
        contentType: type || "application/octet-stream",
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to presign R2 URL",
        details: err?.message ?? String(err),
      },
      { status: 500 }
    );
  }
}
