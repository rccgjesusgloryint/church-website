import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getYoutubeVidId } from "@/lib/actions";

import { Input } from "@/components/ui/input";

import { Sermon } from "@/lib/types";
import React from "react";
import { getAllSermons, getExistingTags } from "@/lib/queries";

interface SermonsProps {
  displaySermons: Sermon[];
}

interface FilterProps {
  allSermons: Sermon[];
  setDisplaySermons: (variable: Sermon[]) => void;
  filterBySearch: (varaible: string) => void;
  search: string;
  allTags: string[];
}

interface DisplayTagsProps {
  allTags: string[];
  filterSermonByTags: (tag: string) => void;
}

export const Sermons = () => {
  const [allSermons, setAllSermons] = React.useState<Sermon[]>();
  const [search, setSearch] = React.useState("");
  const [displaySermons, setDisplaySermons] = React.useState<Sermon[]>();
  const [allTags, setAllTags] = React.useState<string[]>([]);

  const getTags = async () => {
    const data = await getExistingTags();
    setAllTags(data);
  };

  const getSermons = async () => {
    const res = await getAllSermons();
    setAllSermons(res);
    setDisplaySermons(res);
  };

  const filterSermonByTags = (tag: string) => {
    const filteredSermon = allSermons?.filter((sermon) =>
      sermon.tags.includes(tag)
    );
    setDisplaySermons(filteredSermon);
  };

  React.useEffect(() => {
    getSermons();
    getTags();
  }, []);

  const filterBySearch = (search: string) => {
    setSearch(search);
    const filteredSearch = allSermons?.filter((sermon) =>
      sermon.sermonTitle.toLowerCase().includes(search.toLowerCase())
    );
    setDisplaySermons(filteredSearch);
  };

  if (!allSermons) {
    return <div>No sermons provided</div>;
  }

  return (
    <div className="flex flex-col sm:items-start items-center w-full mt-11 relative">
      <Filter
        allSermons={allSermons}
        allTags={allTags}
        filterBySearch={filterBySearch}
        search={search}
        setDisplaySermons={setDisplaySermons}
      />
      <div className="flex flex-row flex-wrap w-full items-center justify-center gap-11 gap-y-[80px] mt-[80px] mb-11 p-3">
        {displaySermons?.length !== 0 ? (
          displaySermons?.map((sermon, index) => (
            <div className="w-auto h-auto p-6 pb-6 bg-slate-400" key={index}>
              <div className="h-[315px] sm:w-[560px] w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeVidId(
                    sermon.videoUrl
                  )}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-2xl">{sermon.sermonTitle}</h1>
                <SermonTags sermon={sermon} />
              </div>
            </div>
          ))
        ) : (
          <div>NO Sermons!</div>
        )}
      </div>
    </div>
  );
};

const SermonTags = ({ sermon }: { sermon: Sermon }) => {
  return (
    <div className="flex flex-row">
      {sermon.tags.length !== 0 && sermon.tags.length > 1 ? (
        <HoverCard>
          <div className="flex flex-row gap-1">
            <span className="bg-[#5B5966] bg-opacity-50 w-[100px] -[100px] h-auto rounded cursor-pointer flex items-center justify-center text-center border-2 border-black">
              {sermon.tags[0]}
            </span>
            <HoverCardTrigger className="cursor-pointer">
              <span className="bg-[#5B5966] bg-opacity-50 w-[100px] h-auto rounded cursor-pointer flex items-center justify-center text-center border-2 border-black">
                +1
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto">
              <div className="flex flex-row gap-2">
                {sermon.tags.map((tag, index) => (
                  <span
                    className="bg-[#5B5966] bg-opacity-50 w-auto p-2 h-[40px] rounded flex items-center justify-center border-2 border-black"
                    key={index}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </HoverCardContent>
          </div>
        </HoverCard>
      ) : (
        <span className="bg-[#5B5966] bg-opacity-50 w-[100px] h-auto rounded cursor-pointer flex items-center justify-center text-center border-2 border-black">
          {sermon.tags.length !== 0 && sermon.tags[0]}
        </span>
      )}
    </div>
  );
};

const DisplayTags = ({ allTags, filterSermonByTags }: DisplayTagsProps) => {
  return (
    <div className="flex flex-row gap-2 flex-wrap items-center justify-center">
      {allTags.length > 0 ? (
        allTags.map((tag, index) => (
          <span
            key={index}
            className="bg-[#5B5966] bg-opacity-50 w-[100px] h-auto rounded cursor-pointer flex items-center justify-center text-center"
            onClick={() => filterSermonByTags(tag)}
          >
            {tag}
          </span>
        ))
      ) : (
        <div>No Tags!</div>
      )}
    </div>
  );
};

const Filter = ({
  allSermons,
  setDisplaySermons,
  filterBySearch,
  search,
  allTags,
}: FilterProps) => {
  const filterSermonByTags = (tag: string) => {
    const filteredSermon = allSermons?.filter((sermon) =>
      sermon.tags.includes(tag)
    );
    setDisplaySermons(filteredSermon);
  };
  return (
    <div className="flex flex-col gap-2 w-full sm:pl-[180px] px-3">
      <Input
        value={search}
        onChange={(e) => filterBySearch(e.target.value)}
        className="sm:w-[140%] w-full"
        placeholder="Search sermon..."
      />
      <DisplayTags allTags={allTags} filterSermonByTags={filterSermonByTags} />
    </div>
  );
};
