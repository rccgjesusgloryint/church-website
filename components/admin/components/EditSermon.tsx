import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sermon } from "@/lib/types";
import React, { Dispatch, SetStateAction } from "react";
import { BiEdit } from "react-icons/bi";
import DeleteItems from "./DeleteItems";
import { deleteSermon } from "@/lib/queries";

type Props = {
  sermons: Sermon[];
  setRefresh: Dispatch<SetStateAction<boolean>>;
  handleSermonEdit: (id: number) => Promise<void>;
};

const EditSermon = ({ sermons, setRefresh, handleSermonEdit }: Props) => {
  const handleSermonDelete = async (id: number) => {
    await deleteSermon(id);
  };
  return (
    <Card className="sm:p-[10rem] min-h-[500px]">
      <CardHeader>
        <CardTitle className="font-bold">
          <CardDescription className="text-4xl">Edit Sermon</CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex flex-col items-start justify-center">
            {sermons &&
              sermons?.map((s) => (
                <div
                  className="flex items-center justify-center gap-2"
                  key={s.id}
                >
                  <span>{s.sermonTitle}</span>
                  <BiEdit
                    className="cursor-pointer"
                    onClick={() => handleSermonEdit(s.id!!)}
                  />
                  <DeleteItems
                    item={"Sermon"}
                    func={handleSermonDelete}
                    id={s.id!!}
                    setRefresh={setRefresh}
                  />
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditSermon;
