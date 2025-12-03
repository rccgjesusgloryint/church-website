"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import toast from "react-hot-toast";

interface DownloadButtonProps {
  articleHtml: string; // your parsed HTML string
  title: string; // e.g. sermon title
}

export function DownloadPdfButton({ articleHtml, title }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setIsGenerating(true);

      // Create a temporary container for the HTML content
      const container = document.createElement("div");
      container.innerHTML = articleHtml;

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
        filename: `${title || "Sermon-Notes"}.pdf`,
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
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={handleDownloadPdf} disabled={isGenerating}>
      {isGenerating ? "Preparing..." : "Download as PDF"}
    </Button>
  );
}
