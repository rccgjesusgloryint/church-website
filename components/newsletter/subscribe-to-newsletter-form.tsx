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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type Props = {};

const SubscribeToNewsLetterForm = (props: Props) => {
  const formSchema = z.object({
    email: z.string().email().min(1),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // await addEmailFromNewsletterToDB(values.email);
    // await toast.promise(
    //   sendWelcomeEmail(values.email as string),
    //   {
    //     loading: "Loading",
    //     success: (data) => `Thanks for joining out Newsletter, God bless!`,
    //     error: (err) => `This just happened: ${err.toString()}`,
    //   },
    //   {
    //     style: {
    //       border: "1px solid #713200",
    //       padding: "16px",
    //       color: "#713200",
    //     },
    //     iconTheme: {
    //       primary: "#713200",
    //       secondary: "#FFFAEE",
    //     },
    //     success: {
    //       duration: 5000,
    //       icon: "🟢",
    //     },
    //   }
    // );
    // form.resetField("email");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0 h-[71px] sm:w-[487px] w-full sm:px-[3.25rem] mt-5 flex sm:flex-row flex-col relative">
              <FormControl className="h-full sm:w-1/2 w-full bg-black bg-opacity-55 pl-10 text-white sm:absolute">
                <Input placeholder="Your Email" {...field} />
              </FormControl>
              <Button
                type="submit"
                className="sm:absolute right-[5.3rem] bottom-0 h-[70px]"
              >
                SUBSCRIBE
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SubscribeToNewsLetterForm;
