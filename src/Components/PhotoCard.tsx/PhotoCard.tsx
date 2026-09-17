"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaExpandAlt, FaDownload, FaCheck, FaSpinner, FaTrash } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { ImageInfo } from "../../types/index.d";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80";

interface PhotoCardProps {
  imageData: ImageInfo;
  onPreview?: (image: ImageInfo) => void;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onToggleLike?: (id: number) => void;
  onToggleBookmark?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const PhotoCard = ({
  imageData,
  onPreview,
  isLiked = false,
  isBookmarked = false,
  onToggleLike,
  onToggleBookmark,
  onDelete,
}: PhotoCardProps) => {
  const { id, name, url, likes, shares, category } = imageData;
  const [imgSrc, setImgSrc] = useState<string>(url);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(url);
    setImgLoaded(false);
  }, [url]);

  const handleQuickDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      if (url.startsWith("data:") || url.startsWith("blob:")) {
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name.replace(/[^a-zA-Z0-9_\-]/g, "_")}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const downloadEndpoint = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(name)}`;
        const link = document.createElement("a");
        link.href = downloadEndpoint;
        link.download = `${name.replace(/[^a-zA-Z0-9_\-]/g, "_")}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (err) {
      console.error("Quick download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.figure
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      onClick={() => onPreview?.(imageData)}
      className="relative h-full w-full aspect-square group overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer"
    >
      {/* Background Image */}
      <Image
        alt={name}
        src={imgSrc}
        onError={() => setImgSrc(FALLBACK_IMAGE)}
        onLoad={() => setImgLoaded(true)}
        width={600}
        height={600}
        className={`w-full h-full object-cover group-hover:scale-108 transition-all duration-700 ease-out ${
          imgLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Category Tag (Top-Left) */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg uppercase tracking-wider backdrop-blur-md shadow-xs ${
            category === "Vector"
              ? "bg-purple-900/70 text-purple-100 border border-purple-400/30"
              : "bg-slate-900/60 text-sky-100 border border-white/20"
          }`}
        >
          {category}
        </span>
      </div>

      {/* Action Badges (Top-Right: Like & Bookmark) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
      >
        <motion.button
          whileTap={{ scale: 0.8 }}
          type="button"
          onClick={() => onToggleLike?.(id)}
          aria-label={isLiked ? "Unlike photo" : "Like photo"}
          className={`w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
            isLiked
              ? "bg-rose-600 text-white shadow-md shadow-rose-900/30"
              : "bg-slate-900/60 hover:bg-slate-900/90 text-white"
          }`}
        >
          <FaHeart size={13} aria-hidden="true" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.8 }}
          type="button"
          onClick={() => onToggleBookmark?.(id)}
          aria-label={isBookmarked ? "Remove bookmark" : "Save bookmark"}
          className={`w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
            isBookmarked
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30"
              : "bg-slate-900/60 hover:bg-slate-900/90 text-white"
          }`}
        >
          <FiBookmark size={15} aria-hidden="true" />
        </motion.button>

        {onDelete && (
          <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            onClick={() => onDelete(id)}
            aria-label={`Delete ${name}`}
            className="w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md bg-slate-900/60 hover:bg-rose-600 text-white transition-colors cursor-pointer"
          >
            <FaTrash size={12} aria-hidden="true" />
          </motion.button>
        )}
      </div>

      {/* Floating Bottom Card Details */}
      <figcaption className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent flex justify-between items-end gap-2 translate-y-2 sm:translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 ease-out">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-sm sm:text-base truncate drop-shadow-sm">
            {name}
          </h3>
          <p className="text-xs text-slate-300 opacity-90 truncate mt-0.5">
            {likes + (isLiked ? 1 : 0)} likes · {shares} shares
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={handleQuickDownload}
            disabled={isDownloading}
            aria-label={`Download ${name}`}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/30 transition-all text-white cursor-pointer"
          >
            {isDownloading ? (
              <FaSpinner className="animate-spin text-xs" />
            ) : downloaded ? (
              <FaCheck className="text-xs text-emerald-400" />
            ) : (
              <FaDownload size={13} aria-hidden="true" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            aria-label={`View ${name} in full screen`}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/30 transition-all text-white cursor-pointer"
          >
            <FaExpandAlt size={13} aria-hidden="true" />
          </motion.button>
        </div>
      </figcaption>
    </motion.figure>
  );
};

export default PhotoCard;
