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

import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaClock } from "react-icons/fa6";

const ContactForm = () => {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    message: z.string().min(5),
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    alert("Hi");
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
        <p className="flex gap-2 items-center text-[#BBBBBB]">
          <span className="text-dark-gr">
            <FaPhoneAlt />
          </span>
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
        <p className="flex gap-2 items-center text-[#BBBBBB]">
          <span className="text-dark-gr">
            <FaLocationDot />
          </span>
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
        <p className="flex gap-2 items-center text-[#BBBBBB]">
          <span className="text-dark-gr">
            <IoMdMail />
          </span>
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
        <p className="flex gap-2 items-center text-[#BBBBBB]">
          <span className="text-dark-gr">
            <FaClock />
          </span>
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
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
            <Button type="submit" className="bg-dark-gr hover:bg-dark-gr">
              SEND US A MESSAGE
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
