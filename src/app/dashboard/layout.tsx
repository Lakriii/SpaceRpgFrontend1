"use client";

import BaseLayout from "@/components/layout/BaseLayout";
import ProtectedPage from "@/components/auth/ProtectedPage";

const dashboardLinks = [
  { href: "/dashboard", icon: "🏠", label: "Dashboard" },
  { href: "/dashboard/inventory", icon: "🎒", label: "Inventory" },
  { href: "/dashboard/ships", icon: "🚀", label: "Ships" },
  { href: "/dashboard/reputation", icon: "🌟", label: "Reputation" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedPage>
      <BaseLayout header="📊 Your Dashboard" sidebarLinks={dashboardLinks}>
        {children}
      </BaseLayout>
    </ProtectedPage>
  );
}