import Image from "next/image";
import React from "react";
import CustomModal from "../global/custom-modal";
import { getRandomImages } from "@/lib/queries";
import { CarosoulImageType } from "@/lib/types";

type Props = {
  setOpen: (modal: React.JSX.Element) => void;
  images: CarosoulImageType[];
  isLoading: boolean;
};

const GalleryTopRow = ({ setOpen, images, isLoading }: Props) => {
  return (
    <div className="flex flex-rows w-full h-[500px] gap-10 mb-10">
      {!isLoading &&
        images.map((image, index) => (
          <>
            <div
              className={`${
                index == images.length - 1 ? "w-2/4" : "w-1/4"
              } cursor-pointer h-full`}
              key={image.id}
            >
              <Image
                src={image.link}
                alt={image.name}
                className="bg-cover bg-center w-full h-full"
                width={1500}
                height={1200}
                loading="lazy"
                // priority (//TO DO: add this when gallery page is updated)
                onClick={() =>
                  setOpen(
                    <CustomModal>
                      <Image
                        src={image.link}
                        alt={image.name}
                        width={1500}
                        height={1200}
                      />
                    </CustomModal>
                  )
                }
              />
            </div>
          </>
        ))}
    </div>
  );
};

export default GalleryTopRow;
