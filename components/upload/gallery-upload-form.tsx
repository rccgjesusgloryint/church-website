"use client";

import type React from "react";
import { useState, useRef, type DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, X, ImageIcon, Calendar, FileText, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  file: File;
  preview: string;
  id: string;
}

/** ---- Client-side limits ---- */
const MAX_FILES_PER_REQUEST = 3; // 👈 adjust
const MAX_FILE_SIZE_MB = 8; // 👈 adjust

export function GalleryUploadForm() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [warning, setWarning] = useState<string>(""); // 👈 inline feedback
  const fileInputRef = useRef<HTMLInputElement>(null);

  const remainingSlots = Math.max(0, MAX_FILES_PER_REQUEST - files.length);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!e.dataTransfer.files?.length) return;
    addFiles(Array.from(e.dataTransfer.files));
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    addFiles(Array.from(e.target.files));
    // reset input so same files can be reselected if removed
    e.currentTarget.value = "";
  };

  /** Validate and add files respecting limits */
  const addFiles = (incoming: File[]) => {
    setWarning("");
    // only images
    let candidates = incoming.filter((f) => f.type.startsWith("image/"));

    // enforce size
    const tooBig = candidates.filter(
      (f) => f.size > MAX_FILE_SIZE_MB * 1024 * 1024
    );
    if (tooBig.length) {
      setWarning(
        `Skipped ${tooBig.length} file(s) over ${MAX_FILE_SIZE_MB}MB: ` +
          tooBig.map((f) => f.name).join(", ")
      );
    }
    candidates = candidates.filter(
      (f) => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024
    );

    // enforce count
    if (candidates.length > remainingSlots) {
      setWarning(
        (prev) =>
          (prev ? prev + " • " : "") +
          `You can only add ${remainingSlots} more file(s) (max ${MAX_FILES_PER_REQUEST} per upload).`
      );
      candidates = candidates.slice(0, remainingSlots);
    }

    if (!candidates.length) return;

    const toAdd: UploadedFile[] = candidates.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
    }));

    setFiles((prev) => [...prev, ...toAdd]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f) URL.revokeObjectURL(f.preview);
      return prev.filter((x) => x.id !== id);
    });
    setWarning(""); // clear warnings so user can add more
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // final guard
    if (!files.length) return alert("Please select at least one image.");
    if (!eventDate || !eventTitle)
      return alert("Please fill in all required fields.");
    if (files.length > MAX_FILES_PER_REQUEST) {
      return alert(
        `Please keep it to ${MAX_FILES_PER_REQUEST} files per upload.`
      );
    }
    for (const f of files) {
      if (f.file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        return alert(`"${f.file.name}" exceeds ${MAX_FILE_SIZE_MB}MB.`);
      }
    }

    setIsUploading(true);

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f.file));
    formData.append("event", eventTitle);
    formData.append("date", eventDate);
    formData.append("description", eventDescription);
    formData.append("location", eventLocation);

    try {
      const res = await fetch(`/api/upload/multiple-files`, {
        method: "POST",
        body: formData,
      });
      let payload: any = null;
      try {
        payload = await res.json();
      } catch {}

      if (!res.ok) {
        const msg =
          payload?.error ?? payload?.message ?? `Upload failed (${res.status})`;
        console.error("Upload failed:", { status: res.status, payload });
        alert(msg);
        return;
      }

      alert(payload?.message ?? "Images uploaded successfully!");

      // Reset on success
      files.forEach((f) => URL.revokeObjectURL(f.preview));
      setFiles([]);
      setEventDate("");
      setEventTitle("");
      setEventDescription("");
      setEventLocation("");
      setWarning("");
    } catch (err: any) {
      console.error("Network/Unexpected error:", err);
      alert(err?.message ?? "Unexpected error while uploading.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Upload Event Photos
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Max <strong>{MAX_FILES_PER_REQUEST}</strong> images per upload, up to{" "}
          <strong>{MAX_FILE_SIZE_MB}MB</strong> each.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Event Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="event-title"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-primary" />
                  Event Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="event-title"
                  type="text"
                  placeholder="e.g., Sunday Morning Worship"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="event-location"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4 text-primary" />
                Location{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="event-location"
                type="text"
                placeholder="e.g., St. Mark’s Church Hall"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-description">Event Description</Label>
              <Textarea
                id="event-description"
                placeholder="Add a brief description of the event (optional)"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          </div>

          {/* File Upload Area */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-primary" />
              Photos <span className="text-destructive">*</span>
            </Label>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-primary/10 p-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Drop images here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Max {MAX_FILES_PER_REQUEST} files per upload,{" "}
                    {MAX_FILE_SIZE_MB}MB each.
                  </p>
                  {remainingSlots !== MAX_FILES_PER_REQUEST && (
                    <p className="text-xs text-muted-foreground">
                      You can add <strong>{remainingSlots}</strong> more file(s)
                      this upload.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {!!warning && <p className="text-xs text-amber-600">{warning}</p>}

            {/* Preview Grid */}
            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Selected Images ({files.length}/{MAX_FILES_PER_REQUEST})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {files.map((file) => (
                    <div key={file.id} className="relative group aspect-square">
                      <img
                        src={file.preview || "/placeholder.svg"}
                        alt={file.file.name}
                        className="w-full h-full object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file.id);
                        }}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
                        aria-label={`Remove ${file.file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity truncate">
                        {file.file.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                files.forEach((f) => URL.revokeObjectURL(f.preview));
                setFiles([]);
                setEventDate("");
                setEventTitle("");
                setEventDescription("");
                setEventLocation("");
                setWarning("");
              }}
              disabled={isUploading}
            >
              Clear All
            </Button>
            <Button
              type="submit"
              disabled={
                isUploading ||
                files.length === 0 ||
                files.length > MAX_FILES_PER_REQUEST
              }
            >
              {isUploading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload {files.length > 0 && `(${files.length})`}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
