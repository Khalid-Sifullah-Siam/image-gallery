"use client";

import { useState } from "react";
import Link from "next/link";
import NavItem from "./NavItem";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="mb-20 border-b-2 border-slate-200 pb-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="rounded border-4 px-4 py-2 text-2xl font-bold uppercase tracking-wider shadow-lg transition-all duration-150 active:translate-y-0.5 sm:text-3xl md:text-5xl"
        >
          Image Gallery
        </Link>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border-2 border-slate-900 text-2xl font-bold transition-all duration-200 hover:bg-slate-900 hover:text-white active:scale-95 md:hidden"
        >
          <span
            className={`flex h-full w-full items-center justify-center transition-transform duration-300 ${
              isOpen ? "rotate-180 scale-110" : "rotate-0"
            }`}
            aria-hidden
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </span>
        </button>

        <div className="hidden md:block">
          <NavItem />
        </div>
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <NavItem onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
