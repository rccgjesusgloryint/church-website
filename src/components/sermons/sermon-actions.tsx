"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sermon } from "@/lib/types";
import { Download, Heart, Lock, FileText } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";

interface SermonActionsProps {
  sermon: Sermon;
}

export function SermonActions({ sermon }: SermonActionsProps) {
  const { data } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    data?.user ? true : false
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);

  const handleResourceClick = () => {
    if (data?.user == undefined) {
      // toast({
      //   title: "Premium Feature",
      //   description: "Please log in as a member to access sermon resources.",
      //   variant: "default",
      // })
      // toast.error("Premium Feature, please sign in!");
      throw toast.error("Premium Feature, please sign in!");
    }

    if (sermon.sermonResources!.length === 0) {
      // toast({
      //   title: "No Resources Available",
      //   description: "This sermon doesn't have any resources yet.",
      //   variant: "default",
      // });
      throw toast.error("No Resources Available!");
    }

    setDialogOpen(true);
  };

  const handleDownloadPdf = async (htmlContent: string, index: number) => {
    try {
      setDownloadingIndex(index);

      // Create a temporary container for the HTML content
      const container = document.createElement("div");
      container.innerHTML = htmlContent;

      // Apply styling to the container for better PDF rendering
      container.style.padding = "20px";
      container.style.fontFamily = "Arial, sans-serif";
      container.style.fontSize = "12px";
      container.style.lineHeight = "1.6";
      container.style.color = "#000";
      container.style.backgroundColor = "#fff";

      // Configure html2pdf options
      const options = {
        margin: [10, 10, 10, 10],
        filename: `${sermon.sermonTitle}-resource_file-${index + 1}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // Generate and download the PDF
      await html2pdf().set(options).from(container).save();

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setDownloadingIndex(null);
    }
  };

  const hasResources =
    sermon.sermonResources && sermon.sermonResources.length > 0;

  return (
    <Card className="p-6 border-border bg-card">
      <div className="flex flex-wrap items-center gap-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              onClick={handleResourceClick}
              className="gap-2 bg-transparent"
            >
              <FileText className="h-5 w-5" />
              <span className="hidden sm:inline">Sermon Resources</span>
              {!isAuthenticated && (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] bg-background">
            <DialogHeader>
              <DialogTitle>Sermon Resources</DialogTitle>
              <DialogDescription>
                Download available resources for this sermon
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-3">
              {hasResources ? (
                sermon.sermonResources!.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          Resource {index + 1}
                        </p>
                        {/* <p className="text-xs text-muted-foreground truncate">
                          {resource}
                        </p> */}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownloadPdf(resource, index)}
                      disabled={downloadingIndex === index}
                      className="shrink-0 ml-2"
                    >
                      {downloadingIndex === index ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {downloadingIndex === index
                          ? "Generating PDF..."
                          : `Download Resource ${index + 1}`}
                      </span>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    No resources available for this sermon
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
