import BaseLayout from "@/components/layout/BaseLayout";
import ProtectedPage from "@/components/auth/ProtectedPage";


const locationLinks = [
  { href: "/location", icon: "🏛", label: "Overview" },
  { href: "/location/trade", icon: "🛒", label: "Trade" },
  { href: "/location/npcs", icon: "👤", label: "NPCs" },
  { href: "/location/research", icon: "🔬", label: "Research" },
  { href: "/location/mining", icon: "⛏", label: "Mining" },
];

export default function CurrentLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedPage>
      <BaseLayout header="📍 Current Location" sidebarLinks={locationLinks}>
       {children}
      </BaseLayout>
    </ProtectedPage>
  );
}
