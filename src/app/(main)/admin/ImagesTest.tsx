"use client";

import { getImages } from "@/lib/queries";
import { DbImage } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

export default function ImagesTest() {
  const [images, setImages] = useState<any[]>();

  useEffect(() => {
    const getData = async () => {
      const response = await getImages();
      setImages(response);
    };
    getData();
  }, []);
  return (
    <div>
      {images?.map(
        (image) =>
          image?.url && (
            <Image
              key={image.id}
              src={image.url}
              alt={image.event}
              width={1600}
              height={900}
              priority
            />
          )
      )}
    </div>
  );
}
