// hooks/useEditPageData.ts
import { useState, useEffect } from "react";
import { getAllBlogs, getAllEvents, getAuthUserDetails } from "@/lib/queries";
import { BlogType, EventType } from "@/lib/types";
import { User } from "@prisma/client";

interface UseEditPageDataReturn {
  events: EventType | undefined;
  allBlogs: BlogType[] | undefined;
  usersBlogs: BlogType[] | undefined;
  currentUser: User | undefined;
  loading: boolean;
  error: string | null;
}

export const useEditPageData = (refresh: boolean): UseEditPageDataReturn => {
  const [events, setEvents] = useState<EventType>();
  const [allBlogs, setAllBlogs] = useState<BlogType[]>();
  const [usersBlogs, setUsersBlogs] = useState<BlogType[]>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel for better performance
        const [eventsFromDb, blogsFromDb, currUser] = await Promise.all([
          getAllEvents(),
          getAllBlogs(),
          getAuthUserDetails(),
        ]);

        setEvents(eventsFromDb);
        setAllBlogs(blogsFromDb);
        setCurrentUser(currUser as User);

        // Filter blogs for current user
        const filteredBlogs = blogsFromDb?.filter(
          (blog) => blog.id === currUser?.id
        );
        setUsersBlogs(filteredBlogs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [refresh]);

  return {
    events,
    allBlogs,
    usersBlogs,
    currentUser,
    loading,
    error,
  };
};
