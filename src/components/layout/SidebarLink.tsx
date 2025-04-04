"use client";

interface SidebarLinkProps {
  href: string;
  icon: string;
  label: string;
}

export default function SidebarLink({ href, icon, label }: SidebarLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center space-x-3 p-4 rounded-lg text-lg font-semibold transition-all duration-300 
                 bg-gray-800/50 border border-transparent hover:border-blue-400 hover:bg-gray-800 hover:text-blue-400"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
