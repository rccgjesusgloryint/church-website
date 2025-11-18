"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { SermonNotesPdf } from "./SermonNotesPdf";

interface DownloadButtonProps {
  articleHtml: string; // your parsed HTML string
  title: string; // e.g. sermon title
}

export function DownloadPdfButton({ articleHtml, title }: DownloadButtonProps) {
  const [clicked, setClicked] = useState(false);

  return (
    <PDFDownloadLink
      document={<SermonNotesPdf title={title} articleHtml={articleHtml} />}
      fileName="Sermon-Notes.pdf"
    >
      {({ loading }) => (
        <Button onClick={() => setClicked(true)} disabled={loading}>
          {loading ? "Preparing..." : "Download as PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
