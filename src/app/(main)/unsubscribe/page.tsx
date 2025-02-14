"use client"; // Required for hooks in Next.js App Router

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Get email from URL query params
  const [message, setMessage] = useState("Processing your request...");
  const [hasUnsubscribed, setHasUnsubscribed] = useState(false); // Prevent multiple calls

  useEffect(() => {
    if (!email || hasUnsubscribed) return; // Ensure it only runs once

    setHasUnsubscribed(true); // Mark as unsubscribed to prevent duplicate requests

    fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(async (res) => {
        const data = await res.json();
        setMessage(data.message);
      })
      .catch(() => setMessage("Something went wrong, please try again."));
  }, [email, hasUnsubscribed]); // Add `hasUnsubscribed` dependency

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{message}</h1>
      <a href="/">Return to Homepage</a>
    </div>
  );
}
