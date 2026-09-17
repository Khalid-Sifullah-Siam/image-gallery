"use client";

import { useState, useEffect, useCallback } from "react";
import { imagesData } from "@/lib/db";
import { ImageInfo } from "@/types/index.d";

const dedupeImages = (list: ImageInfo[]): ImageInfo[] => {
  const seen = new Set<number>();
  return list.filter((item) => {
    if (!item || !item.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

export const useCustomUploads = () => {
  const [images, setImages] = useState<ImageInfo[]>(() => dedupeImages(imagesData));

  // Load custom uploaded images from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("custom_gallery_uploads");
      if (saved) {
        const parsed: ImageInfo[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const withoutTarget = parsed.filter((item) => item.id !== 1789669569303);
          const cleaned =
            withoutTarget.length < parsed.length
              ? withoutTarget
              : withoutTarget.slice(1);
          const uniqueCustom = dedupeImages(cleaned);
          localStorage.setItem("custom_gallery_uploads", JSON.stringify(uniqueCustom));
          setImages(dedupeImages([...uniqueCustom, ...imagesData]));
        }
      }
    } catch (err) {
      console.error("Failed to parse custom uploads:", err);
    }
  }, []);

  const handleUploadImage = useCallback((newImage: ImageInfo) => {
    setImages((prev) => dedupeImages([newImage, ...prev]));
    try {
      const saved = localStorage.getItem("custom_gallery_uploads");
      const existing: ImageInfo[] = saved ? JSON.parse(saved) : [];
      const updatedCustom = dedupeImages([newImage, ...existing]);
      localStorage.setItem("custom_gallery_uploads", JSON.stringify(updatedCustom));
    } catch (err) {
      console.error("Failed to save upload to localStorage:", err);
    }
  }, []);

  const handleDeleteImage = useCallback((id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    try {
      const saved = localStorage.getItem("custom_gallery_uploads");
      if (saved) {
        const parsed: ImageInfo[] = JSON.parse(saved);
        const remaining = parsed.filter((item) => item.id !== id);
        localStorage.setItem("custom_gallery_uploads", JSON.stringify(remaining));
      }
    } catch (err) {
      console.error("Failed to delete image from localStorage:", err);
    }
  }, []);

  return {
    images,
    handleUploadImage,
    handleDeleteImage,
  };
};

