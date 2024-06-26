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
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import React from "react";
import TagComponent from "./tag";

type Props = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

const TagCreator = ({ tags, setTags }: Props) => {
  const [value, setValue] = React.useState("");

  const handleAddTag = async () => {
    if (tags.includes(value)) {
      return setValue("");
    }
    setTags([...tags, value]);
    setValue("");
  };

  React.useEffect(() => {
    console.log("TAGS: ", tags);
  }, [tags]);

  return (
    <AlertDialog>
      <Command className="bg-transparent">
        <div className="relative w-1/2">
          <CommandInput
            placeholder="Create tag..."
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
            {tags.map((tag, index) => (
              <CommandItem
                key={index}
                className="hover:!bg-secondary !bg-transparent flex items-center justify-between !font-light cursor-pointer"
              >
                <div>
                  <TagComponent title={tag} id={index} />
                </div>
                <AlertDialogTrigger>
                  <Trash2Icon
                    size={16}
                    className="cursor-pointer text-muted-foreground hover:text-rose-400 transition-all"
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
                    <AlertDialogAction className="bg-destructive">
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
