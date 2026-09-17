"use client";

import { motion } from "framer-motion";
import { FaSearchPlus } from "react-icons/fa";

interface EmptyGalleryStateProps {
  onResetFilters?: () => void;
}

const EmptyGalleryState = ({ onResetFilters }: EmptyGalleryStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-16 sm:py-24 text-center rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-6 space-y-4"
    >
      <div className="w-16 h-16 mx-auto rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-slate-400 dark:text-slate-500 text-2xl">
        <FaSearchPlus />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        No matching visuals found
      </h3>
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
  );
};

export default EmptyGalleryState;
