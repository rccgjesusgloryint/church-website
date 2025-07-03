import React, { Dispatch, SetStateAction } from "react";

import { BiEdit } from "react-icons/bi";

import { Role, User } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateUserForm from "./forms/UpdateUserForm";

type Props = {
  allUsers: User[];
  // handleEditClick: (id: string) => false | void;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setClose: () => void;
  user: string;
};

const UpdateUser = ({ allUsers, setRefresh, setClose, user }: Props) => {
  return (
    <section className="min-h-[500px] h-auto sm:p-5">
      <Card className="p-5">
        <CardHeader>
          <CardTitle className="font-bold text-4xl">Edit Users</CardTitle>
        </CardHeader>
        <CardContent>
          {allUsers?.map(({ name, member, id }) => (
            <UpdateUserForm
              usersRole={member as Role}
              userId={id}
              setRefresh={setRefresh}
              setClose={setClose}
              user={user}
            />
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export default UpdateUser;
