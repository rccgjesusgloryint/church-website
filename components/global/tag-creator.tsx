"use client";

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
import { getExistingTags, getAllSermons } from "@/lib/queries";

type Props = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

const TagCreator = ({ tags, setTags }: Props) => {
  const [value, setValue] = React.useState("");
  const [allTags, setAllTags] = React.useState<string[]>([]);

  const getTags = async () => {
    const data = await getExistingTags();
    setAllTags(data);
  };

  const tagsFormat = (tag: string) => {
    let temp = tag.toLowerCase();
    let capLetter = temp.charAt(0).toUpperCase();
    let restWord = temp.substring(1);
    let fullWord = capLetter + restWord;
    return fullWord;
  };

  const handleAddTag = async () => {
    //if tag exists in sermon tags list
    if (tags.includes(value)) {
      return setValue("");
    }
    //if tag isnt in sermons tags list but already exists, add to sermons tags list
    if (allTags.includes(value)) {
      setTags([...tags, tagsFormat(value)]);
      return setValue("");
    }
    setTags([...tags, tagsFormat(value)]);
    setValue("");
  };

  React.useEffect(() => {
    getTags();
  }, []);

  const handleTagClick = (tag: string) => {
    if (tags.includes(tag)) {
      return alert("Tag already in your list!");
    } else {
      setTags([...tags, tag]);
      setValue("");
    }
  };

  const handleXClick = (tag: string) => {
    const filterTags = tags.filter((t) => tag !== t);
    setTags(filterTags);
  };

  return (
    <Command className="bg-transparent">
      <div>
        {tags.map((tag, index) => (
          <div className="flex flex-row gap-3" key={index}>
            {tag}
            <span className="cursor-pointer" onClick={() => handleXClick(tag)}>
              <Trash2Icon
                size={16}
                className="cursor-pointer text-muted-foreground hover:text-rose-400 transition-all"
              />
            </span>
          </div>
        ))}
      </div>
      <div className="relative sm:w-3/4 w-full">
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
        <CommandGroup heading="Tags Inventory...">
          {allTags.map((tag, index) => (
            <CommandItem
              key={index}
              className="flex items-center justify-between cursor-pointer w-auto"
            >
              <div onClick={() => handleTagClick(tag)}>
                <TagComponent title={tag} id={index} />
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </Command>
  );
};

export default TagCreator;
