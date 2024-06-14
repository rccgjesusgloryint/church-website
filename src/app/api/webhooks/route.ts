import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { IncomingHttpHeaders } from "http";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    } as IncomingHttpHeaders & WebhookRequiredHeaders) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  type EventType = "user.created" | "user.updated" | "*";

  type Event = {
    data: Record<string, string | number>;
    object: "event";
    type: "EventType";
  };

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type as EventType;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...attributes } = evt.data;

    // Check if the data has the expected properties
    console.log("DETAILS: ", attributes);
    await db.user.upsert({
      where: { externalId: id as string },
      create: {
        externalId: id as string,
        attributes: attributes as object,
      },
      update: {
        externalId: id as string,
        attributes: attributes as object,
      },
    });
  }

  return new Response("", { status: 200 });
}
