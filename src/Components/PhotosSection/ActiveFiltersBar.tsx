"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaShareAlt, FaCheck } from "react-icons/fa";

interface ActiveFiltersBarProps {
  activeFilter: string;
  searchQuery: string;
  totalFiltered: number;
  startIndex: number;
  endIndex: number;
  onSearchChange?: (query: string) => void;
  onFilterChange?: (filter: string) => void;
  onResetFilters?: () => void;
}

const ActiveFiltersBar = ({
  activeFilter,
  searchQuery,
  totalFiltered,
  startIndex,
  endIndex,
  onSearchChange,
  onFilterChange,
  onResetFilters,
}: ActiveFiltersBarProps) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleCopyShareLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-200/80 dark:border-slate-800 pt-6">
      <div className="flex flex-wrap items-center gap-2.5">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          {activeFilter ? `${activeFilter}s Collection` : "Featured Media"}
        </h2>

        {(searchQuery || activeFilter) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap items-center gap-1.5"
          >
            {/* Search Query Chip */}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                {onSearchChange && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="text-indigo-500 hover:text-indigo-800 dark:hover:text-white cursor-pointer ml-0.5"
                    aria-label="Remove search filter"
                  >
                    <FaTimes size={10} />
                  </button>
                )}
              </span>
            )}

            {/* Category Filter Chip */}
            {activeFilter && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950">
                <span>Type: {activeFilter}</span>
                {onFilterChange && (
                  <button
                    type="button"
                    onClick={() => onFilterChange("")}
                    className="opacity-75 hover:opacity-100 cursor-pointer ml-0.5"
                    aria-label="Remove category filter"
                  >
                    <FaTimes size={10} />
                  </button>
                )}
              </span>
            )}

            {/* Shareable Link Button */}
            <button
              type="button"
              onClick={handleCopyShareLink}
              aria-label="Copy shareable link for current filters"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer shadow-2xs"
            >
              {copiedLink ? (
                <>
                  <FaCheck className="text-emerald-600 dark:text-emerald-400 text-[10px]" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <FaShareAlt className="text-slate-400 dark:text-slate-400 text-[10px]" />
                  <span>Share Link</span>
                </>
              )}
            </button>

            {/* Reset All Filters Button */}
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
                <span>Reset All</span>
              </motion.button>
            )}
          </motion.div>
        )}
      </div>

      {/* Item Counter */}
      {totalFiltered > 0 && (
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Showing <span className="font-bold text-slate-900 dark:text-slate-100">{startIndex + 1}</span>–
          <span className="font-bold text-slate-900 dark:text-slate-100">{endIndex}</span> of{" "}
          <span className="font-bold text-slate-900 dark:text-slate-100">{totalFiltered}</span> results
        </p>
      )}
    </div>
  );
};

export default ActiveFiltersBar;
