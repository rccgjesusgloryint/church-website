// hooks/useNavbarAuth.ts
import { useEffect, useMemo, useState } from "react";
import { getAllImages } from "@/lib/queries";
import { GalleryCategoryType, GetAllImages } from "@/lib/types";

export type CategorisedImages = {
  numOfPhotos: number;
  keys: [];
  fullArray: GetAllImages[];
};

export function useGalleryImages() {
  const [images, setImages] = useState<GetAllImages[]>([]);
  const [categories, setCategories] = useState<GalleryCategoryType>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [catImages, setCatImages] = useState<CategorisedImages>({
    fullArray: [],
    keys: [],
    numOfPhotos: 0,
  });

  useEffect(() => {
    const getGalleryImages = async () => {
      const response = await getAllImages();
      setImages(response);
      const categories = Array.from(
        new Set(response.map((image) => image.name))
      );
      setCategories(categories);
      const cat = {
        numOfPhotos: 0,
        keys: new Set(),
        fullArray: [],
      } as any;
      // loop through each image and
      response.map((image) => {
        if (!cat[image.name]) {
          cat[image.name] = [image];
          cat.fullArray.push(image);
          cat.numOfPhotos += 1;
          cat.keys.add(image.name);
        } else {
          cat[image.name].push(image);
          cat.fullArray.push(image);
          cat.numOfPhotos += 1;
        }
        return cat;
      });
      setCatImages(cat);
    };

    getGalleryImages();
    setIsLoading(false);
  }, []);

  return { images, catImages, categories, isLoading };
}
