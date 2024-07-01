"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import TagCreator from "../global/tag-creator";
import { createSermon } from "@/lib/queries";

function getYoutubeThumbnailUrl(youtubeUrl: string) {
  // Define regex patterns to extract the video ID
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^&]+)/,
    /youtu\.be\/([^?&]+)/,
  ];

  let videoId = null;
  for (const pattern of patterns) {
    const match = youtubeUrl.match(pattern);
    if (match) {
      videoId = match[1];
      break;
    }
  }

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  // Construct the thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return thumbnailUrl;
}

// // Example usage
// const youtubeLink = "https://youtu.be/W7dx30ATm4M?si=aGMQO0oqrgECGJoA";
// const thumbnailUrl = getYoutubeThumbnailUrl(youtubeLink);
// console.log(thumbnailUrl); // Output: https://img.youtube.com/vi/W7dx30ATm4M/hqdefault.jpg

const CreateSermonForm = () => {
  const [tags, setTags] = React.useState<string[]>([]);

  const formSchema = z.object({
    id: z.number().min(2).optional(),
    videoUrl: z.string().min(2).max(50),
    previewImageUrl: z.string().min(2).max(50),
    sermonTitle: z.string().min(2).max(50),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      videoUrl: "",
      previewImageUrl: "",
      sermonTitle: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("SERMON: ", values, tags);
    if (tags.length < 1) {
      return alert("Please add a tag");
    }
    if (values) {
      values.previewImageUrl = getYoutubeThumbnailUrl(values.previewImageUrl);
    }
    try {
      const response = await toast.promise(
        createSermon(values, tags),
        {
          loading: "Loading",
          success: (data) => `Successfully created sermon!`,
          error: (err) => `OOPS!! This just happened: ${err.toString()}`,
        },
        {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
          success: {
            duration: 5000,
            icon: "🟢",
          },
        }
      );
      console.log("RES: ", response);
      if (response.status === 200) {
        form.resetField("videoUrl");
        form.resetField("previewImageUrl");
        form.resetField("sermonTitle");
        setTags([]);
      }
    } catch (error) {}
  }
  return (
    <Card className="w-full h-full mt-5">
      <CardHeader>
        <CardTitle>
          <CardDescription>
            Please enter the details for your file
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sermon Video Url</FormLabel>
                  <FormControl>
                    <Input placeholder="https://localhost:3000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previewImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sermon Preview Image Url</FormLabel>
                  <FormControl>
                    <Input placeholder="https://localhost:3000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sermonTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sermon Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Are you a child of God?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sermon Tags</FormLabel>
                  <FormControl>
                    <TagCreator tags={tags} setTags={setTags} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create Sermon</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateSermonForm;
