import BaseLayout from "@/components/layout/BaseLayout";

const dashboardLinks = [
  { href: "/dashboard", icon: "🏠", label: "Dashboard" },
  { href: "/dashboard/inventory", icon: "🎒", label: "Inventory" },
  { href: "/dashboard/ships", icon: "🚀", label: "Ships" },
  { href: "/dashboard/reputation", icon: "🌟", label: "Reputation" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BaseLayout header="📊 Your Dashboard" sidebarLinks={dashboardLinks}>
      {children}
    </BaseLayout>
  );
}
