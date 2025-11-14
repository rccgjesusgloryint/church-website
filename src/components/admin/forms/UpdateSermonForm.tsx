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

import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import toast from "react-hot-toast";
import { updateSermon } from "@/lib/queries";
import { Sermon } from "@/lib/types";
import { Input } from "@/components/ui/input";
import TagCreator from "../../global/tag-creator";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  sermon: Sermon;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setClose: () => void;
}

const UpdateSermonForm = ({ sermon, setRefresh, setClose }: Props) => {
  const [tags, setTags] = React.useState<string[]>([]);
  const formSchema = z.object({
    videoUrl: z.string().min(2).max(50),
    sermonTitle: z.string().min(2).max(50),
    thumbnail: z.string().min(2),
    aiBreakdown: z.string().min(2),
    summary: z.string().min(20),
    sermonNotes: z.string().min(2),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      videoUrl: sermon.videoUrl || "",
      sermonTitle: sermon.sermonTitle || "",
      thumbnail: sermon.thumbnail || "",
      sermonNotes: sermon.sermonNotes || "",
      aiBreakdown: sermon.aiBreakdown || "",
      summary: sermon.summary || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!sermon.id) return alert("No sermon provided!");
    let tempSermon = {
      ...values,
      hasNotes: values.sermonNotes === "",
      tags,
    };
    try {
      const response = await toast.promise(
        updateSermon(sermon.id, { ...tempSermon }),
        {
          loading: "Loading",
          success: (data) => `Successfully created ${data.message}`,
          error: (err) => `This just happened: ${err.toString()}`,
        },
        {
          style: {
            border: "1px solid hsl(var(--border))",
            padding: "16px",
            color: "hsl(var(--foreground))",
            background: "hsl(var(--background))",
          },
          iconTheme: {
            primary: "hsl(var(--primary))",
            secondary: "hsl(var(--primary-foreground))",
          },
          success: {
            duration: 2000,
            icon: "🟢",
          },
        }
      );
      if (response.status === 200) {
        setRefresh((prev) => !prev); // 🔄 Toggle state to trigger rerender
        setClose();
      }
    } catch (error) {
      console.log("ERROR Updating User");
    }
  }

  return (
    <Card className="w-full h-full mt-5">
      <CardHeader>
        <CardTitle>
          <CardDescription>Update Sermon</CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
              name="aiBreakdown"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Breakdown</FormLabel>
                  <FormControl>
                    <Textarea placeholder="AI Breakdown" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Summary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input placeholder="Thumbnail url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Update Sermon
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateSermonForm;
