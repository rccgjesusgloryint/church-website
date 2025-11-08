"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface SermonAIFeaturesProps {
  sermonId: number;
  sermonTitle: string;
}

export function SermonAIFeatures({
  sermonId,
  sermonTitle,
}: SermonAIFeaturesProps) {
  const { data } = useSession();

  const handleAIFeature = (feature: string) => {
    toast.error(
      <div>
        <h2>Coming Soon</h2>
        <p>AI ${feature} feature will be available soon for premium members.</p>
      </div>
    );

    // toast({
    //   title: "Coming Soon",
    //   description: `AI ${feature} feature will be available soon for premium members.`,
    //   variant: "default",
    // });
  };

  return (
    <div className="space-y-4">
      {/* AI Summary Card */}
      <Card className="relative overflow-hidden border-border bg-card p-6">
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            AI
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-foreground">AI Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get a quick overview of the sermon&apos;s key points and
                takeaways
              </p>
            </div>
          </div>

          <Button
            onClick={() => handleAIFeature("Summary")}
            className="w-full gap-2"
            variant="secondary"
            disabled
          >
            <Lock className="h-4 w-4" />
            <span>Coming Soon</span>
          </Button>
        </div>
      </Card>

      {/* AI Breakdown Card */}
      <Card className="relative overflow-hidden border-border bg-card p-6">
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            AI
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-foreground">AI Breakdown</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Understand the sermon better with detailed explanations and
                context
              </p>
            </div>
          </div>

          <Button
            onClick={() => handleAIFeature("Breakdown")}
            className="w-full gap-2"
            variant="secondary"
            disabled
          >
            <Lock className="h-4 w-4" />
            <span>Coming Soon</span>
          </Button>
        </div>
      </Card>

      {/* Premium Info */}
      {!data?.user && (
        <Card className="border-primary/20 bg-primary/5 p-4">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            AI features and pastor notes are available to premium members
          </p>
        </Card>
      )}
    </div>
  );
}
