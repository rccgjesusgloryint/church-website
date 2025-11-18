// src/components/pdf/SermonNotesPdf.tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface SermonNotesPdfProps {
  title: string;
  articleHtml: string;
}

// Very simple HTML → text stripper
function htmlToPlainText(html: string): string {
  // remove tags
  let text = html.replace(/<[^>]+>/g, " ");
  // collapse whitespace
  text = text.replace(/\s+/g, " ").trim();
  return text;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "bold",
  },
  section: {
    marginTop: 10,
    lineHeight: 1.4,
  },
});

export const SermonNotesPdf: React.FC<SermonNotesPdfProps> = ({
  title,
  articleHtml,
}) => {
  const plainText = htmlToPlainText(articleHtml);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.section}>
          <Text>{plainText}</Text>
        </View>
      </Page>
    </Document>
  );
};
