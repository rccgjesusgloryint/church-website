import React, { Dispatch, SetStateAction } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2Icon } from "lucide-react";

type Props = {
  item: string;
  func: (id: number) => Promise<void>;
  id: number;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const DeleteItems = ({ item, func, id, setRefresh }: Props) => {
  const handleDelete = async (id: number) => {
    func(id);
    setRefresh((prev) => !prev);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2Icon width={15} className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this{" "}
            {item || "ITEM"} and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItems;
