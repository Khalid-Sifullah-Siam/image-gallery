"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUpload,
  FaImage,
  FaVectorSquare,
  FaLink,
  FaCloudUploadAlt,
  FaCheck,
  FaExclamationCircle,
} from "react-icons/fa";
import { ImageInfo } from "@/types/index.d";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadImage?: (newImage: ImageInfo) => void;
}

const UploadModal = ({ isOpen, onClose, onUploadImage }: UploadModalProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
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

  const handleClose = () => {
    resetUploadForm();
    onClose();
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
      handleClose();
    }, 1200);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleClose();
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-xs">
                  <FaUpload size={14} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    Upload to Gallery
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add high-res photos or vector graphics
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close upload modal"
              >
                <FaTimes size={12} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 pt-4">
              {/* Mode Toggle (Local File vs Online URL) */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setUploadMode("file");
                    setFormError("");
                  }}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl transition-all cursor-pointer ${
                    uploadMode === "file"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <FaCloudUploadAlt size={14} />
                  <span>Local File</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUploadMode("url");
                    setFormError("");
                  }}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl transition-all cursor-pointer ${
                    uploadMode === "url"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <FaLink size={12} />
                  <span>Image URL</span>
                </button>
              </div>

              {/* Mode: Local File Upload */}
              {uploadMode === "file" && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {!previewUrl ? (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                        isDragging
                          ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30"
                          : "border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl mb-3">
                        <FaCloudUploadAlt />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                        Click or drag image here
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        PNG, JPG, WEBP, or SVG up to 20MB
                      </p>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
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
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                        Preview ready
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Visual Title
                </label>
                <input
                  type="text"
                  required
                  value={imageTitle}
                  onChange={(e) => {
                    setImageTitle(e.target.value);
                    setFormError("");
                  }}
                  placeholder="e.g. Misty Redwood Forest"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600/15"
                />
              </div>

              {/* Category Selector */}
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
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 shadow-xs"
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
                  onClick={handleClose}
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
  );
};

export default UploadModal;
