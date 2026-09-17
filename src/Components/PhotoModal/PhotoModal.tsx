"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart, FaShareAlt, FaDownload, FaTags, FaSpinner, FaCheck, FaTrash } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { useIsMounted } from "@/hooks/useIsMounted";
import { ImageInfo } from "@/types";

interface PhotoModalProps {
  image: ImageInfo | null;
  onClose: () => void;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onToggleLike?: (id: number) => void;
  onToggleBookmark?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const PhotoModal = ({
  image,
  onClose,
  isLiked = false,
  isBookmarked = false,
  onToggleLike,
  onToggleBookmark,
  onDelete,
}: PhotoModalProps) => {
  const mounted = useIsMounted();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    if (!image || isDownloading) return;
    setIsDownloading(true);

    try {
      if (image.url.startsWith("data:") || image.url.startsWith("blob:")) {
        const link = document.createElement("a");
        link.href = image.url;
        const cleanName = (image.name || "visual").replace(/[^a-zA-Z0-9_\-]/g, "_").toLowerCase();
        link.download = `${cleanName}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const downloadUrl = `/api/download?url=${encodeURIComponent(image.url)}&filename=${encodeURIComponent(image.name)}`;
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", `${image.name}.jpg`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error("Download failed:", err);
      window.open(image.url, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (image) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Preview of ${image.name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Modal Card */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/70">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg uppercase tracking-wider ${
                    image.category === "Vector"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60"
                      : "bg-blue-100 text-blue-800 dark:bg-sky-950/80 dark:text-sky-300 border border-blue-200 dark:border-sky-800/60"
                  }`}
                >
                  {image.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                  {image.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close preview"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <FaTimes size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative flex-1 min-h-[280px] sm:min-h-[420px] max-h-[60vh] bg-slate-950 flex items-center justify-center overflow-hidden">
              <Image
                src={image.url}
                alt={image.name}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Footer / Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              {/* Stats & Metadata */}
              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <FaHeart className={isLiked ? "text-rose-500" : "text-slate-400 dark:text-slate-500"} />
                  <strong className="text-slate-900 dark:text-white">
                    {image.likes + (isLiked ? 1 : 0)}
                  </strong>{" "}
                  likes
                </span>
                <span className="flex items-center gap-1.5">
                  <FaShareAlt className="text-slate-400 dark:text-slate-500" />
                  <strong className="text-slate-900 dark:text-white">{image.shares}</strong> shares
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-slate-400 dark:text-slate-500">
                  <FaTags /> High Resolution
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => onToggleBookmark?.(image.id)}
                  aria-label="Save to bookmarks"
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isBookmarked
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/70 dark:text-indigo-400"
                      : "border-slate-300 dark:border-slate-700 hover:border-slate-800 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800"
                  }`}
                >
                  <FiBookmark size={18} aria-hidden="true" />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => onToggleLike?.(image.id)}
                  aria-label="Like image"
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isLiked
                      ? "border-rose-500 bg-rose-50 text-rose-500 dark:bg-rose-950/70 dark:text-rose-400"
                      : "border-slate-300 dark:border-slate-700 hover:border-slate-800 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800"
                  }`}
                >
                  <FaHeart size={18} aria-hidden="true" />
                </motion.button>

                {onDelete && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => {
                      onDelete(image.id);
                      onClose();
                    }}
                    aria-label={`Delete ${image.name}`}
                    title="Delete visual"
                    className="p-2.5 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                  >
                    <FaTrash size={16} aria-hidden="true" />
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  aria-label={`Download ${image.name}`}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                    downloadSuccess
                      ? "bg-emerald-600 text-white shadow-emerald-600/30"
                      : "bg-slate-900 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white"
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      <span>Downloading...</span>
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <FaCheck className="text-sm" />
                      <span>Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <FaDownload size={13} aria-hidden="true" />
                      <span>Download</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default PhotoModal;
