"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/Components/Navbar/Navbar";
import HeroSection from "@/Components/HeroSection/HeroSection";
import PhotosSection from "@/Components/PhotosSection/PhotosSection";
import Footer from "@/Components/Footer/Footer";
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

export default function Home() {
  const [images, setImages] = useState<ImageInfo[]>(() => dedupeImages(imagesData));
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  // Load custom uploaded images from localStorage & delete the last uploaded image as requested
  useEffect(() => {
    try {
      const saved = localStorage.getItem("custom_gallery_uploads");
      if (saved) {
        const parsed: ImageInfo[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Remove the last uploaded image (id: 1789669569303 or parsed[0])
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

  const handleUploadImage = (newImage: ImageInfo) => {
    setImages((prev) => dedupeImages([newImage, ...prev]));

    // Perform localStorage mutation safely outside of setState updater
    try {
      const saved = localStorage.getItem("custom_gallery_uploads");
      const existing: ImageInfo[] = saved ? JSON.parse(saved) : [];
      const updatedCustom = dedupeImages([newImage, ...existing]);
      localStorage.setItem("custom_gallery_uploads", JSON.stringify(updatedCustom));
    } catch (err) {
      console.error("Failed to save upload to localStorage:", err);
    }
  };

  const handleDeleteImage = (id: number) => {
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
  };

  const photosCount = images.filter(
    (item) => item.category.toLowerCase() === "photo"
  ).length;
  const vectorsCount = images.filter(
    (item) => item.category.toLowerCase() === "vector"
  ).length;

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/60 via-slate-50 to-indigo-100/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto my-auto p-4 sm:p-7 md:p-10 lg:p-12 bg-white/85 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800/80 rounded-2xl sm:rounded-[2.25rem] shadow-[0_25px_80px_-15px_rgba(15,23,42,0.08)] dark:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-300"
      >
        <Navbar />
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          photosCount={photosCount}
          vectorsCount={vectorsCount}
          onUploadImage={handleUploadImage}
        />
        <PhotosSection
          images={images}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          onDeleteImage={handleDeleteImage}
          onResetFilters={() => {
            setSearchQuery("");
            setActiveFilter("");
          }}
        />
        <Footer />
      </motion.div>
    </main>
  );
}
