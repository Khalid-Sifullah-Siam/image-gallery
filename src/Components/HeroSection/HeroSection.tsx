"use client";

import { FaSearch, FaUpload } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section aria-label="Gallery toolbar" className="mb-6 sm:mb-8 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Box & Search Button */}
      <form
        role="search"
        aria-label="Search photos"
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-1 items-center gap-2 min-w-0"
      >
        <label htmlFor="gallery-search-input" className="sr-only">
          Search photos
        </label>
        <input
          id="gallery-search-input"
          type="search"
          placeholder="Search..."
          className="w-full min-w-0 rounded-xl border-2 border-slate-300 bg-slate-200/80 px-3.5 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base text-slate-800 placeholder-slate-500 transition-all duration-150 focus:border-slate-500 focus:bg-white focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Submit search"
          className="flex shrink-0 cursor-pointer items-center justify-center gap-1.5 sm:gap-2 rounded-xl border-2 border-slate-800 px-3.5 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base font-bold text-slate-800 transition-all duration-150 hover:bg-slate-800 hover:text-white active:translate-y-0.5 whitespace-nowrap"
        >
          <FaSearch aria-hidden="true" />
          <span>Search</span>
        </button>
      </form>

      {/* Upload Button */}
      <button
        type="button"
        className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 sm:gap-2.5 rounded-xl bg-slate-700 px-5 py-2.5 sm:px-6 font-bold text-sm sm:text-base text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-900/25 active:translate-y-0 active:scale-95 sm:w-auto whitespace-nowrap"
      >
        <FaUpload className="text-xs sm:text-sm" aria-hidden="true" />
        <span>UPLOAD</span>
      </button>
    </section>
  );
};

export default HeroSection;