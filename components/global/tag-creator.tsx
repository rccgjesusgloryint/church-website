"use client";

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { deleteTag, getTags, upsertTag } from "@/lib/queries";
import { Tag } from "@prisma/client";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import React from "react";
import TagComponent from "./tag";

type Props = {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
};

const TagCreator = ({ tags, setTags }: Props) => {
  const [value, setValue] = React.useState("");

  const handleAddTag = async () => {
    if (!value) {
      alert("Tags need to have a name");
      return;
    }

    const tagData: Tag = {
      color: "orange",
      sermonId: null,
      createdAt: new Date(),
      id: Math.floor(Math.random() * 100),
      name: value,
      updatedAt: new Date(),
    };

    if (tags.find((tag) => tag.name === tagData.name)) {
      return alert("Tag already created!");
    }

    setTags([...tags, tagData]);
    setValue("");
    try {
      const response = await upsertTag(tagData);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const handleDeleteTag = async (tagName: string) => {
    setTags(tags.filter((tag) => tag.name !== tagName));
    // try {
    //   const response = await deleteTag(tagName);
    // } catch (error) {
    //   console.log("ERROR: ", error);
    // }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getTags();
      if (response) setTags(response);
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    console.log("TAgs: ", tags);
  }, [tags]);

  return (
    <AlertDialog>
      <Command className="bg-transparent">
        <div className="relative w-1/2">
          <CommandInput
            placeholder="Search for tag..."
            value={value}
            onValueChange={setValue}
          />
          <PlusCircleIcon
            onClick={handleAddTag}
            size={20}
            className="absolute top-1/2 transform -translate-y-1/2 right-2 hover:text-primary transition-all cursor-pointer text-muted-foreground"
          />
        </div>
        <CommandList>
          <CommandSeparator className="w-1/2" />
          <CommandGroup heading="Tags">
            {tags.map((tag) => (
              <CommandItem
                key={tag.id}
                className="hover:!bg-secondary !bg-transparent flex items-center justify-between !font-light cursor-pointer"
              >
                <div>
                  <TagComponent title={tag.name} id={tag.id} />
                </div>
                <AlertDialogTrigger>
                  <Trash2Icon
                    size={16}
                    className="cursor-pointer text-muted-foreground hover:text-rose-400  transition-all"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-left">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-left">
                      This action cannot be undone. This will permanently delete
                      your the tag and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="items-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive"
                      onClick={() => handleDeleteTag(tag.name)}
                    >
                      Delete Tag
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>
    </AlertDialog>
  );
};

export default TagCreator;
