"use client";

import SidebarLink from "./SidebarLink";
import CustomButton from "@/components/ui/CustumButton";  // Import CustomButton

interface SidebarLinkProps {
  href: string;
  icon: string;
  label: string;
}

interface SidebarProps {
  links?: SidebarLinkProps[];
  showBackButton?: boolean; // Voliteľné tlačidlo pre návrat
  backButtonText?: string;  // Text tlačidla, predvolené "← Back"
  onBackClick?: () => void; // Callback pre Back tlačidlo
}

export default function Sidebar({
  links = [],
  showBackButton = false,  // Predvolené je "false", takže Back tlačidlo je skryté
  backButtonText = "← Back to Factions Hub",  // Text tlačidla
  onBackClick,
}: SidebarProps) {
  return (
    <aside className="w-[300px] min-w-[250px] bg-gray-900 glassmorphism sci-fi-border p-6 flex-shrink-0">
      <h2 className="text-xl font-bold neon-glow mb-4">Factions</h2>
      <ul className="space-y-2">
        {links.map((f) => (
          <li key={f.href}>
            <SidebarLink href={f.href} icon={f.icon} label={f.label} />
          </li>
        ))}
      </ul>

      {/* Zobraziť tlačidlo "Back", ak showBackButton je true */}
      {showBackButton && (
        <div className="mt-6">
          <CustomButton
            onClick={onBackClick || (() => window.history.back())}  // Predvolená funkcia je návrat v histórii
            text={backButtonText}
            color="bg-red-500"
            hoverColor="hover:bg-red-600"
          />
        </div>
      )}
    </aside>
  );
}
