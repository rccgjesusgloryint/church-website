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
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      videoUrl: sermon.videoUrl || "",
      sermonTitle: sermon.sermonTitle || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!sermon.id) return alert("No sermon provided!");
    let tempSermon = {
      videoUrl: values.videoUrl,
      sermonTitle: values.sermonTitle,
      tags,
    };
    try {
      const response = await toast.promise(
        updateSermon(sermon.id, tempSermon),
        {
          loading: "Loading",
          success: (data) => `Successfully created ${data.message}`,
          error: (err) => `This just happened: ${err.toString()}`,
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
            <Button type="submit">Update Sermon</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateSermonForm;
