import Navbar2 from "@/components/navbar/Navbar2";
import { SermonActions } from "@/components/sermons/sermon-actions";
import { SermonAIFeatures } from "@/components/sermons/sermon-ai-features";
import { SermonHeader } from "@/components/sermons/sermon-header";
import { SermonVideo } from "@/components/sermons/sermon-video";
import { ShareButtons } from "@/components/sermons/share-buttons";
import { getSermonById } from "@/lib/queries";

// // Mock data - replace with actual database query
async function getSermon(id: string) {
  // Simulate database query
  return {
    id: Number.parseInt(id),
    sermonTitle: "Walking in Faith Through Uncertain Times",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["Faith", "Trust", "Guidance", "Hope"],
    thumbnail: "/church-sermon.jpg",
    likes: 234,
    embedHTML: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    hasPastorNotes: true,
  };
}

export default async function SermonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sermon = await getSermonById(Number(id));

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Section */}
          <SermonHeader sermon={sermon} />

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Main Content - Video and Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <SermonVideo
                videoUrl={sermon.videoUrl}
                title={sermon.sermonTitle}
              />

              {/* Action Buttons */}
              {sermon.hasPastorNotes && (
                <SermonActions
                  sermonId={Number(sermon.id)}
                  hasPastorNotes={sermon.hasPastorNotes}
                />
              )}

              {/* Share Section */}
              <ShareButtons
                title={sermon.sermonTitle}
                url={`${process.env.NEXT_PUBLIC_BASE_URL}/sermons/${sermon.id}`}
              />
            </div>

            {/* Right Column - AI Features */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <SermonAIFeatures
                sermonId={sermon.id!}
                sermonTitle={sermon.sermonTitle}
                summary={sermon.summary}
                aiBreakdown={sermon.aiBreakdown}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
