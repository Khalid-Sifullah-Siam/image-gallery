"use client";

import { useTheme } from "@/context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { useIsMounted } from "@/hooks/useIsMounted";

import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl border border-slate-200/80 bg-white/60 dark:border-slate-800 dark:bg-slate-900/60" />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="group relative flex items-center justify-center w-10 h-10 rounded-xl border border-slate-300/80 dark:border-slate-700 bg-white/80 dark:bg-slate-800/90 text-slate-700 dark:text-amber-400 shadow-2xs hover:shadow-md hover:border-slate-400 dark:hover:border-slate-600 transition-colors duration-200 cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "dark" : "light"}
          initial={{ y: -12, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 12, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <FaSun className="text-amber-400 text-lg" />
          ) : (
            <FaMoon className="text-slate-700 text-base" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
