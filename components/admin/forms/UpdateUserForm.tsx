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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Role, User } from "@prisma/client";
import toast from "react-hot-toast";
import { updateUsersRole } from "@/lib/queries";

interface Props {
  usersRole: Role;
  userId: string;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setClose: () => void;
}

const UpdateUserForm = ({ usersRole, userId, setRefresh, setClose }: Props) => {
  const roles = ["ADMIN", "MEMBER", "MINISTER", "OWNER"];
  // Define the schema
  const formSchema = z.object({
    role: z.enum(["ADMIN", "MEMBER", "MINISTER", "OWNER"]),
  });

  // Infer the form data type
  type FormData = z.infer<typeof formSchema>;

  // Initialize the form with the updated schema
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      role: usersRole,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await toast.promise(
        updateUsersRole(userId, values.role),
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
          <CardDescription>Update A Users Role</CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem
                            value={role}
                            className="cursor-pointer"
                            key={role}
                          >
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update!</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateUserForm;
