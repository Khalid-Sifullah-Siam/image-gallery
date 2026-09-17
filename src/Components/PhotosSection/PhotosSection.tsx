"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaSearchPlus, FaTimes } from "react-icons/fa";
import { imagesData } from "@/lib/db";
import PhotoCard from "../PhotoCard.tsx/PhotoCard";
import PhotoModal from "../PhotoModal/PhotoModal";
import { ImageInfo } from "@/types/index.d";

const ITEMS_PER_PAGE = 6;

interface PhotosSectionProps {
  images?: ImageInfo[];
  searchQuery?: string;
  activeFilter?: string;
  onDeleteImage?: (id: number) => void;
  onResetFilters?: () => void;
}

const PhotosSection = ({
  images,
  searchQuery = "",
  activeFilter = "",
  onDeleteImage,
  onResetFilters,
}: PhotosSectionProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [previewImage, setPreviewImage] = useState<ImageInfo | null>(null);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());

  // Guarantee unique IDs across all images to prevent duplicate React keys
  const allImages = useMemo(() => {
    const source = images && images.length > 0 ? images : imagesData;
    const seen = new Set<number>();
    return source.filter((img) => {
      if (!img || !img.id || seen.has(img.id)) return false;
      seen.add(img.id);
      return true;
    });
  }, [images]);

  // Filter images dynamically by search query and category
  const filteredImages = useMemo(() => {
    return allImages.filter((img) => {
      // Category filter
      if (
        activeFilter &&
        activeFilter.trim() !== "" &&
        img.category.toLowerCase() !== activeFilter.toLowerCase()
      ) {
        return false;
      }

      // Search query filter
      if (searchQuery && searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = img.name.toLowerCase().includes(query);
        const matchesCategory = img.category.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, activeFilter]);

  // Reset to page 1 whenever filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredImages.length);
  const currentImages = filteredImages.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const section = document.getElementById("photo-gallery-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      id="photo-gallery-section"
      aria-label="Photo gallery"
      className="w-full flex flex-col gap-6 pt-2"
    >
      {/* Header with Title, Active Filters & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-200/80 dark:border-slate-800 pt-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {activeFilter ? `${activeFilter}s Collection` : "Featured Media"}
          </h2>

          {(searchQuery || activeFilter) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5"
            >
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                  Search: &ldquo;{searchQuery}&rdquo;
                </span>
              )}
              {activeFilter && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950">
                  Type: {activeFilter}
                </span>
              )}
              {onResetFilters && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onResetFilters}
                  aria-label="Reset all filters"
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors cursor-pointer"
                >
                  <FaTimes size={10} />
                  <span>Reset</span>
                </motion.button>
              )}
            </motion.div>
          )}
        </div>

        {filteredImages.length > 0 && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="font-bold text-slate-900 dark:text-slate-100">{startIndex + 1}</span>–
            <span className="font-bold text-slate-900 dark:text-slate-100">{endIndex}</span> of{" "}
            <span className="font-bold text-slate-900 dark:text-slate-100">{filteredImages.length}</span> results
          </p>
        )}
      </div>

      {/* Empty State when no photos match filter */}
      {filteredImages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 sm:py-24 text-center rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-6 space-y-4"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-slate-400 dark:text-slate-500 text-2xl">
            <FaSearchPlus />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No matching visuals found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            We couldn&apos;t find anything matching your search. Try checking your spelling or clearing filters.
          </p>
          {onResetFilters && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onResetFilters}
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-sm font-bold shadow-md hover:bg-slate-800 dark:hover:bg-slate-100 transition-all cursor-pointer"
            >
              Clear All Filters
            </motion.button>
          )}
        </motion.div>
      ) : (
        /* Animated Photos Grid */
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {currentImages.map((imageData) => (
              <PhotoCard
                key={imageData.id}
                imageData={imageData}
                onPreview={(img) => setPreviewImage(img)}
                isLiked={likedIds.has(imageData.id)}
                isBookmarked={bookmarkedIds.has(imageData.id)}
                onToggleLike={toggleLike}
                onToggleBookmark={toggleBookmark}
                onDelete={onDeleteImage}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Gallery pagination"
          className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
        >
          {/* Previous Page Button */}
          <motion.button
            whileHover={currentPage !== 1 ? { scale: 1.04 } : {}}
            whileTap={currentPage !== 1 ? { scale: 0.96 } : {}}
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <FaChevronLeft className="text-xs" aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </motion.button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <motion.button
                key={pageNum}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Page ${pageNum}`}
                className={`min-w-9 h-9 sm:min-w-10 sm:h-10 flex items-center justify-center rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md shadow-slate-900/25"
                    : "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
                }`}
              >
                {pageNum}
              </motion.button>
            );
          })}

          {/* Next Page Button */}
          <motion.button
            whileHover={currentPage !== totalPages ? { scale: 1.04 } : {}}
            whileTap={currentPage !== totalPages ? { scale: 0.96 } : {}}
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="hidden sm:inline">Next</span>
            <FaChevronRight className="text-xs" aria-hidden="true" />
          </motion.button>
        </nav>
      )}

      {/* Lightbox / Preview Modal */}
      <PhotoModal
        image={previewImage}
        onClose={() => setPreviewImage(null)}
        isLiked={previewImage ? likedIds.has(previewImage.id) : false}
        isBookmarked={previewImage ? bookmarkedIds.has(previewImage.id) : false}
        onToggleLike={toggleLike}
        onToggleBookmark={toggleBookmark}
        onDelete={onDeleteImage}
      />
    </section>
  );
};

export default PhotosSection;