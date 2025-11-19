import Image from "next/image";
import CustomModal from "../global/custom-modal";
import { shimmerDataURL, ImageSkeleton } from "./_placeholders";
import { CarosoulImageType } from "@/lib/types";

type Props = {
  setOpen: (modal: React.JSX.Element) => void;
  images: CarosoulImageType[];
  isLoading: boolean;
  fallback: string;
};

export default function GalleryBottomRow({
  setOpen,
  images,
  isLoading,
  fallback,
}: Props) {
  const skeletons = Array.from({ length: 3 });

  return (
    <div className="flex w-full h-[500px] gap-10">
      {isLoading
        ? skeletons.map((_, i) => <ImageSkeleton key={i} aspect="4/3" />)
        : images.map((image, index) => {
            const wide = index === 0; // first one wide (matches your layout)
            const widthClass = wide ? "w-2/4" : "w-1/4";

            return (
              <button
                key={image.id ?? `${image.link}-${index}`}
                className={`${widthClass} h-full relative overflow-hidden group rounded-md`}
                onClick={() =>
                  setOpen(
                    <CustomModal>
                      <Image
                        src={image.link || fallback}
                        alt={image.name || "Gallery image"}
                        width={1500}
                        height={1200}
                        unoptimized
                        className="object-contain"
                      />
                    </CustomModal>
                  )
                }
                aria-label={`Open ${image.name ?? "image"} in modal`}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0">
                    <Image
                      src={image.link || fallback}
                      alt={image.name || "Gallery image"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      unoptimized
                      blurDataURL={shimmerDataURL()}
                    />
                  </div>
                  <div className="invisible" style={{ aspectRatio: "4/3" }} />
                </div>
              </button>
            );
          })}
    </div>
  );
}
