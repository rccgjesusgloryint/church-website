"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Heart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getPaginatedSermons } from "@/lib/queries";
import { Sermon, PaginatedSermonsResult } from "@/lib/types";
import { SermonSkeleton } from "@/components/sermons/sermon-skeleton";
import { Pagination, PaginationInfo } from "@/components/ui/pagination";

const PAGE_SIZE = 9;

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] =
    useState<PaginatedSermonsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to page 1 when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch paginated sermons
  const fetchSermons = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getPaginatedSermons(
        currentPage,
        PAGE_SIZE,
        debouncedSearch || undefined
      );
      setPaginationData(result);
    } catch (error) {
      console.error("Error fetching sermons:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchSermons();
  }, [fetchSermons]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of sermon grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const sermons = paginationData?.sermons ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold tracking-tight text-balance mb-3">
            Sermons
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
            Watch and listen to our latest messages from Sunday services
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search sermons by title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {isLoading ? (
            <SermonSkeleton />
          ) : sermons.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sermons.map((sermon) => (
                  <Link
                    key={sermon.id}
                    href={`/sermons/${sermon.id}`}
                    className="group block"
                  >
                    <div className="relative h-full overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1">
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <Image
                          src={sermon.thumbnail || "/placeholder.svg"}
                          alt={sermon.sermonTitle}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="p-5">
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-3 text-balance group-hover:text-primary transition-colors">
                          {sermon.sermonTitle}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {sermon.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {sermon.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{sermon.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 pt-4 border-t text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <User className="size-3.5" />
                            <span className="font-medium">
                              {sermon.speaker}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="size-3.5" />
                              <span>{formatDate(sermon.createdAt!)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Heart className="size-3.5" />
                              <span>{sermon.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {paginationData && paginationData.totalPages > 1 && (
                <div className="flex flex-col items-center gap-4 pt-8">
                  <PaginationInfo
                    currentPage={paginationData.currentPage}
                    totalPages={paginationData.totalPages}
                    totalCount={paginationData.totalCount}
                    pageSize={paginationData.pageSize}
                  />
                  <Pagination
                    currentPage={paginationData.currentPage}
                    totalPages={paginationData.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchQuery
                  ? "No sermons found matching your search."
                  : "No sermons available yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
