import React, { Dispatch } from "react";

import { BiEdit } from "react-icons/bi";

import { User } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  allUsers: User[];
  handleEditClick: (id: string) => false | void;
};

const UpdateUser = ({ allUsers, handleEditClick }: Props) => {
  return (
    <section className="min-h-[500px]">
      <Card className="sm:p-[10rem] min-h-[500px]">
        <CardHeader>
          <CardTitle className="font-bold">
            <CardDescription className="text-4xl">Users</CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <h1 className="text-2xl">Edit Users</h1>
        <div className="flex flex-col">
          {allUsers?.map(({ name, member, id }) => (
            <div className="flex items-center justify-center gap-2" key={id}>
              <span>
                {name}-{member}
              </span>
              <BiEdit
                className="cursor-pointer"
                onClick={() => handleEditClick(id)}
              />
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
};

export default UpdateUser;
