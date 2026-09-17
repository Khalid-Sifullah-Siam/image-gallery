"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaUpload,
  FaImage,
  FaVectorSquare,
  FaTimes,
  FaCheck,
  FaLink,
  FaCloudUploadAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { ImageInfo } from "@/types/index.d";

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
  const [mounted, setMounted] = useState<boolean>(false);

  // Upload Form State
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [imageTitle, setImageTitle] = useState<string>("");
  const [imageCategory, setImageCategory] = useState<"Photo" | "Vector">("Photo");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetUploadForm = () => {
    setUploadFile(null);
    setPreviewUrl("");
    setUrlInput("");
    setImageTitle("");
    setImageCategory("Photo");
    setFormError("");
    setUploadSuccess(false);
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setFormError("Please select a valid image file (PNG, JPG, SVG, WEBP).");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setFormError("File size must be under 20MB.");
      return;
    }

    setFormError("");
    setUploadFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    if (!imageTitle.trim()) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      setImageTitle(cleanName);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = uploadMode === "file" ? previewUrl : urlInput.trim();
    const finalTitle = imageTitle.trim();

    if (!finalUrl) {
      setFormError(
        uploadMode === "file"
          ? "Please select an image file to upload."
          : "Please enter a valid image URL."
      );
      return;
    }

    if (!finalTitle) {
      setFormError("Please provide a title for this visual.");
      return;
    }

    const newVisual: ImageInfo = {
      id: Date.now() + Math.floor(Math.random() * 100000),
      name: finalTitle,
      url: finalUrl,
      category: imageCategory,
      likes: 0,
      shares: 0,
    };

    onUploadImage?.(newVisual);
    setUploadSuccess(true);
    setFormError("");

    setTimeout(() => {
      resetUploadForm();
      setShowUploadModal(false);
    }, 1200);
  };

  useEffect(() => {
    if (showUploadModal) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setShowUploadModal(false);
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [showUploadModal]);

  const currentFilter = controlledFilter !== undefined ? controlledFilter : internalFilter;
  const currentSearch = controlledSearch !== undefined ? controlledSearch : internalSearch;

  const handleFilterClick = (filter: string) => {
    const nextFilter = currentFilter === filter ? "" : filter;
    if (onFilterChange) {
      onFilterChange(nextFilter);
    } else {
      setInternalFilter(nextFilter);
    }
  };

  const handleSearchInput = (value: string) => {
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

      {/* Modern Floating Search & Filter Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto flex flex-col gap-3 sm:gap-4"
      >
        <form
          role="search"
          aria-label="Search gallery"
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-3"
        >
          {/* Search Input Box with Glass Style */}
          <div className="relative flex-1 flex items-center min-w-0 bg-white dark:bg-slate-800/90 border-2 border-slate-200/90 dark:border-slate-700 rounded-2xl shadow-xs hover:border-slate-300 dark:hover:border-slate-600 focus-within:border-indigo-600 dark:focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-600/10 transition-all duration-200">
            <span className="pl-4 text-slate-400 dark:text-slate-500">
              <FaSearch size={16} aria-hidden="true" />
            </span>

            <input
              id="gallery-search-input"
              type="search"
              value={currentSearch}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search mountains, architecture, cyberpunk, vectors..."
              className="w-full bg-transparent px-3 py-3 sm:py-3.5 text-sm sm:text-base text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none min-w-0"
            />

            {currentSearch && (
              <button
                type="button"
                onClick={() => handleSearchInput("")}
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
              onClick={() => handleFilterClick("Photo")}
              aria-pressed={currentFilter.toLowerCase() === "photo"}
              className={`flex-1 md:flex-initial cursor-pointer flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-bold transition-all duration-200 whitespace-nowrap ${
                currentFilter.toLowerCase() === "photo"
                  ? "border-slate-900 bg-slate-900 dark:border-white dark:bg-white text-white dark:text-slate-950 shadow-md shadow-slate-950/20"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750"
              }`}
            >
              <FaImage className="text-xs sm:text-sm" aria-hidden="true" />
              <span>Photos</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-md ${
                  currentFilter.toLowerCase() === "photo"
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
              onClick={() => handleFilterClick("Vector")}
              aria-pressed={currentFilter.toLowerCase() === "vector"}
              className={`flex-1 md:flex-initial cursor-pointer flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-bold transition-all duration-200 whitespace-nowrap ${
                currentFilter.toLowerCase() === "vector"
                  ? "border-purple-900 bg-purple-900 dark:border-purple-400 dark:bg-purple-600 text-white shadow-md shadow-purple-950/20"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750"
              }`}
            >
              <FaVectorSquare className="text-xs sm:text-sm" aria-hidden="true" />
              <span>Vectors</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-md ${
                  currentFilter.toLowerCase() === "vector"
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 dark:bg-slate-700/80 text-slate-500 dark:text-slate-400"
                }`}
              >
                {vectorsCount}
              </span>
            </motion.button>

            {/* Desktop Upload CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="hidden lg:flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 sm:py-3.5 font-bold text-sm sm:text-base text-white shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/35 transition-all duration-200 whitespace-nowrap"
            >
              <FaUpload className="text-xs" aria-hidden="true" />
              <span>Upload</span>
            </motion.button>
          </div>

          {/* Mobile Upload Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="flex lg:hidden w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 font-bold text-sm text-white shadow-md shadow-indigo-600/20 transition-all"
          >
            <FaUpload className="text-xs" aria-hidden="true" />
            <span>Upload New Visual</span>
          </motion.button>
        </form>
      </motion.div>

      {/* Upload Modal (Portalled directly to document.body with Framer Motion) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {showUploadModal && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Upload visual dialog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
                onClick={() => {
                  resetUploadForm();
                  setShowUploadModal(false);
                }}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-lg p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 text-left my-auto"
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-sky-400 flex items-center justify-center text-lg shrink-0">
                        <FaUpload />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          Upload to Gallery
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Add your photos or vector artwork
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        resetUploadForm();
                        setShowUploadModal(false);
                      }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <FaTimes size={16} />
                    </button>
                  </div>

                  {/* Mode Tabs (File vs URL) */}
                  <div className="mt-4 grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => {
                        setUploadMode("file");
                        setFormError("");
                      }}
                      className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        uploadMode === "file"
                          ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <FaCloudUploadAlt size={16} />
                      <span>Choose File</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setUploadMode("url");
                        setFormError("");
                      }}
                      className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        uploadMode === "url"
                          ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <FaLink size={13} />
                      <span>Image URL</span>
                    </button>
                  </div>

                  <form onSubmit={handleUploadSubmit} className="mt-4 space-y-4">
                    {/* Hidden Native File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml,image/avif"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {/* Mode: File Dropzone */}
                    {uploadMode === "file" && (
                      <div>
                        {!previewUrl ? (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center group ${
                              isDragging
                                ? "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40"
                                : "border-slate-300 dark:border-slate-700 hover:border-indigo-500 bg-slate-50 dark:bg-slate-800/40 hover:bg-indigo-50/30"
                            }`}
                          >
                            <div className="w-12 h-12 mx-auto rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-sky-400 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                              <FaCloudUploadAlt />
                            </div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                              Click to browse or drag & drop image
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              Supports PNG, JPG, WEBP, SVG (max 20MB)
                            </p>
                          </div>
                        ) : (
                          <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-center gap-3.5">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-700">
                              <Image
                                src={previewUrl}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                {uploadFile?.name || "Selected Image"}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                {uploadFile
                                  ? `${(uploadFile.size / 1024).toFixed(1)} KB`
                                  : "Ready to upload"}
                              </p>
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-xs font-bold text-indigo-600 dark:text-sky-400 hover:underline mt-1 cursor-pointer inline-block"
                              >
                                Change Image
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Mode: URL Input */}
                    {uploadMode === "url" && (
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Direct Image Link
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => {
                              setUrlInput(e.target.value);
                              setPreviewUrl(e.target.value.trim());
                              setFormError("");
                            }}
                            placeholder="https://images.unsplash.com/photo-..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600/15"
                          />
                        </div>

                        {previewUrl && (
                          <div className="mt-2 p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                              <Image
                                src={previewUrl}
                                alt="URL Preview"
                                fill
                                unoptimized
                                className="object-cover"
                                onError={() => setFormError("Could not load image from this URL.")}
                              />
                            </div>
                            <span className="text-xs text-slate-600 dark:text-slate-400 truncate">
                              Preview loaded from URL
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Image Title Input */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Visual Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={imageTitle}
                        onChange={(e) => {
                          setImageTitle(e.target.value);
                          setFormError("");
                        }}
                        placeholder="e.g. Sunset in Sylhet"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600/15"
                      />
                    </div>

                    {/* Category Selection */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Category
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setImageCategory("Photo")}
                          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                            imageCategory === "Photo"
                              ? "border-blue-600 bg-blue-50 dark:bg-sky-950/70 text-blue-700 dark:text-sky-300 shadow-xs"
                              : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          <FaImage />
                          <span>Photo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setImageCategory("Vector")}
                          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                            imageCategory === "Vector"
                              ? "border-purple-600 bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 shadow-xs"
                              : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          <FaVectorSquare />
                          <span>Vector</span>
                        </button>
                      </div>
                    </div>

                    {/* Error Notice */}
                    {formError && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium">
                        <FaExclamationCircle className="shrink-0 text-sm" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Success Notice */}
                    {uploadSuccess && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                        <FaCheck className="shrink-0 text-sm" />
                        <span>Visual uploaded successfully! Added to the gallery.</span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          resetUploadForm();
                          setShowUploadModal(false);
                        }}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        type="submit"
                        disabled={uploadSuccess}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-60"
                      >
                        {uploadSuccess ? (
                          <>
                            <FaCheck />
                            <span>Uploaded!</span>
                          </>
                        ) : (
                          <>
                            <FaUpload size={13} />
                            <span>Upload Visual</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
};

export default HeroSection;