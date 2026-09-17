"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa";

interface NavLinkItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavLinkItem[] = [
  {
    href: "/",
    label: "Explore",
    icon: FaHome,
  },
  {
    href: "/about",
    label: "About Us",
    icon: FaInfoCircle,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: FaEnvelope,
  },
];

const NavItem = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-2 list-none m-0 p-0">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <motion.li
            key={label}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/70"
              }`}
            >
              <Icon className="text-xs opacity-80" />
              <span>{label}</span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
};

export default NavItem;
