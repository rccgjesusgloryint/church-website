import { auth } from "@/../../auth";
import { redirect } from "next/navigation";
import { getRoadmapItems, getRoadmapStats, RoadmapStats } from "@/lib/linear";
import InfiniteScrollRoadmap from "@/components/roadmap/InfiniteScrollRoadmap";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { RoadmapItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function RoadmapPage() {
  const session = await auth();

  // Redirect unauthenticated users to sign in
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/roadmap");
  }

  const userId = session.user.id;
  const isSignedIn = true;

  let roadmapItems: RoadmapItem[] = [];
  let hasNextPage = false;
  let endCursor: string | null = null;
  let error: string | null = null;
  let stats: RoadmapStats = {
    inProgress: 0,
    planned: 0,
    completed: 0,
    cancelled: 0,
    total: 0,
  };

  try {
    // Fetch both paginated items and total stats in parallel
    const [itemsResult, statsResult] = await Promise.all([
      getRoadmapItems(userId, undefined, 10),
      getRoadmapStats(),
    ]);

    roadmapItems = itemsResult.items;
    hasNextPage = itemsResult.hasNextPage;
    endCursor = itemsResult.endCursor;
    stats = statsResult;
  } catch (e) {
    console.error("Failed to fetch roadmap items:", e);
    error =
      "Unable to load roadmap. Please check that LINEAR_API_KEY and LINEAR_TEAM_KEY are configured.";
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Product Roadmap
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See what we&apos;re building, what&apos;s coming next, and what
              we&apos;ve shipped. Vote on features you want to see!
            </p>
          </div>

          {/* Stats Bar */}
          {!error && stats.total > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mb-12 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {stats.inProgress}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  In Progress
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.planned}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Planned
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12 px-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!error && roadmapItems.length === 0 && (
            <div className="text-center py-12 px-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400">
                No roadmap items yet. Check back soon!
              </p>
            </div>
          )}

          {/* Infinite Scroll Timeline */}
          {!error && roadmapItems.length > 0 && (
            <InfiniteScrollRoadmap
              initialItems={roadmapItems}
              initialHasNextPage={hasNextPage}
              initialEndCursor={endCursor}
              isSignedIn={isSignedIn}
              userId={userId ?? null}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
