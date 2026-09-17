"use client";

import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Gallery pagination"
      className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
    >
      {/* Previous Page Button */}
      <motion.button
        whileHover={currentPage !== 1 ? { scale: 1.04 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.96 } : {}}
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
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
            onClick={() => onPageChange(pageNum)}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 shadow-2xs transition-all hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <span className="hidden sm:inline">Next</span>
        <FaChevronRight className="text-xs" aria-hidden="true" />
      </motion.button>
    </nav>
  );
};

export default Pagination;
