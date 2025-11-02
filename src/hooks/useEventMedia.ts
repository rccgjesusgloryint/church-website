// hooks/useEventMedia.ts
"use client";
import { useEffect, useState } from "react";
import type { EventsMedia } from "@/lib/types";
import { getAllImagesv2 } from "@/lib/queries";

export function useEventMedia() {
  const [events, setEvents] = useState<EventsMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getAllImagesv2();
      if (!mounted) return;
      // if (error) console.error(error);
      setEvents(data);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { events, loading };
}
