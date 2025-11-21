"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useModal } from "@/providers/modal-provider";
import MobileView from "./MobileView";
import GalleryTopRow from "./GalleryTopRow";
import GalleryBottomRow from "./GalleryBottomRow";
import ViewAllBtn from "./ViewAllBtn";
import { CarosoulImageType } from "@/lib/types";
import { getRandomImages } from "@/lib/queries";
import Arrow from "../icons/Arrow";
import { FaArrowRight } from "react-icons/fa6";

const FALLBACK = "/images/placeholder.svg"; // keep a local tiny svg/png

export default function GalleryPreview() {
  const [images, setImages] = useState<CarosoulImageType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setOpen } = useModal();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        const res = await getRandomImages(6);
        if (mounted) setImages(res ?? []);
      } catch {
        if (mounted) setImages([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Normalize & guard: always 0–6 items
  const top = useMemo(() => images?.slice(0, 3) ?? [], [images]);
  const bottom = useMemo(() => images?.slice(3, 6) ?? [], [images]);

  console.log("top", top);
  console.log("bottom", bottom);

  return (
    <section className="relative py-10 w-screen">
      {/* Desktop / Tablet */}
      <div className="hidden sm:flex flex-col py-[10%]">
        <GalleryTopRow
          setOpen={setOpen}
          images={top}
          isLoading={isLoading}
          fallback={FALLBACK}
        />
        <GalleryBottomRow
          setOpen={setOpen}
          images={bottom}
          isLoading={isLoading}
          fallback={FALLBACK}
        />
        <ViewAllBtn />
      </div>

      {/* Mobile */}
      <MobileView images={images ?? []} isLoading={isLoading} />
    </section>
  );
}
