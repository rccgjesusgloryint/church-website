"use client";

import type React from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, Tag, MessageSquare, Globe } from "lucide-react";
import { reportFeedback } from "@/lib/queries";

const MESSAGE_MAX = 1000;

export function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackFrom: "", // NEW
    category: "",
    message: "",
  });
  const [customCategory, setCustomCategory] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const charsLeft = useMemo(
    () => Math.max(0, MESSAGE_MAX - formData.message.length),
    [formData.message]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalCategory =
      formData.category === "other" ? customCategory.trim() : formData.category;

    if (!formData.message.trim()) return;
    if (formData.message.length > MESSAGE_MAX) return;
    if (formData.category === "other" && !finalCategory) {
      alert("Please enter a custom category.");
      return;
    }

    setIsSubmitting(true);

    try {
      await reportFeedback({ ...formData });
    } catch (error) {
      setIsSubmitting(false);
      return alert("Error!");
    }

    setIsSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        feedbackFrom: "",
        category: "",
        message: "",
      });
      setCustomCategory("");
    }, 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <Card className="mx-auto max-w-3xl overflow-hidden border-border/60">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent h-0.5 w-full" />
        <CardContent className="flex min-h-[300px] flex-col items-center justify-center p-10 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
            <svg
              className="h-7 w-7 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-1 text-2xl font-semibold">Thank you!</h3>
          <p className="text-sm text-muted-foreground max-w-prose">
            Your feedback has been received. We appreciate you taking the time
            to share your thoughts with us.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-3xl overflow-hidden border-border/60">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl">We’d love your feedback</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tell us what’s working well and what we can improve.
        </p>
      </CardHeader>
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent h-0.5 w-full" />
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name + Email (optional) */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-muted-foreground">(optional)</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-muted-foreground">(optional)</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Only used to follow up on your feedback. We won’t share it.
              </p>
            </div>
          </div>

          {/* Where they’re reporting from (optional preset list) */}
          <div className="space-y-2">
            <Label htmlFor="feedbackFrom">
              Where are you giving feedback from?{" "}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <div className="relative">
              {/* You can keep the Globe icon if you want, purely decorative */}
              {/* <Globe className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
              <Select
                value={formData.feedbackFrom}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, feedbackFrom: value }))
                }
              >
                <SelectTrigger id="feedbackFrom">
                  {/* className="pl-9" if using icon */}
                  <SelectValue placeholder="Select a page (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="blogs">Blogs</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="gallery">Gallery</SelectItem>
                  <SelectItem value="sermons">Sermons</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="contact">Contact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <div className="relative">
              <Tag className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger id="category" className="pl-9">
                  <SelectValue placeholder="Select a category (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="other">Other (custom)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Custom category (if "Other") */}
          {formData.category === "other" && (
            <div className="space-y-2">
              <Label htmlFor="custom-category">Custom category</Label>
              <Input
                id="custom-category"
                type="text"
                placeholder="Type your category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">
              Your feedback <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="message"
                name="message"
                placeholder="Share your thoughts, suggestions, or concerns…"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="pl-9 resize-none"
                maxLength={MESSAGE_MAX + 1}
              />
              <div className="pointer-events-none absolute right-2 bottom-2 text-xs text-muted-foreground">
                {charsLeft} / {MESSAGE_MAX}
              </div>
            </div>
          </div>

          {/* Privacy note */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            By submitting, you agree that we’ll store your feedback message —
            and, if provided, your name, email, or page info — solely to improve
            our service. We don’t share your data with third parties.
          </p>

          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !formData.message.trim() ||
              formData.message.length > MESSAGE_MAX ||
              (formData.category === "other" && !customCategory.trim())
            }
            className="w-full"
          >
            {isSubmitting ? "Submitting…" : "Submit feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
