import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  {
    href: "/about",
    label: "About Us",
  },
  {
    href: "/contact",
    label: "Contact Us",
  },
];

const NavItem = ({ onNavigate }: { onNavigate?: () => void }) => {
  return (
    <ul className="flex flex-col md:flex-row md:items-center gap-2 lg:gap-4 list-none m-0 p-0">
      {navItems.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className="block rounded px-3 py-2 md:px-3.5 md:py-2 lg:px-4 lg:py-2 text-base md:text-lg lg:text-xl font-bold uppercase tracking-wider transition-all duration-150 active:translate-y-0.5 hover:text-green-500 hover:underline whitespace-nowrap"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItem;
