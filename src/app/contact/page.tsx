"use client";

import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { motion } from "framer-motion";

const contactMethods = [
  {
    label: "Email",
    value: "hello@imagegallery.com",
    href: "mailto:hello@imagegallery.com",
  },
  {
    label: "Phone",
    value: "+1 (555) 012-3456",
    href: "tel:+15550123456",
  },
  {
    label: "Location",
    value: "Available worldwide",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/60 via-slate-50 to-indigo-100/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto my-auto p-4 sm:p-7 md:p-10 lg:p-12 bg-white/85 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800/80 rounded-2xl sm:rounded-[2.25rem] shadow-[0_25px_80px_-15px_rgba(15,23,42,0.08)] backdrop-blur-md transition-colors duration-300"
      >
        <Navbar />

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/60 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
              Contact us
            </span>
            <div className="space-y-4">
              <h1 className="max-w-xl text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
                Let&apos;s talk about your next gallery or project.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
                Reach out for collaborations, custom gallery setups, or any
                questions about the site. We reply with clear next steps and a
                simple plan.
              </p>
            </div>

            <div className="space-y-3">
              {contactMethods.map((method) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/90 px-4 py-4 shadow-sm transition-colors hover:border-emerald-300 dark:hover:border-emerald-400 hover:shadow-md cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      {method.label}
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-950 dark:text-white">
                      {method.value}
                    </p>
                  </div>
                  <span className="text-2xl text-emerald-600 dark:text-emerald-400">→</span>
                </motion.a>
              ))}
            </div>
          </div>

          <form className="rounded-2xl sm:rounded-[1.75rem] border border-slate-200 bg-slate-950 p-4 sm:p-8 text-white shadow-2xl">
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Your name
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Email address
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium">
                Subject
                <input
                  type="text"
                  placeholder="Project inquiry"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Message
                <textarea
                  rows={6}
                  placeholder="Tell us what you need..."
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                />
              </label>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                className="mt-2 cursor-pointer rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-emerald-300"
              >
                Send message
              </motion.button>
            </div>
          </form>
        </section>

        <Footer />
      </motion.div>
    </main>
  );
}
