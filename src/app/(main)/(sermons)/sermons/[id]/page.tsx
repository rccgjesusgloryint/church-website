import Navbar2 from "@/components/navbar/Navbar2";
import { SermonActions } from "@/components/sermons/sermon-actions";
import { SermonAIFeatures } from "@/components/sermons/sermon-ai-features";
import { SermonHeader } from "@/components/sermons/sermon-header";
import { SermonVideo } from "@/components/sermons/sermon-video";
import { ShareButtons } from "@/components/sermons/share-buttons";
import { getSermonById } from "@/lib/queries";

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

          <div className="mt-8 space-y-6">
            {/* Video and AI Features Side by Side */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              {/* Video Player */}
              <div className="w-full lg:w-1/2 relative">
                <SermonVideo
                  videoUrl={sermon.videoUrl}
                  title={sermon.sermonTitle}
                />
              </div>

              {/* AI Features - Same width as video */}
              <div className="w-full lg:w-1/2">
                <SermonAIFeatures
                  sermonId={Number(sermon.id)}
                  sermonTitle={sermon.sermonTitle}
                  summary={sermon.summary}
                  aiBreakdown={sermon.aiBreakdown}
                />
              </div>
            </div>

            {/* Action Buttons */}
            {true && <SermonActions sermon={sermon} />}

            {/* Share Section */}
            <ShareButtons
              title={sermon.sermonTitle}
              url={`${process.env.NEXT_PUBLIC_BASE_URL}/sermons/${sermon.id}`}
              heading="Share this sermon"
            />
          </div>
        </div>
      </div>
    </>
  );
}
