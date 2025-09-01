// hooks/useNavbarAuth.ts
import { useEffect, useMemo, useState } from "react";
import { getAllImages } from "@/lib/queries";
import { GalleryCategoryType, GetAllImages } from "@/lib/types";

export function useGalleryImages() {
  const [images, setImages] = useState<GetAllImages[]>([]);
  const [categories, setCategories] = useState<GalleryCategoryType>([]);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    setLoaded(false);
    const getGalleryImages = async () => {
      const response = await getAllImages();
      setImages(response);
      const categories = Array.from(
        new Set(response.map((image) => image.name))
      );
      setCategories(categories);
    };
    getGalleryImages();
  }, []);

  return { images, categories, loaded };
}
