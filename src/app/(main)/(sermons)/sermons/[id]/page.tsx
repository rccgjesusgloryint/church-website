import Navbar from "@/components/navbar/Navbar";
import { SermonActions } from "@/components/sermons/sermon-actions";
import { SermonHeader } from "@/components/sermons/sermon-header";
import { SermonPageClient } from "@/components/sermons/sermon-page-client";
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
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Section */}
          <SermonHeader sermon={sermon} />

          <div className="mt-8 space-y-6">
            {/* Video and AI Features Side by Side */}
            <SermonPageClient sermon={sermon} />

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
