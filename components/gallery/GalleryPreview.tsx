"use client";

import React from "react";

import { useModal } from "@/providers/modal-provider";

import MobileView from "./MobileView";
import GalleryTopRow from "./GalleryTopRow";
import GalleryBottomRow from "./GalleryBottomRow";
import ViewAllBtn from "./ViewAllBtn";
import Link from "next/link";
import Image from "next/image";

const GalleryPreview = () => {
  const { setOpen } = useModal();

  return (
    <section className="h-full w-screen relative py-10">
      <div className="py-[10%] p-0 m-0 sm:flex flex-col hidden">
        <GalleryTopRow setOpen={setOpen} />
        <GalleryBottomRow setOpen={setOpen} />
        <ViewAllBtn />
      </div>
      <MobileView />
      <Link href="/gallery">
        <div className="sm:hidden flex flex-row items-center gap-3 justify-end pr-12 cursor-pointer absolute right-5 py-20 bottom-3 mt-1">
          <h2>VIEW ALL</h2>
          <Image
            src={"/images/arrow-icon.png"}
            alt="arrow-icon"
            width={24}
            height={24}
          />
        </div>
      </Link>
    </section>
  );
};

export default GalleryPreview;
