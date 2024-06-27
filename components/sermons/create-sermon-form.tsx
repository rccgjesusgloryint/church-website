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
