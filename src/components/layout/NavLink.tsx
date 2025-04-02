import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, label }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md transition-all ${
        pathname === href
          ? "text-blue-400 border-b-2 border-blue-400 neon-glow"
          : "hover:text-blue-300 hover:bg-gray-800/50"
      }`}
    >
      {label}
    </Link>
  );
}
