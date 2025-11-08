"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  BookOpen,
  Lock,
  ChevronDown,
  ChevronUp,
  Printer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface SermonAIFeaturesProps {
  sermonId: number;
  sermonTitle: string;
  summary?: string | null;
  aiBreakdown?: string | null;
}

type AIView = "summary" | "breakdown";

export function SermonAIFeatures({
  sermonId,
  sermonTitle,
  summary,
  aiBreakdown,
}: SermonAIFeaturesProps) {
  const { data } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeView, setActiveView] = useState<AIView>("summary");

  // Check if AI features are available
  const hasSummary = summary && summary.trim() !== "";
  const hasBreakdown = aiBreakdown && aiBreakdown.trim() !== "";
  const hasAnyAIContent = hasSummary || hasBreakdown;

  const handleComingSoon = (feature: string) => {
    toast.error(
      <div>
        <h2>Coming Soon</h2>
        <p>AI ${feature} feature will be available soon for premium members.</p>
      </div>
    );
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const content = activeView === "summary" ? summary : aiBreakdown;
    const title = activeView === "summary" ? "AI Summary" : "AI Breakdown";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title} - ${sermonTitle}</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              max-width: 800px;
              margin: 2rem auto;
              padding: 2rem;
              line-height: 1.6;
            }
            h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
            h2 { font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
            h3 { font-size: 1.1rem; margin-top: 1.25rem; margin-bottom: 0.5rem; }
            h4 { font-size: 1rem; margin-top: 1rem; margin-bottom: 0.5rem; }
            p { margin: 0.75rem 0; }
            ul, ol { margin: 0.75rem 0; padding-left: 2rem; }
            li { margin: 0.5rem 0; }
            strong { font-weight: 600; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <p style="color: #666; margin-bottom: 2rem;">${sermonTitle}</p>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (data?.user === undefined) {
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
              onClick={() => handleComingSoon("Summary")}
              className="w-full gap-2"
              variant="secondary"
              disabled
            >
              <Lock className="h-4 w-4" />
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
              onClick={() => handleComingSoon("Breakdown")}
              className="w-full gap-2"
              variant="secondary"
              disabled
            >
              <Lock className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Premium Info */}
        {data?.user === undefined && (
          <Card className="border-primary/20 bg-primary/5 p-4">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              AI features and pastor notes are available to members. Please sign
              in to become a member!
            </p>
          </Card>
        )}
      </div>
    );
  }

  // If no AI content available, show coming soon state
  if (!hasAnyAIContent) {
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
              onClick={() => handleComingSoon("Summary")}
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
              onClick={() => handleComingSoon("Breakdown")}
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
        {data?.user === undefined && (
          <Card className="border-primary/20 bg-primary/5 p-4">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              AI features and pastor notes are available to premium members
            </p>
          </Card>
        )}
      </div>
    );
  }

  // If AI content is available and user is logged in, then show interactive component
  return (
    <Card className="border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI
            </Badge>
            <h3 className="font-semibold text-foreground">AI Insights</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-2"
          >
            {isExpanded ? (
              <>
                Collapse <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Expand <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Toggle Tabs - Only show if expanded */}
        {isExpanded && hasSummary && hasBreakdown && (
          <div className="mt-4 flex gap-2">
            <Button
              variant={activeView === "summary" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("summary")}
              className="flex-1 gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Summary
            </Button>
            <Button
              variant={activeView === "breakdown" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("breakdown")}
              className="flex-1 gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Breakdown
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 space-y-4">
          {/* Print Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-2 bg-transparent"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>

          {/* AI Content */}
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  activeView === "summary" ? summary || "" : aiBreakdown || "",
              }}
              className={cn(
                "text-foreground leading-relaxed",
                // Typography styles for HTML content
                "[&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:mt-6",
                "[&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-5",
                "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4",
                "[&_h4]:text-sm [&_h4]:font-semibold [&_h4]:mb-2 [&_h4]:mt-3",
                "[&_p]:mb-3 [&_p]:leading-relaxed",
                "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul]:space-y-1",
                "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_ol]:space-y-1",
                "[&_li]:leading-relaxed",
                "[&_strong]:font-semibold [&_strong]:text-foreground",
                "[&_em]:italic",
                "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2"
              )}
            />
          </div>

          {/* Premium Member Badge */}
          <div className="pt-4 border-t border-border">
            <Badge variant="secondary" className="gap-1">
              Premium Member Feature
            </Badge>
          </div>
        </div>
      )}

      {/* Collapsed State Preview */}
      {!isExpanded && (
        <div className="p-4">
          <p className="text-sm text-muted-foreground text-center">
            {hasSummary && hasBreakdown
              ? "View AI-generated summary and detailed breakdown"
              : hasSummary
              ? "View AI-generated summary"
              : "View AI-generated breakdown"}
          </p>
        </div>
      )}
    </Card>
  );
}
