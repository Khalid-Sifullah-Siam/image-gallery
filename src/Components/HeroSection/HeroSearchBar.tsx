"use client";

import { motion } from "framer-motion";
import { FaSearch, FaTimes, FaImage, FaVectorSquare, FaUpload } from "react-icons/fa";

interface HeroSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  photosCount: number;
  vectorsCount: number;
  onOpenUpload: () => void;
}

const HeroSearchBar = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  photosCount,
  vectorsCount,
  onOpenUpload,
}: HeroSearchBarProps) => {
  const isPhotosActive = activeFilter.toLowerCase() === "photo";
  const isVectorsActive = activeFilter.toLowerCase() === "vector";

  const handleFilterToggle = (category: string) => {
    const next = activeFilter.toLowerCase() === category.toLowerCase() ? "" : category;
    onFilterChange(next);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-3 sm:gap-4">
      <form
        role="search"
        aria-label="Search gallery"
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-3"
      >
        {/* Search Input Bar */}
        <div className="relative flex-1 flex items-center min-w-0 bg-white dark:bg-slate-800/90 border-2 border-slate-200/90 dark:border-slate-700 rounded-2xl shadow-xs hover:border-slate-300 dark:hover:border-slate-600 focus-within:border-indigo-600 dark:focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-600/10 transition-all duration-200">
          <span className="pl-4 text-slate-400 dark:text-slate-500">
            <FaSearch size={16} aria-hidden="true" />
          </span>

          <input
            id="gallery-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search mountains, architecture, cyberpunk, vectors..."
            className="w-full bg-transparent px-3 py-3 sm:py-3.5 text-sm sm:text-base text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none min-w-0"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="p-2 mr-1 text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>

        {/* Quick Category Filter Chips */}
        <div className="flex items-center gap-2 shrink-0">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleFilterToggle("Photo")}
            aria-pressed={isPhotosActive}
            className={`flex-1 md:flex-initial cursor-pointer flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-bold transition-all duration-200 whitespace-nowrap ${
              isPhotosActive
                ? "border-slate-900 bg-slate-900 dark:border-white dark:bg-white text-white dark:text-slate-950 shadow-md shadow-slate-950/20"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750"
            }`}
          >
            <FaImage className="text-xs sm:text-sm" aria-hidden="true" />
            <span>Photos</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-md ${
                isPhotosActive
                  ? "bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-950"
                  : "bg-slate-100 dark:bg-slate-700/80 text-slate-500 dark:text-slate-400"
              }`}
            >
              {photosCount}
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleFilterToggle("Vector")}
            aria-pressed={isVectorsActive}
            className={`flex-1 md:flex-initial cursor-pointer flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-bold transition-all duration-200 whitespace-nowrap ${
              isVectorsActive
                ? "border-purple-900 bg-purple-900 dark:border-purple-400 dark:bg-purple-600 text-white shadow-md shadow-purple-950/20"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750"
            }`}
          >
            <FaVectorSquare className="text-xs sm:text-sm" aria-hidden="true" />
            <span>Vectors</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-md ${
                isVectorsActive
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 dark:bg-slate-700/80 text-slate-500 dark:text-slate-400"
              }`}
            >
              {vectorsCount}
            </span>
          </motion.button>

          {/* Desktop Upload Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onOpenUpload}
            className="hidden lg:flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 sm:py-3.5 font-bold text-sm sm:text-base text-white shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/35 transition-all duration-200 whitespace-nowrap"
          >
            <FaUpload className="text-xs" aria-hidden="true" />
            <span>Upload</span>
          </motion.button>
        </div>

        {/* Mobile Upload Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onOpenUpload}
          className="flex lg:hidden w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 font-bold text-sm text-white shadow-md shadow-indigo-600/20 transition-all"
        >
          <FaUpload className="text-xs" aria-hidden="true" />
          <span>Upload New Visual</span>
        </motion.button>
      </form>
    </div>
  );
};

export default HeroSearchBar;
