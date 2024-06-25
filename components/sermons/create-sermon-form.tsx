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
import { Tag } from "@prisma/client";
import { createSermon } from "@/lib/queries";

const CreateSermonForm = () => {
  const [tags, setTags] = React.useState<Tag[]>([]);

  const TagObjectShema = z.object({
    id: z.number().min(1),
    name: z.string().min(1),
    color: z.string().min(1),
    sermonId: z.number().min(1).optional() || undefined || null,
  });

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
    console.log("SERMON: ", values);
    const response = await createSermon(values, tags);
    console.log("RES: ", response);
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
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="videoUrl" {...field} />
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
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="previewImageUrl" {...field} />
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
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="sermonTitle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
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
