"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { imagesData } from "@/lib/db";
import PhotoCard from "../PhotoCard.tsx/PhotoCard";
import PhotoModal from "../PhotoModal/PhotoModal";
import ActiveFiltersBar from "./ActiveFiltersBar";
import EmptyGalleryState from "./EmptyGalleryState";
import Pagination from "./Pagination";
import { ImageInfo } from "@/types/index.d";

const ITEMS_PER_PAGE = 6;

interface PhotosSectionProps {
  images?: ImageInfo[];
  searchQuery?: string;
  activeFilter?: string;
  onSearchChange?: (query: string) => void;
  onFilterChange?: (filter: string) => void;
  onDeleteImage?: (id: number) => void;
  onResetFilters?: () => void;
}

const PhotosSection = ({
  images,
  searchQuery = "",
  activeFilter = "",
  onSearchChange,
  onFilterChange,
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
      if (
        activeFilter &&
        activeFilter.trim() !== "" &&
        img.category.toLowerCase() !== activeFilter.toLowerCase()
      ) {
        return false;
      }

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
  }, [allImages, searchQuery, activeFilter]);

  // Reset to page 1 whenever filters change (adjusting state during render per React guidelines)
  const [prevSearch, setPrevSearch] = useState<string>(searchQuery);
  const [prevFilter, setPrevFilter] = useState<string>(activeFilter);

  if (searchQuery !== prevSearch || activeFilter !== prevFilter) {
    setPrevSearch(searchQuery);
    setPrevFilter(activeFilter);
    setCurrentPage(1);
  }

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
      {/* Header with Title, Active Filter Pills, Share Link & Counter */}
      <ActiveFiltersBar
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        totalFiltered={filteredImages.length}
        startIndex={startIndex}
        endIndex={endIndex}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
      />

      {/* Empty State vs Photos Grid */}
      {filteredImages.length === 0 ? (
        <EmptyGalleryState onResetFilters={onResetFilters} />
      ) : (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

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