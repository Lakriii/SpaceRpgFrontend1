"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavLink from "./NavLink";
import CustomButton from "../ui/CustumButton";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  const hiddenPaths = ["/login", "/register"];

  if (loading || hiddenPaths.includes(pathname)) return null;

  if (!user) return null;

  const navLinks = [
    { href: "/space", label: "Galaxy" },
    { href: "/factions", label: "Factions" },
    { href: "/market", label: "Market" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/location", label: "Current Location" },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-lg text-white px-6 py-4 flex justify-between items-center shadow-lg relative z-50 sci-fi-border">
      <Link href="/" className="text-2xl font-bold neon-glow transition-all hover:scale-105">
        🚀 Star Conquest
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
        ))}
      

      <CustomButton onClick={handleLogout} text="Log Out" />
      </div>
    </nav>
  );
}