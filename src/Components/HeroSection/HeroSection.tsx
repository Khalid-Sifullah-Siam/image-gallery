"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeroSearchBar from "./HeroSearchBar";
import UploadModal from "../UploadModal/UploadModal";
import { ImageInfo } from "@/types";

interface HeroSectionProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  photosCount?: number;
  vectorsCount?: number;
  onUploadImage?: (newImage: ImageInfo) => void;
}

const HeroSection = ({
  searchQuery: controlledSearch,
  onSearchChange,
  activeFilter: controlledFilter,
  onFilterChange,
  photosCount = 14,
  vectorsCount = 14,
  onUploadImage,
}: HeroSectionProps) => {
  const [internalFilter, setInternalFilter] = useState<string>("");
  const [internalSearch, setInternalSearch] = useState<string>("");
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  const currentFilter = controlledFilter !== undefined ? controlledFilter : internalFilter;
  const currentSearch = controlledSearch !== undefined ? controlledSearch : internalSearch;

  const handleFilterChange = (filter: string) => {
    if (onFilterChange) {
      onFilterChange(filter);
    } else {
      setInternalFilter(filter);
    }
  };

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setInternalSearch(value);
    }
  };

  return (
    <header aria-label="Gallery hero and search" className="mb-8 sm:mb-12 flex flex-col">
      {/* Centered Attractive Hero Title & Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center my-4 sm:my-8 space-y-3 sm:space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-indigo-950/70 dark:to-slate-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/60 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-sky-400 animate-pulse" />
          <span>Curated Visual Library</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          Explore Creative{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-xs">
            Visuals
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          High-definition photography and vector artwork, curated for modern designers and creators.
        </p>
      </motion.div>

      {/* Search Input & Category Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <HeroSearchBar
          searchQuery={currentSearch}
          onSearchChange={handleSearchChange}
          activeFilter={currentFilter}
          onFilterChange={handleFilterChange}
          photosCount={photosCount}
          vectorsCount={vectorsCount}
          onOpenUpload={() => setShowUploadModal(true)}
        />
      </motion.div>

      {/* Upload Visual Modal */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadImage={onUploadImage}
      />
    </header>
  );
};

export default HeroSection;