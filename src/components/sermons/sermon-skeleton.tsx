import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SermonSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          {/* Thumbnail skeleton */}
          <Skeleton className="aspect-video w-full" />

          {/* Content skeleton */}
          <div className="p-5 space-y-4">
            {/* Title skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>

            {/* Tags skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>

            {/* Footer skeleton */}
            <div className="pt-4 border-t space-y-2">
              <Skeleton className="h-4 w-32" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
