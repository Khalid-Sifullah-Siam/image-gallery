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
    <>
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          onClick={onNavigate}
          className="rounded px-4 py-2 text-xl font-bold uppercase tracking-wider transition-all duration-150 active:translate-y-0.5 hover:text-green-500 hover:underline"
        >
          {item.label}
        </Link>
      ))}
    </>
  );
};

export default NavItem;
