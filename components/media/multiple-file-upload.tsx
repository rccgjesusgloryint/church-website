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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createMedia, getAuthUserDetails } from "@/lib/queries";
import { UploadMultipleFiles } from "@/lib/types";
import { UploadDropzone } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type Props = {
  apiEndpoint: "pictures" | "eventPosterImage";
  value?: string;
  onChange?: (response: UploadMultipleFiles) => void;
};

const MultiplFileUpload = ({ apiEndpoint, onChange }: Props) => {
  const [links, setLinks] = React.useState<UploadMultipleFiles>();
  const [name, setName] = React.useState<string>();
  const formSchema = z.object({
    name: z.string().min(2).max(50),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
    },
  });

  // React.useEffect(() => {
  //   const uploadMedia = async () => {
  //     const user = await getAuthUserDetails();
  //     if (!user) {
  //       return alert("NO USER");
  //     }
  //     if (!links) {
  //       return alert("NO LINKS");
  //     }
  //     const response = await createMedia(user.externalId, links);
  //     console.log("RESPONSE : ", response);
  //   };
  //   uploadMedia();
  // }, [links]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!links) {
      return alert("NO LINKS");
    }
    const response = await toast.promise(
      createMedia(values.name, links),
      {
        loading: "Loading",
        success: (data) => `Successfully uploaded files`,
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
          duration: 5000,
          icon: "🟢",
        },
      }
    );
    console.log("RESPONSE : ", response);

    if (response.status === 200) {
      setLinks([]);
      form.resetField("name");
    }

    if (onChange) {
      onChange(links);
    }
  }

  return (
    <div className="w-full bg-muted/30">
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          setLinks(res as UploadMultipleFiles);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />

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
          <Button type="submit">Upload Media</Button>
        </form>
      </Form>
    </div>
  );
};

export default MultiplFileUpload;
