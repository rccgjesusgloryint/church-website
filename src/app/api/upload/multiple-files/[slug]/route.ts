// app/api/r2/sign-put/route.ts
import { prisma } from "@/lib/db";
import { saveImage } from "@/lib/queries";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

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
