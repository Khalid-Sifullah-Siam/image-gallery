"use client";

import { useState } from "react";
import Link from "next/link";
import NavItem from "./NavItem";

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
          className="inline-flex h-11 w-11 items-center justify-center rounded border-2 border-slate-900 text-2xl font-bold transition hover:bg-slate-900 hover:text-white md:hidden"
        >
          <span aria-hidden>{isOpen ? "×" : "☰"}</span>
        </button>

        <div className="hidden md:block">
          <NavItem />
        </div>
      </div>

      <div
        className={`md:hidden ${isOpen ? "mt-4 block" : "hidden"}`}
      >
        <div className="flex flex-col gap-2 rounded border border-slate-200 p-3 shadow-sm">
          <NavItem onNavigate={() => setIsOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
