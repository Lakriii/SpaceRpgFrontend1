import BaseLayout from "@/components/layout/BaseLayout";

const locationLinks = [
  { href: "/location", icon: "🏛", label: "Overview" },
  { href: "/location/trade", icon: "🛒", label: "Trade" },
  { href: "/location/npcs", icon: "👤", label: "NPCs" },
  { href: "/location/research", icon: "🔬", label: "Research" },
  { href: "/location/mining", icon: "⛏", label: "Mining" },
];

export default function CurrentLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <BaseLayout header="📍 Current Location" sidebarLinks={locationLinks}>
      {children}
    </BaseLayout>
  );
}
