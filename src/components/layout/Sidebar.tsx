"use client";

interface SidebarLink {
  href: string;
  icon: string;
  label: string;
}

interface SidebarProps {
  links: SidebarLink[];
}

export default function Sidebar({ links }: SidebarProps) {
  return (
    <aside className="w-72 shrink-0 bg-gray-900 glassmorphism p-6 sci-fi-border">
      <nav className="flex flex-col space-y-3">
        {links.map((link) => (
          <SidebarItem key={link.href} {...link} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarItem({ href, icon, label }: SidebarLink) {
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
