"use client";

import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { motion } from "framer-motion";

const values = [
  {
    title: "Curated collections",
    description:
      "We organize visuals with a simple, focused browsing experience that keeps the spotlight on the work itself.",
  },
  {
    title: "Clean presentation",
    description:
      "Every gallery page is designed to feel polished, readable, and easy to scan on both desktop and mobile.",
  },
  {
    title: "Fast exploration",
    description:
      "Lightweight UI and straightforward navigation help visitors move through the gallery without friction.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/60 via-slate-50 to-indigo-100/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto my-auto p-4 sm:p-7 md:p-10 lg:p-12 bg-white/85 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800/80 rounded-2xl sm:rounded-[2.25rem] shadow-[0_25px_80px_-15px_rgba(15,23,42,0.08)] backdrop-blur-md transition-colors duration-300"
      >
        <Navbar />

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              About us
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
                A gallery built to make photography feel premium and simple.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
                Image Gallery is a clean showcase space for visual collections.
                The goal is not clutter, but focus: strong imagery, intuitive
                navigation, and a modern layout that works across every screen.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {[
                ["100%", "Responsive"],
                ["Fast", "Browsing"],
                ["Clean", "Design"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 p-4 shadow-sm"
                >
                  <p className="text-2xl font-black text-slate-950 dark:text-white">{value}</p>
                  <p className="mt-1 text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Our focus
            </p>
            <div className="mt-6 space-y-4">
              {values.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </motion.div>
    </main>
  );
}
