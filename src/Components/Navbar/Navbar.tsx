"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import NavItem from "./NavItem";
import { FaBars, FaTimes, FaImage } from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      aria-label="Main Navigation"
      className="mb-8 sm:mb-12 border-b border-slate-200/80 dark:border-slate-800 pb-4 sm:pb-6"
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Modern Brand Logo */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer min-w-0"
          aria-label="Image Gallery Home"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-900 to-blue-600 dark:from-indigo-600 dark:to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-950/20 shrink-0"
          >
            <FaImage className="text-lg sm:text-xl" aria-hidden="true" />
          </motion.div>

          <div className="flex items-baseline gap-1.5 truncate">
            <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white truncate">
              Image<span className="text-indigo-600 dark:text-sky-400">Gallery</span>
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
              v2.0
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links & Theme Toggle */}
        <div className="hidden md:flex md:items-center md:gap-3 lg:gap-4">
          <NavItem />
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
          <ThemeToggle />
        </div>

        {/* Mobile Actions: Theme Toggle & Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <span
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-90 scale-110 text-indigo-600 dark:text-sky-400" : "rotate-0"
              }`}
              aria-hidden="true"
            >
              {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <div className="pt-3.5">
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 shadow-xl backdrop-blur-md">
                <NavItem onNavigate={() => setIsOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
