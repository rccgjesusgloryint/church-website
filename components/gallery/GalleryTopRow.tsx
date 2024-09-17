import Image from "next/image";
import React from "react";
import CustomModal from "../global/custom-modal";

type Props = {
  setOpen: (modal: React.JSX.Element) => void;
};

const GalleryTopRow = ({ setOpen }: Props) => {
  return (
    <div className="flex flex-rows w-full h-[500px] gap-10 mb-10">
      <div className="w-1/4 cursor-pointer">
        <Image
          src="/images/carousel_img1.jpg"
          alt="carousel_img1"
          className="bg-cover bg-center w-full h-full"
          width={1500}
          height={1200}
          onClick={() =>
            setOpen(
              <CustomModal>
                <Image
                  src={"/images/carousel_img1.jpg"}
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
          src="/images/carousel_img2.jpg"
          alt="carousel_img2"
          className="bg-cover bg-center w-full h-full"
          width={800}
          height={800}
          onClick={() =>
            setOpen(
              <CustomModal>
                <Image
                  src={"/images/carousel_img2.jpg"}
                  alt="fullImage"
                  width={1500}
                  height={1200}
                />
              </CustomModal>
            )
          }
        />
      </div>
      <div className="w-2/4 h-full cursor-pointer">
        <Image
          src="/images/carousel_img3.jpg"
          alt="carousel_img3"
          className="bg-cover bg-center w-full h-full"
          width={1500}
          height={1200}
          onClick={() =>
            setOpen(
              <CustomModal>
                <Image
                  src={"/images/carousel_img3.jpg"}
                  alt="fullImage"
                  width={1500}
                  height={1200}
                />
              </CustomModal>
            )
          }
        />
      </div>
    </div>
  );
};

export default GalleryTopRow;
