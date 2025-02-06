import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { postBlog } from "@/lib/queries";
import toast from "react-hot-toast";

type Props = {
  userId: string | undefined;
};

const BlogCreator = ({ userId }: Props) => {
  const formSchema = z.object({
    blogTitle: z
      .string()
      .min(10, {
        message: "Your title is too short!",
      })
      .max(50, {
        message: "Your title is too long!",
      }),
    category: z
      .string()
      .max(30, { message: "This category is too big try something smaller" }),
    blogDescription: z
      .string()
      .min(30, "Your description must be longer than this!")
      .max(450, {
        message: "Your description cant be longer than 450 characters!",
      }),
    posterImage: z.string().min(20).max(100),
    blogContent: z
      .string()
      .min(2, { message: "This is not enough content for a Blog!" }),
    blogAuthor: z.string(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      blogTitle: "",
      blogDescription: "",
      posterImage: "",
      blogContent: "",
      category: "",
      blogAuthor: userId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitted");
    try {
      alert("clicked");
      console.log("inside try catch");
      await toast.promise(
        postBlog(values),
        {
          loading: "Loading",
          success: (data) => `You successfully posted a blog!`,
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
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  return (
    <section className="p-[10rem] min-h-[500px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="blogTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input placeholder="Who created God?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* TO DO: Implement AI to create the decription for the user, from the users Content and blog title */}
          <FormField
            control={form.control}
            name="blogDescription"
            render={({ field }) => (
              <FormItem>
                <span>{}</span>
                <FormLabel>Blog Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Give a brief description of what to expect in this blog..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="blogContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="What's on your mind?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Category</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What category would this blog fall under?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Post Blog</Button>
        </form>
      </Form>
    </section>
  );
};

export default BlogCreator;
