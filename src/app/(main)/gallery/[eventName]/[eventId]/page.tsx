import { Suspense } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { getEventGalleryById } from "@/lib/queries";
import { Metadata } from "next";
import { EventGalleryClient } from "./EventGalleryClient";

interface PageProps {
  params: Promise<{
    eventName: string;
    eventId: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { eventId } = await params;
  const event = await getEventGalleryById(Number(eventId));

  if (!event) {
    return {
      title: "Gallery Not Found",
    };
  }

  return {
    title: `${event.event} - Gallery | Jesus Glory Athy`,
    description: event.description || `View photos from ${event.event}`,
    openGraph: {
      title: event.event,
      description: event.description || `View photos from ${event.event}`,
      images: event.images[0] ? [event.images[0]] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: event.event,
      description: event.description || `View photos from ${event.event}`,
      images: event.images[0] ? [event.images[0]] : [],
    },
  };
}

async function EventGalleryContent({ eventId }: { eventId: number }) {
  const event = await getEventGalleryById(eventId);

  if (!event || !event.images || event.images.length === 0) {
    notFound();
  }

  const galleryUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/gallery/${event.event}/${event.id}`;

  return (
    <>
      <Navbar />
      <EventGalleryClient event={event} galleryUrl={galleryUrl} />
    </>
  );
}

export default async function EventGalleryPage({ params }: PageProps) {
  const { eventId } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="text-muted-foreground">Loading gallery...</div>
        </div>
      }
    >
      <EventGalleryContent eventId={Number(eventId)} />
    </Suspense>
  );
}
