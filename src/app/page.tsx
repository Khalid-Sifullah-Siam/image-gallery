"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "@/Components/Navbar/Navbar";
import HeroSection from "@/Components/HeroSection/HeroSection";
import PhotosSection from "@/Components/PhotosSection/PhotosSection";
import Footer from "@/Components/Footer/Footer";
import { useCustomUploads } from "@/hooks/useCustomUploads";
import { useGalleryUrlSync } from "@/hooks/useGalleryUrlSync";

function GalleryFallback() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/60 via-slate-50 to-indigo-100/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto my-auto p-4 sm:p-7 md:p-10 lg:p-12 bg-white/85 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800/80 rounded-2xl sm:rounded-[2.25rem] shadow-sm backdrop-blur-md">
        <Navbar />
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading gallery...</p>
        </div>
        <Footer />
      </div>
    </main>
  );
}

function GalleryContent() {
  const { images, handleUploadImage, handleDeleteImage } = useCustomUploads();
  const {
    searchQuery,
    activeFilter,
    handleSearchChange,
    handleFilterChange,
    handleResetFilters,
  } = useGalleryUrlSync();

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
          onSearchChange={handleSearchChange}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          photosCount={photosCount}
          vectorsCount={vectorsCount}
          onUploadImage={handleUploadImage}
        />
        <PhotosSection
          images={images}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onDeleteImage={handleDeleteImage}
          onResetFilters={handleResetFilters}
        />
        <Footer />
      </motion.div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<GalleryFallback />}>
      <GalleryContent />
    </Suspense>
  );
}
