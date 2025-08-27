"use client";

import React from "react";

import { useModal } from "@/providers/modal-provider";

import MobileView from "./MobileView";
import GalleryTopRow from "./GalleryTopRow";
import GalleryBottomRow from "./GalleryBottomRow";
import ViewAllBtn from "./ViewAllBtn";
import Link from "next/link";
import Image from "next/image";
import { CarosoulImageType } from "@/lib/types";
import { getRandomImages } from "@/lib/queries";

const GalleryPreview = () => {
  const [images, setImages] = React.useState<CarosoulImageType[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const resImages = await getRandomImages(6);
      setImages(resImages);
      setIsLoading(false);
    };
    getData();
  }, []);

  const { setOpen } = useModal();
  if (!images) return false;
  return (
    <section className="h-full w-screen relative py-10">
      <div className="py-[10%] p-0 m-0 sm:flex flex-col hidden">
        <GalleryTopRow
          setOpen={setOpen}
          images={images.slice(0, 3)}
          isLoading={isLoading}
        />
        <GalleryBottomRow
          setOpen={setOpen}
          images={images.slice(3, images.length)}
          isLoading={isLoading}
        />
        <ViewAllBtn />
      </div>
      <MobileView images={images} isLoading={isLoading} />
      <Link href="/gallery">
        <div className="sm:hidden flex flex-row items-center gap-3 justify-end pr-12 cursor-pointer absolute right-5 py-20 bottom-3 mt-1">
          <h2>VIEW ALL</h2>
          <Image
            src={"/images/arrow-icon.png"}
            alt="arrow-icon"
            width={24}
            height={24}
            className=""
          />
        </div>
      </Link>
    </section>
  );
};

export default GalleryPreview;
