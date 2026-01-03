"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { RoadmapItem } from "@/lib/types";
import { getRoadmapItems } from "@/lib/linear";
import RoadmapTimeline from "./RoadmapTimeline";
import Loader from "@/components/Loader";

interface InfiniteScrollRoadmapProps {
  initialItems: RoadmapItem[];
  initialHasNextPage: boolean;
  initialEndCursor: string | null;
  isSignedIn: boolean;
  userId: string | null;
}

export default function InfiniteScrollRoadmap({
  initialItems,
  initialHasNextPage,
  initialEndCursor,
  isSignedIn,
  userId,
}: InfiniteScrollRoadmapProps) {
  const [items, setItems] = useState<RoadmapItem[]>(initialItems);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [endCursor, setEndCursor] = useState<string | null>(initialEndCursor);
  const [isLoading, setIsLoading] = useState(false);

  // Use refs to avoid recreating callbacks when state changes
  const loadingRef = useRef(isLoading);
  const hasNextPageRef = useRef(hasNextPage);
  const endCursorRef = useRef(endCursor);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Keep refs in sync with state
  useEffect(() => {
    loadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    hasNextPageRef.current = hasNextPage;
  }, [hasNextPage]);

  useEffect(() => {
    endCursorRef.current = endCursor;
  }, [endCursor]);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasNextPageRef.current || !endCursorRef.current)
      return;

    setIsLoading(true);
    try {
      const result = await getRoadmapItems(
        userId ?? undefined,
        endCursorRef.current,
        10
      );
      setItems((prev) => [...prev, ...result.items]);
      setHasNextPage(result.hasNextPage);
      setEndCursor(result.endCursor);
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]); // Only userId as dependency since it's a prop

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPageRef.current &&
          !loadingRef.current
        ) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [loadMore]); // loadMore is now stable since it only depends on userId

  return (
    <div>
      <RoadmapTimeline items={items} isSignedIn={isSignedIn} userId={userId} />

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="py-8 flex justify-center">
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader />
            <span>Loading more...</span>
          </div>
        )}
        {!hasNextPage && items.length > 0 && (
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            You&apos;ve reached the end of the roadmap
          </p>
        )}
      </div>
    </div>
  );
}
