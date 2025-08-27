"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { contactInfo } from ".";
import toast from "react-hot-toast";
import { sendContactEmail } from "@/lib/queries";

const ContactForm = () => {
  const formSchema = z.object({
    name: z
      .string()
      .min(5)
      .max(25, { message: "Thats quite a long name, shorten for us please!" }),
    email: z.string().email(),
    message: z.string().min(10, { message: "This message is too short!" }),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit({
    email,
    message,
    name,
  }: z.infer<typeof formSchema>) {
    await toast.promise(
      sendContactEmail({ email, message, name }).then((response) => {
        if (response.status === 400) {
          throw new Error("Something went wrong. Please try again. 🔄");
        }
        return response;
      }),
      {
        loading: "Loading...",
        success:
          "Email was sent, we'll get back to you as soon as possible! God bless!",
        error: (err) => err.message, // ✅ Uses friendly toast error message
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
        error: {
          duration: 2000,
          icon: "🔴",
        },
      }
    );
    form.resetField("name");
    form.resetField("email");
    form.resetField("message");
  }

  // Infer the form data type
  type FormData = z.infer<typeof formSchema>;
  return (
    <div className="flex flex-col justify-evenly h-full">
      <div className="flex flex-col gap-2 p-5">
        <h1 className="font-bold text-4xl mb-5 text-dark-gr">How To Find Us</h1>
        {contactInfo.map(({ icon, text, label }, index) => (
          <p className="flex gap-2 items-center text-[#BBBBBB]" key={label}>
            <span className="text-dark-gr">{icon}</span>
            {text}
          </p>
        ))}
      </div>
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-2 p-5 "
          >
            <h2 className="mb-5 font-medium text-xl text-dark-gr">
              Contact Us
            </h2>
            <div className="w-full flex gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-1/2 h-full">
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        className="ring-0 border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-1/2 h-full">
                    <FormControl>
                      <Input
                        placeholder="Email"
                        className="ring-0 focus:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Your Message"
                      className="ring-0 focus:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-dark-gr hover:bg-dark-gr text-white"
            >
              SEND US A MESSAGE
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
