"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const ROADMAP_PROMPT_KEY = "roadmap-toast-shown";
const ROADMAP_WELCOME_KEY = "roadmap-welcome-shown";

/**
 * Lightweight toast provider for roadmap-related notifications.
 * - Shows a toast prompting authenticated users to check out the Roadmap
 * - Shows a welcome toast when users navigate to the Roadmap page
 */
export default function RoadmapToastProvider() {
  const { status } = useSession();
  const pathname = usePathname();
  const hasShownPrompt = useRef(false);
  const hasShownWelcome = useRef(false);

  const isAuthenticated = status === "authenticated";
  const isOnRoadmap = pathname === "/roadmap";

  // Toast prompting user to check out roadmap (shown once per session after sign-in)
  useEffect(() => {
    if (!isAuthenticated || hasShownPrompt.current) return;

    // Check if already shown this session
    const alreadyShown = sessionStorage.getItem(ROADMAP_PROMPT_KEY);
    if (alreadyShown) return;

    // Don't show if already on roadmap page
    if (isOnRoadmap) return;

    // Delay to let the page settle
    const timer = setTimeout(() => {
      toast(
        (t) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">🗺️ New! Check out our Roadmap</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              See what features are coming & vote on what you&apos;d like!
            </span>
            <Link
              href="/roadmap"
              onClick={() => toast.dismiss(t.id)}
              className="text-sm text-primary font-medium hover:underline mt-1"
            >
              View Roadmap →
            </Link>
          </div>
        ),
        {
          duration: 6000,
          position: "bottom-right",
          style: {
            background: "var(--toast-bg, #fff)",
            color: "var(--toast-color, #333)",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
      );

      sessionStorage.setItem(ROADMAP_PROMPT_KEY, "true");
      hasShownPrompt.current = true;
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isOnRoadmap]);

  // Welcome toast on roadmap page (shown once per session)
  useEffect(() => {
    if (!isOnRoadmap || hasShownWelcome.current) return;

    // Check if already shown this session
    const alreadyShown = sessionStorage.getItem(ROADMAP_WELCOME_KEY);
    if (alreadyShown) return;

    // Delay to let the page load
    const timer = setTimeout(() => {
      toast(
        <div className="flex flex-col gap-1">
          <span className="font-medium">👋 Welcome to the Roadmap!</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Vote on features you want in the Progress section below.
          </span>
        </div>,
        {
          duration: 5000,
          position: "bottom-right",
          style: {
            background: "var(--toast-bg, #fff)",
            color: "var(--toast-color, #333)",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
      );

      sessionStorage.setItem(ROADMAP_WELCOME_KEY, "true");
      hasShownWelcome.current = true;
    }, 1500);

    return () => clearTimeout(timer);
  }, [isOnRoadmap]);

  return null;
}
