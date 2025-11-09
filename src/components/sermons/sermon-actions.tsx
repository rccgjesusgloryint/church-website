"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAuthUserDetails } from "@/lib/queries";
import { User } from "@prisma/client";
import { Download, Heart, Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

interface SermonActionsProps {
  sermonId: number;
  hasPastorNotes?: boolean;
}

export function SermonActions({
  sermonId,
  hasPastorNotes,
}: SermonActionsProps) {
  const { data } = useSession();

  const handleDownloadPDF = async () => {
    // Check if user is authenticated and has premium access
    // For now, show a message
    // toast({
    //   title: "Premium Feature",
    //   description: "Please log in as a member to download pastor notes.",
    //   variant: "default",
    // });
    if (!data?.user) {
      return toast.custom(
        <div>
          <h2>Premium Feature</h2>
          <p>Please log in as a member to download pastor notes.</p>,
        </div>
      );
    }
    alert("downloaded!");
  };

  return (
    <Card className="p-6 border-border bg-card">
      <div className="flex flex-wrap items-center gap-4">
        {hasPastorNotes && (
          <Button
            variant="outline"
            size="lg"
            onClick={handleDownloadPDF}
            className="gap-2 bg-transparent"
          >
            <Download className="h-5 w-5" />
            <span className="hidden sm:inline">Pastor Notes</span>
            {!data?.user && <Lock className="h-4 w-4 text-muted-foreground" />}
          </Button>
        )}
      </div>
    </Card>
  );
}
