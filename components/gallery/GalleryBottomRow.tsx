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

const GalleryBottomRow = ({ setOpen, images, isLoading }: Props) => {
  return (
    <div className="flex flex-rows w-full h-[500px] gap-10">
      {!isLoading &&
        images.map((image, index) => (
          <>
            <div
              className={`${
                index == 0 ? "w-2/4" : "w-1/4"
              } cursor-pointer h-full`}
              key={image.id}
            >
              <Image
                src={image.link}
                alt={image.name}
                className="bg-cover bg-center w-full h-full"
                width={1500}
                height={1200}
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

      {/* <div className="w-2/4 h-full bg-cover bg-bottom cursor-pointer">
        <Image
          src="/images/carousel_img5.jpg"
          alt="carousel_img5"
          className="bg-cover bg-center w-full h-full"
          width={1500}
          height={1200}
          onClick={() =>
            setOpen(
              <CustomModal>
                <Image
                  src={"/images/carousel_img5.jpg"}
                  alt="fullImage"
                  width={1500}
                  height={1200}
                />
              </CustomModal>
            )
          }
        />
      </div>
      <div className="w-1/4 h-full cursor-pointer">
        <Image
          src="/images/carousel_img4.jpg"
          alt="carousel_img3"
          className="bg-cover bg-center w-full h-full"
          width={1500}
          height={1200}
          onClick={() =>
            setOpen(
              <CustomModal>
                <Image
                  src={"/images/carousel_img4.jpg"}
                  alt="fullImage"
                  width={1500}
                  height={1200}
                />
              </CustomModal>
            )
          }
        />
      </div>
      <div className="w-1/4 h-full cursor-pointer">
        <Image
          src="/images/carousel_img6.jpg"
          alt="carousel_img6"
          className="bg-cover bg-center w-full h-full"
          width={1500}
          height={1200}
          onClick={() =>
            setOpen(
              <CustomModal>
                <Image
                  src={"/images/carousel_img6.jpg"}
                  alt="fullImage"
                  width={1500}
                  height={1200}
                />
              </CustomModal>
            )
          }
        />
      </div> */}
    </div>
  );
};

export default GalleryBottomRow;
