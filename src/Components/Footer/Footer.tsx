"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaHeart,
  FaArrowUp,
  FaEnvelope,
  FaImage,
} from "react-icons/fa";

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="mt-12 sm:mt-16 md:mt-20 border-t border-slate-200/90 dark:border-slate-800 pt-10 sm:pt-14 pb-6 sm:pb-8 transition-colors duration-200"
    >
      {/* 1. Centered Title & Tagline */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
          aria-label="Image Gallery homepage"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-900 to-blue-600 dark:from-indigo-600 dark:to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-950/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <FaImage className="text-lg sm:text-xl" aria-hidden="true" />
          </div>
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Image<span className="text-indigo-600 dark:text-sky-400">Gallery</span>
          </span>
        </Link>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
          A curated creative hub for visual inspiration. Explore, download, and share high-resolution photos and vector art.
        </p>
      </div>

      {/* 2. Full-Width Social Icons Bar (Left to Right full width with gap in between) */}
      <div className="w-full my-8 sm:my-10 pt-6 pb-6 border-y border-slate-200/80 dark:border-slate-800">
        <div className="w-full flex items-center justify-between gap-2.5 sm:gap-4 md:gap-6">
          {[
            { icon: FaGithub, href: "https://github.com", label: "GitHub" },
            { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
            { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow on ${label}`}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2.5 py-3 sm:py-3.5 px-2 sm:px-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-900 dark:hover:bg-white hover:border-slate-900 dark:hover:border-white text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-950 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer text-center"
            >
              <Icon size={16} aria-hidden="true" className="shrink-0" />
              <span className="text-xs sm:text-sm font-bold tracking-tight">
                {label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* 3. Links Section & Newsletter (justify-between up to md, 3-column with Stay Inspired on right on lg) */}
      <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        {/* Quick Links (Navigation) */}
        <div className="col-span-1 lg:col-span-3 space-y-3.5 text-left">
          <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-900 dark:text-white">
            Navigation
          </h3>
          <ul role="list" className="space-y-2 text-xs sm:text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "/about" },
              { name: "Contact", href: "/contact" },
              { name: "Top Photos", href: "/#photo-gallery-section" },
              { name: "Vectors", href: "/#photo-gallery-section" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-sky-400 font-medium transition-colors duration-150 inline-block py-0.5"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources & Community (Right column on mobile/md, adjacent column on lg) */}
        <div className="col-span-1 lg:col-span-3 justify-self-end lg:justify-self-start space-y-3.5 text-left">
          <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-900 dark:text-white">
            Resources
          </h3>
          <ul role="list" className="space-y-2 text-xs sm:text-sm">
            {[
              { name: "Free License", href: "/about" },
              { name: "Community Upload", href: "/#photo-gallery-section" },
              { name: "Creator Guidelines", href: "/about" },
              { name: "Help Center", href: "/contact" },
              { name: "Feedback & Ideas", href: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-sky-400 font-medium transition-colors duration-150 inline-block py-0.5"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription (Stay Inspired - Centered below on mobile/md, Right side on lg) */}
        <div className="col-span-2 lg:col-span-6 mt-8 sm:mt-10 lg:mt-0 pt-8 sm:pt-10 lg:pt-0 border-t border-slate-200/80 dark:border-slate-800 lg:border-t-0 space-y-3.5 text-center lg:text-left flex flex-col items-center lg:items-start max-w-xl lg:max-w-none mx-auto lg:mx-0 w-full">
          <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-900 dark:text-white">
            Stay Inspired
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto lg:mx-0">
            Get the week’s best curated visuals and new collection drops delivered directly to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 w-full max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-2xs focus-within:border-indigo-600 dark:focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-600/10 transition-all">
              <span className="pl-2.5 text-slate-400 dark:text-slate-500">
                <FaEnvelope aria-hidden="true" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                className="w-full bg-transparent px-2 py-1.5 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none min-w-0"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="shrink-0 cursor-pointer rounded-lg bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors"
              >
                Join
              </motion.button>
            </div>

            <AnimatePresence>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 text-center lg:text-left"
                >
                  ✓ Thank you for subscribing!
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      {/* Bottom Bar (Copyright, Legal & Back to Top) */}
      <div className="mt-10 sm:mt-12 md:mt-14 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <p className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-center md:text-left">
          <span>© {currentYear} Image Gallery. Made with</span>
          <FaHeart className="text-rose-500 text-xs inline" aria-label="love" />
          <span>
            by{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Khalid Sifullah Siam
            </span>
            .
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link href="/about" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/about" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            Terms of Service
          </Link>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-300/80 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold shadow-2xs transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <FaArrowUp className="text-[10px]" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
