"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUpload from "./file-upload";
import { createMedia, getAuthUserDetails } from "@/lib/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  link: z.string().min(1),
});

const UploadMediaForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      link: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.name || !values.link!) {
      return alert("INPUTS EMPTY!!");
    }

    const user = await getAuthUserDetails();
    if (user?.role !== "ADMIN") {
      return toast.error("User not authenticated");
    }

    const externalId = user.externalId as string;

    try {
      await createMedia(externalId, values);

      // Handle success (e.g., show a success message, redirect, etc.)
      alert("QUERY COMPLETED!!");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show an error message)
    }
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your file name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="pictures"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Upload Media</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UploadMediaForm;
