import { FaSearch, FaUpload } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Box & Search Button */}
      <div className="flex flex-1 items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border-2 border-slate-300 bg-slate-200/80 px-4 py-2.5 text-slate-800 placeholder-slate-500 transition-all duration-150 focus:border-slate-500 focus:bg-white focus:outline-none"
        />
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-slate-800 px-4 py-2.5 font-bold text-slate-800 transition-all duration-150 hover:bg-slate-800 hover:text-white active:translate-y-0.5 whitespace-nowrap"
        >
          <FaSearch />
          <span>Search</span>
        </button>
      </div>

      {/* Upload Button */}
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-slate-700 px-6 py-2.5 font-bold text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-900/25 active:translate-y-0 active:scale-95 sm:w-auto whitespace-nowrap"
      >
        <FaUpload className="text-sm" />
        <span>UPLOAD</span>
      </button>
    </div>
  );
};

export default HeroSection;