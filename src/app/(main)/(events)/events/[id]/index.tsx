import { FALLBACK } from "@/app/(main)/gallery/GalleryModal";
import Image from "next/image";

interface EventCardProps {
  image: {
    src: string;
    width: number;
    height: number;
  };
}

export function ImageCard({ image }: EventCardProps) {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={image.src || FALLBACK}
        alt={"title"}
        className="w-1/2 h-1/2 object-contain transition-transform duration-300 hover:scale-105"
        width={image.width}
        height={image.height}
      />
    </div>
  );
}
