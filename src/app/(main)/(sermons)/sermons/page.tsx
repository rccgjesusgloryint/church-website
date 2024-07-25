"use client";

import React from "react";
import Navbar2 from "../../../../../components/Navbar2";

import { CiSearch } from "react-icons/ci";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { getAllSermons, getExistingTags } from "@/lib/queries";
import { Sermon } from "@/lib/types";
import { Input } from "@/components/ui/input";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getYoutubeVidId } from "@/lib/actions";

const Page = () => {
  const useTitle = React.useRef<HTMLElement | any>();
  const useSubTitle1 = React.useRef<HTMLElement | any>();
  const useSubTitle2 = React.useRef<HTMLElement | any>();
  const useTitle2 = React.useRef<HTMLElement | any>();

  const [allSermons, setAllSermons] = React.useState<Sermon[]>();
  const [displaySermons, setDisplaySermons] = React.useState<Sermon[]>();
  const [allTags, setAllTags] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");

  const getTags = async () => {
    const data = await getExistingTags();
    setAllTags(data);
  };

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(useTitle.current, {
      y: 300,
      duration: 1,
      opacity: 0,
    });
    gsap.from(useSubTitle1.current, {
      scrollTrigger: useSubTitle1.current,
      x: -80,
      duration: 1,
      opacity: 0,
    });
    gsap.from(useSubTitle2.current, {
      scrollTrigger: useSubTitle2.current,
      x: -80,
      duration: 1,
      opacity: 0,
    });
    gsap.from(useTitle2.current, {
      scrollTrigger: useTitle2.current,
      x: 300,
      duration: 1,
      opacity: 0,
    });
  });

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

  return (
    <>
      <section className="h-screen bg-about-bg bg-cover">
        <Navbar2 />
        <div className="h-full flex justify-center" ref={useTitle}>
          <div className="flex items-center justify-center">
            <h1 className="text-white font-bold sm:text-[80px] text-[35px]">
              Sermons
            </h1>
          </div>
        </div>
      </section>
      <section className="h-auto w-full relative">
        <div className="flex flex-col w-full">
          <div className="flex flex-col sm:items-start items-center w-full mt-11 relative">
            <div className="flex flex-col gap-2 w-auto sm:pl-[180px]">
              <Input
                value={search}
                onChange={(e) => filterBySearch(e.target.value)}
                className="sm:w-[140%] w-full"
                placeholder="Search sermon..."
              />
              <div className="flex flex-row gap-2">
                {allTags.length > 0 ? (
                  allTags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#5B5966] bg-opacity-50 w-[100px] h-[40px] rounded flex items-center justify-center cursor-pointer"
                      onClick={() => filterSermonByTags(tag)}
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <div>No Tags!</div>
                )}
              </div>
            </div>
            <div className="flex flex-row flex-wrap w-full items-center justify-center gap-11 gap-y-[80px] mt-[80px] mb-11 p-3">
              {displaySermons?.length !== 0 ? (
                displaySermons?.map((sermon, index) => (
                  <div
                    className="w-auto h-auto p-6 pb-6 bg-slate-400"
                    key={index}
                  >
                    <div className="h-[315px] sm:w-[560px] w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYoutubeVidId(
                          sermon.videoUrl
                        )}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-2xl">
                        {sermon.sermonTitle}
                      </h1>
                      <div className="flex flex-row">
                        {sermon.tags.length !== 0 && sermon.tags.length > 1 ? (
                          <HoverCard>
                            <div className="flex flex-row gap-1">
                              <span className="bg-[#5B5966] bg-opacity-50 w-[100px] h-[40px] rounded flex items-center justify-center border-2 border-black">
                                {sermon.tags[0]}
                              </span>
                              <HoverCardTrigger className="cursor-pointer">
                                <span className="bg-[#5B5966] bg-opacity-50 w-auto p-2 h-[40px] rounded flex items-center justify-center border-2 border-black">
                                  +1
                                </span>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-auto">
                                <div className="flex flex-row">
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
                          <span className="bg-[#5B5966] bg-opacity-50 w-[100px] h-[40px] rounded flex items-center justify-center border-2 border-black">
                            {sermon.tags.length !== 0 && sermon.tags[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>NO Sermons!</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
