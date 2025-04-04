"use client";

import SidebarLink from "./SidebarLink";
interface SidebarLinkProps {
  href: string;
  icon: string;
  label: string;
}

interface SidebarProps {
  links?: SidebarLinkProps[]; // 🛠️ Nastavené ako voliteľné pole, aby sa predišlo chybám
}

/* 🔷 Sidebar Komponenta */
export default function Sidebar({ links = [] }: SidebarProps) {
  return (
    <aside className="w-72 shrink-0 bg-gray-900 glassmorphism p-6 sci-fi-border">
      <nav className="flex flex-col space-y-3">
        {links.length > 0 ? (
          links.map((link) => <SidebarLink key={link.href} {...link} />)
        ) : (
          <p className="text-gray-400 text-sm">No links available</p>
        )}
      </nav>
    </aside>
  );
}

