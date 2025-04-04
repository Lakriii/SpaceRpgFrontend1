"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function CurrentLocationLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/location", icon: "🏛", label: "Overview" },
    { href: "/location/trade", icon: "🛒", label: "Trade" },
    { href: "/location/npcs", icon: "👤", label: "NPCs" },
    { href: "/location/research", icon: "🔬", label: "Research" },
    { href: "/location/mining", icon: "⛏", label: "Mining" },
  ];

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* 🌌 Holografické Pozadie */}
      <div className="fixed inset-0 bg-stars animate-fadeIn"></div>

      {/* 🏛 Nadpis */}
      <header className="text-center py-6 text-3xl font-bold neon-glow">
        📍 Current Location
      </header>

      {/* 🚀 Rozloženie stránky */}
      <div className="flex flex-grow">
        {/* 🛰 Sidebar s linkami */}
        <Sidebar links={links} />

        {/* 🌟 Hlavný obsah */}
        <main className="flex-1 p-10 min-w-0">
          <div className="glassmorphism p-6 rounded-xl w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
